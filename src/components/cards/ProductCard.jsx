import Image from "next/image";
import Link from "next/link";
import { FaCartPlus, FaEye, FaStar } from "react-icons/fa";

const ProductCard = ({ product }) => {
  const { _id, title, image, price, discount, reviews, sold, ratings } =
    product;

  const discountedPrice = price - (price * discount) / 100;

  return (
    <div className="card bg-base-100 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200 h-full">
      <figure className="relative overflow-hidden">
        <div className="h-60 w-full flex items-center justify-center bg-white p-3">
          <Image
            src={image}
            alt={title}
            width={380}
            height={250}
            className="w-full h-full object-contain"
          />
        </div>

        {discount > 0 && (
          <div className="badge badge-error absolute top-3 right-3 text-white">
            -{discount}%
          </div>
        )}
      </figure>

      <div className="card-body p-4">
        <h2 className="card-title text-base line-clamp-2 min-h-12">{title}</h2>

        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <FaStar className="text-yellow-500" />
            <span>{ratings}</span>
          </div>

          <span>{reviews} Reviews</span>
          <span>{sold} Sold</span>
        </div>

        <div className="mt-2">
          <span className="text-xl font-bold text-primary">
            ৳{discountedPrice}
          </span>

          {discount > 0 && (
            <span className="ml-2 text-sm line-through text-gray-400">
              ৳{price}
            </span>
          )}
        </div>

        <div className="card-actions mt-auto pt-3">
          <button className="btn btn-primary flex-1">
            <FaCartPlus />
            Add Cart
          </button>
          {/* {<CartButton product={product}/>} */}

          <Link href={`/product/${_id}`} className="btn btn-outline flex-1">
            <FaEye />
            Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
