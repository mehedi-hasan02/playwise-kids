"use client";

import { handelCart } from "@/actions/server/cart";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";
import { FaCartPlus } from "react-icons/fa";
import { toast } from "react-toastify";

const CartButton = ({ product }) => {
  const session = useSession();
  const { _id } = product;
  const router = useRouter();
  const path = usePathname();
  const isLogin = session?.status == "authenticated";
  const [isLoading, setIsLoading] = useState(false);

  const addToCart = async () => {

    // console.log(product)
    setIsLoading(true);
    if (isLogin) {
      const result = await handelCart({ product, inc: true });

      if (result.success) {
        toast.success("Added to cart");
      } else {
        toast.error(result.message);
      }
      setIsLoading(false);
    } else {
      router.push(`/login?callbackUrl=${path}`);
      setIsLoading(false);
    }
  };
  return (
    <button
      disabled={session.status == "loading" || isLoading}
      onClick={addToCart}
      className="btn btn-primary flex-1"
    >
      <FaCartPlus />
      Add Cart
    </button>
  );
};

export default CartButton;
