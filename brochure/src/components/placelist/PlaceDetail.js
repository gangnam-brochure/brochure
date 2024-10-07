/*
    작성자 : 최예지 - 2024-10-04 / 최초 작성
    설명 : 네이버 지도 기반으로 장소 세부 정보 불러오기
*/

import "../../assets/css/favorite.css";
import { faStar as regularStar } from '@fortawesome/free-regular-svg-icons';
import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons';
import '../../assets/css/categories.css';
import {useFavorite} from "../../Store"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Cookies from 'js-cookie';
import { useState, useEffect } from 'react';

const PlaceDetail = ({data}) =>
{
    //장소 눌렀을 때 해당 장소에 관한 데이터 리턴해주셈

    // 불러왔을 때 있어야 되는거
    // 장소 이름
    // 지도
    // 주소
    // 전화번호 ** 필수
    // 즐겨찾기 클릭 할수잇는 버튼
    const { favoriteOn, favoriteOff, placeData } = useFavorite();
    const isFavorite = placeData.some(item => item.data.id === data.id);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const onClickFavorite = () =>
    {
        if (isFavorite) {
            favoriteOff(data.id); // Remove from favorites
        } else {
            favoriteOn({data}); // Add to favorites
        }
        
    }

    const onClickBack = () =>
    {
        console.log("뒤로 가세요");
        //navigate(`/${categoryCode}`);
    }

    // 로그인 여부 확인
    useEffect(() => {
        const token = Cookies.get('token');
        if (token) {
            setIsLoggedIn(true); // 로그인 되어 있으면 true로 설정
        }
    }, []);

    return(
        <div className="categories-container">
            <h2 className="categories-title"> 〓〓〓〓〓〓〓〓〓〓 </h2>
            <h3> {data.place_name} </h3>
            <p>{data.phone}</p>
            <p>{data.address_name}</p>
            <p>{data.address_name}</p>
            {isLoggedIn ? (
                <button className="onOffStar" onClick={onClickFavorite}>
                    <FontAwesomeIcon icon={isFavorite ? solidStar : regularStar} />
                </button>
            ) : (
                <p>로그인 후 즐겨찾기를 이용하실 수 있습니다.</p> // 로그인하지 않은 경우 표시
            )}
            <button onClick={onClickBack}>돌아가기</button>
        </div>
    )
}

export default PlaceDetail;