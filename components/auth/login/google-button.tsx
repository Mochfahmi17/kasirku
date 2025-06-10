"use client";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

const GoogleButton = () => {
  const handleClick = () => {
    signIn("google", { redirectTo: DEFAULT_LOGIN_REDIRECT });
  };
  return (
    <Button
      onClick={handleClick}
      size="lg"
      variant="outline"
      className="w-full cursor-pointer"
    >
      <FcGoogle className="size-5" /> Lanjutkan Dengan Google
    </Button>
  );
};

export default GoogleButton;
