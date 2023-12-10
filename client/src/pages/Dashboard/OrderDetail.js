import { useParams } from "react-router-dom";
import Header from "../../components/Dashboard/Header";
import Sidebar from "../../components/Dashboard/Sidebar";
import prodImg from "../../assets/socks.jpg" ;
import EditIcon from '@mui/icons-material/ModeEditOutlineRounded';
import "../../styles/Dashboard/orderDetail.css"
import { useState } from "react";

const OrderDetail = () => {
    const orderID = useParams().orderID;
    const [order , setOrder] = useState({
            orderID : 10269 , orderCost : 2500 , orderCostumer : "Mihoub Rahma" , orderCostumerPhone : "0666666666" , orderDate : "26/10/2023" , orderStatus : "Delivered" ,
            products : 
            [{ productID: 1, productImg: prodImg, productName: 'baby sockets', productPrice: 2500, productCartQuantity: 2 },
            { productID: 2, productImg: prodImg, productName: 'baby sockets', productPrice: 2500, productCartQuantity: 2 },
            { productID: 3, productImg: prodImg, productName: 'baby sockets', productPrice: 2500, productCartQuantity: 2 },]
    })
    const [status, setStatus] = useState(order.orderStatus);
    const [isEditing, setIsEditing] = useState(false);
    const [newStatus, setNewStatus] = useState(status);

    const calculateTotalPrice = () => {
        return order.products.reduce((total, item) => total + item.productCartQuantity * item.productPrice, 0);
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
                            <button onClick={handleSaveStatus} className="order-save-btn">Save</button>
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
                            {order.products.map((product , index)=>{ 
                            return (
                                <div className="cart-item">
                                    <img src={product.productImg} alt="product img"/>
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
                        <button className="order-delete-btn">Delete</button>
                        <button className="order-cancel-btn">Cancel</button>
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default OrderDetail;