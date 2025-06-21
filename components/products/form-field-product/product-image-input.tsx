"use client";
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { addProductSchema } from "@/schema";
import { CloudinaryUploadResponse } from "@/types/type";
import clsx from "clsx";
import { ImagePlus, Trash2 } from "lucide-react";
import Image from "next/image";
import { ChangeEvent, useState } from "react";
import { UseFormReturn, useWatch } from "react-hook-form";
import { BarLoader } from "react-spinners";
import { toast } from "sonner";
import { z } from "zod";

type ProductImageInputProps = {
  form: UseFormReturn<z.infer<typeof addProductSchema>>;
};

const ProductImageInput = ({ form }: ProductImageInputProps) => {
  const imageValue = useWatch({ control: form.control, name: "image" });
  const publicId = useWatch({ control: form.control, name: "image_public_id" });
  const [isUploading, setIsUploading] = useState(false);

  const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      form.setError("image", { message: "Ukuran gambar maksimal 2MB" });
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setIsUploading(true);
      const res = await fetch("/api/upload-image", {
        method: "POST",
        body: formData,
      });

      const data = (await res.json()) as CloudinaryUploadResponse;
      if (!res.ok) {
        throw new Error(data.result.message || "Failed to upload image");
      }

      form.setValue("image", data.result.secure_url);
      form.setValue("image_public_id", data.result.public_id);
    } catch (error) {
      console.error(error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleDeleteImage = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!publicId) {
      return toast.error("gambar tidak ditemukan!");
    }

    try {
      const res = await fetch("/api/delete-image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ image_public_id: publicId }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to delete image");
      }

      form.setValue("image", "");
      form.setValue("image_public_id", "");
    } catch (error) {
      console.error("Failed to delete image fron cloudinary", error);
      toast.error("failed to delete image.");
    }
  };
  return (
    <FormField
      control={form.control}
      name="image"
      render={() => (
        <FormItem>
          <FormLabel
            className={clsx(
              "relative flex aspect-video w-full cursor-pointer flex-col items-center justify-center place-self-center rounded-md border-2 border-dashed border-gray-300 bg-gray-50",
              {
                "cursor-default": imageValue,
              },
            )}
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6 text-gray-500">
              {imageValue ? (
                <Button
                  type="button"
                  size="icon"
                  onClick={(e) => handleDeleteImage(e)}
                  className="absolute top-1 right-1 z-10 cursor-pointer bg-red-500 text-white hover:bg-red-600"
                >
                  <Trash2 className="size-4" />
                </Button>
              ) : (
                <div className="flex flex-col items-center justify-center">
                  {isUploading ? (
                    <BarLoader className="z-10" />
                  ) : (
                    <>
                      <ImagePlus className="size-8" />
                      <p className="mb-2 text-sm font-bold">Add Image</p>
                      <p className="text-xs">JPG, JPEG, PNG, Webp (max: 2MB)</p>
                    </>
                  )}
                </div>
              )}
            </div>
            {imageValue ? (
              <Image
                src={imageValue}
                alt="product image upload"
                width={640}
                height={360}
                className="absolute aspect-video rounded-md object-cover"
              />
            ) : (
              <>
                <FormControl>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageChange(e)}
                    className="hidden"
                  />
                </FormControl>
                <FormMessage />
              </>
            )}
          </FormLabel>
        </FormItem>
      )}
    />
  );
};

export default ProductImageInput;
