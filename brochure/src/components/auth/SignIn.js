/*
    작성자 : 김동규 - 2024-10-02 / 최초 작성
    설명 : 입력된 회원 정보를 외부 서비스로 보내고 성공 시 sessionStorage에 토큰을 저장
*/
import React, { useState } from 'react';
import { signIn } from '../../services/authService';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import SocialLoginWrapper from './SocialLogin';
import '../../assets/css/signin.css';

const SignIn = () => {
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
    const response = await signIn(formData);
    if (response.success) {
      Cookies.set('token', response.token);
      // 사용자의 이름을 이메일 앞부분으로 설정
      const userName = formData.email.split('@')[0];
      alert(`환영합니다, ${userName}님!`);
      navigate('/');  // 로그인 성공 시 메인 페이지로 이동
    } else {
      alert('로그인 실패: ' + response.message);
    }
  };

  return (
    <div className="signin-container">
      <form onSubmit={handleSubmit} className="signin-form">
        <h2>로그인</h2>
        <input
          type="email"
          name="email"
          placeholder="이메일"
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="비밀번호"
          onChange={handleChange}
          required
        />
        <button type="submit">로그인</button>
      </form>

      {/* 소셜 로그인 섹션 */}
      <div className="social-login-section">
        <h3>소셜 로그인</h3>
        <SocialLoginWrapper />
      </div>

      <div className="signup-link">
        <p>회원이 아니신가요? <a href="/signup">회원가입</a></p>
      </div>
    </div>
  );
};

export default SignIn;
