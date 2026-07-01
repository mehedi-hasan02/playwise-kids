import { getCart } from "@/actions/server/cart";
import CheckOut from "@/components/home/CheckOut";
import React from "react";

const CheckOutPage = async () => {
  const cartItems = await getCart();
  const formatedItem = cartItems.map((item) => ({
    ...item,
    _id: item._id.toString(),
  }));
  return (
    <div>
      <CheckOut cartItems={formatedItem}/>
    </div>
  );
};

export default CheckOutPage;
