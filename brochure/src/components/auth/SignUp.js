/*
    작성자 : 김동규 - 2024-10-02 / 최초 작성
    설명 : 회원가입 시스템 (이메일 앞부분, 도메인 선택 추가 및 직접 입력 기본 설정)
*/
import React, { useState, useEffect } from 'react';
import { signUp } from '../../services/authService';  // authService.js에서 가져옴
import '../../assets/css/signup.css';  // 스타일링을 위해 CSS 파일 연결
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const SignUp = () => {
  const [formData, setFormData] = useState({
    emailFront: '',
    emailDomain: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    general: '',
  });
  const [isFormValid, setIsFormValid] = useState(false);
  const [domainOption, setDomainOption] = useState('직접입력');
  const navigate = useNavigate();

  // 이메일 유효성 검사
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // 비밀번호와 비밀번호 확인 검사
  useEffect(() => {
    const isEmailValid = validateEmail(`${formData.emailFront}@${formData.emailDomain}`);
    const isPasswordValid = formData.password.length >= 6;
    const isConfirmPasswordValid = formData.password === formData.confirmPassword;

    if (!isEmailValid) {
      setError((prev) => ({ ...prev, email: '올바른 이메일 형식을 입력하세요.' }));
    } else {
      setError((prev) => ({ ...prev, email: '' }));
    }

    if (!isPasswordValid) {
      setError((prev) => ({ ...prev, password: '비밀번호는 최소 6자 이상이어야 합니다.' }));
    } else {
      setError((prev) => ({ ...prev, password: '' }));
    }

    if (!isConfirmPasswordValid) {
      setError((prev) => ({ ...prev, confirmPassword: '비밀번호가 일치하지 않습니다.' }));
    } else {
      setError((prev) => ({ ...prev, confirmPassword: '' }));
    }

    setIsFormValid(isEmailValid && isPasswordValid && isConfirmPasswordValid);
  }, [formData]);

  // 입력값 변경 처리
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // 셀렉트 박스 변경 시 도메인 자동 입력
  const handleDomainChange = (e) => {
    const selectedDomain = e.target.value;
    setDomainOption(selectedDomain);
    if (selectedDomain !== '직접입력') {
      setFormData((prev) => ({ ...prev, emailDomain: selectedDomain }));
    } else {
      setFormData((prev) => ({ ...prev, emailDomain: '' }));
    }
  };

  // 회원가입 폼 제출
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid) {
      alert('모든 항목을 올바르게 입력해주세요.');
      return;
    }

    const fullEmail = `${formData.emailFront}@${formData.emailDomain}`;
    const result = await signUp({ email: fullEmail, password: formData.password });
    if (result.success) {
      Cookies.set('token', result.token, { expires: 1, path: '/', sameSite: 'Lax' });
      alert('회원가입이 완료되었습니다.');
      navigate('/SignIn');
    } else {
      setError((prev) => ({ ...prev, general: '회원가입에 실패했습니다.' }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="signup-form">
      <h2>이메일로 회원가입</h2>

      {/* 이메일 입력 */}
      <div className={`form-group ${error.email ? 'error' : ''}`}>
        <label>이메일 주소 입력</label>
        <div className="email-input-wrapper">
          <input
            type="text"
            name="emailFront"
            value={formData.emailFront}
            onChange={handleChange}
            placeholder="이메일"
            required
            className="email-front-input"
          />
          <span>@</span>
          <input
            type="text"
            name="emailDomain"
            value={formData.emailDomain}
            onChange={handleChange}
            disabled={domainOption !== '직접입력'}
            placeholder="도메인"
            required
            className="email-domain-input"
          />
          <select
            name="emailDomainSelect"
            value={domainOption}
            onChange={handleDomainChange}
            className="email-domain-select"
          >
            <option value="직접입력">직접입력</option>
            <option value="naver.com">naver.com</option>
            <option value="daum.net">daum.net</option>
            <option value="gmail.com">gmail.com</option>
            <option value="yahoo.com">yahoo.com</option>
          </select>
        </div>
        {error.email && <p className="error-message">{error.email}</p>}
      </div>

      {/* 비밀번호 입력 */}
      <div className={`form-group ${error.password ? 'error' : ''}`}>
        <label>비밀번호 (영문, 숫자, 특수문자)</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="비밀번호"
          required
        />
        {error.password && <p className="error-message">{error.password}</p>}
      </div>

      {/* 비밀번호 확인 */}
      <div className={`form-group ${error.confirmPassword ? 'error' : ''}`}>
        <label>비밀번호 확인</label>
        <input
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          placeholder="비밀번호 확인"
          required
        />
        {error.confirmPassword && <p className="error-message">{error.confirmPassword}</p>}
      </div>

      {/* 회원가입 버튼 */}
      <button type="submit" className="signup-button" disabled={!isFormValid}>
        회원가입
      </button>

      {error.general && <p className="error-message">{error.general}</p>}
    </form>
  );
};

export default SignUp;