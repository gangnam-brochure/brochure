import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Categories from '../components/Categories';
import Footer from '../components/Footer';
import { Outlet, useLocation } from 'react-router-dom';
import FirstText from './FirstText';
import SecondText from './SecondText';

const MainPage = () => {
  const [hideHeaderFooter, setHideHeaderFooter] = useState(false);
  const [showTexts, setShowTexts] = useState(true); // FirstText와 SecondText 보임 여부 관리
  const location = useLocation(); // 현재 경로 확인

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      // 스크롤 위치에 따라 헤더와 푸터를 숨김, 특정 카테고리 페이지에서는 항상 보이게 설정
      if (scrollPosition < 1600 && showTexts) {
        setHideHeaderFooter(true);
      } else {
        setHideHeaderFooter(false); // 카테고리 클릭 후 헤더와 푸터 항상 보이게
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [showTexts]);

  useEffect(() => {
    // 루트 경로 ("/")일 때 헤더와 푸터를 숨김
    if (location.pathname === '/') {
      setHideHeaderFooter(true); // 헤더와 푸터 숨김
    } else if (
      location.pathname.startsWith('/CS2') ||
      location.pathname.startsWith('/AT4') ||
      location.pathname.startsWith('/FD6') ||
      location.pathname.startsWith('/CE7') ||
      location.pathname.startsWith('/AD5') ||
      location.pathname.startsWith('/PK6') ||
      location.pathname.startsWith('/SW8') ||
      location.pathname.startsWith('/PO3') ||
      location.pathname.startsWith('/CT1') ||
      location.pathname.startsWith('/OL7')
    ) {
      setShowTexts(false); // 카테고리 페이지일 경우 텍스트 숨김
      setHideHeaderFooter(false); // 헤더와 푸터는 항상 보이게 설정
    } else {
      setShowTexts(true); // 다른 페이지에서는 텍스트 보임
    }
  }, [location]);

  return (
    <div className="home-page">
      {/* 조건부로 헤더와 푸터 렌더링 */}
      {!hideHeaderFooter && <Header />}

      {/* FirstText와 SecondText가 showTexts가 true일 때만 렌더링 */}
      {showTexts && (
        <>
          <FirstText />
          <SecondText />
        </>
      )}

      {/* 메인 콘텐츠 렌더링 */}
      <Outlet />

      {!hideHeaderFooter && <Footer />}
    </div>
  );
};

export default MainPage;
