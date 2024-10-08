/*
    작성자 : 손정원 2024-10-02 최초작성
    설명 : 즐겨찾기 누름 여부에 따른 논리값 true 일때 placeCode 저장
*/
import { create } from "zustand";

export const useFavorite = create((set) => ({
  placeData: [],

  favoriteOn: (placeDatas) => set((state) => {
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
    return {
      placeData: state.placeData.filter(item => item.data.id !== id),
    };
  }),
}));
export const useReview = create((set) => ({
    reviewData: [],
    addReview: (placeId, text, nickname, placeName,categoryCode) => set((state) => ({
        reviewData: [...state.reviewData, { id: Date.now(), placeId, text, nickname, placeName,categoryCode }],
    })),
    updateReview: (reviewId, updatedText) => set((state) => ({
        reviewData: state.reviewData.map((review) => 
            review.id === reviewId ? { ...review, text: updatedText } : review
        ),
    })),
    deleteReview: (reviewId) => set((state) => ({
        reviewData: state.reviewData.filter((review) => review.id !== reviewId),
    })),
}));
