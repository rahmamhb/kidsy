import { useEffect, useState } from "react";
import SeeMore from '@mui/icons-material/AddCircleOutlineRounded';
import FavoriteIcon from '@mui/icons-material/FavoriteBorder';
import RatingStars from "./RatingStars";
import { NavLink } from "react-router-dom";
import axios from "axios";

const PopularProd = () => {
  const [visibleProducts, setVisibleProducts] = useState(2);
  const showMoreProducts = () => {
      setVisibleProducts(visibleProducts + 2);
  };

    const [productsData , setProductsData] = useState([])
    useEffect(()=>{
      fetchData()
    },[productsData]);

    const fetchData = async () => {
      try {
          const response = await axios.get('http://localhost:3001/api/product/top6'); 
          setProductsData(response.data);
      } catch (error) {
          console.error('Error fetching data:', error);
      }
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
                          <button className="add-cart-btn hover:grayscale" onClick={()=>handleAddToCart(product.productID)}>Add to cart</button>
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