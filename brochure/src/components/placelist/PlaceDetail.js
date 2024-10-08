/*
    작성자 : 최예지 - 2024-10-04 / 최초 작성
    설명 : 네이버 지도 기반으로 장소 세부 정보 불러오기
*/

/*
    작성자 : 김동규 - 2024-10-07 / 수정
    설명 : 로그인한 유저에게만 즐겨찾기 기능 사용할 수 있게
*/

import "../../assets/css/favorite.css";
import { faStar as regularStar } from '@fortawesome/free-regular-svg-icons';
import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons';
import '../../assets/css/categories.css';
import {useFavorite} from "../../Store"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Cookies from 'js-cookie';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";

const PlaceDetail = ({ data }) => {
    // 즐겨찾기 관련 상태와 함수
    const { favoriteOn, favoriteOff, placeData } = useFavorite();
    const isFavorite = placeData.some(item => item.data.id === data.id);

    const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태 관리
    const navigate = useNavigate();
    const {categoryCode} = useParams();

    // 로그인 여부 확인
    useEffect(() => {
        const token = Cookies.get('token');
        if (token) {
            setIsLoggedIn(true); // 로그인 되어 있으면 true로 설정
        }
    }, []);

    const onClickFavorite = () => {
        if (isFavorite) {
            favoriteOff(data.id); // 즐겨찾기에서 제거
        } else {
            favoriteOn({ data }); // 즐겨찾기에 추가
        }
    }

    const onClickBack = () => {
        navigate(`/${categoryCode}`);
        console.log("뒤로 가세요");
        //navigate(`/${categoryCode}`);
    }

    return (
        <div className="categories-container">
            <h2 className="categories-title"> 〓〓〓〓〓〓〓〓〓〓 </h2>
            <h3> {data.place_name} </h3>
            <p>{data.phone}</p>
            <p>{data.address_name}</p>
            <p>{data.address_name}</p>

            {/* 로그인한 사용자만 즐겨찾기 버튼을 클릭할 수 있도록 조건부 렌더링 */}
            {isLoggedIn ? (
                <button className="onOffStar" onClick={onClickFavorite}>
                    <FontAwesomeIcon icon={isFavorite ? solidStar : regularStar} />
                </button>
            ) : (
                <p>로그인이 필요합니다.</p> // 로그인하지 않은 경우 표시
            )}

            <button onClick={onClickBack}>돌아가기</button>
        </div>
    )
}

export default PlaceDetail;
