import { useState, useEffect } from "react";
import Footer from "../Footer";
import Header from "../Header";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faCommentDots, faUserEdit } from '@fortawesome/free-solid-svg-icons';
import '../../assets/css/mypage.css';
import axios from 'axios';
import Cookies from 'js-cookie';

const MyPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    nickname: '',
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      const token = Cookies.get('token');
      if (!token) {
        alert("로그인을 해주세요");
        handleClick("../signin");
        return;
      }

      try {
        const response = await axios.get('/api/get-profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setFormData({
          email: response.data.email,
          nickname: response.data.nickname,
          phone: response.data.phone,
          password: '',
          confirmPassword: '',
        });
      } catch (error) {
        console.error('프로필 로드 중 오류 발생:', error);
      }
    };

    fetchProfile();
  }, []);

  useEffect(() => {
    // Fade-in 효과
    const fadeInElement = document.querySelector('.fade-in');
    fadeInElement.classList.add('visible');

    const letters = document.querySelectorAll('.title span');
    letters.forEach((letter, index) => {
      setTimeout(() => {
        letter.style.opacity = '1';
        letter.style.transform = 'translateY(0)';
      }, index * 100);
    });
  }, []);

  const handleClick = (path) => {
    navigate(path);
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <>
      <Header />
      <div className="fade-in">
        <div className="mypage-container">
          <div className="back-button-container" style={{ textAlign: "right", marginBottom: "10px", marginTop: "15px" }}>
            <button className="button" onClick={handleBack}>뒤로가기</button>
          </div>
          
          
          <h1 className="title">
            {Array.from("마이 페이지").map((letter, index) => (
              <span key={index}>{letter}</span>
            ))}
          </h1>
          <div className="welcome-message">
            안녕하세요 {formData.nickname} 님
          </div>
          <div className="button-group">
            <button onClick={() => handleClick("../favorites")} className="mypage-button">
              <FontAwesomeIcon icon={faStar} /> 즐겨찾기 목록
            </button>
            <button onClick={() => handleClick("../reviews")} className="mypage-button">
              <FontAwesomeIcon icon={faCommentDots} /> 리뷰 목록
            </button>
            <button onClick={() => handleClick("../editprofile")} className="mypage-button">
              <FontAwesomeIcon icon={faUserEdit} /> 회원정보 변경
            </button>
            <button onClick={() => handleClick("../myprofile")} className="mypage-button">
              <FontAwesomeIcon icon={faUserEdit} /> 내정보
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default MyPage;
