import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PrivateRoute from './routes/PrivateRoute';
import SocialLoginWrapper from './layout/SocialLogin';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import MainPage from './layout/MainPage';
import MyPage from './components/mypage/MyPage';
import LoginRedirectHandler from './components/auth/LoginRedirectHandler';  // 리다이렉트 핸들러
// import Logout from './components/auth/Logout';
import FavoritePage from './layout/FavoritePage';
import PlaceDetail from './components/placelist/PlaceDetail';
import PlaceListNearby from './components/placelist/PlaceListNearby';
import ReviewPage from './layout/ReviewPage';
import EditProfile from './components/EditProfile/editprofile';
import Categories from './components/Categories';
import ChangeProfile from './components/EditProfile/Changeprofile';
import UpdateProfileTest from './test/UpdateProfileTest';
import Myprofile from './components/mypage/Myprofile';
import NotFound from './components/NotFound';

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
        <Route
          path="/favorites"
          element={
            <PrivateRoute>
              <FavoritePage />
            </PrivateRoute>
          }
        />
        <Route
          path="/reviews"
          element={
            <PrivateRoute>
              <ReviewPage />
            </PrivateRoute>
          }
        />
        {/* <Route path="/reviewtest" element={<ReviewBoard/>}/> 리뷰테트스 */}
        {/* <Route path="/reviews" element={<ReviewPage/>}/>  위에 로그인된 유저만 볼 수 있게 만듦 */}
        <Route path="/sociallogin" element={<SocialLoginWrapper />} />
        <Route path="/profile" element={<PrivateRoute />} />  {/* 프로필 페이지 */}
        <Route path="/mypage" element={<MyPage />} />  {/* 마이 페이지 */}
        <Route path="/editprofile" element={<EditProfile />} />  {/* 회원정보 변경 페이지 */}
        <Route path="/changeprofile" element={<ChangeProfile />} />  {/* 회원정보 변경 페이지 */}
        <Route path="/edit" element={<UpdateProfileTest />} />  {/* 테스트 */}
        <Route path="/myprofile" element={<Myprofile />} />  {/* 내프로필 정보 */}
        
        {/* 카카오 및 네이버 로그인 콜백 처리 */}
        <Route path="/oauth/kakao/callback" element={<LoginRedirectHandler />} />
        <Route path="/oauth/naver/callback" element={<LoginRedirectHandler />} />

        {/* 잘못된 경로로 접근할 때 NotFound 페이지로 이동 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;