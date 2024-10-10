/*
    작성자 : 김동규 - 2024-10-02 / 최초 작성
    설명 : 회원가입 시스템 (이메일 앞부분, 도메인 선택 추가 및 직접 입력 기본 설정)
*/
import React, { useState, useEffect } from 'react';
import { signUp } from '../../services/authService';
import axios from 'axios';
import '../../assets/css/signup.css'; 
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const SignUp = () => {
  const [formData, setFormData] = useState({
    emailFront: '',
    emailDomain: '',
    password: '',
    confirmPassword: '',
    phone: '',
    nickname: '',
  });
  
  const [error, setError] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    nickname: '',
    general: '',
  });
  
  const [isNicknameValid, setIsNicknameValid] = useState(false); // 닉네임 유효성 체크
  const [isPhoneValid, setIsPhoneValid] = useState(false); // 전화번호 유효성 체크
  const [isCheckingNickname, setIsCheckingNickname] = useState(false); // 닉네임 체크 중
  const [isCheckingPhone, setIsCheckingPhone] = useState(false); // 전화번호 체크 중
  const [isFormValid, setIsFormValid] = useState(false);
  const [domainOption, setDomainOption] = useState('직접입력');
  const navigate = useNavigate();

  // 이메일 유효성 검사
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // 닉네임 중복 체크 함수
  const checkNicknameAvailability = async (nickname) => {
    setIsCheckingNickname(true);
    try {
      const response = await axios.post('http://localhost:5000/api/check-nickname', { nickname });
      setIsNicknameValid(response.data.isAvailable);
      if (!response.data.isAvailable) {
        setError((prev) => ({ ...prev, nickname: '이미 사용 중인 닉네임입니다.' }));
      } else if (nickname.length >= 10) {
        setError((prev) => ({ ...prev, nickname: '닉네임은 10자 이하여야 합니다.' }));
        setIsNicknameValid(false);
      } else {
        setError((prev) => ({ ...prev, nickname: '' }));
      }
    } catch (error) {
      setError((prev) => ({ ...prev, nickname: '닉네임 중복 체크 중 오류가 발생했습니다.' }));
    } finally {
      setIsCheckingNickname(false);
    }
  };

    // 전화번호 중복 체크 함수
    const checkPhoneAvailability = async (phone) => {
      setIsCheckingPhone(true);
      try {
        const response = await axios.post('http://localhost:5000/api/check-phone', { phone });
        setIsPhoneValid(response.data.isAvailable);
        if (!response.data.isAvailable) {
          setError((prev) => ({ ...prev, phone: '이미 사용 중인 번호입니다.' }));
        } else if (phone.length > 11) {
          setError((prev) => ({ ...prev, phone: '번호 형식이 올바르지 않습니다.' }));
          setIsPhoneValid(false);
        } else {
          setError((prev) => ({ ...prev, phone: '' }));
        }
      } catch (error) {
        setError((prev) => ({ ...prev, phone: '전화번호 중복 체크 중 오류가 발생했습니다.' }));
      } finally {
        setIsCheckingPhone(false);
      }
    };

  // 닉네임 입력 시 중복 체크 호출
  useEffect(() => {
    if (formData.nickname.length > 0) {
      checkNicknameAvailability(formData.nickname);
    }
    if (formData.phone.length > 0) {
      checkPhoneAvailability(formData.phone);
    }
  }, [formData.nickname, formData.phone]);

  // 비밀번호, 전화번호 유효성 및 확인 검사
  useEffect(() => {
    const isEmailValid = validateEmail(`${formData.emailFront}@${formData.emailDomain}`);
    const isPasswordValid = formData.password.length >= 6;
    const isConfirmPasswordValid = formData.password === formData.confirmPassword;
    const isPhoneValid = formData.phone.length >= 11;  // 전화번호는 최소 11자리로 설정

    setError((prev) => ({
      ...prev,
      email: isEmailValid ? '' : '올바른 이메일 형식을 입력하세요.',
      password: isPasswordValid ? '' : '비밀번호는 최소 6자 이상이어야 합니다.',
      confirmPassword: isConfirmPasswordValid ? '' : '비밀번호가 일치하지 않습니다.',
      phone: isPhoneValid ? '' : '유효한 전화번호를 입력하세요.',
    }));

    setIsFormValid(isEmailValid && isPasswordValid && isConfirmPasswordValid && isPhoneValid && isNicknameValid);
  }, [formData, isNicknameValid, isPhoneValid]);

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
    if (!isFormValid || !isNicknameValid || !isPhoneValid) {
      alert('모든 항목을 올바르게 입력해주세요.');
      return;
    }

    const fullEmail = `${formData.emailFront}@${formData.emailDomain}`;
    const result = await signUp({
      email: fullEmail,
      password: formData.password,
      phone: formData.phone,
      nickname: formData.nickname,
    });

    if (result.success) {
      Cookies.set('token', result.token, { expires: 1, path: '/', sameSite: 'Lax' });
      alert('회원가입이 완료되었습니다.');
      navigate('/SignIn');
    } else {
      setError((prev) => ({ ...prev, general: '회원가입에 실패했습니다.' }));
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-logo">
        <h1>번호의 민족</h1>
        <button 
          className="back-btn"
          onClick={() => navigate('/signin')}  // 클릭 시 메인 페이지로 이동
        >
          돌아가기
        </button>
      </div>
      <form onSubmit={handleSubmit} className="signup-form">
        <h2>회원가입</h2>

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
              <option value="nate.com">nate.com</option>
              <option value="yahoo.com">yahoo.com</option>
              <option value="hanmail.net">hanmail.net</option>
            </select>
          </div>
          {error.email && <p className="error-message">{error.email}</p>}
        </div>

        {/* 닉네임 입력 */}
        <div className={`form-group ${error.nickname ? 'error' : ''}`}>
          <label>닉네임</label>
          <br />
          <input
            type="text"
            name="nickname"
            value={formData.nickname}
            onChange={handleChange}
            placeholder="닉네임"
          />
          {isCheckingNickname && <p>닉네임 확인 중...</p>}
          {error.nickname && <p className="error-message">{error.nickname}</p>}
        </div>

        {/* 전화번호 입력 */}
        <div className={`form-group ${error.phone ? 'error' : ''}`}>
          <label>전화번호</label>
          <br />
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="전화번호"
            required
          />
          {isCheckingPhone && <p>전화번호 확인 중...</p>}
          {error.phone && <p className="error-message">{error.phone}</p>}
        </div>

        {/* 비밀번호 입력 */}
        <div className={`form-group ${error.password ? 'error' : ''}`}>
          <label>비밀번호</label>
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

        <button type="submit" className="signup-btn" disabled={!isFormValid}>
          회원가입
        </button>

        {error.general && <p className="error-message">{error.general}</p>}
      </form>
    </div>
  );
};

export default SignUp;
   