import { NavLink } from "react-router-dom";


const NavBar = () => {
    const activeStyle = {
        backgroundColor : "purple",
        color : "white"
    }

    return (
        <div>
            <ul>
                <li><NavLink to={"/main"}
                style={({isActive}) => isActive ? activeStyle : null}>
                    Home
                </NavLink>
                </li>
                <li><NavLink to={"/about"}
                style={({isActive}) => isActive ? activeStyle : null}>
                    소개
                </NavLink>
                </li>
                <li><NavLink to={"/menu"}
                style={({isActive}) => isActive ? activeStyle : null}>
                    메뉴목록
                </NavLink>
                </li>
            </ul>
        </div>
    )
}

export default NavBar;