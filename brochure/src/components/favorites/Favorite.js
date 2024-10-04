<<<<<<< HEAD
/*
    작성자 손정원
    (만약 점포정보가 넘어오고 상세페이지에서 즐찾 버튼을 눌렀을때)
    고유 식별자 id를 getFavoList로 json객체 받아오고
    리스트로 뿌려주기
*/
import useBookMark from '../../Store';
import { useState, useEffect } from "react";
import { getPlaceDetail } from "../../api/BrochureApi";
import { useNavigate } from "react-router-dom";
=======
// /*
//     작성자 손정원
//     (만약 점포정보가 넘어오고 상세페이지에서 즐찾 버튼을 눌렀을때)
//     고유 식별자 id를 getFavoList로 json객체 받아오고
//     리스트로 뿌려주기
// */
// import useBookMark from '../../Store';
// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { getPlaceDetaill } from "../../api/BrochureApi";
>>>>>>> b2e1ff999a9d354b3e717014410538f8b0d87326

// export const Favorite = () => {
//     const navigate = useNavigate();
//     const [favoList, setFavoList] = useState([]);
//     const { bookmarkCancle, placeCodes } = useBookMark();

//     const onClickHandler = (id) => {
//         bookmarkCancle(id);
//     }


    useEffect(() => {
        const fetchFavoList = async () => {
            try {
               // 비동기 호출
               console.log(placeCodes);
               const placesDetails = placeCodes.map(placeId => getPlaceDetail(placeId));
                console.log(placesDetails);
                setFavoList(placesDetails);
                console.log(favoList,"여기문제1");


//               } catch (error) {
//                 console.error("즐겨찾기 목록을 가져오는 데 실패했습니다", error);
//             }
//         };

         // placeCodes가 비어있지 않은 경우에만 호출
            fetchFavoList(); // 함수 호출
    }, [placeCodes]); // placeCodes가 변경될 때만 호출
    console.log(favoList);
    return (
        <>
            <main style={{ padding: "20px", marginTop: "90px" }}>
                <div className="placeinfo">
                    <button onClick={() => navigate(-1)}>돌아가기</button>
                    {favoList.length === 0 ? (
                        <p>즐겨찾기 목록이 비어 있습니다.</p> 
                    ) : (
                       <div>
                            {favoList.map((item, index) => (
                                <li key={index}>
                                    {item[0].name}={item[0].place}
                                    <button onClick={() => onClickHandler(item[0].id)}>즐찾삭제</button>
                                </li>
                            ))}
                            
                        </div>
                    )}
                </div>
            </main>
        </>
    );
};


// export default Favorite;
