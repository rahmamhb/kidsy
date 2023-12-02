import { useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import prodImg from "../assets/socks.jpg" 
import CheckIcon from '@mui/icons-material/CheckRounded';
import MoreIcon from '@mui/icons-material/ExpandMoreRounded';
import SearchIcon from '@mui/icons-material/SearchRounded';
import FavoriteIcon from '@mui/icons-material/FavoriteBorder';
import { NavLink } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import RatingStars from "../components/RatingStars";
import "../styles/Category.css" ;
const Category = () => {
    const [productsData , setProductData] = useState([
        {productID : 1 , productName : "Product name" , productRating : 4.5 , productReviewsNbr : "15" , productPrice : "2500"  , productImg : prodImg , productImg1 : prodImg , productImg2 : prodImg , productColor1 : "249 233 251" , productColor2 : "89 126 181" , productColor3 : "240 193 196" , productDiscount : 0.4 , productDiscription : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam malesuada nunc eros, sit amet fringilla erat tincidunt eu.  Aliquam malesuada nunc eros, sit amet fringilla erat tincidunt eu"},
        {productID : 2 , productName : "Product name" , productRating : 3 , productReviewsNbr : "15" , productPrice : "2500", productImg : prodImg , productImg1 : prodImg , productImg2 : prodImg , productColor1 : "249 233 251" , productColor2 : "89 126 181" , productColor3 : "240 193 196" , productDiscount : 0.4, productDiscription : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam malesuada nunc eros, sit amet fringilla erat tincidunt eu.  Aliquam malesuada nunc eros, sit amet fringilla erat tincidunt eu"},
        {productID : 3 , productName : "Product name" , productRating : 5 , productReviewsNbr : "15" , productPrice : "2500", productImg : prodImg , productImg1 : prodImg , productImg2 : prodImg , productColor1 : "249 233 251" , productColor2 : "89 126 181" , productColor3 : "240 193 196" , productDiscount : 0.4, productDiscription : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam malesuada nunc eros, sit amet fringilla erat tincidunt eu.  Aliquam malesuada nunc eros, sit amet fringilla erat tincidunt eu"},
        {productID : 4 , productName : "Product name" , productRating : 4 , productReviewsNbr : "15" , productPrice : "2500", productImg : prodImg , productImg1 : prodImg , productImg2 : prodImg , productColor1 : "249 233 251" , productColor2 : "89 126 181" , productColor3 : "240 193 196" , productDiscount : 0.5, productDiscription : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam malesuada nunc eros, sit amet fringilla erat tincidunt eu.  Aliquam malesuada nunc eros, sit amet fringilla erat tincidunt eu"},
        {productID : 5 , productName : "Product name" , productRating : 4 , productReviewsNbr : "15" , productPrice : "2500", productImg : prodImg , productImg1 : prodImg , productImg2 : prodImg , productColor1 : "249 233 251" , productColor2 : "89 126 181" , productColor3 : "240 193 196" , productDiscount : 0, productDiscription : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam malesuada nunc eros, sit amet fringilla erat tincidunt eu.  Aliquam malesuada nunc eros, sit amet fringilla erat tincidunt eu"},
        {productID : 6 , productName : "Product name" , productRating : 4 , productReviewsNbr : "15" , productPrice : "2500", productImg : prodImg , productImg1 : prodImg , productImg2 : prodImg , productColor1 : "249 233 251" , productColor2 : "89 126 181" , productColor3 : "240 193 196" , productDiscount : 0.4, productDiscription : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam malesuada nunc eros, sit amet fringilla erat tincidunt eu.  Aliquam malesuada nunc eros, sit amet fringilla erat tincidunt eu"},
        {productID : 7 , productName : "Product name" , productRating : 4 , productReviewsNbr : "15" , productPrice : "2500", productImg : prodImg , productImg1 : prodImg , productImg2 : prodImg , productColor1 : "249 233 251" , productColor2 : "89 126 181" , productColor3 : "240 193 196" , productDiscount : 0.2, productDiscription : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam malesuada nunc eros, sit amet fringilla erat tincidunt eu.  Aliquam malesuada nunc eros, sit amet fringilla erat tincidunt eu"},
        {productID : 8 , productName : "Product name" , productRating : 4 , productReviewsNbr : "15" , productPrice : "2500", productImg : prodImg , productImg1 : prodImg , productImg2 : prodImg , productColor1 : "249 233 251" , productColor2 : "89 126 181" , productColor3 : "240 193 196" , productDiscount : 0.6, productDiscription : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam malesuada nunc eros, sit amet fringilla erat tincidunt eu.  Aliquam malesuada nunc eros, sit amet fringilla erat tincidunt eu"}
    ])
    let [CategoriesData , setCategoriesData ]= useState([
        {CategoryID : 1 , CategoryName : "Nursery Furniture" },
        {CategoryID : 2 , CategoryName : "Nursery Furniture" },
        {CategoryID : 3 , CategoryName : "Nursery Furniture" },
        {CategoryID : 4 , CategoryName : "Nursery Furniture" },
        {CategoryID : 5 , CategoryName : "Nursery Furniture" },
        {CategoryID : 6 , CategoryName : "Nursery Furniture" },
        {CategoryID : 7 , CategoryName : "Nursery Furniture" }
    ])
    const [colorsData , setColorsData] = useState([
        {colorID : 1 , colorValue : "255 255 255" , colorName : "white"} ,
        {colorID : 2 , colorValue : "255 255 255" , colorName : "white"} ,
        {colorID : 3 , colorValue : "255 255 255" , colorName : "white"} ,
        {colorID : 4 , colorValue : "255 255 255" , colorName : "white"} ,
    ])
    const [reviews, setReviews] = useState([
        {reviewID : 1 , reviewContent : "Lorem ipsum dolor sit amet, consectetur adipiscing elit." , reviewerName : "Nom Prenom" , reviewRate : 4 , ReviewDate : "Oct 26 , 2023"},
        {reviewID : 2 , reviewContent : "Lorem ipsum dolor sit amet, consectetur adipiscing elit." , reviewerName : "Nom Prenom" , reviewRate : 4 , ReviewDate : "Oct 26 , 2023"},
        {reviewID : 3 , reviewContent : "Lorem ipsum dolor sit amet, consectetur adipiscing elit." , reviewerName : "Nom Prenom" , reviewRate : 4 , ReviewDate : "Oct 26 , 2023"},
    ]);

    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [category, setCategory] = useState('');
    const [color, setColor] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [rating , setRating] = useState(1);
    const [sortByLatest, setSortByLatest] = useState(false);
    const [sortByPopular, setSortByPopular] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [reviewerName , setReviewerName] = useState("") ;
    const [reviewerEmail , setReviewerEmail] = useState("") ;
    const [reviewRate , setReviewRate] = useState(1) ;
    const [reviewContent , setReviewContent] = useState("") ;
    const [newReview, setNewReview] = useState([]);
  
    const categoryID = useParams().categoryID;
    const location = useLocation();
    const [visibleCategories, setVisibleCategories] = useState(5);
    const showMoreProducts = () => {
        setVisibleCategories(visibleCategories + CategoriesData.length - 5);
    };

    useEffect(() => {
        const currentCategory = CategoriesData.find(cat => cat.categoryID === Number(categoryID));
        console.log(currentCategory)
        setCategory(currentCategory ? currentCategory.categoryName : '');
        fetchProducts(categoryID);
    }, [location.search, categoryID , CategoriesData]);
    const fetchProducts = async (categoryId) => {
      
    }

    return ( 
        <div className="category-page">
            <Navbar></Navbar>
            <div className="category-container">
                <div className="filter-section">
                    <div className="category-filter">
                        <p className="filter-title">Category</p>
                        {CategoriesData.slice(0, visibleCategories).map((category , index)=>(
                            <NavLink 
                                to = {`/category/${category.CategoryID}`}
                                className={({isActive})=>(isActive ? "active-category-link category-link" : "category-link")}
                                key={category.CategoryID}
                            >
                                <span><CheckIcon></CheckIcon></span>
                                <p>{category.CategoryName}</p>

                            </NavLink>
                        ))}
                        {visibleCategories < CategoriesData.length && 
                            (<span className="see-more-categories" onClick={showMoreProducts}>Other categories <MoreIcon></MoreIcon></span>) 
                        }
                    </div>
                    <div className="price-filter">
                        <p className="filter-title">Price range</p>
                        <div className="price-inputs">
                            <input
                                type="number"
                                value={minPrice}
                                placeholder="min"
                                onChange={(e) => setMinPrice(e.target.value)}
                            />
                            <input
                                type="number"
                                value={maxPrice}
                                placeholder="max"
                                onChange={(e) => setMaxPrice(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="rating-filter">
                        <p className="filter-title">Rating</p>
                        <div className="rating-inputs">
                            {[1, 2, 3, 4, 5].map((rated) => (
                                
                                    <span className="checkbox-rating-input" key={rated}>
                                        <input type="radio"
                                               id={rated + "ts"} 
                                               name="ratingGroup"
                                               value={rated}
                                               onChange={(e) => setRating(e.target.value)}
                                        />
                                        <RatingStars rating={rated}></RatingStars>
                                    </span>

                            ))}
                        </div>
                    </div>
                </div>
                <div className="products-section">
                    <div className="product-section-header">
                        <div className="rec-right-search">
                            <SearchIcon></SearchIcon>
                            <input  type="text" 
                                    placeholder="Search..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div> 
                        <p className="search-rslt">Search results for “<span>{searchQuery}</span>”</p>
                        <div className="sort-section">
                            <p className="sort-section-header">Sort</p>
                            <div className="sort-inputs">
                                <span className="sort-category">{category}</span>
                                <label>
                                    <input
                                    type="checkbox"
                                    checked={sortByLatest}
                                    onChange={() => setSortByLatest(!sortByLatest)}
                                    />
                                    Latest
                                </label>
                                <label>
                                    <input
                                    type="checkbox"
                                    checked={sortByPopular}
                                    onChange={() => setSortByPopular(!sortByPopular)}
                                    />
                                    Popular
                                </label>
                                <select value={color} onChange={(e) => setColor(e.target.value)}>
                                    <option value="">--Select--</option>
                                    {colorsData.map((couleur , index)=>(
                                        <option value={couleur.colorValue}>{couleur.colorName}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="products">
                        {selectedProduct &&( 
                        <div className="selected-product">
                            <div className="selected-product-box">
                                <div className="selected-product-images">

                                </div>
                                <div className="selected-product-info">
                                    <button className="fav-btn"><FavoriteIcon></FavoriteIcon></button>
                                    <div className="selected-product-info1">
                                        <div className="selected-product-info11">
                                            <div className="product-info-txt-1">
                                                <p className="prod-name">{selectedProduct.productName}</p>
                                                <div className="prod-reviews">
                                                    <RatingStars rating={selectedProduct.productRating}></RatingStars>
                                                    <p className="reviews-nbr">{selectedProduct.productReviewsNbr} reviews</p>
                                                </div>
                                            </div>
                                            <div className="product-info-txt-2"> {selectedProduct.productDiscription}</div>
                                        </div>
                                        <div className="selected-product-info12">
                                            <p className="header">colors :</p>
                                            <div  className="selected-product-colors">
                                                <span className="selected-product-color one" st></span>
                                                <span className="selected-product-color two"></span>
                                                <span className="selected-product-color three"></span>
                                            </div>
                                        </div>
                                        <div className="selected-product-info13">
                                            <div className="selected-product-info131">
                                                <p className="selected-product-price-header">Total price</p>
                                                <p className="selected-product-price">{selectedProduct.productPrice} DZD <span>{selectedProduct.productPrice - selectedProduct.productPrice * selectedProduct.productDiscount } DZD </span></p>
                                            </div>
                                            <button className="selected-product-add-btn">Add to cart</button>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div className="selected-product-reviews-box"></div>
                        </div>
                        )}
                        <div className="product-list">
                        {productsData.map((product, index) => (
                            <div className="popular-prod" key={product.productID} onClick={()=>{setSelectedProduct(productsData[index])}}>
                                <button className="fav-btn"><FavoriteIcon></FavoriteIcon></button>
                                <div className="product-info">
                                <img src={product.productImg} alt="product img"/>
                                <div className="product-info-txt">
                                    <div className="product-info-txt-1">
                                        <p className="prod-name">{product.productName}</p>
                                        <div className="prod-reviews">
                                            <RatingStars rating={product.productRating}></RatingStars>
                                            <p className="reviews-nbr">{product.productReviewsNbr} reviews</p>
                                        </div>
                                    </div>
                                    <div className="product-info-txt-2">
                                        <p className="prod-price">Total price : <span>{product.productPrice} DZD</span></p>
                                        <button className="add-cart-btn">Add to cart</button>
                                    </div>
                                </div>
                                </div>
                            
                            </div>
                        ))}
                        </div>
                    </div>
                </div>
            </div>
            <Footer></Footer>
        </div>
    );
}
 
export default Category;


/* the category filter option it switches the category page at all and used to spcify which product category exactly*/
/* the category is like a parameter*/
