"use client";

import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-toastify";

export const SocialButton = () => {
  const params = useSearchParams();
  const router = useRouter();
  const callBack = params.get("callbackUrl") || "/";

  const handleGoogleLogin = async () => {
    const result = await signIn("google", {
      // redirect: false,
      callbackUrl: callBack,
    });

    // if (result?.error) {
    //   // result.error will be something like "AccessDenied"
    //   toast.error(
    //     result.error === "AccessDenied"
    //       ? "Access denied. You do not have permission to sign in."
    //       : "Something went wrong. Please try again."
    //   );
    //   return;
    // }

    // if (result?.ok) {
    //   toast.success("Login successful!");
    //   router.push(result.url || callBack);
    // }
  };

  return (
    <div>
      <button onClick={handleGoogleLogin} className="btn btn-outline w-full">
        <FcGoogle size={22} />
        Continue with Google
      </button>
    </div>
  );
};