import { getSingleProduct } from "@/actions/server/product";
import CartButton from "@/components/button/CartButton";
import Image from "next/image";
import { FaCartPlus, FaStar } from "react-icons/fa";

export async function generateMetadata({ params }) {
  const { id } = await params;
  const product = await getSingleProduct(id);

  return {
    title: product.title,
    description: product.description.slice(0, 160),

    openGraph: {
      title: product.title,
      description: product.description.slice(0, 160),
      images: [
        {
          url: product.image,
          width: 1200,
          height: 630,
          alt: product.title,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: product.title,
      description: product.description.slice(0, 160),
      images: [product.image],
    },
  };
}

const ProductDetailsPage = async ({ params }) => {
  const { id } = await params;
  const product = await getSingleProduct(id);

  const {
    title,
    image,
    price,
    discount,
    description,
    ratings,
    reviews,
    sold,
    info,
    qna,
  } = product;

  const discountedPrice = price - (price * discount) / 100;

  return (
    <div className="py-8">
      <div className="grid md:grid-cols-2 gap-10">
        {/* Product Image */}
        <div className="relative h-[500px] border rounded-xl overflow-hidden bg-white">
          <Image
            src={image}
            alt={title}
            fill
            className="object-contain p-4"
            priority
          />
        </div>

        {/* Product Information */}
        <div>
          <h1 className="text-3xl font-bold">{title}</h1>

          <div className="flex flex-wrap items-center gap-4 mt-4 text-sm">
            <div className="flex items-center gap-1">
              <FaStar className="text-yellow-500" />
              <span>{ratings}</span>
            </div>

            <span>{reviews} Reviews</span>
            <span>{sold} Sold</span>
          </div>

          {/* Price */}
          <div className="mt-6">
            <span className="text-4xl font-bold text-primary">
              ৳{discountedPrice}
            </span>

            {discount > 0 && (
              <>
                <span className="ml-3 text-xl line-through text-gray-400">
                  ৳{price}
                </span>

                <span className="badge badge-error ml-3">{discount}% OFF</span>
              </>
            )}
          </div>

          {/* Features */}
          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-3">Product Features</h3>

            <ul className="space-y-2">
              {info?.map((item, index) => (
                <li key={index} className="flex gap-2">
                  <span className="text-success">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Buttons */}
          <div className="mt-8 flex gap-4">
            {/* <button className="btn btn-primary">
              <FaCartPlus />
              Add to Cart
            </button> */}
            {<CartButton product={product}/>}

            <button className="btn btn-outline">Buy Now</button>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">Product Description</h2>

        <div className="bg-base-100 border rounded-xl p-6 whitespace-pre-line leading-8">
          {description}
        </div>
      </div>

      {/* FAQ */}
      {qna?.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">
            Frequently Asked Questions
          </h2>

          <div className="space-y-3">
            {qna.map((item, index) => (
              <div
                key={index}
                className="collapse collapse-arrow bg-base-100 border"
              >
                <input type="radio" name="faq-accordion" />
                <div className="collapse-title font-semibold">
                  {item.question}
                </div>
                <div className="collapse-content">
                  <p>{item.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetailsPage;
