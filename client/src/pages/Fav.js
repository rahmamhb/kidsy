import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useState } from "react";
import prodImg from "../assets/socks.jpg"
import CloseIcon from '@mui/icons-material/CloseRounded';
import ArrowIcon from '@mui/icons-material/ArrowBackRounded';
import { NavLink } from "react-router-dom";
import "../styles/Fav.css"
const Fav = () => {
    const [favData, setFavData] = useState([
        { productID: 1, productImg: prodImg, productName: 'baby sockets', productPrice: 2500 , productDiscount : 0.4},
        { productID: 2, productImg: prodImg, productName: 'baby sockets', productPrice: 2500 , productDiscount : 0.4},
        { productID: 3, productImg: prodImg, productName: 'baby sockets', productPrice: 2500 , productDiscount : 0.4},
        { productID: 4, productImg: prodImg, productName: 'baby sockets', productPrice: 2500 , productDiscount : 0},
        { productID: 5, productImg: prodImg, productName: 'baby sockets', productPrice: 2500 , productDiscount : 1},
    ]);
    return ( 
        <div className="fav-page">
            <Navbar></Navbar>
            <div className="fav-container">
                <p className="fav-header">Favorites</p>
                <div className="cart-item-list">
                    <div className="cart-titles">
                        <p>Item </p>
                        <p>Description</p>
                        <p>Sub total</p>
                        <p>Quantity</p>
                    </div>
                    <div className="cart-elems">
                        {favData.map((product , index)=>(
                            <div className="cart-item">
                                <img src={product.productImg} alt="product img"/>
                                <div className="cart-item-txt">
                                    <p>{product.productName}</p>
                                    <p>{product.productPrice} DZD</p>
                                    <p>{product.productDiscount === 0 ? "/" : product.productDiscount*100 + " %" }</p>
                                </div>
                                <button className="remove-icon"><CloseIcon></CloseIcon></button>
                            </div>
                        ))}
                    </div>
                </div>
                <NavLink to ="/" className="add-new-product"><ArrowIcon></ArrowIcon> Back to shopping </NavLink>
            </div>
            <Footer></Footer>
        </div>
     );
}
 
export default Fav;