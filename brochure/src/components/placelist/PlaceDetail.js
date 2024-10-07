/*
    작성자 : 최예지 - 2024-10-04 / 최초 작성
    설명 : 네이버 지도 기반으로 장소 세부 정보 불러오기
*/

import { faChampagneGlasses } from '@fortawesome/free-solid-svg-icons';
import '../../assets/css/categories.css';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import KakaoMapModal from '../auth/KakaoMapModal';
import axios from 'axios';

const PlaceDetail = ({data}) =>
{
    // 불러왔을 때 있어야 되는거
    // 장소 이름
    // 지도
    // 주소
    // 전화번호 ** 필수
    // 즐겨찾기 클릭 할수잇는 버튼
    // 리뷰창    
    const navigate = useNavigate();
    const KAKAO_API_KEY = process.env.REACT_APP_KAKAO_REST_API_KEY;
    const [location, setLocation] = useState("");

    const getAddress = async (latitude, longitude) => {
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
    } catch(error){
        console.error("주소 변환 실패: ", error);
    }}

    useEffect(() => {
        setLocation(`위도: ${data.y}, 경도: ${data.x}`);
        console.log(data.y + " " + data.x);
        getAddress(data.y, data.x);
    },
    (error) => {console.error(error);})

    const onSelectionLocation = (latitude, longitude) =>
    {
        latitude = data.y;
        longitude = data.x;
        console.log("내가 쓸 수 잇는 것이 아닌 것 같습니다");
    }
    const onClickFavorite = () =>
    {
        console.log("즐겨찾기 설정");
    }

    const onClickBack = () =>
    {
        navigate(`/${data.category_group_code}`);
    }

    return(
        <div className="categories-container">
            <h2 className="categories-title"> 〓〓〓〓〓〓〓〓〓〓 </h2>
            <h2> {data.place_name} </h2>
            <KakaoMapModal onSelectLocation={onSelectionLocation}/>
            <p>{data.phone}</p>
            <p>{data.address_name}</p>
            <button onClick={onClickFavorite}>즐찾</button>
            <button onClick={onClickBack}>돌아가기</button>
        </div>
    )
}

export default PlaceDetail;