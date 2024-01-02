import "../../styles//Dashboard/stock.css"

import Sidebar from "../../components/Dashboard/Sidebar";
import Header from "../../components/Dashboard/Header";
import { useEffect, useState } from "react";
import TableStock from "../../components/Dashboard/TableStock";
import { NavLink } from "react-router-dom";
import ArrowIcon from '@mui/icons-material/ArrowBackRounded';
import axios from 'axios';
const Stock = () => {
    const [stockData , setStockData] = useState([])
    useEffect(()=>{
        fetchProduct();
    },[stockData])

    const fetchProduct = async () => {
        try {
            const response = await axios.get('http://localhost:3001/api/product/'); 
            setStockData(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
    const handleDeleteProduct = async (id) => {
        axios.delete(`http://localhost:3001/api/product/${id}`)
        .then(response =>{
            console.log('deleted successful:', response.data);
        })
        .catch(error => {
            console.error('Error updating data:', error);
        })
    };
    return ( 
        <div className="Dashboard-page">
            <Sidebar></Sidebar>
            <div className="dashboard-container">
                <Header></Header>
                <div className="dashboard-content">
                    <p>stock</p>
                    <div className="stock-content1">
                        <TableStock data={stockData} OnDeleteProduct={handleDeleteProduct}></TableStock>
                        <NavLink to ="/stock/add-product" className="add-new-product"><ArrowIcon></ArrowIcon> Add New Product</NavLink>
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default Stock;
