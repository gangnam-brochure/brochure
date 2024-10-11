import Footer from "../Footer";
import Header from "../Header";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import '../../assets/css/MyProfile.css'; // CSS 파일을 import
const MyProfile = () => {
  const [formData, setFormData] = useState({
    email: '',
    nickname: '',
    phone: '',
    gender: 'male',
  });

  const navigate = useNavigate();
  const [loading, setLoading] = useState(true); // 로딩 상태 추가

  useEffect(() => {
    const fetchProfile = async () => {
      const token = Cookies.get('token');
      try {
        const response = await axios.get('/api/get-profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      //  setFormData(response.data);
        
      setFormData({
        ...response.data,
        gender: response.data.gender || 'male', // 성별 기본값 설정
      });
      } catch (error) {
        console.error('프로필 로드 중 오류 발생:', error);
      } finally {
        setLoading(false); // 데이터 로딩 후 로딩 상태를 false로 변경
      }
    };

    fetchProfile();
  }, []);
  useEffect(() => {
    // 로딩이 끝났을 때만 fade-in 효과 적용
      const fadeInElement = document.querySelector('.mypage-container');
      fadeInElement.classList.add('visible');

      const letters = document.querySelectorAll('.title span');
      letters.forEach((letter, index) => {
        setTimeout(() => {
          letter.style.opacity = '1';
          letter.style.transform = 'translateY(0)';
        }, index * 100);
      });
    
  }, []); // loading 상태가 변할 때마다 실행

  const handleBack = () => {
    navigate(-1);
  };
   // 로딩 중일 때 표시할 내용
   

  
  return (
    <>
      <Header />
      <div className="mypage-container">
        <div className="back-button-container">
          <button className="button" onClick={handleBack}>뒤로가기</button>
        </div>
        
        <h1 className="title">
            {Array.from("안녕 하세요").map((letter, index) => (
              <span key={index}>{letter}</span>
            ))}
          </h1>
        <div className="welcome-message">
          {formData.nickname}님! 안녕하세요
        </div>
        <div className="profile-info">
          <div className="profile-card email">
            <label className="label">이메일</label>&nbsp;&nbsp;
            <span className="value">{loading ? '로딩 중...' : formData.email}</span>
          </div>
          <div className="profile-card email">
            <label className="label">닉네임</label>&nbsp;&nbsp;
            <span className="value">{loading ? '로딩 중...' : formData.nickname}</span>
          </div>
          <div className="profile-card email">
            <label className="label">전화번호</label>&nbsp;&nbsp;
            <span className="value">{loading ? '로딩 중...' : formData.phone}</span>
          </div>
          <div className="profile-card email">
            <label className="label">성별</label>&nbsp;&nbsp;
            <span className="value">{loading ? '로딩 중...' : formData.gender}</span>
          </div>
        </div>
        <div className="button-container">
          <button type="submit" className="button" onClick={handleBack}>확인</button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default MyProfile;
