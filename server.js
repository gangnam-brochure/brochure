app.post('/api/signup', async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // 사용자 데이터 처리 및 저장 로직
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = { email, password: hashedPassword };
  
      // 사용자 데이터 저장 후 JWT 토큰 생성
      const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: '1h' });
      res.json({ token });
    } catch (error) {
      console.error('회원가입 중 오류 발생:', error.message);
      res.status(500).json({ message: '서버 오류가 발생했습니다.' });
    }
  });