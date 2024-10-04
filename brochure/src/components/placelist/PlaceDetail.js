/*
    작성자 : 최예지 - 2024-10-04 / 최초 작성
    설명 : 네이버 지도 기반으로 장소 세부 정보 불러오기
*/

import '../../assets/css/categories.css';

const PlaceDetail = () =>
{
    //장소 눌렀을 때 해당 장소에 관한 데이터 리턴해주셈

    // 불러왔을 때 있어야 되는거
    // 장소 이름
    // 지도
    // 주소
    // 전화번호 ** 필수
    // 즐겨찾기 클릭 할수잇는 버튼
    console.log("Place Detail Called");
    const onClickFavorite = () =>
    {
        console.log("즐겨찾기 설정");
    }

    const onClickBack = () =>
    {
        console.log("뒤로 가세요");
        //navigate(`/${categoryCode}`);
    }

    return(
        <div className="categories-container">
            <h2 className="categories-title"> 〓〓〓〓〓〓〓〓〓〓 </h2>
            {/* <h3> {data.place_name} </h3>
            <p>{data.phone}</p>
            <p>{data.address_name}</p> */}
            <button onClick={onClickFavorite}>즐찾</button>
            <button onClick={onClickBack}>돌아가기</button>
        </div>
    )
}

export default PlaceDetail;