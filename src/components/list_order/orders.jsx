import React from "react";
import "./listorder.css";
import List from "./list";
const Orders = ({ id, date, price, status }) => {
  return (
    <div className="orders">
      <p>{id}</p>
      <p>{date}</p>
      <p>₹ {price}</p>
      <p>{status}</p>
    </div>
  );
};

export default Orders;
