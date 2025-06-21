import { IoLogOutOutline } from "react-icons/io5";

const LogoutButtonNavbar = () => {
  return (
    <div className="mt-8 flex cursor-pointer items-center gap-2 text-gray-600 hover:text-red-500">
      <IoLogOutOutline className="size-4" />
      <span>Log Out</span>
    </div>
  );
};

export default LogoutButtonNavbar;
