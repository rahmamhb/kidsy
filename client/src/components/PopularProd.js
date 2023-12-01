import { useState } from "react";
import SeeMore from '@mui/icons-material/AddCircleOutlineRounded';
import FavoriteIcon from '@mui/icons-material/FavoriteBorder';
import prodImg from "../assets/productFood.png";
import RatingStars from "./RatingStars";
import { NavLink } from "react-router-dom";

let productsData = [
    {productID : 1 , productName : "Product name" , productRating : 4.5 , productReviewsNbr : "15" , productPrice : "2500" , productDiscount : 0.4 , productImg : prodImg },
    {productID : 2 , productName : "Product name" , productRating : 3 , productReviewsNbr : "15" , productPrice : "2500" , productDiscount : 0.4 , productImg : prodImg },
    {productID : 3 , productName : "Product name" , productRating : 5 , productReviewsNbr : "15" , productPrice : "2500", productDiscount : 0.4 , productImg : prodImg},
    {productID : 4 , productName : "Product name" , productRating : 4 , productReviewsNbr : "15" , productPrice : "2500", productDiscount : 0.4 , productImg : prodImg},
    {productID : 5 , productName : "Product name" , productRating : 4 , productReviewsNbr : "15" , productPrice : "2500", productDiscount : 0.4 , productImg : prodImg},
    {productID : 6 , productName : "Product name" , productRating : 4 , productReviewsNbr : "15" , productPrice : "2500", productDiscount : 0.4 , productImg : prodImg},
    {productID : 7 , productName : "Product name" , productRating : 4 , productReviewsNbr : "15" , productPrice : "2500", productDiscount : 0 , productImg : prodImg},
    {productID : 8 , productName : "Product name" , productRating : 4 , productReviewsNbr : "15" , productPrice : "2500", productDiscount : 0 , productImg : prodImg}
]
const PopularProd = () => {

    const [visibleProducts, setVisibleProducts] = useState(2);
    const showMoreProducts = () => {
        setVisibleProducts(visibleProducts + 2);
    };
    return ( 
        <div className="popuProd-container">
          <div className="product-container-head">
            <p>Most popular</p>
            {visibleProducts < productsData.length && 
                (<span className="see-more-prods" onClick={showMoreProducts}><SeeMore></SeeMore></span>) 
            }
          </div>
          <div className="product-list">
            {productsData.slice(0, visibleProducts).map((product, index) => (
              <NavLink>
                <div className="popular-prod" key={product.productID}>
                  
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
              </NavLink>
            ))}
          </div>
        </div>
     );
}
 
export default PopularProd;