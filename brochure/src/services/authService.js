/*
    작성자 : 김동규 - 2024-10-02 / 최초 작성
    설명 : 회원 가입 및 로그인 데이터 전달 받아 서버와 통신
*/
import axios from 'axios';

export const signUp = async (data) => {
  try {
    const response = await axios.post('http://localhost:5000/api/signup', data);
    return { success: true };
  } catch (error) {
    return { success: false, message: error.response ? error.response.data.message : error.message };
  }
};

export const signIn = async (data) => {
  try {
    const response = await axios.post('http://localhost:5000/api/signin', data);
    return { success: true, token: response.data.token };
  } catch (error) {
    return { success: false, message: error.response ? error.response.data.message : error.message };
  }
};
