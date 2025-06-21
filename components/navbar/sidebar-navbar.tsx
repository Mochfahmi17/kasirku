import clsx from "clsx";
import SidebarMenuContent from "./sidebar-menu-content";
import LogoutButtonNavbar from "./logout-button-navbar";

type SidebarNavbarProps = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const SidebarNavbar = ({ isOpen, setIsOpen }: SidebarNavbarProps) => {
  return (
    <aside
      className={clsx(
        "fixed top-0 left-0 z-50 flex h-screen w-64 transform flex-col justify-between bg-white px-4 py-6 shadow-md transition-transform duration-300 ease-in-out",
        {
          "translate-x-0": isOpen,
          "-translate-x-full": !isOpen,
        },
      )}
    >
      {/* Sidebar Content */}
      <SidebarMenuContent setIsOpen={setIsOpen} />

      {/* Logout Button */}
      <LogoutButtonNavbar />
    </aside>
  );
};

export default SidebarNavbar;
