import SearchIcon from '@mui/icons-material/SearchRounded';
import "../../styles/Dashboard/header.css"
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import NotificationsIcon from '@mui/icons-material/NotificationsNoneRounded';
const Header = () => {
    const [searchQuery , setSearchQuery] = useState("");
    return ( 
        <div className="header-container justify-end">
            <div className="rec-right-search">
                <SearchIcon></SearchIcon>
                <input type="text" placeholder="Search..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} ></input>
            </div> 
            <NavLink to ="/notifications" className="notif-opt">
                <NotificationsIcon></NotificationsIcon>
            </NavLink>
        </div>
    );
}
 
export default Header;