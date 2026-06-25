import React from 'react';
import { FaCartPlus } from 'react-icons/fa';

const CartButton = ({product}) => {
    const {_id} = product
    console.log(product)
    return (
        <button className="btn btn-primary flex-1">
            <FaCartPlus />
            Add Cart
          </button>
    );
};

export default CartButton;