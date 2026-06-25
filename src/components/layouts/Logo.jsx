import Image from "next/image";
import Link from "next/link";
import React from "react";

const Logo = () => {
  return (
    <div>
      <Link href={"/"} className="flex justify-center gap-3 items-center">
        <Image
          src={"/assets/logo.png"}
          alt="hero-kidz"
          width={50}
          height={50}
        />
        <h2 className="text-xl font-bold">PlayWise <span className="text-orange-500">Kids</span></h2>
      </Link>
    </div>
  );
};

export default Logo;
