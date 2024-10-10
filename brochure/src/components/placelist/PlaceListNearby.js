/*
    작성자 : 최예지 - 2024-10-02 / 최초 작성
    설명 : 네이버 지도 기반으로 장소 정보 불러오기
*/

import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import '../../assets/css/placelist.css';

const PlaceListNearby = ({setData}) =>
{
    const [currData, setCurrData] = useState([{}]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const kakaoAPI = process.env.REACT_APP_KAKAO_REST_API_KEY; 

    const {categoryCode} = useParams();

    const to = async (promise) => {
        try{
            const result = await promise;
            return [null, result];

        }catch(error){
            return [error, null]
        }
    }

    const fetchData = () => {
        // x, y에 location 받아와서 넣어야 됨!!
        return fetch(`https://dapi.kakao.com/v2/local/search/category.json?category\_group\_code=${categoryCode}&y=37.514322572335935&x=127.06283102249932&radius=20000`, {
            headers: {
                Authorization: `KakaoAK ${kakaoAPI}`
            }})
    }
    
    useEffect(()=>{
        // 카테고리 정보 넣어서 정보 가져오기
        const fetchDataEffect = async () => {
            const [error, response] = await to(fetchData());
            if(error){
                return setError("fetchData failed");
            }

            const [jsonError, result] = await to(response.json());
            if(jsonError) {
                return setError("*** json response error ***");
            }
            setCurrData(result.documents);
            console.log(result.documents);
        }
        fetchDataEffect();
    }, []);

    const onClickBack = () =>
    {
        navigate(`/`);
    }

    return(
        <div className="list-container">
            <button onClick={onClickBack}>◁</button>
            <h2 className="list-title"> {currData[0].category_group_name} </h2> {/*거리순 정렬? 거리를 보여줄 수 잇나 */}
            {currData.map((place, index)=>(
                <Link to={`/${categoryCode}/${place.id}`} key={index} onClick={()=>{setData(currData[index])}}>
                    <div key={place.id} className ="list-element" >
                        <span>{place.place_name}</span>
                        <br/>
                        <span>{place.phone}</span>
                    </div>
                </Link>
                ))}
        </div>
    )
}
export default PlaceListNearby;