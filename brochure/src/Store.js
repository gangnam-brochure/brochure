/*
    작성자 : 손정원 2024-10-02 최초작성
    설명 : 즐겨찾기 누름 여부에 따른 논리값 true 일때 placeCode 저장
*/
import {create} from "zustand";

const userBookMark = create((set)=>({
    
    isBookMark : false,
    placeCode : [],
    
    bookmark: (placeCode) => set((state) => ({
        isBookMark: true,
        placeCodes: [...state.placeCodes, placeCode] 
    })),

    bookmarkCancle: (placeCode) => set((state) => ({
        isBookMark: state.placeCodes.length > 1, // 배열에 남아있는 북마크가 있는지 확인
        placeCodes: state.placeCodes.filter(code => code !== placeCode), // 해당 placeCode 제거
    })),
    
}));