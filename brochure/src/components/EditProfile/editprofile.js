/*
    작성자 : 이승환 - 2024-10-02 / 최초 작성
    설명 : 회원 정보 변경
*/
import axios from 'axios';
import Cookies from 'js-cookie';
import { useState , useEffect } from "react";
import Footer from "../Footer";
import Header from "../Header";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; //아이콘사용하기위한 라이브러리
import { faTrash , faCommentDots, faUserEdit, faUser } from '@fortawesome/free-solid-svg-icons'; // 설치해야함
import '../../assets/css/mypage.css'; //마이페이지에대한 css

const EditProfile = () => {
  const [nickname,setnickname] = useState("");
  const [formData,setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    nickname: '',
    food:'',
    gender:'',

});
const [error, setError] = useState('비밀번호가 일치하지 않습니다.');
const [successMessage, setSuccessMessage] = useState('');
// 초기 사용자 정보를 불러오기 (ex: API 호출)
useEffect(() => {
  
const fetchProfile = async () => {
  const token = Cookies.get('token');
  try {
    const response = await axios.get('/api/get-profile', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setFormData({
      email: response.data.email,
      nickname: response.data.nickname,
      phone: response.data.phone,
      password: response.data.password,
      confirmPassword: response.data.confirmPassword,
      food:response.data.food,
      gender:'',
    });
  } catch (error) {
    console.error('프로필 로드 중 오류 발생:', error);
  }
};
setnickname(formData.nickname);
fetchProfile();


}, []); 

    
  const [user1,setUser1] = useState({email:'',password:''});
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false); // 아이디삭제 창 열고닫기
  const [changeprofile, setchangeprofile] = useState(false); //변경창 열고닫기
  const [newprofile, setnewprofile] = useState(false); //새로운 아이디 비밀번호 열고닫기
  const [changeprofile2, setchangeprofile2] = useState(false); //삭제창 전 인증 열고닫기
 
  const navigate = useNavigate();
  const handlepath = (path) => {
    navigate(path);
  };

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
    setUser1(prevUser => ({
      ...prevUser,                           // 기존 상태를 가져옴
      [e.target.name]: e.target.value        // e.target.name에 해당하는 속성을 e.target.value로 업데이트
      }));
  };

// 기존 비밀번호 확인 함수
const verifyPassword = async () => {
  try {
    const token = Cookies.get('token');
    const response = await axios.post(
      '/api/verify-password', // POST 요청
      { email: formData.email, password: user1.password }, // 서버로 전달할 데이터
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status === 200) {
      alert('비밀번호가 확인되었습니다.');
      // 비밀번호 확인 후 처리할 로직
    }
  } catch (error) {
    setShowDeleteConfirmation(false)
    setnewprofile(false)
    alert('비밀번호가 일치하지 않습니다.');
    
  }
};


const onClicker = () => {  // 아이디와 비밀번호를 각각 비교합니다.
  if (verifyPassword()) {
      
    setchangeprofile(false);
    setUser1({email:'', password:''});   
    setnewprofile(!newprofile);
} else {
    alert("아이디와 비밀번호가 일치하지 않습니다. 다시 입력해주세요");
    setUser1({email:'', password:''});   
    
}
};

const onClicker2 = () => {  // 삭제를위한 아이디와 비밀번호를 각각 비교합니다.
    
  if (verifyPassword()) {
      
      setchangeprofile2(false);
      setUser1({email:'', password:''});   
      setShowDeleteConfirmation(!showDeleteConfirmation);
  } else {
      alert("아이디와 비밀번호가 일치하지 않습니다. 다시 입력해주세요");
      setUser1({email:'', password:''});   
      setShowDeleteConfirmation(false)
  }
};

const handleBack = () => {

  navigate(-1); // 이전 페이지로 이동
}

const onCilckNewProfile = () => {  //비밀번호 변경
    
  if (user1.password !== user1.confirmPassword) {
    setError('비밀번호가 일치하지 않습니다');
    alert(error);
    return;
  }
  else
  {
    setSuccessMessage('회원정보가 성공적으로 수정되었습니다.')
    alert(successMessage);
  }
    setFormData(user1)      
    setnewprofile(false);
    setUser1({ email:'',password:''});
}
 //사용자 정보 변경 api
 const handleSubmit = async (e) => {
  e.preventDefault();
  const { email, password, confirmPassword, phone, nickname } = formData;
  const token = Cookies.get('token');

  if (password !== confirmPassword) {
    setError('비밀번호가 일치하지 않습니다');
    
    return;
  }

  try {
    const response = await axios.put( '/api/update-profile', {
       email, password, phone, nickname },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setSuccessMessage('회원정보가 성공적으로 수정되었습니다.');
    
  } catch (error) {
    setError('회원정보 수정 중 오류가 발생했습니다.');
    
  }
  
};
const deleteToken = () => {
  Cookies.remove('token');
  console.log('토큰이 삭제되었습니다.');
  alert("삭제되었습니다");
};

const onDelete = async () => {
 /*} try {
      const token = Cookies.get('token');
      await axios.post('/api/logout', {}, {
          headers: {
              Authorization: `Bearer ${token}`,
          },
      });
      
      deleteToken(); //토큰지우기
      navigate('/signin');
  } catch (error) {
      console.error('로그아웃 중 오류 발생:', error);
  }*/
      deleteToken(); //토큰지우기
      navigate('/signin');
};
  return (
    <>
      <Header />
      
      <form onSubmit={handleSubmit}>
      <div className="mypage-container">

      <div className="back-button-container" style={{ textAlign: "right", marginBottom: "10px", marginTop: "15px" }}>
                    <button className="button" onClick={handleBack}>뒤로가기</button>
                    </div>
        <h1>회원 정보 변경</h1>
        <div className="welcome-message">
          안녕하세요 {nickname} 님
          {console.log(formData.email)}
          {console.log(user1.password)}
        </div>
        <div className="button-group">
          <button onClick={handleClick} className="mypage-button">
            <FontAwesomeIcon icon={faUserEdit} /> 비밀번호 변경
          </button>
          <button onClick={handleClick2} className="mypage-button">
            <FontAwesomeIcon icon={faTrash} /> 아이디 삭제
          </button>
          <button onClick={()=>handlepath("../changeprofile")} className="mypage-button">
            <FontAwesomeIcon icon={faUser} /> 개인정보 변경
          </button>
        </div>

        {showDeleteConfirmation && (                // 삭제 창
          <div className="delete-confirmation">
            <h2>정말 삭제하시겠습니까?</h2>
            <button onClick={onDelete}>확인</button>
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
            <h2>바꿀 비밀번호와 확인을 입력해주세요</h2>
            <label>password : </label>
            <input type="text" 
            name="password" 
            value={user1.password}
            placeholder="패스워드 입력" 
            onChange={onChangeHandler}/>
            <br/>
            <label>password :</label>
            <input type="password" 
            name="confirmPassword"
            value={user1.confirmPassword}
            placeholder="패스워드 확인"
            onChange={onChangeHandler}/>
            <br/>
            <div className="button-container" style={{ textAlign: "center", marginTop: "20px" }}>
                    <button type="submit" className="button" onClick={onCilckNewProfile} >변경</button>
                </div> 
          </div>
        )}
        
      </div>   
      </form>
      <Footer />
    </>
  );
};

export default EditProfile;