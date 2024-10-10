/*
    작성자 : 김동규 - 2024-10-07 / 최초 작성
    설명 : 회원가입 및 로그인 처리
*/

const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const cors = require('cors');
const { computeHeadingLevel } = require('@testing-library/react');
const { default: axios } = require('axios');

const app = express();
const PORT = process.env.PORT || 5000;

// JSON 형식의 요청 본문을 처리하기 위해 body-parser 사용
app.use(bodyParser.json());
app.use(cors());

// 임시로 사용자 데이터를 저장할 메모리 데이터베이스
const users = [
  // 기존에 사용자를 저장하는 예시
  { email: 'zzsehdrb@gmail.com', nickname: 'zzsehdrb', phone: '01012345678', gender: 'male' },
  {email: 'zzsehdrb@naver.com', nickname: '유니클롭', phone: '01012345679', gender: 'male'},
  {email: 'kakao_3732335934@kakao.com', nickname: '김동규', phone: '01012345677', gender: 'male'}
];


// 예시로 사용할 데이터베이스(배열)
let existingNicknames = ['user123', 'testNick', 'admin']; // 이미 사용 중인 닉네임 샘플 목록
let existingPhone = [];

// 비밀키
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';

// 회원가입 API
app.post('/api/signup', async (req, res) => {
  const { email, password, phone, nickname } = req.body;

  // 이메일 중복 확인
  const userExists = users.find((user) => user.email === email);
  if (userExists) {
    return res.status(400).json({ message: '이미 등록된 이메일입니다.' });
  }

  // 닉네임 중복 확인
  if (nickname && existingNicknames.includes(nickname)) {
    return res.status(400).json({ message: '이미 사용 중인 닉네임입니다.' });
  }

  // 전화번호 중복 확인
  if (phone && existingPhone.includes(phone)) {
    return res.status(400).json({ message: '이미 사용 중인 전화번호입니다.' });
  }

  // 비밀번호 해시화 (암호화)
  const hashedPassword = await bcrypt.hash(password, 10);

  // 새 유저 추가 (닉네임이 선택사항이므로 nickname 필드는 선택적으로 추가)
  users.push({ email, password: hashedPassword, phone, nickname: nickname || null,});

  // 닉네임을 사용 중인 목록에 추가
  if (nickname) {
    existingNicknames.push(nickname);
  }

  // 전화번호를 사용중인 목록에 추가
  if (phone) {
    existingPhone.push(phone);
  }

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
  const token = jwt.sign({ email: user.email, nickname: user.nickname }, JWT_SECRET, { expiresIn: '1h' });

  return res.json({ token });
});

// 닉네임 중복 체크 API
app.post('/api/check-nickname', (req, res) => {
  const { nickname } = req.body;

  if (!nickname || nickname.length > 10) {
    return res.status(400).json({ isAvailable: false, message: '닉네임은 10자 이하여야 합니다.' });
  }

  const isAvailable = !existingNicknames.includes(nickname);
  return res.status(200).json({ isAvailable });
});

// 전화번호 중복 체크 API
app.post('/api/check-phone', (req, res) => {
  const { phone } = req.body;

  if (!phone || phone.length > 11) {
    return res.status(400).json({ isAvailable: false, message: '전화번호 형식이 올바르지 않습니다.' });
  }

  const isAvailable = !existingPhone.includes(phone);
  return res.status(200).json({ isAvailable });
});

  // 회원정보 조회 API (JWT를 기반으로 사용자 정보 반환)
app.get('/api/get-profile', (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];

    console.log('/api/get-profile 요청됨');
    console.log('받은 토큰 : ' + token);
  
    if (!token) {
      return res.status(401).json({ message: '인증이 필요합니다.' });
    }
  
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      const user = users.find((user) => user.email === decoded.email);

      console.log('디코딩된 토큰 정보:', decoded);
      
      if (!user) {
        return res.status(404).json({ message: '사용자를 찾을 수 없습니다.' });
      }
  
      return res.json({ email: user.email, nickname: user.nickname, phone: user.phone, gender:user.gender });
    } catch (error) {
      console.error('JWT 검증 중 오류 발생:', error);
      return res.status(400).json({ message: '회원정보를 불러오는 중 오류가 발생했습니다.' });
    }
  });

  // 회원정보 수정 API
