import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/css/custommodal.css';

const CustomModal = ({ onClose }) => {
  const navigate = useNavigate();

  return (
    <div className="modal-background">
      <div className="modal-content">
        <h2>로그인 후 이용하실 수 있습니다</h2>
        <div className="modal-buttons">
          <button onClick={() => navigate('/signin')}>로그인하러 가기</button>
          <button onClick={() => navigate('/')}>돌아가기</button>
        </div>
      </div>
    </div>
  );
};

export default CustomModal;
