import Navbar from "../components/Navbar";
import Footer from "../components/Footer"
import "../styles/Cart.css"
import prodImg from "../assets/socks.jpg"
import CloseIcon from '@mui/icons-material/CloseRounded';
import ArrowIcon from '@mui/icons-material/ArrowBackRounded';
import { useState , useEffect} from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";

const Cart = () => {

    const [cartData, setCartData] = useState([]);
 
    useEffect(() => {
        fetchCartElement(1);
    }, [cartData]);

    const updateQuantity = (id, value) => {
        setCartData((prevCartData) =>
            prevCartData.map((item) =>
                item.productID === id
                    ? { ...item, productCartQuantity: Math.max(0, item.productCartQuantity + value) }
                    : item
            )
        );
    };
    const fetchCartElement = async (cartId) => {
        try {
            const response = await axios.get(`http://localhost:3001/api/cart-product/${cartId}`); ;
            setCartData(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
    const handleDeleteProduct = async (cartId , productId) => {
        axios.delete(`http://localhost:3001/api/cart-product/${cartId}/${productId}`)
        .then(response =>{
            console.log('deleted successful:', response.data);
        })
        .catch(error => {
            console.error('Error updating data:', error);
        })
    };
    const handleUpdateQuantity= async (cartId , productId , quantity) => {
        const data = {
            productQuantityInCart : quantity
        }
        axios.put(`http://localhost:3001/api/cart-product/${cartId}/${productId}` , data)
        .then(response =>{
            console.log('deleted successful:', response.data);
        })
        .catch(error => {
            console.error('Error updating data:', error);
        })
    };
    
    const calculateTotalPrice = () => {
        return cartData.reduce((total, item) => total + item.productCartQuantity * item.productPrice, 0);
    };
    //add error page depending on cartData lenght
    return ( 
        <div className="cart-page">
            <Navbar></Navbar>
            <div className="cart-container">
                {cartData.length === 0 && (<p className="error-cart">Your cart is currently empty.</p>)}
                {cartData.length > 0 && (
                
                <div className="cart-section1">
                    <div className="cart-item-list">
                        <div className="cart-titles">
                            <p>Item </p>
                            <p>Description</p>
                            <p>Sub total</p>
                            <p>Quantity</p>
                        </div>
                        <div className="cart-elems">
                            {cartData.map((product , index)=>(
                                <div className="cart-item">
                                    <img src={`http://localhost:3001/api/blog/images/${product.productImg}`} alt="product img"/>
                                    <div className="cart-item-txt">
                                        <p>{product.productName}</p>
                                        <p>{product.productPrice} DZD</p>
                                    </div>
                                    <div className='counter'>
                                        <button onClick={() => handleUpdateQuantity(1 , product.productID , -1)}>-</button>
                                        <p>{product.productCartQuantity}</p>
                                        <button onClick={() => handleUpdateQuantity(1 , product.productID , 1)}>+</button> 
                                    </div>
                                    <button className="remove-icon" onClick={()=>handleDeleteProduct(1 , product.productID)}><CloseIcon></CloseIcon></button>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="cart-total">
                        <p className="total-head">Total</p>
                        <div className="cart-total-elems">
                            {cartData.map((product , index)=>{ 
                            if (product.productCartQuantity > 0){
                            return (
                                <div className="cart-item">
                                    <img src={`http://localhost:3001/api/blog/images/${product.productImg}`} alt="product img"/>
                                    <div className="cart-item-txt">
                                        <p>{product.productName}</p>
                                        <p>{product.productCartQuantity}</p>
                                        <p>{product.productPrice} DZD</p>
                                    </div>
                                </div>
                            )}})}
                        </div>
                        <div className="total-footer">
                            <p>Total</p>
                            <p>{calculateTotalPrice()} DZD</p>
                        </div>
                    </div>
                </div>
                )}
                <div className="cart-section2">
                    <NavLink to ="/" className="add-new-product"><ArrowIcon></ArrowIcon> Add New Product</NavLink>
                    {cartData.length > 0 && <NavLink to ="/checkout" className="checkout">Checkout</NavLink>}
                    
                </div>
            </div>
            <Footer></Footer>
        </div>

        
     );
}
 
export default Cart;