/*
    작성자 : 김동규 - 2024-10-02 / 최초 작성
    설명 : 메인 페이지 body 카테고리 섹션
*/
import React from 'react';
import '../assets/css/categories.css';
import { Link, NavLink } from 'react-router-dom';

const Categories = () => {
  const categories = [
    { name: '편의점', icon: '🏪', code: "PM9"},
    { name: '편의시설', icon: '💈', code: "MT1"},
    { name: '문화시설', icon: '🎬', code: "AT4" }
  ];

  return (
    <div className="categories-container">
      <h2 className="categories-title">카테고리</h2>
      <div className="category-wrapper">
        {/* 카테고리 링크 추가  수정자: 최예지 */}
        {categories.map((category, index) => (
          <NavLink to={`/${category.code}`} key={category.code}>
            <div className="category-item">
              <span>{category.icon}</span>
              <p>{category.name}</p>
            </div>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default Categories;