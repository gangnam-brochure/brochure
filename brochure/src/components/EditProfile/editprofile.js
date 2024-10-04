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
    const [user,setUser] = useState({email:'cookie3013',password:'1111'});
    const [user1,setUser1] = useState({email:'',password:''});
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false); // 아이디삭제 창 열고닫기
  const [changeprofile, setchangeprofile] = useState(false); //변경창 열고닫기
  const [newprofile, setnewprofile] = useState(false); //새로운 아이디 비밀번호 열고닫기
  const [changeprofile2, setchangeprofile2] = useState(false); //삭제창 전 인증 열고닫기
 
  const navigate = useNavigate();


  const handleClick = () => {
    setchangeprofile(!changeprofile);
    setShowDeleteConfirmation(false);
    setnewprofile(false);
    setchangeprofile2(false);
  };
  const handleClick2 = () => {
    setchangeprofile2(!changeprofile2);
    setShowDeleteConfirmation(false);
    setnewprofile(false);
    setchangeprofile(false);
  };

  const handleDeleteClick = () => { //
    setShowDeleteConfirmation(!showDeleteConfirmation);
    setchangeprofile(false);
    setnewprofile(false);
    
  };
  const onChangeHandler = e => 
  {
    setUser1({
        ...user1,                          // 유저 전체를 가져와서 참조하고 e.target.name이 변하는곳을 밸류로 채워줌
        [e.target.name] : e.target.value // 
    })
  }
  const onClicker = () => {  // 아이디와 비밀번호를 각각 비교합니다.
    
    if (user1.email === user.email && user1.password === user.password) {
        alert("인증되었습니다");
        setchangeprofile(false);
        setUser1({email:'', password:''});   
        setnewprofile(!newprofile);
    } else {
        alert("아이디와 비밀번호가 일치하지 않습니다. 다시 입력해주세요");
        setUser1({email:'', password:''});   
        
    }
    
};
const onClicker2 = () => {  // 삭제를위한 아이디와 비밀번호를 각각 비교합니다.
    
    if (user1.email === user.email && user1.password === user.password) {
        alert("인증되었습니다");
        setchangeprofile2(false);
        setUser1({email:'', password:''});   
        setShowDeleteConfirmation(!showDeleteConfirmation);
    } else {
        alert("아이디와 비밀번호가 일치하지 않습니다. 다시 입력해주세요");
        setUser1({email:'', password:''});   
        
    }
};
const onCilckNewProfile = () => {  //아이디 변경
    setUser(user1);
    alert("아이디가 변경 되었습니다");
    setnewprofile(false);
    setUser1({email:'', password:''});
}
  return (
    <>
      <Header />
      <div className="mypage-container">
        <h1>회원 정보 변경</h1>
        <div className="welcome-message">
          안녕하세요 {user.email} 님
        </div>
        <div className="button-group">
          <button onClick={handleClick} className="mypage-button">
            <FontAwesomeIcon icon={faUserEdit} /> 아이디/비밀번호 변경
          </button>
          <button onClick={handleClick2} className="mypage-button">
            <FontAwesomeIcon icon={faTrash} /> 아이디 삭제
          </button>
        </div>

        {showDeleteConfirmation && (                // 삭제 창
          <div className="delete-confirmation">
            <h2>정말 삭제하시겠습니까?</h2>
            <button onClick={() => { /* 여기에 삭제 로직 추가예정 */ }}>확인</button>
            <button onClick={handleDeleteClick}>취소</button>
          </div>
        )}






        {changeprofile && (                     // 기존아이디 창
          <div className="delete-confirmation">
            <h2>기존 아이디와 비밀번호를 입력해주세요</h2>
            <p>변경을 위한 아이디와 비밀번호</p>
            <label>email : </label>
            <input type="text" 
            name="email" 
            value={user1.email}
            placeholder="이메일 입력" 
            onChange={onChangeHandler}/>
            <br/>
            <label>password :</label>
            <input type="password" 
            name="password"
            value={user1.password}
            placeholder="패스워드 입력"
            onChange={onChangeHandler}/>
            <br/>
            <button onClick={onClicker}>확인</button>
            <button onClick={handleClick}>취소</button>
          </div>
        )}

        {changeprofile2 && (                     // 기존아이디 삭제창
          <div className="delete-confirmation">
            <h2>기존 아이디와 비밀번호를 입력해주세요</h2>
            <p>삭제를 위한 아이디와 비밀번호</p>
            <label>email : </label>
            <input type="text" 
            name="email" 
            value={user1.email}
            placeholder="이메일 입력" 
            onChange={onChangeHandler}/>
            <br/>
            <label>password :</label>
            <input type="password" 
            name="password"
            value={user1.password}
            placeholder="패스워드 입력"
            onChange={onChangeHandler}/>
            <br/>
            <button onClick={onClicker2}>확인</button>
            <button onClick={handleClick2}>취소</button>
          </div>
        )}






        {newprofile && (                          //새로운 아이디창
          <div className="delete-confirmation">
            <h2>바꿀 아이디와 비밀번호를 입력해주세요</h2>
            <label>email : </label>
            <input type="text" 
            name="email" 
            value={user1.email}
            placeholder="이메일 입력" 
            onChange={onChangeHandler}/>
            <br/>
            <label>password :</label>
            <input type="password" 
            name="password"
            value={user1.password}
            placeholder="패스워드 입력"
            onChange={onChangeHandler}/>
            <br/>
            <button onClick={onCilckNewProfile}>변경</button>
            <button onClick={handleClick}>취소</button>
          </div>
        )}


      </div>
      <Footer />
    </>
  );
};

export default EditProfile;