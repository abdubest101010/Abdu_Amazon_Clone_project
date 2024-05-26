import "./CatagoryCard.css";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import {  DataContext } from "../StateProvider/StateProvider";
function CatagoryCard({ data }) {
  console.log(data);

 
  return (
    <div className="catagory">
      <Link to={`/category/${data.name}`}>
        <span>
          <h2>{data.title}</h2>
        </span>
        <img src={data.imgLink} alt={data.name} />
        <p>shop now</p>
       
      </Link>
    </div>
  );
}

export default CatagoryCard;
