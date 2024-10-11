
import Footer from "../Footer";
import Header from "../Header";
import { Navigate, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const ChangeProfile = () => {
    const [formData,setFormData] = useState({
        email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    nickname: '',
    food:'',
    gender:'male',
    confirmPassword : ''
    });

    const [nickname,setNickname] = useState("");
    const [Nav,SetNav] = useState(0);
    const [error, setError] = useState('');
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
          password: '',
          confirmPassword: '',
          food:response.data.food,
          gender: response.data.gender || 'male'
        });
      } catch (error) {
        console.error('프로필 로드 중 오류 발생:', error);
      }
    };

    fetchProfile();

   
  }, []); 

  useEffect(() => {

    setNickname(formData.nickname);

  },[nickname]);


    
    const navigate = useNavigate(); // useNavigate 훅 사용

      
    const onChangeHandler = (e) =>
    {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }


const handleBack = () => {

    navigate(-1); // 이전 페이지로 이동
}

const handleSubmit = async (e) => {
    e.preventDefault(); // 새로고침 방지?
    const { email, password, confirmPassword, phone, nickname, food ,gender } = formData;
    const token = Cookies.get('token');
        console.log(password);
        console.log("gender : " + gender);
    if (password !== confirmPassword) {
      setError('비밀번호가 일치하지 않습니다.');
      return;
    }

    try {
      const response = await axios.put( '/api/update-profile', {
         email, password, phone, nickname, food , gender},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      navigate("../mypage");
      setSuccessMessage('회원정보가 성공적으로 수정되었습니다.');
      setError('');
    // 알림창 띄우기
       alert('회원정보가 성공적으로 변경되었습니다.');

       // 페이지 이동
       

    } catch (error) {
      setError('회원정보 수정 중 오류가 발생했습니다.');
      alert(error);
    }
    
  };

const onClickChange = () => {
  alert("변경됨");
  navigate("../mypage");

}

useEffect(() => {
  // Fade-in 효과
  const fadeInElement = document.querySelector('.title');
  fadeInElement.classList.add('visible');

  const letters = document.querySelectorAll('.title span');
  letters.forEach((letter, index) => {
    setTimeout(() => {
      letter.style.opacity = '1';
      letter.style.transform = 'translateY(0)';
    }, index * 100);
  });
}, []);



    return (
        <>
        <Header/>
        
        <form onSubmit={handleSubmit}>
      <div className="mypage-container">
      <div>
      <div className="back-button-container" style={{ textAlign: "right", marginBottom: "10px", marginTop: "15px" }}>
                    <button type="button" className="button" onClick={handleBack}>뒤로가기</button>
                </div>
                </div>
                {console.log(formData.email)}
                {console.log(formData.password)}
                
                <h1 className="title">
            {Array.from("회원 정보 변경").map((letter, index) => (
              <span key={index}>{letter}</span>
            ))}
          </h1>
        
        <div className="welcome-message">
            정보를 변경하거나 수정해주세요!
        </div>
        <label className="label">닉네임 : </label>
            <input type="text" 
            name="nickname" 
            placeholder="nickname" 
            //value={formData.nickname}
            className="input-field" 
            onChange={onChangeHandler}/>
            
            <br/>
            <label className="label" htmlFor="gender">성별:</label>
            <select id="gender" name="gender" value={formData.gender} onChange={onChangeHandler}>
                <option value="male">남성</option>
                <option value="female">여성</option>
                <option value="other">기타</option>
            </select>
            <br />
            {console.log('선택된 성별:', formData.gender)}
            <label className="label">전화번호 : </label>
            <input type="text" 
            name="phone" 
            placeholder="전화번호" 
            //value={formData.phone}
            className="input-field" 
            onChange={onChangeHandler}/>
            
            <br/>
            {/*<label className="label">좋아하는 음식 : </label>
            <input type="text" 
            name="food" 
            placeholder="좋아하는 음식" 
            value={formData.food}
            className="input-field" 
            onChange={onChangeHandler}/>

<br/>
            <label className="label">비밀번호 : </label>
            <input type="password" 
            name="password" 
            placeholder="비밀번호" 
            value={formData.password}
            className="input-field" 
            onChange={onChangeHandler}/>

         <label  className="label">비밀번호 확인</label>
          <input
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={onChangeHandler}
          className="input-field" 
          placeholder="비밀번호"
        />*/}
            {/* 버튼을 모든 입력 필드 아래에 위치시킴 */}
            <div className="button-container" style={{ textAlign: "center", marginTop: "20px" }}>
                    <button type="submit" className="button" >변경</button>
                </div>         
      </div>
      
    </form>
      <Footer/>
        </>
    )
}
export default ChangeProfile;