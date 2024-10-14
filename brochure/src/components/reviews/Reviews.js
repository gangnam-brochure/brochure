/* 
    점포 상세 페이지에서 내가 등록한 리뷰를 등록후
    그 리뷰의 정보를 가져와서 점포 이름 등등 정보 나열후 밑에
    내가 쓴 리뷰 좌르륵
    
    수정 삭제 가능해야함

*/
import { faStar as regularStar } from '@fortawesome/free-regular-svg-icons';
import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons';
import React, { useEffect, useState } from "react";
import { useReview } from "../../Store";
import Cookies from 'js-cookie';
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";
import "../../assets/css/review.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const Reviews = () => {
    const navigate = useNavigate();
    const { reviewData } = useReview();
    const [reviewList, setReviewList] = useState([]);
    const [userNickname, setUserNickname] = useState('');

    useEffect(() => {
        const fetchUserProfile = async () => {
            const token = Cookies.get('token');
            if (token) {
                try {
                    const response = await axios.get('/api/get-profile', {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    setUserNickname(response.data.nickname);
                } catch (error) {
                    console.error('Error fetching user profile:', error);
                }
            }
        };

        fetchUserProfile();
    }, []);

    useEffect(() => {
        if (userNickname) {
            const userReviews = reviewData.filter(review => review.nickname === userNickname);
            setReviewList(userReviews);
        }
    }, [reviewData, userNickname]);

    return (
        <main>
            <div className="backBtnContainer">
                <button className="backBtn" onClick={() => navigate(-1)}>돌아가기</button>
            </div>
            <div className="placeinfo">
                {reviewList.length > 0 ? (
                    reviewList.map((review, index) => (
                        <Link to={`/${review.categoryCode}/${review.id}`}>
                        <li key={index} className="review-item">
                                <h1>장소 : {review.placeName}</h1>
                            <p className='rName'><strong>리뷰 :</strong> {review.text}</p>
                            <div className="review-star-rating1">
                                {[...Array(5)].map((_, index) => (
                                    <FontAwesomeIcon
                                        key={index}
                                        icon={index < review.rating ? solidStar : regularStar}
                                        className="review-star"
                                    />
                                ))}
                            </div>
                        </li></Link>
                    ))
                ) : (
                    <p>작성한 리뷰가 없습니다.</p>
                )}
            </div>
        </main>
    );
};
