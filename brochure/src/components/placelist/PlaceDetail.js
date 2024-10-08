import React, { useEffect, useState } from "react";
import "../../assets/css/favorite.css";
import { faStar as regularStar } from '@fortawesome/free-regular-svg-icons';
import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useFavorite, useReview } from "../../Store";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Cookies from 'js-cookie';
import KakaoMapShowingPlace from './KaKaoMapShowingPlace';

const PlaceDetail = ({ data }) => {
    const { favoriteOn, favoriteOff, placeData } = useFavorite();
    const { addReview, reviewData, updateReview, deleteReview } = useReview();
    const [opinion, setOpinion] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const isFavorite = placeData.some(item => item.data.id === data.id);
    const currentReviews = reviewData.filter(review => review.placeId === data.id);
    const [formData, setFormData] = useState({ email: '', phone: '', nickname: '' });
    const [editingReviewId, setEditingReviewId] = useState(null);
    const [editingOpinion, setEditingOpinion] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        const token = Cookies.get('token');
        if (token) {
            setIsLoggedIn(true);
            fetchProfile(token);
        }
    }, []);

    const fetchProfile = async (token) => {
        try {
            const response = await axios.get('/api/get-profile', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setFormData({
                email: response.data.email,
                nickname: response.data.nickname,
                phone: response.data.phone,
            });
        } catch (error) {
            console.error('프로필 로드 중 오류 발생:', error);
        }
    };

    const onChangeOpinion = e => setOpinion(e.target.value);
    const onChangeEditingOpinion = e => setEditingOpinion(e.target.value);

    const onClickReview = () => {
        // 리뷰 추가
        addReview(data.id, opinion, formData.nickname, data.place_name);
        setOpinion('');
    };

    const onClickEditReview = (review) => {
        setEditingReviewId(review.id);
        setEditingOpinion(review.text);
    };

    const onClickUpdateReview = () => {
        if (editingReviewId) {
            updateReview(editingReviewId, editingOpinion);
            setEditingReviewId(null);
            setEditingOpinion('');
        }
    };

    const onClickDeleteReview = (reviewId) => {
        deleteReview(reviewId);
    };

    const onClickFavorite = () => {
        if (isFavorite) {
            favoriteOff(data.id);
        } else {
            favoriteOn({ data });
        }
    };

    return (
        <div className="categories-container">
            <h3>{data.place_name}</h3>
            <KakaoMapShowingPlace latitude={data.y} longitude={data.x} />
            <p>{data.phone}</p>
            <p>{data.address_name}</p>
            {isLoggedIn ? (
                <button className="onOffStar" onClick={onClickFavorite}>
                    <FontAwesomeIcon icon={isFavorite ? solidStar : regularStar} />
                </button>
            ) : (
                <p>로그인 후 즐겨찾기를 이용하실 수 있습니다.</p>
            )}
            <p>
                후기 : 
                <input type="text" placeholder="후기 내용 입력해주세요" value={opinion} onChange={onChangeOpinion} />
                <button onClick={onClickReview}>등록</button>
            </p>
            <ul>
                {currentReviews.map((review, index) => (
                    <li key={index}>
                        {review.nickname}님 : {review.text}
                        <button onClick={() => onClickEditReview(review)}>수정</button>
                        <button onClick={() => onClickDeleteReview(review.id)}>삭제</button>
                    </li>
                ))}
            </ul>
            {editingReviewId && (
                <div>
                    <h4>수정 중...</h4>
                    <input 
                        type="text" 
                        value={editingOpinion} 
                        onChange={onChangeEditingOpinion} 
                    />
                    <button onClick={onClickUpdateReview}>수정 완료</button>
                </div>
            )}
        </div>
    );
};

export default PlaceDetail;
