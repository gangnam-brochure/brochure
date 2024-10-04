/* 
    점포 상세 페이지에서 내가 등록한 리뷰를 등록후
    그 리뷰의 정보를 가져와서 점포 이름 등등 정보 나열후 밑에
    내가 쓴 리뷰 좌르륵
    
    수정 삭제 가능해야함

*/
import React from "react";
export const Reviews = ({ opinion }) => {
    
    return (
        <div style={{ padding: "20px", marginTop: "200px" }}>
            <p>후기: {opinion}</p>
        </div>
    );
};

