/*
    작성자 : 김동규 - 2024-10-10 / 최초 작성
    설명 : 홈페이지 첫 화면 애니메이션
*/
import React, { useState, useEffect, useRef } from 'react';
import '../assets/css/firsttext.css';

const FirstText = () => {
  const [firstTextVisible, setFirstTextVisible] = useState(false);
  const [secondTextVisible, setSecondTextVisible] = useState(false);
  const firstTextRef = useRef(null);
  const [brightness, setBrightness] = useState(1);  // 조명의 밝기

  const text = "우리는";

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setFirstTextVisible(true); // "우리는" 애니메이션 시작
            setTimeout(() => {
              setSecondTextVisible(true); // 2초 후 "알고보니" 애니메이션 시작
            }, 2000);
          } else {
            setFirstTextVisible(false);
            setSecondTextVisible(false);
          }
        });
      },
      { threshold: 0.5 }
    );

    if (firstTextRef.current) {
      observer.observe(firstTextRef.current);
    }

    // 스크롤할 때마다 조명이 밝아지는 효과
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const newBrightness = 0.9 + scrollY / 300;  // 스크롤 할수록 밝기 증가
      setBrightness(Math.min(newBrightness, 1.2));  // 최대 밝기 설정
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="first-text-container" ref={firstTextRef} style={{ filter: `brightness(${brightness})` }}>
      <div className="first-text">
        {text.split("").map((char, index) => (
          <span
            key={index}
            className={firstTextVisible ? 'fade-in-slide-up' : ''}
            style={{ animationDelay: `${index * 0.5}s` }}
          >
            {char}
          </span>
        ))}
      </div>

      {secondTextVisible && (
        <div className="first-second-text fade-in-slide-up">알고보니</div>
      )}
    </div>
  );
};

export default FirstText;
