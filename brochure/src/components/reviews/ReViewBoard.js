import {useState } from "react";
import { useNavigate } from "react-router-dom";
/* 
    
*/


const ReviewBoard= ()=>{

    const [opinion,setOpinion] = useState('');
    const onChangeOpinion=e=>setOpinion(e.target.value);
    const navi = useNavigate();
     const onClickHandler=()=>{
        navi("/reviews",{state:{opinion}});
        }   
    return(
            <>
            <p>후기 : <input type="text" placeholder="후기 내용 입력해주세요" onChange={onChangeOpinion} /></p>
            <button onClick={onClickHandler}>등록</button>
            </>
    )}      
export default ReviewBoard;