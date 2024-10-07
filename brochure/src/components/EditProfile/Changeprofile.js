import { useState } from "react";
import Footer from "../Footer";
import Header from "../Header";
import { Navigate, useNavigate } from "react-router-dom";

const ChangeProfile = () => {
    const [user,setUser] = useState({name: "",gender:"",birth:"",food:""})
    const [user1,setUser1] = useState([]);
    const navigate = useNavigate(); // useNavigate 훅 사용
    const onChangeHandler = (e) =>
    {
        setUser1({
            ...user1,                          // 유저 전체를 가져와서 참조하고 e.target.name이 변하는곳을 밸류로 채워줌
            [e.target.name] : e.target.value // 
        })
    }
const handleBack = () => {

    navigate(-1); // 이전 페이지로 이동
}

    return (
        <>
        <Header/>
      <div className="mypage-container">

      <div className="back-button-container" style={{ textAlign: "right", marginBottom: "10px", marginTop: "15px" }}>
                    <button className="button" onClick={handleBack}>뒤로가기</button>
                </div>

        <h1>개인 정보 변경</h1>
        <div className="welcome-message">
          안녕하세요 님 정보를 변경하거나 수정해주세요
        </div>
        <label className="label">이름 : </label>
            <input type="text" 
            name="name" 
            placeholder="이름" 
            className="input-field" 
            onChange={onChangeHandler}/>
            
            <br/>
        <label className="label">성별 : </label>
            <input type="text" 
            name="gender" 
            placeholder="성별" 
            className="input-field" 
            onChange={onChangeHandler}/>
            
            <br/>
        <label className="label">생년월일 : </label>
            <input type="text" 
            name="birth" 
            placeholder="생년월일" 
            className="input-field" 
            onChange={onChangeHandler}/>
            
            <br/>
            <label className="label">좋아하는 음식 : </label>
            <input type="text" 
            name="food" 
            placeholder="좋아하는 음식" 
            className="input-field" 
            onChange={onChangeHandler}/>
            {/* 버튼을 모든 입력 필드 아래에 위치시킴 */}
            <div className="button-container" style={{ textAlign: "center", marginTop: "20px" }}>
                    <button className="button" >변경</button>
                </div> 
                
        <div className="button-group">
          
        </div>
      </div>
      <Footer/>
        </>
    )
}
export default ChangeProfile;