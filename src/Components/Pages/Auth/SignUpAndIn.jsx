import React, { useContext, useState } from "react";
// import {auth} from "../../Utility/firebase"
import { auth } from "../../Utility/firebase";
import "./Auth.css";

import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { Link, useLocation, useNavigate } from "react-router-dom";
import LayOut from "../../LayOut/LayOut";
import { filledInputClasses } from "@mui/material";
import { DataContext } from "../../StateProvider/StateProvider";
import { ClipLoader } from "react-spinners";
function SignUpAndIn() {
  const [{ user }, dispatch] = useContext(DataContext);
  const [email, setEmail] = useState([]);
  const [password, setPassword] = useState([]);
  const [error, setError] = useState([]);
  const [loading, setLoading] = useState({
    signIn:false,
    signUp:false,
  })
  //  console.log(email, password)
   const navigate=useNavigate()
   const navStateData=useLocation()
  console.log(navStateData);

  const authHandler = async (e) => {
    e.preventDefault();
    // console.log(e.target.name);
    if (e.target.name == "signIn") {
      setLoading({...loading, signIn : true})
      signInWithEmailAndPassword(auth, email, password)
        .then((userInfo) => {
          // console.log(userInfo);

          dispatch({
            type: "SET_USER",
            user: userInfo?.user,
          });
          setLoading({...loading, signIn : false})
          navigate(navStateData?.state?.redirect || "/")
        })
        .catch((err) => {
          // console.log(err.message);
         setError(err.message)
         setLoading({...loading, signIn : false})
        });
    } else {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userInfo) => {
          // console.log(userInfo);
          dispatch({
            type: "SET_USER",
            user: userInfo.user,
          });
          setLoading({...loading, signUp : false})
          navigate(navStateData?.state?.reDirect || "/")
        })
        .catch((err) => {
          // console.log(err);
          setError(err.message)
          setLoading({...loading, signUp : false})
        });
    }
  };

  return (
    <LayOut>
      <>
        <section className="login">
          <Link to="/">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEByRO7ttWJFm3RtQeXGS_8cNIdHnb550WGq9rGIQuJg&s"
              alt="amazon logo"
            />
          </Link>

          <div className="login_container">
            <h1>
             
                Sign-in
              
              </h1>
              {
                navStateData?.state?.msg &&(
                  <small style={{
                    padding : "5px",
                    textAlign: "center",
                    color: "red",
                    fontWeight : "bold"
                  }}>{navStateData?.state?.msg}</small>
                )
              }
            <form action="">
              <div>
                <label htmlFor="email">Email</label>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  id="email"
                />
              </div>
              <div>
                <label htmlFor="password">Password</label>
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  id="password"
                />
              </div>
              <button
                name="signIn"
                onClick={authHandler}
                className="login_signInButton"
              >
                 {
                loading.signIn?<ClipLoader size={15} color="#000"/> :
                "Sign-in"
              }
              
              </button>
            </form>
            <p>
              By signing-in you agree to the AMAZON FAKE CLONE condition of use
              & sale. Please see our Privacy Notice, our Cookies Notice and our
              Interest-based Ads Notice.
            </p>
            <button
              name="signUp"
              onClick={authHandler}
              className="login_registerButton"
            >
              {
                loading.signUp?<ClipLoader size={15} color="#000"/> :
                "Create Your amazon account"
              }
              
            </button>
            {
              error &&
              <small style={{
                paddingTop:"5px",
                color:"red"
              }}>
                {error}
              </small>
            }
          </div>
        </section>
      </>
    </LayOut>
  );
}

export default SignUpAndIn;
