import Logo from "@/components/layouts/Logo";
import Link from "next/link";
import React from "react";
import { FaSpinner } from "react-icons/fa";

const loading = () => {
  return (
    <div className="flex flex-col gap-5 justify-center items-center min-h-[calc(100vh-300px)]">
        <FaSpinner className="animate-spin text-4xl"/>
        <Logo/>
    </div>
  );
};

export default loading;
