/*
    작성자 : 최예지 - 2024-10-04 / 최초 작성
    설명 : 네이버 지도 기반으로 장소 세부 정보 불러오기
*/

/*
    작성자 : 김동규 - 2024-10-07 / 수정
    설명 : 로그인한 유저에게만 즐겨찾기 기능 사용할 수 있게 수정
    
    작성자 : 손정원 10-08 / 추가,수정
    설명 : 각 게시판마다 리뷰 작성란 추가 (로그인 안한상태면 사용X)
           다른 아이디로 로그인했을때 기존 리뷰남겼던거 상태보존
           리뷰 수정삭제 가능

    작성자 : 김동규 - 2024-10-08 / 수정
    설명 : 로그인한 유저에게만 후기 사용할 수 있게 수정
*/
           import "../../assets/css/favorite.css";
           import { faStar as regularStar } from '@fortawesome/free-regular-svg-icons';
           import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons';
           import '../../assets/css/placeDetail.css';
           import { useNavigate } from 'react-router-dom';
           import { useEffect, useState } from 'react';
           import axios from 'axios';
           import { useFavorite, useReview } from "../../Store";
           import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
           import Cookies from 'js-cookie';
           import KakaoMapShowingPlace from './KaKaoMapShowingPlace';
           
           const PlaceDetail = ({ data }) => {
               const { favoriteOn, favoriteOff, placeData } = useFavorite();
               const { addReview, deleteReview, reviewData } = useReview();
               const [opinion, setOpinion] = useState('');
               const [isLoggedIn, setIsLoggedIn] = useState(false);
               const [isEditing, setIsEditing] = useState(false); // 수정 모드 상태 추가
               const [currentReviewId, setCurrentReviewId] = useState(null); // 현재 수정 중인 리뷰 ID
               const isFavorite = placeData.some(item => item.data.id === data.id);
               const currentReviews = reviewData.filter(review => review.placeId === data.id);
               const [formData, setFormData] = useState({
                   email: '',
                   phone: '',
                   nickname: '', // 여기서 닉네임을 저장
               });
           
               const navigate = useNavigate();
               const KAKAO_API_KEY = process.env.REACT_APP_KAKAO_REST_API_KEY;
           
               useEffect(() => {
                   const fetchProfile = async () => {
                       const token = Cookies.get('token');
                       if (token) {
                           setIsLoggedIn(true); // 로그인 되어 있으면 true로 설정
                       }
                       try {
                           const response = await axios.get('/api/get-profile', {
                               headers: {
                                   Authorization: `Bearer ${token}`,
                               },
                           });
                           setFormData({
                               email: response.data.email,
                               nickname: response.data.nickname, // 로그인한 사용자 닉네임 설정
                               phone: response.data.phone,
                           });
                       } catch (error) {
                           console.error('프로필 로드 중 오류 발생:', error);
                       }
                   };
           
                   fetchProfile();
               }, []);
           
               const onChangeOpinion = e => setOpinion(e.target.value);
           
               const onClickReview = () => {
                   // 사용자가 이미 이 장소에 리뷰를 작성했는지 확인
                   const userReviewExists = currentReviews.some(review => review.nickname === formData.nickname);
                   
                   if (isEditing) {
                       // 수정 중일 때
                       deleteReview(currentReviewId); // 기존 리뷰 삭제
                       setIsEditing(false); // 수정 모드 종료
                   } else if (userReviewExists) {
                       // 이미 작성한 리뷰가 있는 경우
                       alert("이미 이 장소에 리뷰를 작성했습니다."); // 사용자에게 알림
                       return;
                   }
           
                   // 리뷰 추가
                   addReview(data.id, opinion, formData.nickname, data.place_name);
                   console.log(opinion, data, formData.nickname, "리뷰 등록 완료");
                   setOpinion(''); // 리뷰 입력 필드 초기화
               };
           
               const handleEdit = (review) => {
                   // 수정할 리뷰를 선택하고 수정 모드로 전환
                   setOpinion(review.text);
                   setIsEditing(true);
                   setCurrentReviewId(review.id); // 수정할 리뷰의 ID 저장
               };
           
               const handleCancelEdit = () => {
                   // 수정 취소
                   setOpinion('');
                   setIsEditing(false);
               };
           
               const handleDelete = (reviewId) => {
                   // 리뷰 삭제
                   deleteReview(reviewId);
               };
           
               // 즐겨찾기 등록 시 등록하는 유저의 닉네임도 같이 전달
               const onClickFavorite = () => {
                if (!isLoggedIn) {
                  alert("로그인 후 즐겨찾기를 이용하실 수 있습니다.");
                } else if (!formData.nickname) {
                  alert("사용자 정보가 로드되지 않았습니다. 잠시 후 다시 시도해주세요.");
                } else {
                  if (isFavorite) {
                    favoriteOff(data.id, formData.nickname); // 닉네임을 함께 전달하여 해당 사용자만 삭제
                  } else {
                    favoriteOn({ data }, formData.nickname); // 닉네임을 전달하여 즐겨찾기에 추가
                    console.log(`즐겨찾기 추가됨: ${data.place_name}, 사용자: ${formData.nickname}`);
                  }
                }
              };
              
           
               const onClickBack = () => {
                   navigate(`/${data.category_group_code}`);
               };
           
               return (
                    <main style={{ padding: "20px", marginTop: "130px" }}>
                          <div className="backBtnContainer">
                             <button className="backBtn" onClick={onClickBack}>돌아가기</button>
                         </div>
                   <div className="categories-containers">
                       <div className='placedata'>
                        {data.place_name}<button
                        className="onOffStar"
                        onClick={() => {
                            if (!isLoggedIn) {
                            alert("로그인 후 즐겨찾기를 이용하실 수 있습니다.");
                            } else {
                            onClickFavorite(); // 로그인한 경우 즐겨찾기 동작 실행
                            }
                        }}
                        >
                        <FontAwesomeIcon icon={isFavorite ? solidStar : regularStar} />
                        </button>
           
                       <button onClick={onClickBack}>돌아가기</button>
    
                        <p>후기: 
                            <input 
                            type="text" 
                            placeholder="후기 내용 입력해주세요" 
                            value={opinion} 
                            onChange={onChangeOpinion} 
                            />
                            <button
                            onClick={() => {
                                if (!isLoggedIn) {
                                alert("후기 등록은 로그인 후 이용하실 수 있습니다.");
                                setOpinion('');
                                } else {
                                onClickReview();  // 로그인한 경우 등록 또는 수정 실행
                                }
                            }}
                            >
                            {isEditing ? '수정' : '등록'}
                            </button>
                            {isEditing && <button onClick={handleCancelEdit}>취소</button>}
                        </p>
                            </div>
                       <ul>
                       {currentReviews.map((review, index) => (
                           <li key={index}>
                           {review.nickname}님: {review.text}
                           
                           {/* 로그인한 사용자의 nickname과 review 작성자의 nickname이 일치할 때만 수정 버튼 보이기 */}
                           {isLoggedIn && review.nickname === formData.nickname && (
                               <button onClick={() => handleEdit(review)}>수정</button>
                           )}
           
                           {isLoggedIn && review.nickname === formData.nickname && !isEditing && (
                               <button onClick={() => handleDelete(review.id)}>삭제</button>
                           )}
                           </li>
                       ))}
                       </ul>
                   </div>
                   </main>
               );
           };
           
           export default PlaceDetail;
           