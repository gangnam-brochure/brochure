
import {useState,useEffect} from "react";
import { getFavoList } from "../../Api/BrochureApi";
export const Favorite = () => {
  
    const [favoList,setFavoList] = useState([]);

    useEffect(()=>{
        setFavoList(getFavoList);
    },[]);
  return(
    <div>
        {favoList.map((item, index) => (
                <div key={index}> 
                <li>{item.name} {item.place} </li>
                </div>
            ))} 
    </div>
  )};