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
    const [rating, setRating] = useState(0); // 별점 상태 추가
    const { favoriteOn, favoriteOff, placeData } = useFavorite();
    const { addReview, deleteReview, reviewData } = useReview();
    const [opinion, setOpinion] = useState('');
    const [editOpinion, setEditOpinion] = useState('');
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
    const onChangeEditOpinion = e => setEditOpinion(e.target.value);

    const onClickReview = () => {
        const userReviewExists = currentReviews.some(review => review.nickname === formData.nickname);

        if (isEditing) {
            deleteReview(currentReviewId); // 기존 리뷰 삭제
            addReview(data.id, editOpinion, formData.nickname, data.place_name, data.category_group_code, rating);
            console.log(editOpinion, data, formData.nickname, "리뷰 수정 완료");
            setEditOpinion(''); // 리뷰 입력 필드 초기화
            setIsEditing(false); // 수정 모드 종료
            //} else if (userReviewExists) {
            //     alert("이미 이 장소에 리뷰를 작성했습니다."); // 사용자에게 알림
            //     return;
        } else {
            // 리뷰 추가
            addReview(data.id, opinion, formData.nickname, data.place_name, data.category_group_code, rating);
            console.log("리뷰 추가:", {
                placeId: data.id,
                text: opinion,
                nickname: formData.nickname,
                placeName: data.place_name,
                rating
            })
            setOpinion(''); // 리뷰 입력 필드 초기화
        }
    };

    const handleEdit = (review) => {
        setEditOpinion(review.text);
        setIsEditing(true);
        setCurrentReviewId(review.id); // 수정할 리뷰의 ID 저장
    };

    const handleCancelEdit = () => {
        setOpinion('');
        setIsEditing(false);
    };

    const handleDelete = (reviewId) => {
        deleteReview(reviewId);
    };

    const onClickFavorite = () => {
        if (!isLoggedIn) {
            alert("로그인 후 즐겨찾기를 이용하실 수 있습니다.");
        } else if (!formData.nickname) {
            alert("사용자 정보가 로드되지 않았습니다. 잠시 후 다시 시도해주세요.");
        } else {
            if (isFavorite) {
                favoriteOff(data.id, formData.nickname);
            } else {
                favoriteOn({ data }, formData.nickname);
                console.log(`즐겨찾기 추가됨: ${data.place_name}, 사용자: ${formData.nickname}`);
            }
        }
    };

    const onClickBack = () => {
        navigate(`/${data.category_group_code}`);
    };

    console.log("data : " + data);

    return (
        <main className='main-Contatiner'>
            <div className="backBtnContainer">
                <button className="backBtn" onClick={onClickBack}>돌아가기</button>
            </div>
            <div className="categories-containers">
                <div className="place-and-map">
                    <div className='placedata'>
                        <h1>{data.place_name}</h1>
                        <hr className="divider" />
                        <div className="info-container">
                            <div className="info-item">
                                <h2><strong>주소</strong></h2> <span>{data.address_name}</span>
                            </div>
                            <div className="info-item">
                                <h2><strong>전화번호</strong></h2> <span>{data.phone}</span>
                            </div>
                        </div>
                        <button
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
                    </div>
                    <div className='kakaomap'>
                        <KakaoMapShowingPlace latitude={data.y} longitude={data.x} />
                    </div>
                </div>
                <div className="review-container">
                    <div className='review'>
                        <div className="input-container">
                            <div class="star-rating space-x-4 mx-auto">
                                <input type="radio" id="5-stars" name="rating" value="5" v-model="ratings" onChange={() => setRating(5)} />
                                <label for="5-stars" class="star pr-4">★</label>
                                <input type="radio" id="4-stars" name="rating" value="4" v-model="ratings" onChange={() => setRating(4)} />
                                <label for="4-stars" class="star">★</label>
                                <input type="radio" id="3-stars" name="rating" value="3" v-model="ratings" onChange={() => setRating(3)} />
                                <label for="3-stars" class="star">★</label>
                                <input type="radio" id="2-stars" name="rating" value="2" v-model="ratings" onChange={() => setRating(2)} />
                                <label for="2-stars" class="star">★</label>
                                <input type="radio" id="1-star" name="rating" value="1" v-model="ratings" onChange={() => setRating(1)} />
                                <label for="1-star" class="star">★</label>
                            </div>
                            <input
                                type="text"
                                placeholder="후기 내용 입력해주세요"
                                value={opinion}
                                onChange={onChangeOpinion}
                            />
                            <button
                                className="submit-button"
                                onClick={() => {
                                    if (!isLoggedIn) {
                                        alert("후기 등록은 로그인 후 이용하실 수 있습니다.");
                                        setOpinion('');
                                    } else {
                                        onClickReview();  // 로그인한 경우 등록 또는 수정 실행
                                    }
                                }}
                            >등록</button>
                        </div>
                    </div>
                    <div className="reviewText">
                        <div className="review-boxes-container">
                            {currentReviews.map((review, index) => (
                                <div key={index} className="review-box">
                                    <div className="review-content">
                                        <strong className='name'>{review.nickname}님</strong>
                                        <div className="review-star-rating">
                                            {[...Array(5)].map((_, index) => (
                                                <FontAwesomeIcon
                                                    key={index}
                                                    icon={index < (review.rating) ? solidStar : regularStar} // 반전된 로직
                                                    className="review-star"
                                                />
                                            ))}
                                        </div>
                                        <p className='reviews'>{review.text}</p>
                                    </div>
                                    {isLoggedIn && review.nickname === formData.nickname && !isEditing && (
                                        <div className="review-actions">
                                            <button onClick={() => handleEdit(review)}>
                                                <img src={require("../../assets/images/edit.png")} width={"20px"}/>
                                            </button>
                                            <button onClick={() => handleDelete(review.id)}>
                                                <img src={require("../../assets/images/delete.png")} width={"20px"}/>
                                            </button>
                                        </div>
                                    )}
                                    {isEditing && (
                                        <div className="edit-container">
                                            <input
                                                className="reviewEdit"
                                                type="text"
                                                placeholder="수정할 내용 입력해주세요"
                                                value={editOpinion}
                                                onChange={onChangeEditOpinion}
                                            />
                                            <div className='button-container' >
                                                <button onClick={() => { onClickReview(); }}>수정</button>
                                                <button onClick={handleCancelEdit}>취소</button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default PlaceDetail;

