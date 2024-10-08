/* 
    점포 상세 페이지에서 내가 등록한 리뷰를 등록후
    그 리뷰의 정보를 가져와서 점포 이름 등등 정보 나열후 밑에
    내가 쓴 리뷰 좌르륵
    
    수정 삭제 가능해야함

*/
import React, { useEffect, useState } from "react";
import { useReview } from "../../Store";
import Cookies from 'js-cookie';
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";
import "../../assets/css/review.css";

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
        <main style={{ padding: "20px", marginTop: "90px" }}>
             <div className="backBtnContainer">
                <button className="backBtn" onClick={() => navigate(-1)}>돌아가기</button>
            </div>
            <div className="placeinfo">
                {reviewList.length > 0 ? (
                    reviewList.map((review, index) => (
                        <li key={index} className="review-item">
                            <Link to={`/${review.categoryCode}/${review.id}`}>
                            <p><strong>가게 이름:</strong> {review.placeName}</p>
                            </Link>
                            <p><strong>리뷰:</strong> {review.text}</p>

                        </li>
                    ))
                ) : (
                    <p>작성한 리뷰가 없습니다.</p>
                )}
            </div>
        </main>
    );
};
