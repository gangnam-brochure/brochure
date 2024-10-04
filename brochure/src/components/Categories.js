/*
    작성자 : 김동규 - 2024-10-02 / 최초 작성
    설명 : 메인 페이지 body 카테고리 섹션
*/
import React from 'react';
import '../assets/css/categories.css';
import {NavLink} from "react-router-dom";

const Categories = () => {
  const categories = [
    { name: '편의점', icon: '🏪' },
    { name: '편의시설', icon: '💈' },
    { name: '문화시설', icon: '🎬' }
  ];

  return (
    <div className="categories-container">
      <h2 className="categories-title">카테고리</h2>
      <div className="category-wrapper">
        {categories.map((category, index) => (
          <div key={index} className="category-item">
            <span>{category.icon}</span>
            <p>{category.name}</p>
          </div>
        ))}
        <div className="test">
        <NavLink to={"/test"}>
                <h3>test</h3>
                </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Categories;