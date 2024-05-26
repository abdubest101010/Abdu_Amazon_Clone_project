import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./Components/Landing/Landing";
import SignUpAndIn from "./Components/Pages/Auth/SignUpAndIn";
import Payment from "./Components/Pages/Payment/Payment";
import Orders from "./Components/Pages/Orders/Orders";
import Cart from "./Components/Pages/Cart/Cart";
import Result from "./Components/Pages/Results/Result";
import ProductDetail from "./Components/Pages/ProductDetail/ProductDetail";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
function Routing() {
  const stripePromise = loadStripe(
    "pk_test_51PKEICRvicR7Y0jn1v2DOOteFQZScpH9vy8TEINtF4lPYLxzyH4npnQtsVxIwQLyebfeXmeezVDPCK1gZadz4v5900oXx81eu9"
  );
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/auth" element={<SignUpAndIn />} />
        <Route
          path="/payments"
          element={
            
            <ProtectedRoute msg={"You must log in first"} redirect={"/payments"}>
            <Elements stripe={stripePromise}>
              <Payment />
            </Elements>
            </ProtectedRoute>
            
          }
        />

        <Route path="/orders" 
        element={
        <ProtectedRoute  msg={"You must log in first"} redirect={"/orders"}>
          <Orders />
          </ProtectedRoute>
          } />
        
        
        <Route path="/category/:categoryName" element={<Result />} />
        <Route path="/products/:productId" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </Router>
  );
}

export default Routing;
