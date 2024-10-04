/* 
    작성자 : 손정원 2024-10-02 최초일자
    설명 : 즐겨찾기 해당 Placecodes를 받아 점포에 해당정보 반환
*/
import place from "../data/ex.json";

export function getFavoList(){
    return place;
}
export function getPlaceDetail(placeId){
    return place.filter(places=> places.id===parseInt(placeId));
}
