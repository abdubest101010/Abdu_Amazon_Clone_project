import React, { useContext, useEffect, useState } from "react";
import LayOut from "../../LayOut/LayOut";
import { db } from "../../Utility/firebase";
import "./Orders.css";
import { DataContext } from "../../StateProvider/StateProvider";
import ProductCard from "../../Products/ProductCard";
function Orders() {
  const [{user}, dispatch] = useContext(DataContext);
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    if (user) {
      db.collection("users")
        .doc(user.uid)
        .collection("orders")
        .orderBy("created", "desc")
        .onSnapshot((snapshot) => {
          console.log(snapshot)
          setOrders(
            snapshot.docs.map((doc)=>(
              {
                id: doc.id,
                data : doc.data()
              }

            ))
          )
          
        });
    } else {
      setOrders([])
    }
  }, []);

  return (
    <LayOut>
      <section className="order_container_order">
        
        <div className="order_container_sub">
          <h2>Your Orders</h2>
          {
            orders?.length==0 && <div style={{padding:"20px"}}>
              You don't have orders yet
            </div>
          }
           <div>
            {
              orders?.map((eachOrder, i)=>(
                <div key={i}>
                  <hr />
                  <p>Order Id : {eachOrder?.id}</p>
                  {
                    eachOrder?.data?.basket?.map((order, i)=>(
                      <ProductCard
                      key={i}
                      product={order}
                      flex={true}/>
                    ))
                  }
                 </div> 
              ))
            }
          </div>
        </div>
      </section>
    </LayOut>
  );
}

export default Orders;
