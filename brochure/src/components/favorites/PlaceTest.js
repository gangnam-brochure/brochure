// import { useEffect, useState } from "react";
// import useBookMark from "../../Store"; 
// import { useNavigate } from "react-router-dom";
// import { getFavoList } from "../../api/BrochureApi";
// const PlaceTest=()=>{
//     const navigate = useNavigate();
//     const {bookmark} = useBookMark();
//     const [places,setPlace] = useState([]);
//     const onClickHandler=(id)=>{
//         bookmark(id);
//         console.log(id);
//     }

//     useEffect(() => {
//         const fetchPlaceList = async () => {
//             try {
//                 const data = await getFavoList(); // 비동기 호출
//                 setPlace(data);
//             } catch (error) {
//                 console.error("목록을 가져오는 데 실패했습니다", error);
//             }
//         };
//         fetchPlaceList(); // 함수 호출
//     }, []);
//     return(
//         <>
//          <button onClick={() => navigate(-1)}>돌아가기</button>
//         <div>
//         {places.length === 0 ? (
//                     <p>장소 목록이 비어 있습니다.</p> // 목록이 비어있을 때 메시지
//                 ) : (
//                     <ul>
//                         {places.map((place, index) => (
//                             <li key={index}>
//                                 {place.name} - {place.place} {place.id} {/* 장소 이름과 장소 정보 출력 */}
//                                 <button onClick={() => onClickHandler(place.id)}>즐찾넣기</button>
//                             </li>
//                         ))}
//                     </ul>
//                 )}
//         </div>
//         </>
//     )
// }
// export default PlaceTest;