/*
    작성자 : 이승환 - 2024-10-02 / 최초 작성
    설명 : 회원 정보 변경
*/

import { useState } from "react";
import Footer from "../Footer";
import Header from "../Header";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; //아이콘사용하기위한 라이브러리
import { faTrash , faCommentDots, faUserEdit } from '@fortawesome/free-solid-svg-icons'; // 설치해야함
import '../../assets/css/mypage.css'; //마이페이지에대한 css

const EditProfile = () => {
  const [user, setUser] = useState({ name: "승환" });
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [changeprofile, setchangeprofile] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    setchangeprofile(!changeprofile);
    setShowDeleteConfirmation(false);
  };

  const handleDeleteClick = () => {
    setShowDeleteConfirmation(!showDeleteConfirmation);
    setchangeprofile(false);
  };

  return (
    <>
      <Header />
      <div className="mypage-container">
        <h1>회원 정보 변경</h1>
        <div className="welcome-message">
          안녕하세요 {user.name} 님
        </div>
        <div className="button-group">
          <button onClick={handleClick} className="mypage-button">
            <FontAwesomeIcon icon={faUserEdit} /> 아이디/비밀번호 변경
          </button>
          <button onClick={handleDeleteClick} className="mypage-button">
            <FontAwesomeIcon icon={faTrash} /> 아이디 삭제
          </button>
        </div>

        {showDeleteConfirmation && (
          <div className="delete-confirmation">
            <h2>정말 삭제하시겠습니까?</h2>
            <button onClick={() => { /* 여기에 삭제 로직 추가예정 */ }}>확인</button>
            <button onClick={handleDeleteClick}>취소</button>
          </div>
        )}
        {changeprofile && (
          <div className="delete-confirmation">
            <h2>아이디와 비밀번호를 입력해주세요</h2>
            <button onClick={() => { /* 여기에 삭제 로직 추가예정 */ }}>확인</button>
            <button onClick={handleClick}>취소</button>
          </div>
        )}


      </div>
      <Footer />
    </>
  );
};

export default EditProfile;