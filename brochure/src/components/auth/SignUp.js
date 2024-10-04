/*
    작성자 : 김동규 - 2024-10-02 / 최초 작성
    설명 : 회원가입 시스템
*/
import React, { useState } from 'react';
import { signUp } from '../../services/authService';
import { useNavigate } from 'react-router-dom'; 

const SignUp = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate(); 

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await signUp(formData);
    if (response.success) {
      alert('회원가입 완료');
      navigate('/signin');
    } else {
      alert('회원가입 실패' + response.message);
      console.log('오류:', response.message);
      console.log('입력 이메일 및 비번 : ' + formData);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>회원가입</h2>
      <input type="email" name="email" placeholder="이메일" onChange={handleChange} />
      <input type="password" name="password" placeholder="비밀번호" onChange={handleChange} />
      <button type="submit">회원가입</button>
    </form>
  );
};

export default SignUp;