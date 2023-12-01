import logoImg from "../assets/logo.png"
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TelegramIcon from '@mui/icons-material/Telegram';
import FacebookIcon from '@mui/icons-material/FacebookRounded';
import "../styles/Footer.css"
import { NavLink } from "react-router-dom";
let categoriesData = [
    {categoryID : 1 , categoryName : "baby gear"} ,
    {categoryID : 2 , categoryName : "Nursery furniture"} ,
    {categoryID : 3 , categoryName : "gift set"} ,
    {categoryID : 4 , categoryName : "mothering tools"} ,
]
//fetch 4 main gategories
const Footer = () => {
    return ( 
        <div className="footer-container">
            <div className="footer-section1">
                <img src={logoImg} alt="logo img"/>
                <p>© 2023 kidsy by rahma mihoub Terms of Service  | Privacy Policy</p>
                <NavLink>_</NavLink>
            </div>
            <div className="footer-section2">
                <div className="footer-list">
                    <p>Categories</p>
                    <div className="footer-list-elem">
                        {categoriesData.map((category , index)=>(
                            <NavLink key={category.categoryID}>{category.categoryName}</NavLink>
                        ))}
                    </div>
                </div>
                <div className="footer-list">
                    <p>About Us</p>
                    <div className="footer-list-elem">
                        <p>About kidsy</p>
                        <p>Contact us</p>
                        <p>Features</p>
                    </div>
                </div>
                <div className="footer-list">
                    <p>Resouces</p>
                    <div className="footer-list-elem">
                        <p>Help center</p>
                        <p>Server status</p>
                        <p>Blog</p>
                    </div>
                </div>
                <div className="footer-list">
                    <p>Get In Touch</p>
                    <div className="footer-list-elem">
                        <p>Question or feedback ?</p>
                        <p>we‘d love to hear from you</p>
                        <span><FacebookIcon></FacebookIcon> <LinkedInIcon></LinkedInIcon> <TelegramIcon></TelegramIcon></span>
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default Footer;