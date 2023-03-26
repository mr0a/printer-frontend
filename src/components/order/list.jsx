import { useEffect, useState } from "react";
import React from "react-dom";
import "./listorder.css";
import Orders from "./orders";
function List() {

  const [orders, setOrders] = useState([])
  let BASE_URL = "http://127.0.0.1:8000";

  let orderComponents = Array.from(orders).map((order, index) => {
    console.log("Hello")
    return <Orders key={index} id={order.id} date={order.created_at} price={order.total_amount} status={order.status}></Orders>
  })

  useEffect(() => {
    fetch(BASE_URL + '/api/v1/order/', {
      method: "GET",
      mode: 'cors',
      headers: {
        'Accept': 'application/json',
        'Content-Type': "application/json",
        "Authorization": "Bearer " + localStorage.getItem("token") || ''
      },
    }).then(response => response.json().then(data => {
      setOrders(data);
      console.log(data)
    }))

    console.log("Orders from useeffect", orders)
    console.log("Order comps", orderComponents)
  }, [])
  


  return (
    <div className="list">
      <b>
        <div className="heading">
          <p>Order ID</p>
          <p>Date</p>
          <p>Price</p>
          <p>Status</p>
        </div>
      </b>
      <div>
        {orderComponents}
      </div>
    </div>
  );
}

export default List;
