/*
    작성자: 김동규 - 2024-10-08 / 닉네임 자동 설정
    설명: 소셜 로그인 후 이메일 기반으로 닉네임을 자동으로 설정
*/

import React, { useEffect } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SocialSetNickname = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      fetchUserProfile();
    }
  }, []);

  const fetchUserProfile = async () => {
    try {
      const response = await axios.get('/api/get-profile', {
        headers: {
          Authorization: `Bearer ${Cookies.get('token')}`,
        },
      });

      // 이메일로 닉네임 설정
      const email = response.data.email;
      const baseNickname = email
      let nickname = baseNickname;

      // 서버에 닉네임 중복 확인 및 자동 설정 요청
      await setNickname(nickname);
    } catch (error) {
      console.error('프로필 로드 중 오류 발생:', error);
    }
  };

  const setNickname = async (nickname) => {
    try {
      const response = await axios.post('/api/set-nickname', { nickname });
      console.log('닉네임 자동 설정 완료:', response.data.nickname);
      navigate('/'); // 닉네임 설정 후 메인 페이지로 이동
    } catch (error) {
      if (error.response && error.response.status === 400) {
        console.log('닉네임 중복 발생, 새로운 닉네임 생성 중...');
        // 닉네임 중복 시 랜덤한 숫자 추가하여 재시도
        const newNickname = `${nickname}${Math.floor(Math.random() * 10000)}`;
        await setNickname(newNickname);
      } else {
        console.error('닉네임 설정 실패:', error);
        alert('닉네임 설정에 실패했습니다.');
      }
    }
  };

  return null;
};

export default SocialSetNickname;

