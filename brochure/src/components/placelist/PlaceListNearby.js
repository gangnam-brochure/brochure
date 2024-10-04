/*
    작성자 : 최예지 - 2024-10-02 / 최초 작성
    설명 : 네이버 지도 기반으로 장소 정보 불러오기
*/

import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import '../../assets/css/categories.css';

const PlaceListNearby = ({setData}) =>
{
    const [currData, setCurrData] = useState([{}]);
    const [error, setError] = useState(null);

    const kakaoAPI = process.env.REACT_APP_REST_API_KAKAO_KEY; 

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
        }
        fetchDataEffect();
    }, []);

    return(
        <div className="categories-container">
            <button>◁</button>
            <h2 className="categories-title"> category </h2>
            {currData.map((place, index)=>(
                <Link to={`/${categoryCode}/${place.id}`} key={place.id}>
                    {/* {setData(currData[index])} */}
                    <div key={index}>
                        <span>{place.place_name}</span>
                    </div>
                </Link>

                ))}
        </div>
    )
}

export default PlaceListNearby;