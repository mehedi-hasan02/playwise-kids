"use server";

import { collections, dbConnect } from "@/lib/dbConnect";
import bcrypt from "bcryptjs";

export const postUser = async (payload) => {
  const { email, password, name } = payload;
  // check payload
  if (!email || !password) return false;


  // check user
  const isExist = await dbConnect(collections.USERS).findOne({ email });
  if (isExist) return false;

  // create user
  const newUser = {
    provider: "credentials",
    name,
    email,
    password: await bcrypt.hash(password, 10),
    role: "user",
  };

  // insert user

  const result = await dbConnect(collections.USERS).insertOne(newUser);
  if (result.acknowledged) {
    return { ...result, insertedId: result.insertedId.toString() };
  }
};

export const loginUser = async (payload) => {
  const { email, password, name } = payload;
  // check payload
  if (!email || !password) return null;

  // check user
  const user = await dbConnect(collections.USERS).findOne({ email });
  if (!user) return null;

  const isMatch = await bcrypt.compare(password, user?.password);

  if (isMatch) return user;
  else return null;
};
