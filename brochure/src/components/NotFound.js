/*
    작성자 : 김동규 - 2024-10-11 / 최초 작성
    설명 : 404에러 페이지
*/
import React from 'react';
import { Link } from 'react-router-dom'; 
import '../assets/css/notFound.css';

const NotFound = () => {
  return (
    <div className="not-found-container">
        <h1 className='not-found-num'>404 ERROR</h1>
        <h1 className='not-found-text'>길을 잃으신 것 같습니다...</h1>
        <button className='not-found-button'><Link to="/">돌아가기</Link></button>
    </div>
  );
};

export default NotFound;
