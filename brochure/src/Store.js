/*
    작성자 : 손정원 2024-10-02 최초작성
    설명 : 즐겨찾기 누름 여부에 따른 논리값 true 일때 placeCode 저장
*/
import { create } from "zustand";

export const useFavorite = create((set) => ({
  placeData: [],
  review : [],
  reviewPlace : [],
  favoriteOn: (placeDatas) => set((state) => {
    console.log(placeDatas, "쥬스탠드");
    // 이미 존재하는 데이터인지 확인
    const isExisting = state.placeData.some(item => item.data.id === placeDatas.data.id);
    // 중복이 아닐 경우에만 추가
    if (!isExisting) {
      return {
        placeData: [...state.placeData, placeDatas],
      };
    } 
    return state; // 중복일 경우 상태를 변경하지 않음
  }),
  favoriteOff: (id) => set((state) => {
    console.log(id, "쥬 삭제"); // 로그를 상태 업데이트 전에 출력
    return {
      placeData: state.placeData.filter(item => item.data.id !== id),
    };
  }),
  addReview: (review, place) => set((state) => ({
    reviewPlace: [...state.reviewPlace, place],
    review:[...state.review, review],
})),

deleteReview: (reviewIndex) => set((state) => ({
    reviewPlace: state.reviewPlace.filter((index) => index !== reviewIndex)
})),

editReview: (newReview, index) => set((state) => {
    const updatedReviews = [...state.reviewPlace];
    updatedReviews[index].review = newReview;
    return { reviewPlace: updatedReviews };
}),
}));