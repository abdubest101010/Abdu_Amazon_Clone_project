import React, { useContext, useState } from "react";
import "./Payment.css";
import LayOut from "../../LayOut/LayOut";
import { DataContext } from "../../StateProvider/StateProvider";
import ProductCard from "../../Products/ProductCard";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import CurrencyFormat from "../../CurrencyFormat/CurrencyFormat";
import { axiosInstance } from "../../api/axios";
import { ClipLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import { db } from "../../Utility/firebase";
function Payment() {
  const navigate = useNavigate();
  const stripe = useStripe();
  const [cardError, setCardError] = useState(null);
  const elements = useElements();
  const [processing, setProcessing] = useState(false);
  const [{ basket, user }, dispatch] = useContext(DataContext);
  const totalItem = basket?.reduce((amount, item) => {
    return item.amount + amount;
  }, 0);
  const handleChange = (e) => {
    console.log(e);
    e?.error?.message ? setCardError(e?.error?.message) : "";
  };
  const total = basket.reduce((amount, item) => {
    return item.price * item.amount + amount;
  }, 0);
  const handlePayment = async (e) => {
    setProcessing(true);
    e.preventDefault();
    try {
      const response = await axiosInstance({
        method: "POST",
        url: `/payment/create?total=${total * 100}`,
      });
      //  console.log(response.data)
      const clientSecret = response.data?.client_secret;
      const { paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });
      // console.log(paymentIntent);

      await db
        .collection("users")
        .doc(user.uid)
        .collection("orders")
        .doc(paymentIntent.id)
        .set({
          basket: basket,
          amount: paymentIntent.amount,
          created: paymentIntent.created,
        });
        dispatch({
          type: "EMPTY_BASKET"
        }) 

      setProcessing(false);
      navigate("/orders", { state: { msg: "you have placed orders" } });
    } catch (error) {}
  };
  return (
    <LayOut>
      <div className="payment_header"> CheckOut ({totalItem}) items</div>
      <section className="payment">
        <div className="flex">
          <h1>Delivery Address</h1>

          <div>
            {user?.email}

            <div>123 React Lane</div>
            <div>Chicago</div>
          </div>
        </div>

        <hr />
        <div className="flex">
          <h3>Review Items and delivery</h3>
          <div>
            {basket?.map((item) => (
              <ProductCard product={item} key={item.id} flex={true} />
            ))}
          </div>
        </div>
        <hr />
        <div className="flex">
          <h3>Payment Methods</h3>
          <div className="payment_card_container">
            <div className="payment_details">
              <form on onSubmit={handlePayment} action="">
                {cardError && (
                  <small style={{ color: "red" }}>{cardError}</small>
                )}
                <CardElement onChange={handleChange} />
                <div className="payment_price">
                  <div>
                    <span>
                      Total Order | $ <CurrencyFormat amount={total} />{" "}
                    </span>
                  </div>
                  <button type="submit">
                    {processing ? (
                      <div className="loading">
                        <ClipLoader color="gray" size={12} />
                        <p>Please wait ...</p>
                      </div>
                    ) : (
                      "Pay now"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </LayOut>
  );
}

export default Payment;
