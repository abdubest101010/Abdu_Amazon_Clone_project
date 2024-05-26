import React, { useEffect, useState } from "react";
import "./Result.css"
import LayOut from "../../LayOut/LayOut";
import { useParams } from "react-router-dom";
import axios from "axios";
import ProductCard from "../../Products/ProductCard";
import Loader from "../Loader/Loader";
function Result() {
    const {categoryName} = useParams();
    console.log(categoryName) 
    const [results, setResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false)
    useEffect(() => {
      setIsLoading(true)
    axios
        .get(`https://fakestoreapi.com/products/category/${categoryName}`)
        .then((res) => {
          console.log(res);
          setResults(res.data);
          setIsLoading(false)
        })
        .catch((err) => {
          console.log(err);
          setIsLoading(false)
        })}, []);
  
    return (
      <LayOut>
        <section>
          <h1 style={{ padding: "30px" }}>Results</h1>
          <p style={{ padding: "38px" }}>Category / {categoryName}</p>
          <hr />
          {
            isLoading ? (<Loader/>):(<div className="products_container">
            {results?.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>)
          }
            
        </section>
      </LayOut>
    )
  }

export default Result;
