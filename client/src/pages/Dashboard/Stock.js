import "../../styles//Dashboard/stock.css"

import Sidebar from "../../components/Dashboard/Sidebar";
import Header from "../../components/Dashboard/Header";
import { useState } from "react";
import TableStock from "../../components/Dashboard/TableStock";
import { NavLink } from "react-router-dom";
import ArrowIcon from '@mui/icons-material/ArrowBackRounded';
import prodImg from "../../assets/socks.jpg"
import prodImg1 from "../../assets/blog3.jpg" 
import prodImg2 from "../../assets/blog7.jpg" 
const Stock = () => {
    const [stockData , setStockData] = useState([
        {productID : 1 , productName : "Product name" , productCategory : "toys", productQuantity : 10 , productRating : 4.5 , productReviewsNbr : "15" , productPrice : "2500"  , productImg : prodImg , productImg1 : prodImg1 , productImg2 : prodImg2 , productColor1 : "249 233 251" , productColor2 : "89 126 181" , productColor3 : "240 193 196" , productDiscount : 0.4 , productDiscription : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam malesuada nunc eros, sit amet fringilla erat tincidunt eu.  Aliquam malesuada nunc eros, sit amet fringilla erat tincidunt eu"},
        {productID : 2 , productName : "Product name",productCategory : "toys", productQuantity : 50  , productRating : 3 , productReviewsNbr : "15" , productPrice : "3500", productImg : prodImg , productImg1 : prodImg , productImg2 : prodImg , productColor1 : "249 233 251" , productColor2 : "89 126 181" , productColor3 : "240 193 196" , productDiscount : 0.4, productDiscription : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam malesuada nunc eros, sit amet fringilla erat tincidunt eu.  Aliquam malesuada nunc eros, sit amet fringilla erat tincidunt eu"},
        {productID : 3 , productName : "Product name", productCategory : "toys",productQuantity : 9  , productRating : 5 , productReviewsNbr : "15" , productPrice : "2500", productImg : prodImg , productImg1 : prodImg , productImg2 : prodImg , productColor1 : "249 233 251" , productColor2 : "89 126 181" , productColor3 : "240 193 196" , productDiscount : 0.4, productDiscription : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam malesuada nunc eros, sit amet fringilla erat tincidunt eu.  Aliquam malesuada nunc eros, sit amet fringilla erat tincidunt eu"},
        {productID : 4 , productName : "Product name",productCategory : "toys", productQuantity : 0  , productRating : 4 , productReviewsNbr : "15" , productPrice : "2500", productImg : prodImg , productImg1 : prodImg , productImg2 : prodImg , productColor1 : "249 233 251" , productColor2 : "89 126 181" , productColor3 : "240 193 196" , productDiscount : 0.5, productDiscription : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam malesuada nunc eros, sit amet fringilla erat tincidunt eu.  Aliquam malesuada nunc eros, sit amet fringilla erat tincidunt eu"},
        {productID : 5 , productName : "Product name",productCategory : "toys", productQuantity : 5  , productRating : 4 , productReviewsNbr : "15" , productPrice : "5500", productImg : prodImg , productImg1 : prodImg , productImg2 : prodImg , productColor1 : "249 233 251" , productColor2 : "89 126 181" , productColor3 : "240 193 196" , productDiscount : 0, productDiscription : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam malesuada nunc eros, sit amet fringilla erat tincidunt eu.  Aliquam malesuada nunc eros, sit amet fringilla erat tincidunt eu"},
    ])
    
    return ( 
        <div className="Dashboard-page">
            <Sidebar></Sidebar>
            <div className="dashboard-container">
                <Header></Header>
                <div className="dashboard-content">
                    <p>stock</p>
                    <div className="stock-content1">
                        <TableStock data={stockData}></TableStock>
                        <NavLink to ="/stock/add-product" className="add-new-product"><ArrowIcon></ArrowIcon> Add New Product</NavLink>
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default Stock;
