/*
    작성자 : 김동규 - 2024-10-02 / 최초 작성
    설명 : 백엔드 로직
*/

const express = require('express');
const axios = require('axios');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET;

app.use(bodyParser.json());
app.use(cors());

// 카카오 OAuth 콜백 처리
app.get('/oauth/kakao/callback', async (req, res) => {
  const { code } = req.query;

  if (!code) {
    return res.status(400).json({ message: '카카오로부터 code를 받지 못했습니다.' });
  }

  console.log('카카오로부터 받은 인증 코드:', code);  // 인증 코드가 잘 넘어오는지 확인

  try {
    const response = await axios.post('https://kauth.kakao.com/oauth/token', null, {
      params: {
        grant_type: 'authorization_code',
        client_id: process.env.REACT_APP_KAKAO_CLIENT_ID,  // REST API 키 사용
        redirect_uri: 'http://localhost:5000/oauth/kakao/callback',  // 서버의 리다이렉트 URI
        code: code,  // 받은 인증 코드
      },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    const { access_token } = response.data;
    console.log('카카오로부터 받은 access_token:', access_token);  // 액세스 토큰 확인

    // 프론트엔드로 리다이렉트하면서 토큰 전달
    res.redirect(`http://localhost:3000/oauth/kakao/callback?token=${access_token}`);
  } catch (error) {
    console.error('카카오 API 요청 실패:', error.response ? error.response.data : error.message);
    res.status(500).json({ message: '카카오 API 요청 실패', error: error.response ? error.response.data : error.message });
  }
});

// 네이버 OAuth 콜백 처리
app.get('/oauth/naver/callback', async (req, res) => {
  const { code, state } = req.query;

  try {
    const response = await axios.post('https://nid.naver.com/oauth2.0/token', null, {
      params: {
        grant_type: 'authorization_code',
        client_id: process.env.REACT_APP_NAVER_CLIENT_ID,
        client_secret: process.env.REACT_APP_NAVER_CLIENT_SECRET,
        redirect_uri: 'http://localhost:3000/oauth/naver/callback',
        code: code,
        state: state,
      },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    const { access_token } = response.data;

    // 프론트엔드로 리다이렉트하면서 토큰 전달
    res.redirect(`http://localhost:3000/oauth/naver/callback?token=${access_token}`);
  } catch (error) {
    console.error('네이버 로그인 처리 중 에러 발생:', error);
    res.status(500).json({ message: '네이버 로그인 처리 중 에러가 발생했습니다.' });
  }
});

// Mock 데이터베이스 (간단한 메모리 데이터)
const users = [];

// 회원가입 API
app.post('/api/signup', async (req, res) => {
  try {
    const { email, password } = req.body;

    const userExists = users.find(user => user.email === email);
    if (userExists) {
      return res.status(400).json({ message: '이미 존재하는 이메일입니다.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = { email, password: hashedPassword };
    users.push(newUser);

    const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: '1h' });

    res.json({ token });
  } catch (error) {
    console.error('회원가입 중 에러 발생:', error.message);
    res.status(500).json({ message: '서버 오류가 발생했습니다.' });
  }
});

// 로그인 API
app.post('/api/signin', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = users.find(user => user.email === email);
    if (!user) {
      return res.status(400).json({ message: '이메일 또는 비밀번호가 잘못되었습니다.' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: '이메일 또는 비밀번호가 잘못되었습니다.' });
    }

    const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: '1h' });

    res.json({ token });
  } catch (error) {
    console.error('로그인 중 에러 발생:', error.message);
    res.status(500).json({ message: '서버 오류가 발생했습니다.' });
  }
});

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true  // 클라이언트와 서버 간의 쿠키 교환 허용
}));

// 정적 파일 서빙 경로를 brochure/public 설정
app.use(express.static(path.join(__dirname, '/build')));

// 모든 나머지 요청을 React 앱의 index.html로 라우팅
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build', 'index.html'));
});

// 서버 실행
app.listen(PORT, () => {
  console.log(`서버가 http://localhost:${PORT} 에서 실행 중입니다.`);
});