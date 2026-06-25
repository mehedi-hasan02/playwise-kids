import React from "react";

const ProductSkeleton = () => {
  return (
    <div className="card bg-base-100 shadow-md border border-base-300">
      <div className="skeleton h-56 w-full"></div>

      <div className="card-body p-4">
        <div className="skeleton h-5 w-3/4"></div>
        <div className="skeleton h-5 w-1/2"></div>

        <div className="flex justify-between mt-3">
          <div className="skeleton h-4 w-12"></div>
          <div className="skeleton h-4 w-16"></div>
          <div className="skeleton h-4 w-12"></div>
        </div>

        <div className="skeleton h-6 w-24 mt-4"></div>

        <div className="flex gap-3 mt-5">
          <div className="skeleton h-10 flex-1"></div>
          <div className="skeleton h-10 flex-1"></div>
        </div>
      </div>
    </div>
  );
};

export default ProductSkeleton;