/*
    작성자 : 김동규 - 2024-10-02 / 최초 작성
    설명 : 회원 가입 입력 데이터 전달 받아 서버와 통신
          로그아웃은 sessionStorage에서 토큰을 제거
*/

import axios from 'axios';

export const signUp = async (data) => {
  try {
    const response = await axios.post('/api/signup', data);
    return { success: true, token: response.data.token };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

export const signIn = async (data) => {
  try {
    const response = await axios.post('/api/signin', data);
    return { success: true, token: response.data.token };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

export const deleteAccount = async () => {
  try {
    await axios.delete('/api/delete');
    return { success: true };
  } catch (error) {
    return { success: false, message: error.message };
  }
};