import { useEffect, useRef } from "react";
import { Card, CardContent, CardHeader } from "../ui/card";

type PopUpProps = {
  title: string;
  children: React.ReactNode;
  closeModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const PopUp = ({ title, children, closeModal }: PopUpProps) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (cardRef.current && !cardRef.current.contains(e.target as Node)) {
        closeModal(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [closeModal]);
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <Card ref={cardRef} className="w-80">
        <CardHeader className="text-center text-sm font-semibold">
          {title}
        </CardHeader>
        <CardContent className="flex w-full justify-between">
          {children}
        </CardContent>
      </Card>
    </div>
  );
};

export default PopUp;
