import Sidebar from "../../components/Dashboard/Sidebar";
import Header from "../../components/Dashboard/Header";
import { useEffect, useState } from "react";
import TableOrder from "../../components/Dashboard/TableOrder";
import axios from 'axios';
const Orders = () => {
    const [orderData , setOrderData] = useState([])
    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const response = await axios.get('http://localhost:3001/api/order/'); 
            console.log(response.data)
            setOrderData(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
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