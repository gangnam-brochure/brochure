import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PrivateRoute from './routes/PrivateRoute';
import SocialLoginWrapper from './components/auth/SocialLogin';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import MainPage from './layout/MainPage';
import MyPage from './components/mypage/MyPage';
import LoginRedirectHandler from './components/auth/LoginRedirectHandler';  // 리다이렉트 핸들러
import Logout from './components/auth/Logout';
import FavoritePage from './layout/FavoritePage';
import PlaceTest from './components/favorites/PlaceTest';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />  {/* 메인 페이지와 리다이렉트 처리 */}
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />  {/* 로그인 페이지 */}
        <Route path= "/favorites" element={<FavoritePage/>}/>
        <Route path="/test" element={<PlaceTest/>}/>
        <Route path="/sociallogin" element={<SocialLoginWrapper />} />
        <Route path="/profile" element={<PrivateRoute />} />  {/* 프로필 페이지 */}
        <Route path="/mypage" element={<MyPage />} />  {/* 마이 페이지 */}
      </Routes>
    </Router>
  );
}

export default App;