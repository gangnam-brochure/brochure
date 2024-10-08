/*
    작성자 : 최예지 - 2024-10-04 / 최초 작성
    설명 : 네이버 지도 기반으로 장소 세부 정보 불러오기
    
    김동규 - 2024-10-07 / 수정
    설명 : 로그인한 유저만 즐겨찾기 등록 가능하도록 수정

    손정원 : 2024 -10-07/ 추가
    리뷰쓰는 텍스트 추가
*/

import "../../assets/css/favorite.css";
import { faStar as regularStar } from '@fortawesome/free-regular-svg-icons';
import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons';
import '../../assets/css/categories.css';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import {useFavorite, useReview} from "../../Store"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Cookies from 'js-cookie';
import KakaoMapShowingPlace from './KaKaoMapShowingPlace';
    //장소 눌렀을 때 해당 장소에 관한 데이터 리턴해주셈
    // 불러왔을 때 있어야 되는거
    // 장소 이름
    // 지도
    // 주소
    // 전화번호 ** 필수
    // 즐겨찾기 클릭 할수잇는 버튼
    // 밑에 댓글 입력할수 있는 창 텍스트 생성  *작성자*손정원
const PlaceDetail = ({data}) =>
{
    const { favoriteOn, favoriteOff, placeData} = useFavorite();
    const {addReview,reviewData} = useReview();
    const [opinion,setOpinion] = useState('');
    const [text,setText] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const isFavorite = placeData.some(item => item.data.id === data.id);
    const currentReviews = reviewData.filter(review => review.placeId === data.id);
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

    },[data]);
    

    const onChangeOpinion=e=>setOpinion(e.target.value);
    const onClickReview=()=>{
        addReview(data.id,opinion);
        console.log(opinion,"확인")
    }

    const onClickFavorite = () =>
    {
        if (isFavorite) {
            favoriteOff(data.id); 
        } else {
            favoriteOn({data});
        }
        
    }

    const onClickBack = () =>
    {
        console.log("뒤로 가세요");
        navigate(`/${data.category_group_code}`)
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
            <KakaoMapShowingPlace latitude={data.y} longitude={data.x}/>
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
            {isLoggedIn ? (
                <p>후기 : <input type="text" placeholder="후기 내용 입력해주세요" onChange={onChangeOpinion}/><button onClick={onClickReview}>등록</button></p>
                ) : (
                <p>로그인 후 리뷰를 작성할 수 있습니다.</p> // 로그인하지 않은 경우 표시
            )}
            <ul>
            {currentReviews.map((review, index) => (
          <li key={index}>{review.text}</li>  
        ))}
            </ul>
        </div>
    )
    }
}
export default PlaceDetail;