// "use client"

import { getCart } from "@/actions/server/cart";
import CartItem from "@/components/cards/CartItem";
import ClientCart from "@/components/home/ClientCart";
// import CartItem from "@/components/cart/CartItem";

const CartPage = async () => {
  const cartItems = await getCart();
  const formatedItem = cartItems.map((item)=> ({...item, _id:item._id.toString()}))

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <ClientCart cartItem={formatedItem}/>
    </div>
  );
};

export default CartPage;
