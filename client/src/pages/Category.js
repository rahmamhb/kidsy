import { useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import prodImg from "../assets/socks.jpg" 
import prodImg1 from "../assets/blog3.jpg" 
import prodImg2 from "../assets/blog7.jpg" 
import CheckIcon from '@mui/icons-material/CheckRounded';
import MoreIcon from '@mui/icons-material/ExpandMoreRounded';
import SearchIcon from '@mui/icons-material/SearchRounded';
import FavoriteIcon from '@mui/icons-material/FavoriteBorder';
import { NavLink } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import RatingStars from "../components/RatingStars";
import axios from 'axios';
import "../styles/Category.css" ;
const Category = () => {
    const [productsData , setProductData] = useState([])
    let [CategoriesData , setCategoriesData ]= useState([])
    const [colorsData , setColorsData] = useState([
        {colorID : 1 , colorValue : "255 255 255" , colorName : "white"} ,
        {colorID : 2 , colorValue : "255 255 255" , colorName : "white"} ,
        {colorID : 3 , colorValue : "255 255 255" , colorName : "white"} ,
        {colorID : 4 , colorValue : "255 255 255" , colorName : "white"} ,
    ])
    const [reviewsData, setReviewsData] = useState([]);

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
    const [selectedImg , setSlectedImg] = useState();
    const categoryID = useParams().categoryID;
    const location = useLocation();
    const [visibleCategories, setVisibleCategories] = useState(5);

    const showMoreProducts = () => {
        setVisibleCategories(visibleCategories + CategoriesData.length - 5);
    };
    

    useEffect(() => {
        fetchCategories();
        const currentCategory = CategoriesData.find(cat => cat.categoryID === Number(categoryID));
        setCategory(currentCategory ? currentCategory.categoryName : '');
        fetchProducts(categoryID);
    }, [location.search, categoryID , CategoriesData]);

    const handleProductClick = (index , id)=>{
        setSelectedProduct(productsData[index])
        fetchProductReviews(id)
        console.log(id)
    }
    const handleSubmitReview = (id)=>{
        console.log(id)
        const formData = new FormData();
        formData.append('productID', id);
        formData.append('reviewContent', reviewContent);
        formData.append('reviewRate', reviewRate);
        formData.append('reviwerName', reviewerName);
        formData.append('reviwerEmail', reviewerEmail);
       
        const data = {
            productID :  id,
            reviewContent :  reviewContent,
            reviewRate :  reviewRate,
            reviwerName :  reviewerName,
            reviwerEmail :  reviewerEmail,
        };
        console.log(formData)
        console.log(data)
        axios.post('http://localhost:3001/api/review/' , data)
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
    const handleAddToCart = (prodID)=>{
        const data = {
          cartID : 1,
          productID : prodID ,
          productQuantityInCart : 1,
        };
        axios.post('http://localhost:3001/api/cart-product' , data)
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
    const fetchProductReviews = async (productId) => {
        try {
            const response = await axios.get(`http://localhost:3001/api/review/${productId}`); ;
            setReviewsData(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
    const fetchProducts = async (categoryId) => {
        try {
            const response = await axios.get(`http://localhost:3001/api/product-by-category/${categoryId}`); 
            setProductData(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
    const fetchCategories = async () => {
        try {
            const response = await axios.get('http://localhost:3001/api/category/'); 
            setCategoriesData(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
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
                                to = {`/category/${category.categoryID}`}
                                className={({isActive})=>(isActive ? "active-category-link category-link" : "category-link")}
                                key={category.categoryID}
                            >
                                <span><CheckIcon></CheckIcon></span>
                                <p>{category.categoryName}</p>

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
                                onChange={(e) => {
                                    const value = parseFloat(e.target.value);
                                    if (!isNaN(value) && value > 0) {
                                        setMinPrice(value);
                                    } else {
                                        // Handle invalid input, such as showing an error message or resetting to a default value
                                        setMinPrice(0); 
                                    }
                                }}
                            />
                            <input
                                type="number"
                                value={maxPrice}
                                placeholder="max"
                                onChange={(e) => {
                                    const value = parseFloat(e.target.value);
                                    if (!isNaN(value) && value > 0) {
                                        setMaxPrice(value);
                                    } else {
                                        // Handle invalid input, such as showing an error message or resetting to a default value
                                        setMaxPrice(0); 
                                    }
                                }}
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
                                <label className={sortByLatest ? "checked" : ""}>
                                    <input
                                    type="checkbox"
                                    checked={sortByLatest}
                                    onChange={() => setSortByLatest(!sortByLatest)}
                                    />
                                    Latest
                                </label>
                                <label className={sortByPopular ? "checked" : ""}>
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
                        {selectedProduct && (
                        <div className="the-one-product">
                            <div className="one-product">
                                <div className="selected-product-images">
                                    <img src={selectedImg} alt="big-img" className="big-img"/>
                                    <div className="img-choices">
                                        <span onClick={()=>{setSlectedImg(`http://localhost:3001/api/blog/images/${selectedProduct.productImg}`)}} className="img-choice"> 
                                            <img src={`http://localhost:3001/api/blog/images/${selectedProduct.productImg}`} alt="img-small" /> 
                                        </span>
                                        <span onClick={()=>{setSlectedImg(`http://localhost:3001/api/blog/images/${selectedProduct.productImg}`)}} className="img-choice"> 
                                            <img src={`http://localhost:3001/api/blog/images/${selectedProduct.productImg}`} alt="img-small" /> 
                                        </span>
                                        <span onClick={()=>{setSlectedImg(`http://localhost:3001/api/blog/images/${selectedProduct.productImg}`)}} className="img-choice"> 
                                            <img src={`http://localhost:3001/api/blog/images/${selectedProduct.productImg}`} alt="img-small" /> 
                                        </span>
                                    </div>
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
                                                <span className="selected-product-color one" style={{ backgroundColor: selectedProduct.productColor1}}></span>
                                                <span className="selected-product-color two" style={{ backgroundColor: selectedProduct.productColor2}}></span>
                                                <span className="selected-product-color three" style={{ backgroundColor: selectedProduct.productColor3}}></span>
                                            </div>
                                        </div>
                                        <div className="selected-product-info13">
                                            <div className="selected-product-info131">
                                                <p className="selected-product-price-header">Total price</p>
                                                <div className="selected-product-price-box">
                                                    <p className={selectedProduct.productDiscount > 0 ? "selected-product-price crossed": "selected-product-price"}>
                                                        {selectedProduct.productPrice} DZD 
                                                    </p>
                                                    {selectedProduct.productDiscount > 0 && (
                                                        <span>
                                                            {selectedProduct.productPrice - selectedProduct.productPrice * selectedProduct.productDiscount } DZD 
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                            <button className="selected-product-add-btn hover:grayscale" onClick={()=>handleAddToCart(selectedProduct.productID)}>Add to cart</button>
                                        </div>
                                    </div>
                                </div> 
                            </div>
                            <div className="one-product-reviews-container">
                                <p className="header">Reviews :</p>
                                <div className="one-product-reviews">
                                    {reviewsData.length > 0 &&( 
                                        <div className="one-product-old-reviews">
                                            {reviewsData.map((review , index)=>
                                                (
                                                    <div className="one-product-old-review">
                                                        <span>
                                                            {review.reviwerName.split(' ').map(word => word.charAt(0)).join('')}
                                                        </span>
                                                        <div className="one-product-old-review-info">
                                                            <p className="Reviewer-name">{review.reviwerName}</p>
                                                            <RatingStars rating={review.reviewRate}></RatingStars>
                                                            <p className="Review-content">{review.reviewContent}</p>
                                                            <p className="Review-date">{review.ReviewDate}</p>
                                                        </div>
                                                    </div>
                                                )
                                            )}
                                        </div>
                                    )}
                                    <div className="one-product-new-review">
                                        <p className="header">Rate and review </p>
                                        <form onSubmit={()=>handleSubmitReview(selectedProduct.productID)}>
                                            <div className="star-rating">
                                                <input className="radio-input" type="radio" id="star5" name="star-input" value="5" onChange={(e) => setReviewRate(e.target.value)} required />
                                                <label className="radio-label"  for="star5" title="5 stars">5 stars</label>

                                                <input className="radio-input" type="radio" id="star4" name="star-input" value="4" onChange={(e) => setReviewRate(e.target.value)} required />
                                                <label className="radio-label" for="star4" title="4 stars">4 stars</label>

                                                <input className="radio-input" type="radio" id="star3" name="star-input" value="3" onChange={(e) => setReviewRate(e.target.value)} required />
                                                <label className="radio-label" for="star3" title="3 stars">3 stars</label>

                                                <input className="radio-input" type="radio" id="star2" name="star-input" value="2" onChange={(e) => setReviewRate(e.target.value)} required />
                                                <label className="radio-label" for="star2" title="2 stars">2 stars</label>

                                                <input className="radio-input" type="radio" id="star1" name="star-input" value="1" onChange={(e) => setReviewRate(e.target.value)} required />
                                                <label className="radio-label" for="star1" title="1 star">1 star</label>
                                            </div>
                                            <div className="reviewer-info">                                            
                                                <div class="label-float reviewer-name">
                                                    <input type="text" placeholder="" value={reviewerName} onChange={(e)=>{ setReviewerName(e.target.value)}} required/>
                                                    <label>Name</label>
                                                </div>
                                                <div class="label-float reviewer-email">
                                                    <input type="email" placeholder="" value={reviewerEmail} onChange={(e)=>{ setReviewerEmail(e.target.value)}} required/>
                                                    <label>Email</label>
                                                </div>
                                            </div>
                                            <div className="text-area">
                                                <label>your review</label>
                                                <textarea placeholder="" value={reviewContent} onChange={(e)=>{ setReviewContent(e.target.value)}} ></textarea>
                                            </div>
                                            <button className="add-review-btn" type="submit">Submit</button>
                                        </form>
                                    </div>
                                </div>
                            </div> 
                        </div>
                        )}
                        <div className="product-list">
                        {productsData.map((product, index) => (
                            <div className={`popular-prod`}  key={product.productID} onClick={()=> handleProductClick(index , product.productID) }>
                                <button className="fav-btn"><FavoriteIcon></FavoriteIcon></button>
                                <div className="product-info">
                                <img src={`http://localhost:3001/api/blog/images/${product.productImg}`} alt="product img"/>
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
                                        <button className="add-cart-btn" onClick={()=>handleAddToCart(product.productID)}>Add to cart</button>
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
