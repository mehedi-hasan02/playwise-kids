"use client"

import { usePathname, useRouter } from 'next/navigation';
import React from 'react';
import { FaCartPlus } from 'react-icons/fa';

const CartButton = ({product}) => {
    const {_id} = product
    const isUser = false
    const router = useRouter()
    const path = usePathname()
    
    const addToCart = () => {
        if(isUser)
            alert(_id)
        else
            router.push(`/login?callbackUrl=${path}`)

            
    }
    return (
        <button onClick={addToCart} className="btn btn-primary flex-1">
            <FaCartPlus />
            Add Cart
          </button>
    );
};

export default CartButton;