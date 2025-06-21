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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { fetcher } from "@/lib/swr/fetcher";
import { addProductSchema } from "@/schema";
import { CategoriesResponse, NewCategoriesResponse } from "@/types/type";
import { useEffect, useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { toast } from "sonner";
import useSWR, { mutate } from "swr";
import { z } from "zod";

type ProductCategorySelectProps = {
  form: UseFormReturn<z.infer<typeof addProductSchema>>;
};

const ProductCategorySelect = ({ form }: ProductCategorySelectProps) => {
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newCategoryId, setNewCategoryId] = useState<string | null>(null);
  const [showInput, setShowInput] = useState<boolean>(false);

  const { data } = useSWR<CategoriesResponse>("/api/categories", fetcher);

  const handleAddCategory = async () => {
    if (!newCategoryName.trim()) {
      return toast.error("Nama kategori tidak boleh kosong.");
    }

    try {
      const res = await fetch("/api/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ newCategoryName }),
      });

      const data = (await res.json()) as NewCategoriesResponse;

      if (!res.ok) {
        throw new Error(data.message || "Gagal menambahkan kategori");
      }

      setNewCategoryId(data.newCategory.id);
      setNewCategoryName("");
      setShowInput(false);

      mutate(
        "/api/categories",
        (prev: CategoriesResponse | undefined | null) => {
          return prev
            ? { ...prev, categories: [...prev.categories, data.newCategory] }
            : {
                success: true,
                message: "Kategori ditambahkan",
                categories: [data.newCategory],
              };
        },
        false,
      );
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(
          error.message || "Terjadi kesalahan saat menambahkan kategori",
        );
      }
      console.error(error);
    }
  };

  useEffect(() => {
    if (newCategoryId) {
      form.setValue("categoryId", newCategoryId);
      form.trigger("categoryId");
    }
  }, [newCategoryId, form]);
  return (
    <FormField
      control={form.control}
      name="categoryId"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Kategori</FormLabel>
          <FormControl>
            <Select
              value={field.value}
              onValueChange={(value) => {
                if (value === "new") {
                  setShowInput(true);
                } else {
                  field.onChange(value);
                }
              }}
            >
              <SelectTrigger className="w-full cursor-pointer">
                <SelectValue placeholder="Pilih kategori" />
              </SelectTrigger>
              <SelectContent>
                {data?.categories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
                <SelectItem value="new">+ Tambah Kategori Baru</SelectItem>
              </SelectContent>
            </Select>
          </FormControl>
          {showInput && (
            <div className="mt-2 flex items-center gap-2">
              <Input
                placeholder="Nama kategori baru"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                className="font-medium focus-visible:border-none focus-visible:ring-2 focus-visible:ring-orange-400"
              />
              <Button
                type="button"
                onClick={handleAddCategory}
                className="cursor-pointer bg-orange-500 hover:bg-orange-600"
              >
                Simpan
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setShowInput(false);
                  setNewCategoryName("");
                }}
                className="cursor-pointer"
              >
                Batal
              </Button>
            </div>
          )}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default ProductCategorySelect;
