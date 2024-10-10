/*
    작성자 : 김동규 - 2024-10-10 / 최초 작성
    설명 : 홈페이지 두 번째 화면 애니메이션
*/
import React, { useEffect, useState } from 'react';
import '../assets/css/secondtext.css';

const SecondText = ({ triggerAnimation }) => {
  const [isVisible, setIsVisible] = useState(false); // 텍스트가 보이는 상태
  const [isBlinking, setIsBlinking] = useState(false); // 깜빡이는 상태
  const [isFontChanged, setIsFontChanged] = useState(false); // 폰트 변경 여부

  useEffect(() => {
    if (triggerAnimation) {
      // 트리거가 활성화되면 애니메이션 실행
      const showTextTimer = setTimeout(() => {
        setIsVisible(true);

        // 텍스트가 나타난 후 2초 뒤에 깜빡임 시작
        const blinkTimer = setTimeout(() => {
          setIsBlinking(true);

          // 폰트 변경 후 깜빡임 중지
          const stopBlinkTimer = setTimeout(() => {
            setIsFontChanged(true);
            setIsBlinking(false); // 깜빡임 중지
          }, 2000); // 폰트가 변경된 후 깜빡임 중지

          return () => clearTimeout(stopBlinkTimer);
        }, 2000);

        return () => clearTimeout(blinkTimer);
      }, 1000); // 텍스트가 1초 후에 나타남

      return () => clearTimeout(showTextTimer);
    } else {
      // 스크롤을 올리면 처음 상태로 되돌리기
      setIsVisible(false);
      setIsBlinking(false);
      setIsFontChanged(false);
    }
  }, [triggerAnimation]);

  return (
    <div className="second-text-container">
      <h2
        className={`second-text ${isVisible ? 'visible' : ''} ${
          isBlinking ? 'blinking' : ''
        } ${isFontChanged ? 'font-changed' : ''}`}
      >
        번호의 민족이었다.
      </h2>
    </div>
  );
};

export default SecondText;


