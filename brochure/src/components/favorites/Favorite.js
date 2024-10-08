import { faStar } from '@fortawesome/free-solid-svg-icons';
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
             <div className="backBtnContainer">
                <button className="backBtn" onClick={() => navigate(-1)}>돌아가기</button>
            </div>
            <div className="placeinfo">
                {favoList.length > 0 ? (
                    favoList.map((item) => (
                        <li key={item.data.id} className="favorite-item"> {/* li 요소에 class 추가 */}
                            <Link to={`/${item.data.category_group_code}/${item.data.id}`}>
                                <p className="category">카테고리: {item.data.category_name}</p>
                                <h2 className="place">{item.data.place_name}</h2>
                                <p className="adress">주소 : {item.data.address_name}</p>
                                <p className="phone">{item.data.phone}</p>
                            </Link>
                            <button className="star" onClick={() => onClickHandler(item.data.id)}>
                                <FontAwesomeIcon icon={faStar} />
                            </button>
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
