"use client";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import ProductAddForm from "./product-add-form";

type AddProductDialogProps = {
  children: React.ReactNode;
};

const AddProductDialog = ({ children }: AddProductDialogProps) => {
  const [openProductDialog, setOpenProductDialog] = useState<boolean>(false);
  return (
    <Dialog open={openProductDialog} onOpenChange={setOpenProductDialog}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-h-[620px] overflow-x-auto md:max-w-3xl lg:max-h-[600px] lg:max-w-4xl">
        <DialogHeader>
          <DialogTitle>Tambah Produk</DialogTitle>
        </DialogHeader>
        <ProductAddForm closeDialog={setOpenProductDialog} />
      </DialogContent>
    </Dialog>
  );
};

export default AddProductDialog;
