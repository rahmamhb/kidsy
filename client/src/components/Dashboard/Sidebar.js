import logo from "../../assets/logo.png"
import { NavLink } from "react-router-dom";
import "../../styles/Dashboard/sidebar.css" ;
import DashboardIcon from '@mui/icons-material/DashboardRounded';
import OrderIcon from '@mui/icons-material/LocalMallRounded';
import InventoryIcon from '@mui/icons-material/StoreRounded';
import WebsiteIcon from '@mui/icons-material/LanguageRounded';
import LogoutIcon from '@mui/icons-material/LogoutRounded';
const Sidebar = () => {
    return ( 
        <div className="sidebar-container">
            <NavLink to="/dashboard" className="side-link-img" >
                    <img src={logo} alt='img-logo' className="img-logo"/>
            </NavLink>
            <div className="sidebar-links">
                <div className="sidebar-links-1">
                    <NavLink 
                        to="/dashboard"
                        className={({isActive})=>(isActive ? "active-side-link side-link" : "side-link")}
                    >
                        
                        <span><DashboardIcon></DashboardIcon></span>
                        <p>Dashboard</p>
                    </NavLink>
                    <NavLink 
                        to="/orders"
                        className={({isActive})=>(isActive ? "active-side-link side-link" : "side-link")}
                    >
                        
                        <span><OrderIcon></OrderIcon></span>
                        <p>Orders</p>
                    </NavLink>
                    <NavLink 
                        to="/stock"
                        className={({isActive})=>(isActive ? "active-side-link side-link" : "side-link")}
                    >
                        
                        <span><InventoryIcon></InventoryIcon></span>
                        <p>Inventory</p>
                    </NavLink>
                    <NavLink 
                        to="/website"
                        className={({isActive})=>(isActive ? "active-side-link side-link" : "side-link")}
                    >
                        
                        <span><WebsiteIcon></WebsiteIcon></span>
                        <p>Website</p>
                    </NavLink>

                </div>
                <NavLink 
                    to="/"
                    className={({isActive})=>(isActive ? "active-side-link side-link" : "side-link")}
                >
                    
                    <span><LogoutIcon></LogoutIcon></span>
                    <p>Logout</p>
                </NavLink>
            </div>
        </div>
     );
}
 
export default Sidebar;