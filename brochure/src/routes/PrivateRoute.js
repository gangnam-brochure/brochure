/*
    작성자 : 김동규 - 2024-10-02 / 최초 작성
    설명 : 로그인 여부에 따른 페이지 접근 제한
*/

import React from 'react';
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const PrivateRoute = ({ children }) => {
  const token = Cookies.get('token');
  return token ? children : <Navigate to="/signin" />;
};

export default PrivateRoute;