/*
    작성자 : 김동규 - 2024-10-10 / 최초 작성
    설명 : 홈페이지 두번째 화면 애니메이션
*/
import React, { useEffect, useState } from 'react';
import '../assets/css/secondtext.css';

const SecondText = ({ triggerAnimation }) => {
  const [isVisible, setIsVisible] = useState(false); // 텍스트가 보이는 상태
  const [isFontChanged, setIsFontChanged] = useState(false); // 폰트 변경 여부
  const [showBackground, setShowBackground] = useState(false); // 배경 이미지 표시 여부

  useEffect(() => {
    if (triggerAnimation) {
      setIsVisible(true);

      // 폰트 변경 후 배경 이미지 표시
      const fontChangeTimer = setTimeout(() => {
        setIsFontChanged(true); // 폰트 변경
        setShowBackground(true); // 배경 이미지 보이게 설정
      }, 1050); // 깜빡거림 후 폰트 변경과 동시에 배경 이미지 표시

      return () => clearTimeout(fontChangeTimer);
    } else {
      // 스크롤을 올리면 처음 상태로 되돌리기
      setIsVisible(false);
      setIsFontChanged(false);
      setShowBackground(false);
    }
  }, [triggerAnimation]);

  return (
    <div className="second-text-container">
      <h2
        className={`second-text ${isVisible ? 'visible' : ''} ${
          isFontChanged ? 'font-changed' : ''
        }`}
      >
        번호의 민족이었다.
      </h2>
      {/* 배경 이미지 요소 */}
      <div className={`background-image ${showBackground ? 'background-visible' : ''}`}></div>
    </div>
  );
};

export default SecondText;


