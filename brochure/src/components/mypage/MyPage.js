// /*
//     작성자 : 이승환 - 2024-10-02 / 최초 작성
//     설명 : 마이페이지
// */
// // import '../../assets/css/mypage.css'
// import { useState } from "react";
// import Footer from "../Footer";
// import Header from "../Header";
// import { useNavigate } from "react-router-dom";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; //아이콘사용하기위한 라이브러리
// import { faStar, faCommentDots, faUserEdit } from '@fortawesome/free-solid-svg-icons'; // 설치해야함
// import '../../assets/css/mypage.css'; //마이페이지에대한 css

// const MyPage = () => {
//   const [user, setUser] = useState({ name: "승환" });
//   const [reviews, setReviews] = useState([]);
//   const navigate = useNavigate();

//   const handleClick = (path) => {
//     navigate(path);
//   };

//   const deleteReview = (id) => {
//     setReviews(reviews.filter((review) => review.id !== id));
//   };

//   return (
//     <>
//       <Header />
//       <div className="mypage-container">
//         <h1>마이 페이지</h1>
//         <div className="welcome-message">
//           안녕하세요 {user.name} 님
//         </div>
//         <div className="button-group">
//           <button onClick={() => handleClick("../favorites")} className="mypage-button">
//             <FontAwesomeIcon icon={faStar} /> 즐겨찾기 목록
//           </button>
//           <button onClick={() => handleClick("../reviews")} className="mypage-button">
//             <FontAwesomeIcon icon={faCommentDots} /> 리뷰 목록
//           </button>
//           <button onClick={() => handleClick("../editprofile")} className="mypage-button">
//             <FontAwesomeIcon icon={faUserEdit} /> 회원정보 변경
//           </button>
//         </div>
//       </div>
//       <Footer />
//     </>
//   );
// };

// export default MyPage;