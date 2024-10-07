/*
    작성자 : 김동규 - 2024-10-02 / 최초 작성
    설명 : 로그인 여부에 따른 페이지 접근 제한
*/

import React, { useState } from 'react';
import Cookies from 'js-cookie';
import CustomModal from './CustomModal'; // 커스텀 모달 컴포넌트 가져오기

const PrivateRoute = ({ children }) => {
  const token = Cookies.get('token');  // 쿠키에서 토큰 가져오기
  const [showModal, setShowModal] = useState(!token);  // 로그인 여부에 따른 모달 표시

  if (showModal) {
    return <CustomModal onClose={() => setShowModal(false)} />; // 모달 표시
  }

  return children;  // 로그인한 경우 자식 컴포넌트 반환
};

export default PrivateRoute;
