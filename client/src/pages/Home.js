import Navbar from "../components/Navbar";
import Categories from "../components/Categories";
import homeIllu from "../assets/home-illu.png"
import SearchIcon from '@mui/icons-material/SearchRounded';
import "../styles/Home.css"
import PopularProd from "../components/PopularProd";
import BlogHome from "../components/BlogHome";
import Footer from "../components/Footer";
const Home = () => {
    return ( 
        <div className="home-page">
            <Navbar></Navbar>
            <div className="rec-home">
                <div className="rec-right">
                    <p className="rec-right-txt"><span>Kid's paradise, </span> Shop with joy!</p>
                    <div className="rec-right-search">
                        <SearchIcon></SearchIcon>
                        <input type="text" placeholder="Search..."></input>
                    </div>   
                </div>
                <img  src={homeIllu} alt="home-illu"/>
            </div>
            <Categories></Categories>
            <PopularProd></PopularProd>
            <BlogHome></BlogHome>
            <Footer></Footer>
        </div>
     );
}
 
export default Home;