import Logout from "@/components/sidebar/logout";
import Menu from "@/components/sidebar/menu";
import Link from "next/link";

const SideBarView = () => {
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
      <Menu />

      {/* Footer */}
      <Logout />
    </aside>
  );
};

export default SideBarView;
