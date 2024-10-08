/*
    작성자 : 이승환 - 2024-10-02 / 최초 작성
    설명 : 마이페이지
*/
// import '../../assets/css/mypage.css'
import { useState,useEffect } from "react";
import Footer from "../Footer";
import Header from "../Header";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; //아이콘사용하기위한 라이브러리
import { faStar, faCommentDots, faUserEdit } from '@fortawesome/free-solid-svg-icons'; // 설치해야함
import '../../assets/css/mypage.css'; //마이페이지에대한 css
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

  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // 초기 사용자 정보를 불러오기 (ex: API 호출)
  useEffect(() => {
    const fetchProfile = async () => {
      const token = Cookies.get('token');
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
      if(!token)
      {
        alert("로그인을 해주세요");
        handleClick("../signin")
      }
    };
    
    fetchProfile();
  }, []);
  const [reviews, setReviews] = useState([]);
  const navigate = useNavigate();

  const handleClick = (path) => {
    navigate(path);
  };

  const deleteReview = (id) => {
    setReviews(reviews.filter((review) => review.id !== id));
  };

  return (
    <>
      <Header />
      <div className="mypage-container">
        <h1>마이 페이지</h1>
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
      <Footer />
    </>
  );
};

export default MyPage;