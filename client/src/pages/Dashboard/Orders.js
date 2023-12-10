import Sidebar from "../../components/Dashboard/Sidebar";
import Header from "../../components/Dashboard/Header";
import { useState } from "react";
import TableOrder from "../../components/Dashboard/TableOrder";
const Orders = () => {
    const [orderData , setOrderData] = useState([
        {orderID : 10269 , orderCost : 2500 , orderCostumer : "Mihoub Rahma" , orderDate : "26/10/2023" , orderStatus : "Delivered"},
        {orderID : 10266 , orderCost : 2500 , orderCostumer : "Mihoub Rahma" , orderDate : "26/10/2023" , orderStatus : "Processing"},
        {orderID : 10261 , orderCost : 2500 , orderCostumer : "Mihoub Rahma" , orderDate : "26/10/2023" , orderStatus : "Pending"},
        {orderID : 10263 , orderCost : 2500 , orderCostumer : "Mihoub Rahma" , orderDate : "26/10/2023" , orderStatus : "Confirmed"},
        {orderID : 10268 , orderCost : 2500 , orderCostumer : "Mihoub Rahma" , orderDate : "26/10/2023" , orderStatus : "Delivered"},
        {orderID : 10265 , orderCost : 2500 , orderCostumer : "Mihoub Rahma" , orderDate : "26/10/2023" , orderStatus : "Delivered"},
    ])
    return ( 
        <div className="Dashboard-page">
            <Sidebar></Sidebar>
            <div className="dashboard-container">
                <Header></Header>
                <div className="dashboard-content">
                    <p>Orders</p>
                    <div className="order-content1">
                        <TableOrder data={orderData}></TableOrder>
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default Orders;