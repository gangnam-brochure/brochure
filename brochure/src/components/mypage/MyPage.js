/*
    작성자 : 이승환 - 2024-10-02 / 최초 작성
    설명 : 마이페이지
*/
// import '../../assets/css/mypage.css'
import { useState } from "react";
import Footer from "../Footer";
import '../../assets/css/mypage.css';
import Header from "../Header";

const MyPage = () => {

  const [user,setUser] = useState({name:"승환"});
  const [reviews,setReviews] = useState([]);



    return (
      <>
        <header>
        <div>
        <h1>마이 페이지</h1>    
         </div>
         </header> 
      
       
         <div className="mypage">
          안녕하세요 {user.name} 님
          </div>       
        
        <Footer/>
        </>
      );

}

export default MyPage;