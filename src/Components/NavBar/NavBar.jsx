
import "./navBar.css"
import menu_icon from "../../assets/menu.png"
import logo3 from "../../assets/logo3.png"
import Search_icon from "../../assets/search.png"
import upload_icon from "../../assets/upload.png"
import more_icon from "../../assets/more.png"
import notification_icon from "../../assets/notification.png"
import profile_icon from "../../assets/Sherlin2.png"
import { Link } from "react-router-dom"

// eslint-disable-next-line react/prop-types
const NavBar = ({setSidebar}) => {
  return (
    <div>
      <nav className="flex-div">
        <div className="nav-left flex-div">
            <img  className='menu-icon'src={menu_icon} onClick={()=>setSidebar(prev=>prev===false?true:false)} alt="" />
            <Link to='/' ><img className="logo" src={logo3} alt="" /></Link>
        </div>

        <div className="nav-middle flex-div">
            <div className="search-box flex-div">

                <input   type="text" placeholder="Search"/>
                <img className="logo" src={Search_icon} alt=""/>
            </div>
            
        </div>

        <div className="nav-right flex-div">
            <img src={upload_icon} alt="" />
            <img src={more_icon} alt="" />
            <img src={notification_icon} alt="" />
            <img src={profile_icon} className="user-icon" alt="" />
        </div>

      </nav>
    </div>
  )
}

export default NavBar
