"use client";
import { IoLogOutOutline } from "react-icons/io5";
import { Button } from "../ui/button";
import { useState } from "react";
import PopUp from "../popup/popup";
import { signOut } from "next-auth/react";

const Logout = () => {
  const [showConfirm, setShowConfirm] = useState<boolean>(false);
  const [disable, setDisable] = useState<boolean>(false);

  const handleLogout = () => {
    signOut({ redirectTo: "/login" });
    setDisable(true);
  };
  return (
    <div className="p-2 lg:p-4">
      <Button
        variant="ghost"
        onClick={() => setShowConfirm(true)}
        className="cursor-pointer rounded-sm p-2 text-center text-xs text-gray-500 transition-all hover:bg-orange-500 hover:text-white hover:shadow-md lg:w-20 lg:rounded-xl lg:py-8"
      >
        <div className="flex flex-col items-center gap-2">
          <IoLogOutOutline className="size-4 lg:size-6" />
          <span className="hidden lg:block">Log Out</span>
        </div>
      </Button>

      {/* Modal */}
      {showConfirm && (
        <PopUp
          title="Apakah Anda yakin ingin logout ?"
          closeModal={setShowConfirm}
        >
          <Button
            variant="outline"
            onClick={() => setShowConfirm(false)}
            className="cursor-pointer"
          >
            Batal
          </Button>
          <Button
            onClick={handleLogout}
            disabled={disable}
            className="cursor-pointer bg-orange-500 hover:bg-orange-600"
          >
            Logout
          </Button>
        </PopUp>
      )}
    </div>
  );
};

export default Logout;
