import React, { useState } from 'react';
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
import PlaceDetail from './components/placelist/PlaceDetail';
import PlaceListNearby from './components/placelist/PlaceListNearby';
import ReviewPage from './layout/ReviewPage';
import ReviewBoard from './components/reviews/ReViewBoard';
import EditProfile from './components/EditProfile/editprofile';
import Categories from './components/Categories';
// import './assets/css/tailwind.css';     // 반응형 패키지

function App() {
  const [data, setData] = useState([{}]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />}>
          <Route index  element={<Categories />}/>
          <Route path=":categoryCode" element={<PlaceListNearby setData={setData}/>}/>
          <Route path=":categoryCode/:placeId" element={<PlaceDetail data={data}/>}/>
        </Route>  {/* 메인 페이지와 리다이렉트 처리 */}
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />  {/* 로그인 페이지 */}
        <Route path= "/favorites" element={<FavoritePage/>}/>
        <Route path="/test" element={<PlaceTest/>}/>
        <Route path="/reviewtest" element={<ReviewBoard/>}/> {/*리뷰테트스*/}
        <Route path="/reviews" element={<ReviewPage/>}/> 
        <Route path="/sociallogin" element={<SocialLoginWrapper />} />
        <Route path="/profile" element={<PrivateRoute />} />  {/* 프로필 페이지 */}
        <Route path="/mypage" element={<MyPage />} />  {/* 마이 페이지 */}
        <Route path="/editprofile" element={<EditProfile />} />  {/* 회원정보 변경 페이지 */}

        {/* 카카오 및 네이버 로그인 콜백 처리 */}
        <Route path="/oauth/kakao/callback" element={<LoginRedirectHandler />} />
        <Route path="/oauth/naver/callback" element={<LoginRedirectHandler />} />
      </Routes>
    </Router>
  );
}

export default App;