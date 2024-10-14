/*
    작성자 : 김동규 - 2024-10-10 / 애니메이션 추가 수정
    설명 : 메인 페이지 
*/

import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Outlet, useLocation } from 'react-router-dom';
import FirstText from './FirstText';
import SecondText from './SecondText';
import NotFound from '../components/NotFound';

const MainPage = () => {
  const [hideHeaderFooter, setHideHeaderFooter] = useState(false);
  const [showTexts, setShowTexts] = useState(true); // FirstText와 SecondText 보임 여부 관리
  const [triggerSecondText, setTriggerSecondText] = useState(false); // SecondText 애니메이션 트리거
  const location = useLocation(); // 현재 경로 확인

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition < 1600 && showTexts) {
        setHideHeaderFooter(true);
      } else {
        setHideHeaderFooter(false);
      }

      if (scrollPosition > 800) {
        setTriggerSecondText(true);
      } else {
        setTriggerSecondText(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [showTexts]);

  useEffect(() => {
    // 루트 경로 ("/")일 때만 FirstText와 SecondText를 보여주고, 그 외에는 숨김
    if (location.pathname === '/') {
      setShowTexts(true);
      setHideHeaderFooter(false);
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
      setShowTexts(false);
      setHideHeaderFooter(false);
    } else {
      setShowTexts(false); // 이 외의 경로에서는 숨김
    }
  }, [location]);

  // 404 페이지일 때 헤더와 푸터를 숨기는 조건 추가
  const isNotFoundPage = location.pathname === '*' || location.pathname === '/404';

  return (
    <div className="home-page">
      {/* 잘못된 경로에서는 NotFound 컴포넌트를 렌더링 */}
      {isNotFoundPage ? (
        <NotFound />
      ) : (
        <>
          {/* 조건부로 헤더와 푸터 렌더링 */}
          {!hideHeaderFooter && <Header />}

          {/* FirstText와 SecondText가 showTexts가 true일 때만 렌더링 */}
          {showTexts && (
            <>
              <FirstText />
              <SecondText triggerAnimation={triggerSecondText} />
            </>
          )}

          {/* 메인 콘텐츠 렌더링 */}
          <Outlet />

          {!hideHeaderFooter && <Footer />}
        </>
      )}
    </div>
  );
};

export default MainPage;
