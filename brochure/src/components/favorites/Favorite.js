/*
    작성자 손정원
    (만약 점포정보가 넘어오고 상세페이지에서 즐찾 버튼을 눌렀을때)
    고유 식별자 id를 getFavoList로 json객체 받아오고
    리스트로 뿌려주기

    김동규 - 2024-10-07 / 수정
    설명 : 로그인한 유저만 즐겨찾기 페이지 이동 가능하도록 수정
           App.js에서 PrivateRoute로 사용자 확인 후 CustomModal 불러오기
*/
import { faStar, faCommentDots, faUserEdit } from '@fortawesome/free-solid-svg-icons'; // 설치해야함
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useFavorite } from '../../Store';
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../assets/css/favorite.css";

const Favorite = () => {
    const navigate = useNavigate();
    const { placeData, favoriteOff } = useFavorite(); // placeData와 favoriteOff을 불러옴
    const [favoList, setFavoList] = useState([]); // favoList 상태 선언

    const onClickHandler = (id) => {
        favoriteOff(id); // ID로 즐겨찾기 삭제
        console.log(`삭제할 ID: ${id}`);
    };

    useEffect(() => {
        if (placeData) { // placeData가 있을 때만
            console.log(placeData, "placeData 상태");
            setFavoList(placeData); // placeData를 favoList에 설정
        }
    }, [placeData]); // placeData가 변경될 때마다 호출

    return (
        <main style={{ padding: "20px", marginTop: "90px" }}>
            <div className="placeinfo">
                <button onClick={() => navigate(-1)}>돌아가기</button>
                {favoList.length > 0 ? (
                    favoList.map((item) => (
                        <li key={item.data.id}> {/* item.data.id로 고유키 설정 */}
                            <Link to={`/${item.data.category_group_code}/${item.data.id}`}>
                            <p>장소 이름: {item.data.place_name}</p>
                            <p>전화번호: {item.data.phone}</p>
                            <p>주소: {item.data.road_address_name}</p>
                            <p>카테고리: {item.data.category_name}</p>
                            </Link>
                            <button className="star" onClick={() => onClickHandler(item.data.id)}>
                            <FontAwesomeIcon icon={faStar} /></button>
                        </li>
                    ))
                ) : (
                    <p>즐겨찾기 목록이 비어 있습니다.</p> 
                )}
            </div>
        </main>
    );
};

export default Favorite;
