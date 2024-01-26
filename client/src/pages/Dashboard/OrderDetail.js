import { useParams } from "react-router-dom";
import Header from "../../components/Dashboard/Header";
import Sidebar from "../../components/Dashboard/Sidebar";
import prodImg from "../../assets/socks.jpg" ;
import EditIcon from '@mui/icons-material/ModeEditOutlineRounded';
import "../../styles/Dashboard/orderDetail.css"
import { useEffect, useState } from "react";
import axios from 'axios';

const OrderDetail = () => {
    const orderID = +useParams().orderID;
    
    const [status, setStatus] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [newStatus, setNewStatus] = useState(status);
    const [order , setOrder] = useState({})
    const [products , setProducts] = useState([])

    useEffect(() => {
        fetchOrder(orderID);
        fetchOrderProducts(orderID);
    }, []);

    const fetchOrder = async (orderID) => {
        try {
            const response = await axios.get(`http://localhost:3001/api/order/${orderID}`); 
            setOrder(response.data[0]);
            console.log(order.orderStatus)
            setStatus(order.orderStatus)
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
    const fetchOrderProducts = async (orderID) => {
        try {
            const response = await axios.get(`http://localhost:3001/api/order/order-products/${orderID}`); 
            console.log(response.data)
            setProducts(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
    const handleDeleteOrder = async (id) => {
        axios.delete(`http://localhost:3001/api/order/${id}`)
        .then(response =>{
            console.log('deleted successful:', response.data);
        })
        .catch(error => {
            console.error('Error deleting data:', error);
        })
    };
    const handleUpdateOrder = async (id) => {
        const data = {
            orderStatus : newStatus
        }
        axios.put(`http://localhost:3001/api/order/${id}` , data)
        .then(response =>{
            console.log('updated successful:', response.data);
        })
        .catch(error => {
            console.error('Error updating data:', error);
        })
    };

    const calculateTotalPrice = () => {
        return products.reduce((total, item) => total + item.productQuantityInCart * item.productPrice, 0);
    };
    const handleStatusClick = () => {
        setIsEditing(true);
    };

    const handleSaveStatus = () => {
        setStatus(newStatus);
        setIsEditing(false);
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
        setNewStatus(status); 
    };
    const handleClassName = (rowTitle) =>{
        switch(rowTitle){
          case "Delivered":
            return "status-row Delivered" ;
    
          case "Processing":
            return "status-row Processing" ;
    
          case "Confirmed":
            return "status-row Confirmed" ;
    
          case "Pending":
            return "status-row Pending" ;
    
          default : 
            return "";
        }
    
    }
    return ( 
        <div className="Dashboard-page">
            <Sidebar></Sidebar>
            <div className="order-detail-container">
                <p>#{order.orderID}</p>
                <div className="order-detail-content">
                    <p>Costumer name : <span>{order.orderCostumer}</span></p>
                    <p>Costumer contact : <span>{order.orderCostumerPhone}</span></p>
                    <p>Order date : <span>{order.orderDate}</span></p>
                    <div className="status-section">
                        <p>Status: {isEditing ? <input type="text" value={newStatus} onChange={(e)=>setNewStatus(e.target.value)} /> : <span className={handleClassName(status)}>{status}</span>}</p>
                        {isEditing ? (
                            <div className="status-section-btn">
                            <button onClick={()=>{handleUpdateOrder(order.orderID)}} className="order-save-btn">Save</button>
                            <button onClick={handleCancelEdit} className="order-cancel1-btn">Cancel</button>
                            </div>
                        ) : (
                            <div>
                            <button onClick={handleStatusClick} className="order-edit-btn"><EditIcon></EditIcon></button>
                            </div>
                        )}
                    </div>
                    <div className="cart-total">
                        <p className="total-head">Order products</p>
                        <div className="cart-total-elems">
                            {products.map((product , index)=>{ 
                            return (
                                <div className="cart-item">
                                    <img src={`http://localhost:3001/api/blog/images/${product.productImg}`} alt="product img"/>
                                    <div className="cart-item-txt">
                                        <p>{product.productName}</p>
                                        <p>{product.productCartQuantity}</p>
                                        <p>{product.productPrice} DZD</p>
                                    </div>
                                </div>
                            )})}
                        </div>
                        <div className="total-footer">
                            <p>Total</p>
                            <p>{calculateTotalPrice()} DZD</p>
                        </div>
                    </div>
                    <div className="order-btn-section">
                        <button className="order-delete-btn" onClick={()=>{handleDeleteOrder(order.orderID)}}>Delete</button>
                        <button className="order-cancel-btn">Cancel</button>
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default OrderDetail;