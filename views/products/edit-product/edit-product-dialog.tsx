"use client";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import useSWR from "swr";
import { fetcher } from "@/lib/swr/fetcher";
import ProductEditForm from "./product-edit-form";
import { Product } from "@/types/type";

type EditProductDialogProps = {
  children: React.ReactNode;
  productId: string;
};

const EditProductDialog = ({ children, productId }: EditProductDialogProps) => {
  const [openProductDialog, setOpenProductDialog] = useState<boolean>(false);

  const { data, mutate } = useSWR<{ success: boolean; product: Product }>(
    `/api/products/${productId}`,
    fetcher,
  );

  mutate();
  return (
    <div>
      <div onClick={() => setOpenProductDialog(true)}>{children}</div>
      <Dialog
        open={openProductDialog}
        onOpenChange={() => setOpenProductDialog(false)}
      >
        <DialogTrigger asChild></DialogTrigger>
        <DialogContent className="max-h-[620px] overflow-x-auto md:max-w-3xl lg:max-h-[600px] lg:max-w-4xl">
          <DialogHeader>
            <DialogTitle>Edit Produk</DialogTitle>
          </DialogHeader>
          <ProductEditForm
            defaultValues={data?.product}
            closeDialog={setOpenProductDialog}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EditProductDialog;
