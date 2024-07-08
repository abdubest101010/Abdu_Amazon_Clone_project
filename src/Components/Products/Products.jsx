import { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import axios from "axios";
import "./Products.css";
import Loader from "../Pages/Loader/Loader";
import { useGetAllProductsQuery } from "../../features/fetchProduct";

function Product() {
  // const [products, setproducts] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  const { data: products, error: fetchError, isLoading: isFetching } = useGetAllProductsQuery();
  // useEffect(() => {
  //   setIsLoading(true)
  //   axios
  //     .get("https://fakestoreapi.com/products")
  //     .then((res) => {
  //       setproducts(res.data);
  //       setIsLoading(false)
  //       console.log(setproducts);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       setIsLoading(false);
  //     });
  // }, []);

  if(fetchError){
    console.log(fetchError)
  }
  return (
    <>
      {isFetching ? (
        <Loader />
      ) : (
        <section>
          <div className="products_container">
            {products?.map((product) => {
              return <ProductCard 
              key={product.id} 
              product={product}
              renderAdd={true}
               />;
            })}
          </div>
        </section>
      )}
    </>
  );
}

export default Product;
