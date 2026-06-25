import React from "react";

const ProductDetailsLoading = () => {
  return (
    <div className="py-8 animate-pulse">
      <div className="grid md:grid-cols-2 gap-10">
        {/* Product Image */}
        <div className="skeleton w-full h-[500px] rounded-xl"></div>

        {/* Product Info */}
        <div>
          <div className="skeleton h-10 w-3/4 mb-4"></div>

          <div className="flex gap-4 mb-6">
            <div className="skeleton h-5 w-16"></div>
            <div className="skeleton h-5 w-20"></div>
            <div className="skeleton h-5 w-16"></div>
          </div>

          <div className="skeleton h-12 w-40 mb-8"></div>

          {/* Features */}
          <div className="space-y-3">
            <div className="skeleton h-5 w-full"></div>
            <div className="skeleton h-5 w-5/6"></div>
            <div className="skeleton h-5 w-4/5"></div>
            <div className="skeleton h-5 w-3/4"></div>
          </div>

          {/* Buttons */}
          <div className="flex gap-4 mt-8">
            <div className="skeleton h-12 w-36"></div>
            <div className="skeleton h-12 w-36"></div>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="mt-12">
        <div className="skeleton h-8 w-56 mb-4"></div>

        <div className="border rounded-xl p-6 space-y-3">
          <div className="skeleton h-4 w-full"></div>
          <div className="skeleton h-4 w-full"></div>
          <div className="skeleton h-4 w-11/12"></div>
          <div className="skeleton h-4 w-10/12"></div>
          <div className="skeleton h-4 w-full"></div>
          <div className="skeleton h-4 w-9/12"></div>
        </div>
      </div>

      {/* FAQ */}
      <div className="mt-12">
        <div className="skeleton h-8 w-72 mb-6"></div>

        <div className="space-y-3">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="border rounded-xl p-5"
            >
              <div className="skeleton h-5 w-3/4"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsLoading;