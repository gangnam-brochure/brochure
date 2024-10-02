
import {useState,useEffect} from "react";
import { getFavoList } from "../../Api/BrochureApi";
import { useNavigate } from "react-router-dom";
export const Favorite = () => {
    const navigate = useNavigate();
    const [favoList,setFavoList] = useState([]);
 
    useEffect(()=>{
        setFavoList(getFavoList);
    },[]);
  return(
    <>
    <div>
    <button onClick={()=> navigate(-1)}>돌아가기</button>
        {favoList.map((item, index) => (
                <div key={index}> 
                <li>{item.name} {item.place} </li>
                </div>
            ))} 
    </div>
    </>
  )};