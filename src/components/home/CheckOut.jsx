"use client";

import { createOrder } from "@/actions/server/order";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import { toast } from "react-toastify";

const CheckOut = ({ cartItems = [] }) => {
  const session = useSession();
  const router = useRouter()
  const totalItems = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.quantity, 0),
    [cartItems],
  );

  const subtotal = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cartItems],
  );

  const shipping = 0;
  const total = subtotal + shipping;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData(e.target);

    const orderInfo = {
      name: form.get("name"),
      email: form.get("email"),
      phone: form.get("phone"),
      address: form.get("address"),
      city: form.get("city"),
      zipCode: form.get("zipCode"),
      note: form.get("note"),
    };

    const result = await createOrder(orderInfo);

    if(result.success){
        toast.success("Order Confirm")
        router.push('/')
    }else{
        toast.error("Something went worng")
        router.push('/cart')
    }
  };

  if(session.status == "loading"){
    return <h2 className="text-5xl font-bold absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">Loading....</h2>
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold mb-8">Checkout</h1>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Checkout Form */}
        <div className="lg:col-span-2">
          <div className="card bg-base-100 shadow-lg border">
            <div className="card-body">
              <h2 className="card-title text-2xl mb-6">Delivery Information</h2>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    value={session?.data?.user?.name}
                    className="input input-bordered w-full"
                    required
                    readOnly
                  />

                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={session?.data?.user?.email}
                    className="input input-bordered w-full"
                    required
                    readOnly
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    className="input input-bordered w-full"
                    required
                  />

                  <input
                    type="text"
                    name="city"
                    placeholder="City"
                    className="input input-bordered w-full"
                    required
                  />
                </div>

                <textarea
                  name="address"
                  placeholder="Delivery Address"
                  className="textarea textarea-bordered w-full h-28"
                  required
                />

                <textarea
                  name="note"
                  placeholder="Order Note (Optional)"
                  className="textarea textarea-bordered w-full h-24"
                />

                <button type="submit" className="btn btn-primary w-full">
                  Place Order
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:sticky lg:top-24 h-fit">
          <div className="card bg-base-100 shadow-lg border">
            <div className="card-body">
              <h2 className="card-title text-2xl mb-5">Order Summary</h2>

              <div className="space-y-4 max-h-72 overflow-y-auto">
                {cartItems.map((item) => (
                  <div
                    key={item._id}
                    className="flex justify-between border-b pb-3"
                  >
                    <div className="flex-1">
                      <h3 className="font-medium line-clamp-2">{item.title}</h3>

                      <p className="text-sm opacity-70">Qty: {item.quantity}</p>
                    </div>

                    <span className="font-semibold ml-3">
                      ৳ {(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="divider"></div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Total Items</span>
                  <span>{totalItems}</span>
                </div>

                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>৳ {subtotal.toFixed(2)}</span>
                </div>

                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="text-success">Free</span>
                </div>

                <div className="divider my-1"></div>

                <div className="flex justify-between text-xl font-bold">
                  <span>Total</span>
                  <span>৳ {total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckOut;
