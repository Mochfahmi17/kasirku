"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IoSettingsOutline, IoStorefrontOutline } from "react-icons/io5";
import { RiBillLine, RiPieChart2Line } from "react-icons/ri";
import { PiPackageFill } from "react-icons/pi";

type MenuProps = {
  role: string;
};

const menuItem = [
  {
    icons: <IoStorefrontOutline className="size-4 lg:size-6" />,
    label: "Home",
    href: "/home",
    roles: ["kasir", "admin"],
  },
  {
    icons: <RiPieChart2Line className="size-4 lg:size-6" />,
    label: "Dashboard",
    href: "/dashboard",
    roles: ["kasir", "admin"],
  },
  {
    icons: <PiPackageFill className="size-4 lg:size-6" />,
    label: "Produk",
    href: "/products",
    roles: ["admin"],
  },
  {
    icons: <RiBillLine className="size-4 lg:size-6" />,
    label: "Tagihan",
    href: "/bills",
    roles: ["kasir", "admin"],
  },
  {
    icons: <IoSettingsOutline className="size-4 lg:size-6" />,
    label: "Pengaturan",
    href: "/settings",
    roles: ["kasir", "admin"],
  },
];

const Menu = ({ role }: MenuProps) => {
  const pathname = usePathname();
  return (
    <nav className="flex-1 overflow-y-auto p-4">
      <ul className="flex flex-col items-center justify-center space-y-2">
        {menuItem
          .filter((item) => item.roles.includes(role))
          .map((item, i) => {
            const isActive = pathname === item.href;
            return (
              <li key={i}>
                <Link href={item.href}>
                  <div
                    className={clsx(
                      "inline-block w-20 rounded-sm py-3 text-gray-500 transition-all hover:bg-orange-500 hover:text-white hover:shadow-md active:bg-orange-500 lg:rounded-xl",
                      {
                        "bg-orange-500 text-white shadow-md": isActive,
                      },
                    )}
                  >
                    <div className="flex flex-col items-center gap-2">
                      {item.icons}
                      <p className="hidden text-center text-xs lg:block">
                        {item.label}
                      </p>
                    </div>
                  </div>
                </Link>
              </li>
            );
          })}
      </ul>
    </nav>
  );
};

export default Menu;
