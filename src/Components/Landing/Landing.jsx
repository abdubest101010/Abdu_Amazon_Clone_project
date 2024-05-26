import React from "react";
import Catagory from "../Catagory/Catagory";
import LayOut from "../LayOut/LayOut";
import Carasoul from "../Carasoul/Carasoul";
import Product from "../Products/Products";
function Landing() {
  return (
    <div>
      <LayOut>
        <Carasoul />
        <Catagory />
        <Product />
      </LayOut>
    </div>
  );
}

export default Landing;
