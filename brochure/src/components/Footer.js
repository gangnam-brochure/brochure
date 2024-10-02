/*
    작성자 : 김동규 - 2024-10-02 / 최초 작성
    설명 : 메인 페이지 푸터 영역
*/

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import '../assets/css/footer.css';

const Footer = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);  // 로그인 상태 관리
  const navigate = useNavigate();

  // 로그인 상태 확인 (쿠키에 토큰이 있는지 확인)
  useEffect(() => {
    const token = Cookies.get('token');  // 쿠키에서 토큰 가져오기
    console.log('쿠키에서 가져온 토큰:', token);  // 토큰이 제대로 확인되는지 확인
    if (token) {
      setIsLoggedIn(true);  // 토큰이 있으면 로그인 상태로 설정
    } else {
      setIsLoggedIn(false);  // 토큰이 없으면 로그아웃 상태로 설정
    }
  }, []);

  const handleLogout = () => {
    Cookies.remove('token');  // 로그아웃 시 쿠키에서 토큰 삭제
    setIsLoggedIn(false);  // 로그인 상태를 로그아웃으로 변경
    navigate('/');  // 로그인 페이지로 이동
    alert('로그아웃 되었습니다.');
  };

  const footerItems = [
    { name: '홈', icon: '🏠', path: '/' },
    { name: '즐겨찾기', icon: '⭐', path: '/favorites' },
    { name: '후기', icon: '📝', path: '/reviews' },
    // 로그인 상태에 따라 로그인/로그아웃 항목 결정
    isLoggedIn
      ? { name: '로그아웃', icon: '🚪', action: handleLogout }
      : { name: '로그인', icon: '🔑', path: '/signin' },
    { name: '마이페이지', icon: '👤', path: '/mypage' }
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
          <span>{item.icon}</span>
          <p>{item.name}</p>
        </div>
      ))}
    </footer>
  );
};

export default Footer;