import ProductSkeleton from "@/components/skeleton/ProductSkeleton";
import React from "react";

const loading = () => {
  return (
    <div className="grid grid-cols-4 gap-5">
      {[...Array(12)].map((_, index) => (
        <ProductSkeleton key={index} />
      ))}
    </div>
  );
};

export default loading;
