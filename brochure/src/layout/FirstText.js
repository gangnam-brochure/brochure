// FirstText.js
import React, { useEffect, useRef, useState } from 'react';
import '../assets/css/firstcontext.css';

const FirstText = () => {
  const [isVisible, setIsVisible] = useState(false);
  const firstTextRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          } else {
            setIsVisible(false); // 화면을 벗어나면 다시 숨김 상태로
          }
        });
      },
      { threshold: 0.5 } // 텍스트가 50% 이상 보이면 애니메이션 시작
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
    <div className="first-text" ref={firstTextRef}>
      <h1 className={`animate-text ${isVisible ? 'visible' : ''}`}>우리가 어떤 민족입니까?</h1>
    </div>
  );
};

export default FirstText;
