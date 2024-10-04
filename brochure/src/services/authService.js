/*
    작성자 : 김동규 - 2024-10-02 / 최초 작성
    설명 : 회원 가입 및 로그인 데이터 전달 받아 서버와 통신
*/

export const signUp = async (data) => {
  try {
    // const response = await axios.post('/api/signup', data);

    // 임시로 성공한 응답을 Mock으로 만들어서 반환
    return { success: true, token: 'mock-token-for-testing' };
  } catch (error) {
    return { success: false, message: error.response ? error.response.data.message : error.message };
  }
};

export const signIn = async (data) => {
  try {
    // const response = await axios.post('/api/signin', data);
    return { success: true, token: 'mock-token-for-testing' }; // Mock 응답
  } catch (error) {
    return { success: false, message: error.response ? error.response.data.message : error.message };
  }
};
