/*
    작성자 : 김동규 - 2024-10-02 / 최초 작성
    설명 : 메인 페이지 푸터 영역
*/

import React from 'react';
import { useNavigate } from 'react-router-dom';  // useNavigate 가져오기
import '../assets/css/footer.css';  // 푸터 CSS 파일 가져오기

const Footer = () => {
  const navigate = useNavigate();  // 페이지 이동을 위한 훅

  const footerItems = [
    { name: '홈', icon: '🏠', path: '/' },
    { name: '즐겨찾기', icon: '⭐', path: '/favorites' },
    { name: '후기', icon: '📝', path: '/reviews' },
    { name: '로그인', icon: '🔑', path: '/signin' },  // 로그인 클릭 시 이동할 경로
    { name: '마이페이지', icon: '👤', path: '/mypage' }
  ];

  const handleNavigation = (path) => {
    navigate(path);  // 경로에 맞게 페이지 이동
  };

  return (
    <footer>
      {footerItems.map((item, index) => (
        <div key={index} onClick={() => handleNavigation(item.path)}>
          <span>{item.icon}</span>
          <p>{item.name}</p>
        </div>
      ))}
    </footer>
  );
};

export default Footer;