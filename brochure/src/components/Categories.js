/*
    작성자 : 김동규 - 2024-10-02 / 최초 작성
    설명 : 메인 페이지 body 카테고리 섹션
*/
import React from 'react';
import '../assets/css/categories.css';
import { Link, NavLink } from 'react-router-dom';

const Categories = () => {
  const categories = [
    { name: '편의점', icon: '🏪', code: "CS2"},
    { name: '관광명소', icon: '💈', code: "AT4"},
    { name: '음식점', icon: '🎬', code: "FD6" },
    { name: '카페', icon: '🎬', code: "CE7" },
    { name: '숙박', icon: '🎬', code: "AD5" },
    { name: '주차장', icon: '🎬', code: "PK6" },
    { name: '지하철역', icon: '🎬', code: "SW8" },
    { name: '공공기관', icon: '🎬', code: "PO3" },
    { name: '문화시설', icon: '🎬', code: "CT1" },
    { name: '주유소', icon: '🎬', code: "OL7" }
  ];
  // 카테고리 항목 추가 수정자: 최예지

  return (
    <div className="categories-container">
      <h2 className="categories-title">현재 내 주변에는?</h2>
      <div className="category-wrapper">
        {/* 카테고리 링크 추가  수정자: 최예지 */}
        {categories.map((category, index) => (
          <NavLink to={`/${category.code}`} key={category.code} style={{width:"200px", margin:"55px"}}>
            <div className="category-item">
              <span>{category.icon}</span>
            </div>
            <p>{category.name}</p>
          </NavLink>
        ))}
        {/* <div className="test">
        <NavLink to={"/test"}>
                <h3>test</h3>
                </NavLink>
        </div>
        <div className="reviewtest">
        <NavLink to={"/reviewtest"}>
                <h3>review</h3>
                </NavLink>
        </div> */}
      </div>
    </div>
  );
};

export default Categories;