import React from "react";
// import products from "@/data/toys.json";
import ProductCard from "../cards/ProductCard";
import { getProducts } from "@/actions/server/product";

const Products = async () => {
  const products = (await getProducts()) || [];
  //   console.log(products._id)
  return (
    <div>
      <h1 className="text-center text-4xl font-bold">Our Products</h1>
      <div className="grid grid-cols-4 gap-5">
        {products.map((product) => (
          <ProductCard key={product.title} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Products;
