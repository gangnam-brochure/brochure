
import Footer from "../Footer";
import Header from "../Header";
import { Navigate, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const Myprofile = () => {
    const [formData,setFormData] = useState({
        email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    nickname: '',
    food:'',
    gender:'',
    confirmPassword : ''
    });

    const [nickname,setNickname] = useState("");

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
          gender:response.data.gender,
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
    const { email, password, confirmPassword, phone, nickname,food,gender } = formData;
    const token = Cookies.get('token');
        console.log(password);
    if (password !== confirmPassword) {
      setError('비밀번호가 일치하지 않습니다.');
      return;
    }

    try {
      const response = await axios.put( '/api/update-profile', {
         email, password, phone, nickname, food,gender},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSuccessMessage('회원정보가 성공적으로 수정되었습니다.');
      setError('');
    } catch (error) {
      setError('회원정보 수정 중 오류가 발생했습니다.');
    }
  };




    return (
        <>
        <Header/>
        <form onSubmit={handleSubmit}>
      <div className="mypage-container">
      <div className="back-button-container" style={{ textAlign: "right", marginBottom: "10px", marginTop: "15px" }}>
                    <button className="button" onClick={handleBack}>뒤로가기</button>
                </div>
                {console.log(formData.email)}
                {console.log(formData.password)}
                {console.log("gender :" + formData.gender)}
        <h1>안녕하세요</h1>
        
        <div className="welcome-message">
            {formData.nickname}님! 안녕하세요
        </div>
        <label className="label">이메일 : {formData.email}</label>      
            <br/>
        <label className="label">닉네임 : {formData.nickname}</label>      
            <br/>
            <label className="label" for="gender">성별:{formData.gender}</label>
            <br/>           
            <label className="label">전화번호 :{formData.phone} </label>
            
            <br/>
            <label className="label">좋아하는 음식 : {formData.food} </label>

            <br/>
            
            {/* 버튼을 모든 입력 필드 아래에 위치시킴 */}
                       
      </div>
      <div className="button-container" style={{ textAlign: "center", marginTop: "20px" }}>
                    <button type="submit" className="button" onClick={handleBack} >확인</button>
                </div> 
    </form>
      <Footer/>
        </>
    )
}
export default Myprofile;