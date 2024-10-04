/*
    작성자 : 최예지 - 2024-10-02 / 최초 작성
    설명 : 네이버 지도 기반으로 장소 정보 불러오기
*/

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const PlaceListNearby = () =>
{
    const [data, setData] = useState([{}]);
    const [error, setError] = useState(null);
    const kakaoKey = process.env.REST_API_KAKAO_KEY;

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
        return fetch(`https://dapi.kakao.com/v2/local/search/category.json?category\_group\_code=${categoryCode}&radius=20000`, {
            headers: {
                Authorization: `KakaoAK ${kakaoKey}`
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
            setData(result.documents);
        }
        fetchDataEffect();
        console.log(data);
    }, []);

    return(
        <>
            {/* 데이터 불러와서 삽입 */}
            <h2> category </h2>
            {data.map((place, index)=>(
                <div key={index}>
                    <span>{place.place_name}</span>
                </div>
            ))}
        </>
    )
}

export default PlaceListNearby;