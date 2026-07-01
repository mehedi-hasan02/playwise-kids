"use client";

import React, { useMemo, useState } from "react";
import CartItem from "../cards/CartItem";
import Link from "next/link";

const ClientCart = ({ cartItem = [] }) => {
  const [items, setItems] = useState(cartItem);

  const removeItem = (id) => {
    setItems((prevItem) => prevItem.filter((item) => item._id != id));
  };

  const totalItem = useMemo(
    () => items.reduce((acm, item) => acm + item.quantity, 0),
    [items],
  );

  const totalPrice = useMemo(
    () => items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [items],
  );

  const increaseCartItem = (id, q) => {
    setItems((prevItem) =>
      prevItem.map((item) =>
        item._id == id ? { ...item, quantity: q } : item,
      ),
    );
  };

  const decreaseCartItem = (id, q) => {
    setItems((prevItem) =>
      prevItem.map((item) =>
        item._id == id ? { ...item, quantity: q } : item,
      ),
    );
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Cart Items */}
      <div className="lg:col-span-2">
        <h1 className="text-3xl font-bold mb-6">
          Shopping Cart ({items.length})
        </h1>

        {items.length === 0 ? (
          <div className="text-center py-20">
            <h2 className="text-2xl font-semibold">Your cart is empty</h2>
            <p className="text-gray-500 mt-2">
              Add some products to your cart.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {items.map((item) => (
              <CartItem
                key={item._id}
                item={item}
                removeItem={removeItem}
                increaseCartItem={increaseCartItem}
                decreaseCartItem={decreaseCartItem}
              />
            ))}
          </div>
        )}
      </div>

      {/* Cart Summary */}
      <div className="lg:sticky lg:top-24 h-fit">
        <div className="card bg-base-100 shadow-lg border border-base-300">
          <div className="card-body">
            <h2 className="card-title text-2xl mb-4">Order Summary</h2>

            {/* Product List */}
            <div className="space-y-3 max-h-80 overflow-y-auto">
              {items.map((item) => (
                <div
                  key={item._id}
                  className="flex justify-between items-start border-b border-base-300 pb-3"
                >
                  <div className="">
                    <h3 className="font-medium line-clamp-2">{item.title}</h3>

                    <p className="text-sm text-gray-500">
                      Qty: {item.quantity} * ৳ {item.price}
                    </p>
                  </div>

                  <p className="font-semibold whitespace-nowrap ml-3">
                    ৳ {(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>

            <div className="divider my-2"></div>

            <div className="flex justify-between">
              <span>Total Items</span>
              <span className="font-semibold">{totalItem}</span>
            </div>

            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-semibold">৳ {totalPrice.toFixed(2)}</span>
            </div>

            <div className="flex justify-between">
              <span>Shipping</span>
              <span className="text-success">Free</span>
            </div>

            <div className="divider my-2"></div>

            <div className="flex justify-between text-xl font-bold">
              <span>Total</span>
              <span>৳ {totalPrice.toFixed(2)}</span>
            </div>

            <Link
              href={"/checkout"}
              className="btn btn-primary w-full mt-5"
              disabled={items.length === 0}
            >
              Confirm Order
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientCart;
