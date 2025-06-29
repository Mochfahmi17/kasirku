import { auth } from "@/auth";
import Logout from "@/components/sidebar/logout";
import Menu from "@/components/sidebar/menu";
import Link from "next/link";
import { use } from "react";

const SideBarView = () => {
  const session = use(auth());
  return (
    <aside
      aria-label="Sidebar"
      className="hidden h-screen flex-col items-center bg-white lg:flex"
    >
      {/* Header */}
      <div className="p-4 text-center">
        <Link href="/home" className="text-xl font-bold text-orange-500">
          KasirKu
        </Link>
      </div>

      {/* Body */}
      <Menu role={session ? session.user.role : ""} />

      {/* Footer */}
      <Logout />
    </aside>
  );
};

export default SideBarView;
