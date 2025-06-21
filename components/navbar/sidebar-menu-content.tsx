"use client";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IoSettingsOutline, IoStorefrontOutline } from "react-icons/io5";
import { PiPackageFill } from "react-icons/pi";
import { RiBillLine, RiPieChart2Line } from "react-icons/ri";

type SidebarMenuContentProps = {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const menuItem = [
  {
    icon: <IoStorefrontOutline className="size-4" />,
    label: "Home",
    href: "/home",
  },
  {
    icon: <RiPieChart2Line className="size-4" />,
    label: "Dashboard",
    href: "/dashboard",
  },
  {
    icon: <PiPackageFill className="size-4" />,
    label: "Produk",
    href: "/products",
  },
  {
    icon: <RiBillLine className="size-4" />,
    label: "Tagihan",
    href: "/bills",
  },
  {
    icon: <IoSettingsOutline className="size-4" />,
    label: "Pengaturan",
    href: "/settings",
  },
];

const SidebarMenuContent = ({ setIsOpen }: SidebarMenuContentProps) => {
  const pathname = usePathname();
  return (
    <div>
      <div className="mb-6">
        <Link href="/home" className="text-xl font-bold text-orange-500">
          KasirKu
        </Link>
      </div>
      <ul>
        {menuItem.map((item, index) => (
          <li
            key={index}
            onClick={() => setIsOpen(false)}
            className={clsx(
              "rounded-md py-3 text-gray-600 transition-colors hover:text-orange-500",
              {
                "text-orange-500": pathname === item.href,
              },
            )}
          >
            <Link href={item.href} className="flex items-center gap-2">
              {item.icon}
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SidebarMenuContent;
