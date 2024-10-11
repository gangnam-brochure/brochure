/*
    작성자 손정원
    (만약 점포정보가 넘어오고 상세페이지에서 즐찾 버튼을 눌렀을때)
    고유 식별자 id를 getFavoList로 json객체 받아오고
    리스트로 뿌려주기

    김동규 - 2024-10-07 / 수정
    설명 : 로그인한 유저만 즐겨찾기 페이지 이동 가능하도록 수정
           App.js에서 PrivateRoute로 사용자 확인 후 CustomModal 불러오기

    김동규 - 2024-10-08 / 수정
    설명 : 로그인한 유저의 정보를 가져와 해당 유저의 즐겨찾기만 표시

*/

import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useFavorite } from '../../Store';
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../assets/css/favorite.css";
import Cookies from 'js-cookie';
import axios from 'axios';

const Favorite = () => {
    const navigate = useNavigate();
    const { placeData, favoriteOff } = useFavorite(); // placeData와 favoriteOff을 불러옴
    const [favoList, setFavoList] = useState([]); // favoList 상태 선언

    const [ currentUserNickname,setCurrentUserNickname] = useState('');
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

  // 로그인한 사용자 정보 가져오기
  const fetchCurrentUser = async () => {
    const token = Cookies.get('token');
    if (token) {
      try {
        const response = await axios.get('/api/get-profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCurrentUserNickname(response.data.nickname);
        console.log('현재 사용자 닉네임:', response.data.nickname);
      } catch (error) {
        console.error('프로필 로드 중 오류 발생:', error);
      }
    }
  };

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  // 로그인한 사용자 닉네임과 일치하는 즐겨찾기만 필터링
  useEffect(() => {
    if (placeData.length > 0 && currentUserNickname) {
      // placeData 구조를 정확히 확인하여 필터링
      const userFavorites = placeData.filter(item => item.nickname === currentUserNickname);
      setFavoList(userFavorites);
      console.log('필터링된 즐겨찾기 목록:', userFavorites);
    } else {
      console.log('필터링할 데이터가 없습니다. placeData:', placeData, 'currentUserNickname:', currentUserNickname);
    }
  }, [placeData, currentUserNickname]);
  
  // 즐겨찾기 삭제 핸들러
  return (
        <main>
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


