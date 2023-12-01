import "../styles/Navbar.css"
import { NavLink } from 'react-router-dom';
import FavoriteIcon from '@mui/icons-material/FavoriteBorderOutlined';
import CartIcon from '@mui/icons-material/ShoppingBagOutlined';
import logo from "../assets/logo.png"
const Navbar = () => {
    return ( 
        <div className='nav-container'>
            <div className='nav-list-1'>
                <NavLink to="/"  >
                    <img src={logo} alt='img-logo' className="img-logo"/>
                </NavLink>
                <NavLink 
                    to="/"
                    className={({isActive})=>(isActive ? "active-nav-link nav-link" : "nav-link")}
                >
                    <p>Shop</p>
                    <span className="underline"></span>
                </NavLink>

                <NavLink 
                    to="/blog"
                    className={({isActive})=>(isActive ? "active-nav-link nav-link" : "nav-link")}
                > 
                    <p>Blogs</p>
                    <span className="underline"></span>
                </NavLink>

                <NavLink 
                    to="/Faq"
                    className={({isActive})=>(isActive ? "active-nav-link nav-link" : "nav-link")}
                >
                    <p>FAQ</p>
                    <span className="underline"></span>
                </NavLink>
            </div>
            <div className='nav-list-2'>
                <NavLink to="/cart" className= {({isActive})=>{return isActive? "active-cart-opt cart-opt":"cart-opt"}}> 
                    <CartIcon></CartIcon>
                </NavLink>

                <NavLink to="/favorites" className= {({isActive})=>{return isActive? "active-fav-opt fav-opt":"fav-opt"}}> 
                    <FavoriteIcon></FavoriteIcon>
                </NavLink>
            </div>
        </div>
     );
}
 
export default Navbar;