"use client";

import { postUser } from "@/actions/server/auth";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { FcGoogle } from "react-icons/fc";
import { SocialButton } from "./SocialButton";
import { toast } from "react-toastify";

const RegisterForm = () => {
  const router = useRouter();
  const params = useSearchParams()
  const callback = params.get("callbackUrl") || "/";

  const handleRegister = async (e) => {
    e.preventDefault();

    const form = e.target;

    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;

    const user = {
      name,
      email,
      password,
    };

    const result = await postUser(user);

    if (result.acknowledged) {
      toast.success("Register successful!");
      router.push("/login");
    }else{
      toast.success("Please Try Again");
    }

    // Registration logic here
  };


  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-10">
      <div className="card w-full max-w-md bg-base-100 shadow-xl border">
        <div className="card-body">
          <h1 className="text-3xl font-bold text-center">Create Account</h1>

          <p className="text-center text-base-content/70">
            Join us and start your journey
          </p>

          <form onSubmit={handleRegister} className="space-y-4 mt-6">
            {/* Full Name */}
            <div>
              <label className="label">
                <span className="label-text">Full Name</span>
              </label>

              <input
                type="text"
                name="name"
                placeholder="Enter your full name"
                className="input input-bordered w-full"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label className="label">
                <span className="label-text">Email</span>
              </label>

              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                className="input input-bordered w-full"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="label">
                <span className="label-text">Password</span>
              </label>

              <input
                type="password"
                name="password"
                placeholder="Create a password"
                className="input input-bordered w-full"
                required
                minLength={6}
              />
            </div>

            <button type="submit" className="btn btn-primary w-full mt-2">
              Register
            </button>
          </form>

          <div className="divider">OR</div>

          {/* Google Login */}
          {/* <button
            onClick={handleGoogleLogin}
            className="btn btn-outline w-full"
          >
            <FcGoogle size={22} />
            Continue with Google
          </button> */}
          <SocialButton />

          <p className="text-center mt-4">
            Already have an account?{" "}
            <Link
              href={`/login?callbackUrl=${callback}`}
              className="text-primary font-semibold hover:underline"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
