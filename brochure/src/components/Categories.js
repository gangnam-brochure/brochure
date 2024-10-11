/*
    작성자 : 김동규 - 2024-10-02 / 최초 작성
    설명 : 메인 페이지 body 카테고리 섹션
*/
import React, { useEffect, useRef, useState } from 'react';
import '../assets/css/categories.css';
import { NavLink } from 'react-router-dom';

const Categories = () => {
  const [isAnimating, setIsAnimating] = useState(false);
  const categoriesRef = useRef(null);

  const categoriesLeft = [
    { name: '편의점', icon: 'convenient', code: "CS2" },
    { name: '관광명소', icon: 'sightseeing', code: "AT4" },
    { name: '음식점', icon: 'food', code: "FD6" },
    { name: '카페', icon: 'cafe', code: "CE7" },
    { name: '숙박', icon: 'hotel', code: "AD5" }
  ];

  const categoriesRight = [
    { name: '주차장', icon: 'parking', code: "PK6" },
    { name: '지하철역', icon: 'subway', code: "SW8" },
    { name: '공공기관', icon: 'government', code: "PO3" },
    { name: '문화시설', icon: 'culture', code: "CT1" },
    { name: '주유소', icon: 'oil', code: "OL7" }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsAnimating(true); // 스크롤 다운 시 애니메이션 시작
          } else {
            setIsAnimating(false); // 스크롤 업 시 애니메이션 반대로
          }
        });
      },
      { threshold: 0.5 } // 50% 화면에 보이면 트리거
    );

    if (categoriesRef.current) {
      observer.observe(categoriesRef.current);
    }

    return () => {
      if (categoriesRef.current) {
        observer.unobserve(categoriesRef.current);
      }
    };
  }, []);

  return (
    <div className="categories-container" ref={categoriesRef}>
      <h2 className="categories-title">현재 내 주변에는?</h2>
      <div className="category-wrapper">
        {/* 왼쪽에서 오른쪽으로 나오는 카테고리 */}
        {categoriesLeft.map((category, index) => (
          <NavLink 
          to={`/${category.code}`} 
          key={category.code} 
          style={{ width: "200px", margin: "55px" }}>
            <div className={`category-item ${isAnimating ? 'slide-in-left' : 'slide-out-left'}`}>
              <img src={require(`../assets/images/${category.icon}_color.png`)} width={"78px"}/>
              <p>{category.name}</p>
            </div>
            
          </NavLink>
        ))}

        {/* 오른쪽에서 왼쪽으로 나오는 카테고리 */}
        {categoriesRight.map((category, index) => (
          <NavLink to={`/${category.code}`} key={category.code} style={{ width: "200px", margin: "55px" }}>
            <div className={`category-item ${isAnimating ? 'slide-in-right' : 'slide-out-right'}`}>
              <img src={require(`../assets/images/${category.icon}_color.png`)} width={"78px"}/>
              <p>{category.name}</p>
            </div>
            
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default Categories;
