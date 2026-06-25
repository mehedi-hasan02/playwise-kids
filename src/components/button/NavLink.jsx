"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NavLink = ({ href, children }) => {
  const pathname = usePathname();

  const isActive = href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <Link
      href={href}
      className={`font-medium ${isActive ? "text-orange-400" : ""}`}
    >
      {children}
    </Link>
  );
};

export default NavLink;
