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

    return () => {
      if (firstTextRef.current) {
        observer.unobserve(firstTextRef.current);
      }
    };
  }, []);

  return (
    <div className="first-text-container" ref={firstTextRef}>
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
