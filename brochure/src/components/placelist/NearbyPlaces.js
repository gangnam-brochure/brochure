/*
    작성자 : 최예지 - 2024-10-02 / 최초 작성
    설명 : 네이버 지도 기반으로 장소 정보 불러오기
*/ 

const NearbyPlaces = () =>
{
    // 지도 옵션 생성
    var mapOptions = {
        center: new naver.maps.LatLng(37.3595704, 127.105399),
        zoom: 10
    }

    //지도 생성
    var map = new naver.maps.Map('map', {
        center: new naver.maps.LatLng(37.3595704, 127.105399),
        zoom: 10
    });
}

export default NearbyPlaces;