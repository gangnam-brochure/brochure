/*
    작성자 : 최예지 - 2024-10-04 / 최초 작성
    설명 : 네이버 지도 기반으로 장소 세부 정보 불러오기
*/

import "../../assets/css/favorite.css";
import { faStar as regularStar } from '@fortawesome/free-regular-svg-icons';
import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons';
import '../../assets/css/categories.css';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

import {useFavorite} from "../../Store"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import KakaoMapShowingPlace from './KaKaoMapShowingPlace';

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
{   
    const navigate = useNavigate();
    const KAKAO_API_KEY = process.env.REACT_APP_KAKAO_REST_API_KEY;

    const getAddressFromCoordinates = async (latitude, longitude) => {
        try{
            const response = await axios.get(`https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${longitude}&y=${latitude}`,
            {
                headers:{
                    Authorization: `KakaoAK ${KAKAO_API_KEY}`,
                },
            }
        );
        if(response.data.documents.length > 0){
            console.log(response.data.documents.length);
        }
        else{
            console.log("주소를 찾을 수 없습니다.");
        }
    } catch(error){
        console.error("주소 변환 실패: ", error);
    }}

    useEffect(() => {
        getAddressFromCoordinates(data.y, data.x);
        console.log(`lat: ${data.y} lng: ${data.x}`);
    },[])

    const {favoriteOn} = useFavorite();
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

    return(
        <div className="categories-container">
            <h2 className="categories-title"> 〓〓〓〓〓〓〓〓〓〓 </h2>
            <h3> {data.place_name} </h3>
            <p>{data.phone}</p>
            <p>{data.address_name}</p>
            <p>{data.address_name}</p>
            <button className="onOffStar" onClick={onClickFavorite}>
                <FontAwesomeIcon icon={isFavorite ? solidStar : regularStar} />
            </button>
            <button onClick={onClickBack}>돌아가기</button>
        </div>
    )
}

export default PlaceDetail;