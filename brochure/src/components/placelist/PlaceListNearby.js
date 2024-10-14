/*
    작성자 : 최예지 - 2024-10-02 / 최초 작성
    설명 : 네이버 지도 기반으로 장소 정보 불러오기

    작성자 : 김동규 - 2024-10-11 / 에러수정
    설명 : 정보가 없을 때 뜨는 에러 수정
*/

import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import '../../assets/css/placelist.css';
import useCurrCoords from "./Coords";
import NotFound from "../NotFound";

const PlaceListNearby = ({ setData }) => {
    const [currData, setCurrData] = useState([]); // 빈 배열로 초기화
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { lat, lng, setCurrCoords } = useCurrCoords();

    const kakaoAPI = process.env.REACT_APP_KAKAO_REST_API_KEY;

    const { categoryCode } = useParams();

    const to = async (promise) => {
        try {
            const result = await promise;
            return [null, result];
        } catch (error) {
            return [error, null];
        }
    };

    const fetchData = () => {
        // x, y에 location 받아와서 넣어야 됨!!
        return fetch(`https://dapi.kakao.com/v2/local/search/category.json?category\_group\_code=${categoryCode}&y=${lat}&x=${lng}&&radius=20000`, {

            headers: {
                Authorization: `KakaoAK ${kakaoAPI}`
            }
        });
    };

    useEffect(() => {
        // 카테고리 정보 넣어서 정보 가져오기
        const fetchDataEffect = async () => {
            const [error, response] = await to(fetchData());
            if (error) {
                return setError("fetchData failed");
            }

            const [jsonError, result] = await to(response.json());
            if (jsonError) {
                return setError("*** json response error ***");
            }
            setCurrData(result.documents);
            console.log(result.documents);
        };
        fetchDataEffect();
    }, [categoryCode]); // categoryCode가 변경될 때마다 데이터 가져오기

    const onClickBack = () => {
        navigate(`/`);
    };

    return (
        <div>
            {/* 데이터가 존재하는 경우에만 제목을 렌더링 */}
            {currData.length > 0 ? (
                // <h2 className="list-title"> {currData[0].category_group_name} </h2>
                <div className="back-container">
                    <button className="backBtn" onClick={onClickBack}>{currData[0].category_group_name}</button>
                </div>

                
            ) : (
                <NotFound/>
            )}

            <div className="list-container">
                {currData.length > 0 ? (
                    currData.map((place, index) => (
                        <Link
                            to={`/${categoryCode}/${place.id}`}
                            key={index}
                            onClick={() => { setData(currData[index]); }}
                            className="place-container"
                        >
                            <div key={place.id}>
                                <div>
                                    <div className="place-title">{place.place_name}</div>
                                    <div className="place-distance">현재 거리로부터 {(place.distance) / 1000}km</div>
                                </div>
                                <div className="place-phonenumber">{place.phone}</div>
                            </div>
                        </Link>
                    ))
                ) : (
                    <NotFound/>
                )}
            </div>
        </div>
    );
};

export default PlaceListNearby;
