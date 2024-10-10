// SecondText.js
import React, { useEffect, useRef, useState } from 'react';
import '../assets/css/secondcontext.css';

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
            setIsVisible(false); // 화면을 벗어나면 다시 숨김 상태로
          }
        });
      },
      { threshold: 0.5 } // 텍스트가 50% 이상 보이면 애니메이션 시작
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
      <h2 className={`second-text ${isVisible ? 'visible' : ''}`}>우리는 번호의 민족</h2>
    </div>
  );
};

export default SecondText;
