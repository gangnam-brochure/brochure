/*
    작성자 : 손정원 2024-10-02 최초작성
    설명 : 즐겨찾기 누름 여부에 따른 논리값 true 일때 placeCode 저장
*/
import { create } from "zustand";

const useBookMark = create((set) => ({
  isBookMark: false,
  placeCodes: [], 
  
  bookmark: (placeCode) => set((state) => {
    // 이미 존재하는 코드인지 확인
    if (!state.placeCodes.includes(placeCode)) {
        console.log(placeCode);
      return {
        isBookMark: true,
        placeCodes: [...state.placeCodes, placeCode], 
      };
    }
    return state; // 중복일 경우 상태를 변경하지 않음
  }),

  bookmarkCancle: (placeCode) => set((state) => ({
    isBookMark: state.placeCodes.length > 1, 
    placeCodes: state.placeCodes.filter(code => code !== placeCode),
  })),
}));

export default useBookMark;