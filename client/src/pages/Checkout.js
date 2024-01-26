import { useState , useEffect } from "react";
import "../styles/Checkout.css"
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from 'axios';

const Checkout = () => {
    const [wilayaData ,setWilayaData] = useState([{}])
    const [cartData, setCartData] = useState([]);

    useEffect(() => {
        fetchWilayaData();
    }, []);
    useEffect(() => {
        fetchCartElement(1);
    }, [cartData]);
    const fetchCartElement = async (cartId) => {
        try {
            const response = await axios.get(`http://localhost:3001/api/cart-product/${cartId}`); ;
            setCartData(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
    const fetchWilayaData = async () => {
        try {
            const response = await axios.get('http://localhost:3001/api/wilaya/'); 
            setWilayaData(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    const [clientFisrtName , setClientFisrtName] = useState("") ;
    const [clientLastName , setClientLastName] = useState("") ;
    const [clientPhone , setClientPhone] = useState(0) ;
    const [clientEmail , setClientEmail] = useState("") ;
    const [wilaya , setWilaya] = useState(wilayaData[0].wilayaID) ;
    const [fullAdress , setFullAdress] = useState("") ;
    const [zipCode, setzipCode] = useState(0) ;
    const [oredrNotes , setOrderNotes] = useState("") ;
    const [DeliveryPrice , setDeliveryPrice] = useState(0) ;

    function handleWilayaChange(event) {
        const selectedWilayaName = event.target.value;
        if(wilayaData.length > 0 ){
            const selectedWilaya = wilayaData.find(wilaya => wilaya.wilayaName === selectedWilayaName);
            setDeliveryPrice(selectedWilaya.deliveryPrice);
            setWilaya(selectedWilaya.wilayaID)

            console.log(wilaya)
            console.log(selectedWilaya.wilayaID)
        }

    }
    const handleOrderSubmit = ()=>{
        const formData = new FormData()
        formData.append('cartID', 1);
        formData.append('clientFisrtName', clientFisrtName);
        formData.append('clientLastName', clientLastName);
        formData.append('clientPhone', clientPhone);
        formData.append('clientEmail', clientEmail);
        formData.append('wilaya', wilaya);
        formData.append('fullAdress', fullAdress);
        formData.append('zipCode', zipCode);
        const data = {
            cartID: 1,
            clientFisrtName: clientFisrtName,
            clientLastName: clientLastName,
            clientPhone: clientPhone,
            clientEmail: clientEmail,
            wilaya: wilaya,
            fullAdress: fullAdress,
            zipCode: zipCode
        };
        axios.post('http://localhost:3001/api/order/' , data)
        .then(res =>{
            if(res.data.staus === "Success"){
                console.log("succeded")
            }
            else{
                console.log("failed")
            }
        })
        .catch(err => console.log(err))

    }
    const calculateTotalPrice = () => {
        const total =  cartData.reduce((total, item) => total + item.productCartQuantity * item.productPrice, 0);
        return total + DeliveryPrice 
    };
    return ( 
        <div className="checkout-page-container">
            <Navbar></Navbar>
            <div className="checkout-page">
                <p className="checkout-header">Billing details</p>
                <form className="checkout-container-form" onSubmit={handleOrderSubmit}>
                    <div className="checkout-inputs">
                        <div className="form-mini-section">
                            <div class="label-float">
                                <input type="text" placeholder=" " value={clientFisrtName} onChange={(e)=>{ setClientFisrtName(e.target.value)}} required/>
                                <label>First Name</label>
                            </div>
                            <div class="label-float">
                                <input type="text" placeholder="" value={clientLastName} onChange={(e)=>{ setClientLastName(e.target.value)}} required/>
                                <label>Family Name</label>
                            </div>
                        </div>
                        <div class="label-float">
                            <input type="tel" pattern="0[5-7][0-9]{8}" placeholder="065 666 666  " value={clientPhone} onChange={(e)=>{ setClientPhone(e.target.value)}} required/>
                            <label>Phone</label>
                        </div>  
                        <p className="country"> Country : <span>Algeria</span></p> 
                        <select value={wilaya} onChange={handleWilayaChange} required>
                            {wilayaData.map(wilaya => (
                                <option value={wilaya.wilayaName}>{wilaya.wilayaName}</option>
                            ))}
                        </select>
                        <div className="form-mini-section">
                            <div class="label-float">
                                <input type="text" placeholder="" value={fullAdress} onChange={(e)=>{ setFullAdress(e.target.value)}} required/>
                                <label>Full address</label>
                            </div>
                            <div class="label-float">
                                <input type="text" pattern="([1-9]|[1-4][0-9]|5[0-8])\d{3}" inputmode="numeric" placeholder="24005" value={zipCode} onChange={(e)=>{ setzipCode(e.target.value)}} required/>
                                <label>Zipcode</label>
                            </div>
                        </div>
                        <div class="label-float">
                            <input type="email" placeholder="" value={clientEmail} onChange={(e)=>{ setClientEmail(e.target.value)}} required/>
                            <label>Email</label>
                        </div>
                        <div className="text-area">
                            <label>Order notes</label>
                            <textarea placeholder="Notes about your order , special notes for delivery" value={oredrNotes} onChange={(e)=>{ setOrderNotes(e.target.value)}} ></textarea>
                        </div>    
                    </div>
                    <div className="checkout-total">
                        <p className="total-head">Your order</p>
                        <span className="span-bord">
                            <p>PRODUCT</p>
                            <p>SUBTOTAL</p>
                        </span>
                        <div className="checkout-total-elems">
                            {cartData.map((product , index)=>(
                                <div className="checkout-total-item">
                                    <p>{product.productName}</p>
                                    <p>{product.productPrice} DZD</p>
                                    <p>x {product.productCartQuantity}</p>
                                </div>
                            ))}
                        </div>
                        <span className="span-bord">
                            <p>SHIPPING</p>
                        </span>
                        <span className="Delivery-txt">
                            <p>livraison vers wilaya</p>
                            <p className="bold">{DeliveryPrice} DZD</p>   
                        </span>
                        <span className="span-bord">
                            <p>TOTAL</p>
                            <p className="bold">{calculateTotalPrice()} DZD</p>
                        </span>
                        <p className="txt-1">Cash on delivery</p>
                        <button className="order-btn" type="submit" >PLACE OREDER</button>
                        <span className="remarque">
                        Your personal data will be used to process your order, support your experience throughout this website, and for other purposes described in our privacy policy. 
                        </span>
                    </div>
                </form>
            </div>
            <Footer></Footer>
        </div>
     );
}
 
export default Checkout;