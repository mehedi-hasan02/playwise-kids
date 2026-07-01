"use client";

import Link from "next/link";
import React, { useEffect } from "react";
import { FcGoogle } from "react-icons/fc";
import { signIn } from "next-auth/react";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { useRouter, useSearchParams } from "next/navigation";
import { SocialButton } from "./SocialButton";

// const errorMessages = {
//   AccessDenied: "You do not have permission to sign in.",
//   OAuthAccountNotLinked:
//     "That email is already registered with a different sign-in method.",
//   default: "Something went wrong. Please try again.",
// };

const LoginForm = () => {
  const router = useRouter();
  const params = useSearchParams();
  const callBack = params.get("callbackUrl") || "/";

  // useEffect(() => {
  //   const error = params.get("error");
  //   if (error) {
  //     toast.error(errorMessages[error] || errorMessages.default);
  //     // clean the error param out of the URL so refresh doesn't re-trigger it
  //     const url = new URL(window.location.href);
  //     url.searchParams.delete("error");
  //     router.replace(url.pathname + url.search);
  //   }
  // }, [params, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
      callbackUrl: params.get("callbackUrl") || "/",
    });

    if (!result.ok) {
      Swal.fire("Error", "Email Password not Match", "error");
    } else {
      toast.success("Login successful!");
      router.push(callBack);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="card w-full max-w-md bg-base-100 shadow-xl border">
        <div className="card-body">
          <h1 className="text-3xl font-bold text-center">Welcome Back</h1>

          <p className="text-center text-base-content/70">
            Sign in to your account
          </p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
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
                placeholder="Enter your password"
                className="input input-bordered w-full"
                required
              />
            </div>

            <div className="text-right">
              <Link
                href="/forgot-password"
                className="text-sm text-primary hover:underline"
              >
                Forgot Password?
              </Link>
            </div>

            <button type="submit" className="btn btn-primary w-full">
              Sign In
            </button>
          </form>

          <div className="divider">OR</div>

          <SocialButton />

          <p className="text-center mt-4">
            Don't have an account?{" "}
            <Link
              href={`/register?callbackUrl=${callBack}`}
              className="text-primary font-semibold hover:underline"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
