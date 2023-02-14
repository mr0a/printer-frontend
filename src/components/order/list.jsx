import React from "react-dom";
import "./listorder.css";
import Orders from "./orders";
function List() {
    const id = ['AG0001', 'AG0002', 'AG0003'];
    const cost = [50,30,5];
    const status = ["Completed", "Pending"];
  const current = new Date();
  var monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];
  const date = `${current.getDate()} ${
    monthNames[current.getMonth()]
  }, ${current.getFullYear()}`;

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
        <Orders id={id[0]} date={date} price={cost[0]} status={status[0]}></Orders>
        <Orders id={id[1]} date={date} price={cost[1]} status={status[1]}></Orders>
        <Orders id={id[2]} date={date} price={cost[2]} status={status[1]}></Orders>

      </div>
    </div>
  );
}

export default List;
