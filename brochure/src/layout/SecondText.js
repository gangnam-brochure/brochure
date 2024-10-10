/*
    작성자 : 김동규 - 2024-10-10 / 최초 작성
    설명 : 홈페이지 두 번째 화면 애니메이션
*/
import React, { useEffect, useRef, useState } from 'react';
import '../assets/css/secondtext.css';

const SecondText = () => {
  const [isVisible, setIsVisible] = useState(false);
  const secondTextRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          } else {
            setIsVisible(false);
          }
        });
      },
      { threshold: 0.5 }
    );

    if (secondTextRef.current) {
      observer.observe(secondTextRef.current);
    }

    return () => {
      if (secondTextRef.current) {
        observer.unobserve(secondTextRef.current);
      }
    };
  }, []);

  return (
    <div className="second-text-container" ref={secondTextRef}>
      <h2 className={`second-text ${isVisible ? 'visible' : ''}`}>번호의 민족이었다</h2>
    </div>
  );
};

export default SecondText;
