import Logout from "@/components/sidebar/logout";
import Menu from "@/components/sidebar/menu";
import Link from "next/link";

const SideBarView = () => {
  return (
    <aside
      aria-label="Sidebar"
      className="flex h-screen flex-col items-center bg-white"
    >
      {/* Header */}
      <div className="p-2 text-center lg:p-4">
        <Link href="/home" className="text-xl font-bold text-orange-500">
          <span className="lg:hidden">K</span>
          <span className="hidden lg:inline">KasirKu</span>
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
