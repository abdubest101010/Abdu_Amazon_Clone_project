import React, { useContext } from "react";
import "./Cart.css";

import LayOut from "../../LayOut/LayOut";
import { DataContext, useStateValue } from "../../StateProvider/StateProvider";
import ProductCard from "../../Products/ProductCard";
import CurrencyFormat from "../../CurrencyFormat/CurrencyFormat";
import { Link } from "react-router-dom";
import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";
import { addToCart, removeCart } from "../../../features/CartSlice";
import { useDispatch,useSelector } from "react-redux";
function Cart() {
  const dispatch = useDispatch()
  const basket = useSelector((state) => state.cart.cart)
  const total= basket.reduce((amount, item)=>{
    return item.price*item.amount + amount
  },0)
  const increment = (item) => {
    // const item = { image, title, id, rating, price, description };
    dispatch(addToCart({item}));
  };
  const decrement = (id) => {
    dispatch(removeCart(id));
  };
  return (
    <LayOut>
      <section className="cart_containerAll">
        <div className="cart_container">
          <h2>Hello</h2>
          <h1>Your Shoping basket</h1>
          <hr />
          {basket?.length == 0 ? (
            <p>Opps! No item in your basket</p>
          ) : (
            basket?.map((item, i) => {
              return (
                <section className="cart_product">
                  <ProductCard
                    key={i}
                    product={item}
                    renderDesc={true}
                    renderAdd={false}
                    flex={true}
                  />
                  <div className="btn_container">
                    <button className="btn" onClick={() => increment(item)}>
                      <TiArrowSortedUp size={30} />
                    </button>
                    <span>{item.amount}</span>
                    <button className="btn" onClick={() => decrement(item.id)}>
                      <TiArrowSortedDown size={30} />
                    </button>
                  </div>
                </section>
              );
            })
          )}
        </div>
        {basket?.length !== 0 && (
          <div className="subTotal">
            <div>
              <p>Subtotal: {basket?.length} items </p>
              $<CurrencyFormat amount={total} />
            </div>
            <span>
              <input type="checkbox" />
              <small>this order contain a gift</small>
            </span>
            <Link to="/payments">Continue to checkout</Link>
          </div>
        )}
      </section>
    </LayOut>
  );
}

export default Cart;
