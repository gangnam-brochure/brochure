/*
    작성자 : 김동규 - 2024-10-02 / 최초 작성
    설명 : 회원가입 시스템 (이메일 앞부분, 도메인 선택 추가 및 직접 입력 기본 설정)
*/
import React, { useState, useEffect } from 'react';
import { signUp } from '../../services/authService';
import axios from 'axios';
import styles from '../../assets/css/signup.module.css'; 
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

  // 상태 초기화가 이 부분에 확실하게 정의되도록 합니다.
  const [error, setError] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    nickname: '',
    general: '',
  });

  const [isNicknameValid, setIsNicknameValid] = useState(false);
  const [isPhoneValid, setIsPhoneValid] = useState(false);  // 이 변수도 초기화됨
  const [isCheckingNickname, setIsCheckingNickname] = useState(false);
  const [isCheckingPhone, setIsCheckingPhone] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const [domainOption, setDomainOption] = useState('직접입력');

  // 각 입력 필드의 가시성 상태
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isNicknameVisible, setIsNicknameVisible] = useState(false);
  const [isPhoneVisible, setIsPhoneVisible] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);
  
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
  }, [formData.nickname]);

  // 전화번호 입력 시 중복 체크 호출
  useEffect(() => {
    if (formData.phone.length > 0) {
      checkPhoneAvailability(formData.phone);
    }
  }, [formData.phone]);

  // 입력 필드 유효성 검사
  useEffect(() => {
    const emailFull = `${formData.emailFront}@${formData.emailDomain}`;
    const isEmailValid = validateEmail(emailFull);
    setIsEmailValid(isEmailValid);

    if (isEmailValid) setIsNicknameVisible(true);  // 이메일 유효할 때 닉네임 필드 보이기
    if (isNicknameValid) setIsPhoneVisible(true);  // 닉네임 유효할 때 전화번호 필드 보이기
    if (isPhoneValid) setIsPasswordVisible(true);  // 전화번호 유효할 때 비밀번호 필드 보이기
    if (formData.password.length >= 6) setIsConfirmPasswordVisible(true);  // 비밀번호 유효할 때 비밀번호 확인 필드 보이기

    const isPasswordValid = formData.password.length >= 6;
    const isConfirmPasswordValid = formData.password === formData.confirmPassword;

    // 주의: isPhoneValid는 위에서 상태가 정의되어야만 참조 가능
    const isPhoneValidCheck = formData.phone.length >= 11 && isPhoneValid;

    setError((prev) => ({
      ...prev,
      email: isEmailValid ? '' : '올바른 이메일 형식을 입력하세요.',
      password: isPasswordValid ? '' : '비밀번호는 최소 6자 이상이어야 합니다.',
      confirmPassword: isConfirmPasswordValid ? '' : '비밀번호가 일치하지 않습니다.',
      phone: isPhoneValidCheck ? '' : '유효한 전화번호를 입력하세요.',
    }));

    setIsFormValid(isEmailValid && isPasswordValid && isConfirmPasswordValid && isPhoneValidCheck && isNicknameValid);
  }, [formData, isNicknameValid, isPhoneValid]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDomainChange = (e) => {
    const selectedDomain = e.target.value;
    setDomainOption(selectedDomain);
    if (selectedDomain !== '직접입력') {
      setFormData((prev) => ({ ...prev, emailDomain: selectedDomain }));
    } else {
      setFormData((prev) => ({ ...prev, emailDomain: '' }));
    }
  };

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
    <div className={styles.signupBody}>
    <div className={styles.signupContainer}>
      <div className={styles.signupLogo}>
        <h1>번호의 민족</h1>
        <button className={styles.backBtn2} onClick={() => navigate('/signin')}>
          돌아가기
        </button>
      </div>
      <form onSubmit={handleSubmit} className={styles.signupForm}>
        <h2>회원가입</h2>

        {/* 이메일 입력 */}
        <div className={`form-group ${error.email ? styles.errorMessage : ''}`}>
          <label>이메일 주소 입력</label>
          <div className={styles.emailInputWrapper}>
            <input
              type="text"
              name="emailFront"
              value={formData.emailFront}
              onChange={handleChange}
              placeholder="이메일"
              required
              className={styles.emailFrontInput}
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
              className={styles.emailDomainInput}
            />
            <select
              name="emailDomainSelect"
              value={domainOption}
              onChange={handleDomainChange}
              className={styles.emailDomainSelect}
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
          {error.email && <p className={styles.errorMessage}>{error.email}</p>}
        </div>

        {/* 닉네임 입력 (이메일이 유효할 때만 보임) */}
        {isNicknameVisible && (
          <div className={`form-group ${error.nickname ? styles.errorMessage : ''}`}>
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
            {error.nickname && <p className={styles.errorMessage}>{error.nickname}</p>}
          </div>
        )}

        {/* 전화번호 입력 (닉네임이 유효할 때만 보임) */}
        {isPhoneVisible && (
          <div className={`form-group ${error.phone ? styles.errorMessage : ''}`}>
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
            {error.phone && <p className={styles.errorMessage}>{error.phone}</p>}
          </div>
        )}

        {/* 비밀번호 입력 (전화번호가 유효할 때만 보임) */}
        {isPasswordVisible && (
          <div className={`form-group ${error.password ? styles.errorMessage : ''}`}>
            <label>비밀번호</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="비밀번호"
              required
            />
            {error.password && <p className={styles.errorMessage}>{error.password}</p>}
          </div>
        )}

        {/* 비밀번호 확인 (비밀번호가 유효할 때만 보임) */}
        {isConfirmPasswordVisible && (
          <div className={`form-group ${error.confirmPassword ? styles.errorMessage : ''}`}>
            <label>비밀번호 확인</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="비밀번호 확인"
              required
            />
            {error.confirmPassword && <p className={styles.errorMessage}>{error.confirmPassword}</p>}
          </div>
        )}

        <button type="submit" className={styles.signupBtn} disabled={!isFormValid}>
          회원가입
        </button>

        {error.general && <p className={styles.errorMessage}>{error.general}</p>}
      </form>
    </div>
    </div>
  );
};

export default SignUp;

   