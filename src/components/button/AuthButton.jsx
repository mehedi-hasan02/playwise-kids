"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

const AuthButton = () => {
  const session = useSession();
  return (
    <div>
      {session.status == "authenticated" ? (
        <button onClick={() => signOut()}>Logout</button>
      ) : (
        <Link href={"/login"} className="btn btn-success btn-outline">
          Login
        </Link>
      )}
    </div>
  );
};

export default AuthButton;
