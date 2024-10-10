/*
    작성자 : 김동규 - 2024-10-02 / 최초 작성
    설명 : 메인 페이지 푸터 영역
*/

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import '../assets/css/footer.css';

const Footer = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkToken = async () => {
      await new Promise(resolve => setTimeout(resolve, 100));  // 100ms 지연
      const token = Cookies.get('token');  // 쿠키에서 토큰 가져오기
      console.log('쿠키에서 가져온 토큰:', token);  // undefined 인지 확인
      if (token) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    };

    checkToken();
  }, []);

  const handleLogout = () => {
    Cookies.remove('token');  // 쿠키에서 토큰 삭제
    setIsLoggedIn(false);
    navigate('/');
    alert('로그아웃 되었습니다.');
  };

  const footerItems = [
    { name: 'home', icon: '🏠', path: '/' },
    { name: 'favorite', icon: '⭐', path: '/favorites' },
    { name: 'review', icon: '📝', path: '/reviews' },
    isLoggedIn
      ? { name: 'logout', icon: '🚪', action: handleLogout }
      : { name: 'login', icon: '🔑', path: '/signin' },
    { name: 'mypage', icon: '👤', path: '/mypage' }
  ];

  const handleNavigation = (path, action) => {
    if (action) {
      action();  // 로그아웃 실행
    } else {
      navigate(path);  // 경로에 맞게 페이지 이동
    }
  };

  return (
    <footer>
      {footerItems.map((item, index) => (
        <div key={index} onClick={() => handleNavigation(item.path, item.action)}>
          {/* 10-08 footer 디자인 적용 수정자: 최예지 */}
          <img src={require(`../assets/images/${item.name}_icon.png`)} width={"50px"}/>
          {/* <span>{item.icon}</span> */}
          {/* <p>{item.name}</p> */}
        </div>
      ))}
    </footer>
  );
};

export default Footer;