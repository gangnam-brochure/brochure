/*
    작성자 : 손정원 2024-10-02 최초작성
    설명 : 즐겨찾기 누름 여부에 따른 논리값 true 일때 placeCode 저장
*/
import { create } from "zustand";

export const useFavorite = create((set) => ({
  placeData: [],
  favoriteOn: (placeDatas, nickname) => set((state) => {
    const isExisting = state.placeData.some(item => item.data.id === placeDatas.data.id && item.nickname === nickname);
    
    if (!isExisting) {
      return {
        placeData: [...state.placeData, { ...placeDatas, nickname }], // nickname 포함해서 저장
      };
    }
    return state;
  }),
  favoriteOff: (id) => set((state) => {
    return {
      placeData: state.placeData.filter(item => item.data.id !== id),
    };
  }),
}));




export const useReview = create((set) => ({
  reviewData: [],
  addReview: (placeId, text, nickname, placeName, categoryCode, rating) => {
    console.log("쥬스탠드 레이팅확인:", { placeId, text, nickname, placeName, categoryCode, rating }); // 로그 추가
    set((state) => ({
        reviewData: [
            ...state.reviewData, 
            { id: Date.now(), placeId, text, nickname, placeName, categoryCode, rating }
        ],
    }));
},
  updateReview: (reviewId, updatedText, updatedRating) => set((state) => ({
      reviewData: state.reviewData.map((review) => 
          review.id === reviewId ? { ...review, text: updatedText, rating: updatedRating } : review // Update rating
      ),
  })),
  deleteReview: (reviewId) => set((state) => ({
      reviewData: state.reviewData.filter((review) => review.id !== reviewId),
  })),
  
}));
