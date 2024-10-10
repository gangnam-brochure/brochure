/*
    작성자 : 김동규 - 2024-10-02 / 최초 작성
    설명 : Kakao와 Naver 로그인 리다이렉트 핸들러
*/

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';

const LoginRedirectHandler = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const currentURL = window.location.href;

    if (currentURL.includes('kakao')) {
      handleKakaoLogin();
    } else if (currentURL.includes('naver')) {
      handleNaverLogin();
    } else {
      console.error('지원하지 않는 소셜 로그인 요청입니다.');
      navigate('/signin');
    }
  }, [navigate]);

  // 카카오 로그인 처리 함수
  const handleKakaoLogin = async () => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');
    const error = params.get('error');

    if (error) {
      alert(`카카오 로그인 실패: ${error}`);
      navigate('/signin');
      return;
    }

    if (code) {
      try {
        const response = await fetch(
          `https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${process.env.REACT_APP_KAKAO_CLIENT_ID}&redirect_uri=http://localhost:3000/oauth/kakao/callback&code=${code}`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
          }
        );

        const data = await response.json();
        console.log('카카오 로그인 성공:', data);

        Cookies.set('token', data.access_token, {
          expires: 1,
          path: '/',
          sameSite: 'Lax',
        });

        // 프로필 가져오기 및 닉네임 설정
        await handleSetNickname('kakao');
        navigate('/');
      } catch (error) {
        console.error('카카오 로그인 처리 중 오류 발생:', error);
        alert('카카오 로그인 처리 중 문제가 발생했습니다.');
        navigate('/signin');
      }
    } else {
      console.error('카카오로부터 인증 코드를 받지 못했습니다.');
      navigate('/signin');
    }
  };

  // 네이버 로그인 처리 함수
  const handleNaverLogin = async () => {
    const hashParams = new URLSearchParams(window.location.hash.substring(1));
    const accessToken = hashParams.get('access_token');
    const error = hashParams.get('error');

    if (error) {
      alert(`네이버 로그인 실패: ${error}`);
      navigate('/signin');
      return;
    }

    if (accessToken) {
      try {
        console.log('네이버 로그인 성공:', accessToken);

        Cookies.set('token', accessToken, {
          expires: 1,
          path: '/',
          sameSite: 'Lax',
        });

        // 프로필 가져오기 및 닉네임 설정
        await handleSetNickname('naver');
        navigate('/');
      } catch (error) {
        console.error('네이버 로그인 처리 중 오류 발생:', error);
        alert('네이버 로그인 처리 중 문제가 발생했습니다.');
        navigate('/signin');
      }
    } else {
      console.error('네이버로부터 access_token을 받지 못했습니다.');
      navigate('/signin');
    }
  };


  const handleSetNickname = async (provider) => {
    try {
      const token = Cookies.get('token');
      console.log('토큰:', token);

      let userProfileUrl;

      if (provider === 'kakao') {
        userProfileUrl = 'https://kapi.kakao.com/v2/user/me';
      } else if (provider === 'naver') {
        userProfileUrl = '/api/naver-profile';  // 네이버 프로필 API로 요청
      }

      const profileResponse = await fetch(userProfileUrl, {
        headers: {
          Authorization: `Bearer ${token}`,  // 네이버/카카오 accessToken
        },
      });

      const profileData = await profileResponse.json();
      console.log('받은 프로필 데이터:', profileData);

      let email;
      let nickname;

      // 카카오 계정 처리
      if (provider === 'kakao') {
        // 카카오에서 이메일이 없을 수도 있으니, 없으면 닉네임만 이용
        email = profileData?.kakao_account?.email || null;  // 이메일이 없으면 null
        nickname = profileData?.kakao_account?.profile?.nickname || profileData?.properties?.nickname || profileData?.profile_nickname;

        console.log('카카오 닉네임:', nickname);

        if (!nickname) {
          throw new Error('카카오 로그인 정보에 닉네임이 없습니다.');
        }

        // 이메일이 없는 경우에는 닉네임만으로 진행
        if (!email) {
          console.warn('카카오 로그인 정보에 이메일이 없습니다. 이메일 없이 닉네임만 설정합니다.');
          email = `kakao_${profileData.id}@kakao.com`; // 이메일 없는 경우 임시 이메일 생성
        }
      } 
      // 네이버 계정 처리
      else if (provider === 'naver') {
        email = profileData?.email;  // 이메일 추출
        nickname = profileData?.nickname;

        if (!email) {
          throw new Error('네이버 로그인 정보에 이메일이 없습니다.');
        }

        if (!nickname) {
          throw new Error('네이버 로그인 정보에 닉네임이 없습니다.');
        }
      }

      // 서버에 이메일과 닉네임을 보내고, JWT 발급 요청
      const jwtResponse = await axios.post('/api/naver-login', { email, nickname });
      const serverToken = jwtResponse.data.token;

      // 서버로부터 발급된 JWT를 쿠키에 저장
      Cookies.set('token', serverToken, {
        expires: 1,
        path: '/',
        sameSite: 'Lax',
      });

      console.log('닉네임 설정 성공:', nickname);
    } catch (error) {
      console.error('닉네임 설정 중 오류 발생:', error);
      alert(`닉네임 설정에 실패했습니다. 이유: ${error.message}`);
    }
  };

  
  
  


  

  

  return null;
};

export default LoginRedirectHandler;
