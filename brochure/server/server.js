/*
    작성자 : 김동규 - 2024-10-07 / 최초 작성
    설명 : 회원가입 및 로그인 처리
*/

const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 5000;

// JSON 형식의 요청 본문을 처리하기 위해 body-parser 사용
app.use(bodyParser.json());
app.use(cors());

// 임시로 사용자 데이터를 저장할 메모리 데이터베이스
const users = [];

// 비밀키 (환경 변수로 설정하는 것이 좋습니다)
const JWT_SECRET = 'your_jwt_secret_key';

// 회원가입 API
app.post('/api/signup', async (req, res) => {
  const { email, password } = req.body;

  // 이메일 중복 확인
  const userExists = users.find((user) => user.email === email);
  if (userExists) {
    return res.status(400).json({ message: '이미 등록된 이메일입니다.' });
  }

  // 비밀번호 해시화 (암호화)
  const hashedPassword = await bcrypt.hash(password, 10);

  // 새 유저 추가
  users.push({ email, password: hashedPassword });

  return res.status(201).json({ message: '회원가입이 완료되었습니다.' });
});

// 로그인 API
app.post('/api/signin', async (req, res) => {
  const { email, password } = req.body;

  // 사용자 확인
  const user = users.find((user) => user.email === email);
  if (!user) {
    return res.status(400).json({ message: '이메일 또는 비밀번호가 잘못되었습니다.' });
  }

  // 비밀번호 일치 여부 확인
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(400).json({ message: '이메일 또는 비밀번호가 잘못되었습니다.' });
  }

  // JWT 토큰 발급
  const token = jwt.sign({ email: user.email }, JWT_SECRET, { expiresIn: '1h' });

  return res.json({ token });
});

// 서버 실행
app.listen(port, () => {
  console.log(`서버가 http://localhost:${port} 에서 실행 중입니다.`);
});
