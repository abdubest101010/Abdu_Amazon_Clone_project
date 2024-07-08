import React, { useContext } from "react";
import "./Products.css";
import { Rating } from "@mui/material";
import { Link } from "react-router-dom";
// import {  DataContext } from "../StateProvider/StateProvider";
import CurrencyFormat from "../CurrencyFormat/CurrencyFormat";
import { useDispatch } from "react-redux";
import { addToCart } from "../../features/CartSlice";

function ProductCard({ product, flex, renderDesc, renderAdd }) {
  const { image, title, id, rating, price, description } = product;
  const ratingValue = rating && rating.rate;
  const ratingCount = rating && rating.count;
  const dispatch = useDispatch();
   
  const handleAddToCart = () => {
    const item = { image, title, id, rating, price, description };
    dispatch(addToCart({ item })); 
    console.log(item)
  };
  // const addToCart=()=>{
  //   dispatch({
  //     type: "ADD_TO_BASKET",
  //     item:{
  //       image, title, id, rating, price, description
  //     },
  //   })

  // }
  return (
    <div className={`${"card_container"} ${flex?"product_flexed":''}`}>
        <Link to={`/products/${id}`}>
          <img src={image} alt={title} className="img_container" />
        </Link>
  
        <div>
          <h3>{title}</h3>
           {
            renderDesc && <div style={{maxWidth:"700px"}}>{description}</div>
           }
          <div className="rating">
          <Rating value={ratingValue} precision={0.1} />
          <small>{ratingCount}</small>
          </div>
          <div>
           $<CurrencyFormat amount={price}/>
          </div>
          {
            renderAdd && <button onClick={handleAddToCart} className="button">add to cart</button>
          }
            
          
          
        </div>
      </div>
  );
}

export default ProductCard;
