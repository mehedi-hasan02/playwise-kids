"use server";

import { authOptions } from "@/lib/authOptions";
import { collections, dbConnect } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { cache } from "react";

const cartCollection = dbConnect(collections.CART);

export const handelCart = async ({ product, inc = true }) => {
  const { user } = (await getServerSession(authOptions)) || {};

  if (!user) return { success: false };

  const query = { email: user?.email, productId: product?._id };

  const isAdded = await cartCollection.findOne(query);

  if (isAdded && isAdded.quantity > 9) {
    return {
      success: false,
      message: "You can't buy more than 10 product at a time",
    };
  }

  if (isAdded) {
    // Exist: Update cart
    const updatedData = {
      $inc: {
        quantity: inc ? 1 : -1,
      },
    };

    const result = await cartCollection.updateOne(query, updatedData);

    return { success: Boolean(result.modifiedCount) };
  } else {
    // Not exist: insert cart
    const newData = {
      productId: product?._id,
      email: user?.email,
      title: product?.title,
      quantity: 1,
      image: product?.image,
      price: product?.price - (product?.price * product?.discount) / 100,
    };

    const result = await cartCollection.insertOne(newData);

    return { success: result.acknowledged };
  }
};

export const getCart = cache(async () => {
  const { user } = await getServerSession(authOptions);
  // console.log(user)

  if (!user) return [];

  const query = { email: user?.email };

  const result = cartCollection.find(query).toArray();

  return result;
});

export const deleteCartItem = async (id) => {
  const { user } = await getServerSession(authOptions);
  // console.log(user)

  if (!user) return { success: false };

  if (id?.length != 24) return { success: false };

  const query = { _id: new ObjectId(id) };

  const result = cartCollection.deleteOne(query);

  // if(Boolean((await result).deletedCount)){
  //   revalidatePath("/cart")
  // }

  return { success: Boolean((await result).deletedCount) };
};

export const increaseItem = async (id, quantity) => {
  const { user } = (await getServerSession(authOptions)) || {};

  if (!user) return { success: false };

  if (quantity > 9) {
    return {
      success: false,
      message: "You can't buy more than 10 product at a time",
    };
  }

  const query = { _id: new ObjectId(id) };

  const updateData = {
    $inc: {
      quantity: 1,
    },
  };

  const result = await cartCollection.updateOne(query, updateData);

  return { success: Boolean(result.modifiedCount) };
};

export const decreaseItem = async (id, quantity) => {
  const { user } = (await getServerSession(authOptions)) || {};

  if (!user) return { success: false };

  if (quantity <= 1) {
    return {
      success: false,
      message: "You can't cart 0 quantity",
    };
  }

  const query = { _id: new ObjectId(id) };

  const updateData = {
    $inc: {
      quantity: -1,
    },
  };

  const result = await cartCollection.updateOne(query, updateData);

  return { success: Boolean(result.modifiedCount) };
};