app.put('/api/update-profile', async (req, res) => {
    const { email, password, phone, nickname, gender } = req.body;
    const token = req.headers.authorization?.split(' ')[1];
  
    if (!token) {
      return res.status(401).json({ message: '인증이 필요합니다.' });
    }
  
    try {
      // JWT 토큰을 이용해 사용자 이메일을 추출
      const decoded = jwt.verify(token, JWT_SECRET);
      const userEmail = decoded.email;
  
      // 사용자 정보 찾기
      const user = users.find((user) => user.email === userEmail);
      if (!user) {
        return res.status(404).json({ message: '사용자를 찾을 수 없습니다.' });
      }
  
      // 비밀번호가 변경되었을 때만 해시화 (없을 시 유지)
      if (password) {
        user.password = await bcrypt.hash(password, 10);
      }

      
  
      // 닉네임 변경 시 중복 확인
      if (nickname && existingNicknames.includes(nickname) && user.nickname !== nickname) {
        return res.status(400).json({ message: '이미 사용 중인 닉네임입니다.' });
      } else if (nickname) {
        // 닉네임 목록에서 이전 닉네임 제거 후 새로운 닉네임 추가
        existingNicknames = existingNicknames.filter((name) => name !== user.nickname);
        existingNicknames.push(nickname);
        user.nickname = nickname;
      }
  
      // 전화번호 변경
      if (phone) {
        user.phone = phone;
      }

      // 성별 변경
      if(gender) {
          user.gender = gender;
      }

      return res.status(200).json({ message: '회원정보가 성공적으로 변경되었습니다.' });
    } catch (error) {  
      return res.status(400).json({ message: '회원정보 수정 중 오류가 발생했습니다.', error });
    }
  });

  // 기존 비밀번호 확인 API
app.post('/api/verify-password', async (req, res) => {
  console.log('POST /api/verify-password 요청 수신');

  const { email, password } = req.body;
  const token = req.headers.authorization?.split(' ')[1];

  console.log("password : " + password);

  if (!token) {
    return res.status(401).json({ message: '인증이 필요합니다.' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const userEmail = decoded.email;

    // 사용자 정보 찾기
    const user = users.find((user) => user.email === userEmail);
    if (!user) {
      return res.status(404).json({ message: '사용자를 찾을 수 없습니다.' });
    }

    // 입력된 비밀번호가 해시화된 비밀번호와 일치하는지 확인
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: '아이디와 비밀번호가 일치하지 않습니다.' });
    }

    console.log("해시화된 비번 user.password : " + user.password);

    return res.status(200).json({ message: '비밀번호가 확인되었습니다.' });
  } catch (error) {
    console.error('비밀번호 확인 중 오류 발생:', error);
    return res.status(400).json({ message: '비밀번호 확인 중 오류가 발생했습니다.', error });
  }
});


// JWT 생성 함수
const createJWT = (email, nickname) => {
  return jwt.sign({ email, nickname }, JWT_SECRET, { expiresIn: '1h' });
};

// 네이버 로그인 후 JWT 발급
app.post('/api/naver-login', (req, res) => {
  const { email, nickname } = req.body;

  if (!email || !nickname) {
    return res.status(400).json({ message: '이메일과 닉네임은 필수입니다.' });
  }

  // JWT 생성
  const token = jwt.sign({ email, nickname }, JWT_SECRET, { expiresIn: '1h' });

  // 클라이언트에 JWT 토큰 반환
  return res.status(200).json({ token });
});

// 닉네임 설정 API
app.post('/api/set-nickname', (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  console.log('받은 토큰:', token);

  if (!token) {
    return res.status(401).json({ message: '인증 토큰이 필요합니다.' });
  }

  const { nickname } = req.body;

  if (!nickname) {
    return res.status(400).json({ message: '닉네임은 필수입니다.' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET); // 서버에서 생성한 JWT 검증
    console.log('디코딩된 토큰:', decoded);

    const user = users.find(user => user.email === decoded.email);

    if (!user) {
      return res.status(404).json({ message: '사용자를 찾을 수 없습니다.' });
    }

    user.nickname = nickname;
    return res.status(200).json({ message: '닉네임이 설정되었습니다.', nickname });
  } catch (error) {
    console.error('JWT 검증 중 오류 발생:', error);
    return res.status(500).json({ message: '닉네임 설정 중 오류가 발생했습니다.', error: error.message });
  }
});

// 네이버 프로필 API 프록시
app.get('/api/naver-profile', async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1]; // Authorization 헤더에서 토큰 추출
  if (!token) {
    return res.status(401).json({ message: '인증 토큰이 필요합니다.' });
  }

  try {
    const naverProfileUrl = 'https://openapi.naver.com/v1/nid/me';
    const profileResponse = await axios.get(naverProfileUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const profileData = profileResponse.data.response;

    if (!profileData.email || !profileData.nickname) {
      return res.status(400).json({ message: '네이버 로그인 정보에 이메일과 닉네임이 없습니다.' });
    }

    res.json({ email: profileData.email, nickname: profileData.nickname });
  } catch (error) {
    console.error('네이버 프로필 로드 중 오류 발생:', error);
    res.status(500).json({ message: '네이버 프로필 로드 중 오류 발생', error: error.message });
  }
});


  // 전체 라우팅 하단에 에러 핸들러 추가
app.use((err, req, res, next) => {
  console.error(err.stack); // 에러 로그를 서버 콘솔에 출력
  res.status(500).json({ message: '서버 내부 오류가 발생했습니다.', error: err.message }); // JSON 형식의 에러 메시지 반환
});


// 서버 포트 설정
app.listen(PORT, () => {
  console.log(`서버가 http://localhost:${PORT} 에서 실행 중입니다.`);
});
