import React, { useContext } from "react";
import { SlLocationPin } from "react-icons/sl";
import { BsSearch } from "react-icons/bs";
import { BiCart } from "react-icons/bi";
import "./Header.css";
import LowerContainer from "../lowerContainer/LowerContainer";
import { Link } from "react-router-dom";
import { DataContext } from "../StateProvider/StateProvider";
import { auth } from "../Utility/firebase";
function Header() {
  const [{basket, user},dispatch]=useContext(DataContext)
  const totalItem = basket?.reduce((amount, item) => {
    return item.amount + amount;
  }, 0);
  return (
    <section className="fixed">
      <section>
        <div className="header_container">
          <div className="logo_container">
            <Link to="/">
              <img
                src="https://pngimg.com/uploads/amazon/amazon_PNG11.png"
                alt="amazon logo"
              />
            </Link>
            <div className="delivery">
              <span>
                <SlLocationPin />
              </span>
              <div>
                <p>Deliver to</p>

                <span>Ethiopia</span>
              </div>
            </div>
          </div>
          <div className="search">
            <select name="" id="">
              <option value="">All</option>
            </select>
            <input type="text" name="" id="" />
            <BsSearch size={40} />
          </div>
          <div className="order_container">
            <Link to="/" className="language">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Flag_of_the_United_States_%28DoS_ECA_Color_Standard%29.svg/800px-Flag_of_the_United_States_%28DoS_ECA_Color_Standard%29.svg.png"
              alt=""
            />

            <section>
              <option value="">EN</option>
            </section>
            </Link>
          
          <Link to={!user &&"/auth"}>
            
              <div>
                {
                 user?(
                  <>
                  <p>Hello {user.email.split("@")[0]}</p>
                  <span onClick={()=>auth.signOut()}> Log out</span>
                  </>
                 )
                 :(
                  <>
                  <p>Hello Sign in </p>
                  <span>Account & lists</span>
                  </>
                 )
                }
            
              </div>
              
            
              
              
            
          </Link>
          <Link to="/orders">
            
              <p>returns</p>
              <span>& Orders</span>
            
          </Link>
          <Link to="/cart" className="cart">
            <BiCart size={35} />
            <span>{totalItem}</span>
          </Link>
        </div>
        </div>
      </section>
      <LowerContainer/>
    </section>
  );
}

export default Header;
