import { useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import prodImg from "../assets/socks.jpg" 
const Category = () => {
    const [productsData , setProductData] = useState([
        {productID : 1 , productName : "Product name" , productRating : 4.5 , productReviewsNbr : "15" , productPrice : "2500"  , productImg : prodImg },
        {productID : 2 , productName : "Product name" , productRating : 3 , productReviewsNbr : "15" , productPrice : "2500", productImg : prodImg},
        {productID : 3 , productName : "Product name" , productRating : 5 , productReviewsNbr : "15" , productPrice : "2500", productImg : prodImg},
        {productID : 4 , productName : "Product name" , productRating : 4 , productReviewsNbr : "15" , productPrice : "2500", productImg : prodImg},
        {productID : 5 , productName : "Product name" , productRating : 4 , productReviewsNbr : "15" , productPrice : "2500", productImg : prodImg},
        {productID : 6 , productName : "Product name" , productRating : 4 , productReviewsNbr : "15" , productPrice : "2500", productImg : prodImg},
        {productID : 7 , productName : "Product name" , productRating : 4 , productReviewsNbr : "15" , productPrice : "2500", productImg : prodImg},
        {productID : 8 , productName : "Product name" , productRating : 4 , productReviewsNbr : "15" , productPrice : "2500", productImg : prodImg}
    ])
    let [CategoriesData , setCategoriesData ]= useState([
        {Category_ID : 1 , Category_name : "Nursery Furniture" },
        {Category_ID : 2 , Category_name : "Nursery Furniture" },
        {Category_ID : 3 , Category_name : "Nursery Furniture" },
        {Category_ID : 4 , Category_name : "Nursery Furniture" },
        {Category_ID : 5 , Category_name : "Nursery Furniture" },
        {Category_ID : 6 , Category_name : "Nursery Furniture" }
    ])
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [category, setCategory] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [sortByLatest, setSortByLatest] = useState(false);
    const [sortByPopular, setSortByPopular] = useState(false);
    const [color, setColor] = useState('');
    return ( 
        <div className="category-page">
            <Navbar></Navbar>
            <div className="category-container">
                <div className="filter-section">

                </div>
                <div className="products-section">
                    <div></div>
                    <div className="products"></div>
                </div>
            </div>
            <Footer></Footer>
        </div>
    );
}
 
export default Category;


/* the category filter option it switches the category page at all and used to spcify which product category exactly*/
/* the category is like a parameter*/
