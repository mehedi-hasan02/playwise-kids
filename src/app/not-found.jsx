import Link from "next/link";
import React from "react";
import { RiErrorWarningLine } from "react-icons/ri";

const Error404 = () => {
  return (
    <div className="flex flex-col gap-5 justify-center items-center min-h-[calc(100vh-300px)]">
      <div className="flex flex-col gap-2 justify-center items-center">
        <RiErrorWarningLine className="text-5xl text-error"/>
        <h2 className="text-4xl font-bold">Page Not Found</h2>
      </div>
      <Link href={'/'} className="btn btn-error text-white">Back Home</Link>
    </div>
  );
};

export default Error404;
