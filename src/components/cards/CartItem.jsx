"use client";

import {
  decreaseItem,
  deleteCartItem,
  increaseItem,
} from "@/actions/server/cart";
import Image from "next/image";
import { useState } from "react";
import { FaMinus, FaPlus, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const CartItem = ({ item, removeItem, increaseCartItem, decreaseCartItem }) => {
  const { _id, image, title, price, quantity } = item;
  const [loading, setLoading] = useState(false);

  const handelDeleteCart = async () => {
    setLoading(true);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Remove item!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const result = await deleteCartItem(_id);
        if (result.success) {
          removeItem(_id);
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
          });
        } else {
          Swal.fire({
            title: "Opps!",
            text: "Something went wrong",
            icon: "error",
          });
        }
      }
      setLoading(false);
    });
  };

  const onIncrease = async () => {
    setLoading(true);
    const result = await increaseItem(_id, quantity);

    if (result.success) {
      toast.success("Quantity Increase");
      increaseCartItem(_id, quantity + 1);
    } else {
      toast.error(result.message);
      // console.log(result)
    }
    setLoading(false);
  };

  const onDecrease = async () => {
    setLoading(true);

    const result = await decreaseItem(_id, quantity);

    if (result.success) {
      toast.success("Quantity Decrease");
      increaseCartItem(_id, quantity - 1);
    } else {
      toast.error(result.message);
    }

    setLoading(false);
  };

  return (
    <div className="card card-side bg-base-100 border border-base-300 shadow-sm p-4">
      {/* Product Image */}
      <figure className="w-28 h-28 rounded-lg overflow-hidden flex-shrink-0">
        <Image
          src={image}
          alt={title}
          width={120}
          height={120}
          className="object-cover w-full h-full"
        />
      </figure>

      {/* Product Info */}
      <div className="card-body p-0 pl-5 justify-between">
        <div>
          <h2 className="card-title text-lg line-clamp-2">{title}</h2>

          <p className="text-primary font-bold text-lg mt-1">৳ {price}</p>
        </div>

        <div className="flex items-center justify-between flex-wrap gap-4">
          {/* Quantity Controls */}
          <div className="join">
            <button
              onClick={onDecrease}
              className="btn btn-sm join-item"
              disabled={quantity <= 1 || loading}
            >
              <FaMinus size={12} />
            </button>

            <button className="btn btn-sm join-item pointer-events-none">
              {quantity}
            </button>

            <button
              onClick={onIncrease}
              className="btn btn-sm join-item"
              disabled={quantity == 10 || loading}
            >
              <FaPlus size={12} />
            </button>
          </div>

          {/* Remove Button */}
          <button
            onClick={handelDeleteCart}
            className="btn btn-error btn-outline btn-sm"
          >
            <FaTrash />
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
