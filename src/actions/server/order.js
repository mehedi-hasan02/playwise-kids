"use server"

import { authOptions } from "@/lib/authOptions";
import { collections, dbConnect } from "@/lib/dbConnect";
import { getServerSession } from "next-auth";
import { clearCart, getCart } from "./cart";

const orderCollection = dbConnect(collections.ORDER);

export const createOrder = async (payload) => {
    const {user} = await getServerSession(authOptions) || {}
    if(!user){
        return {success: false}
    }

    const cart = await getCart()

    if(cart.length == 0){
        return {success : false}
    }

    const newOrder = {
        createAt: new Date().toISOString(),
        items: cart,
        ...payload
    }

    const result = await orderCollection.insertOne(newOrder)

    if(Boolean(result.insertedId)){
        const result = await clearCart()
    }

    return{
        success: result.insertedId
    }
}
