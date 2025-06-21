import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { editProductSchema } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";
import { z } from "zod";
import { useEffect, useTransition } from "react";
import { mutate } from "swr";
import { useProductQueryStore } from "@/stores/product-query-store";
import ProductImageInput from "../../../components/products/form-field-product/product-image-input";
import ProductCategorySelect from "../../../components/products/form-field-product/product-category-select";
import ProductVariant from "../../../components/products/form-field-product/product-variant";
import { Product } from "@/types/type";
import { toast } from "sonner";

type ProductEditFormProps = {
  closeDialog: React.Dispatch<React.SetStateAction<boolean>>;
  defaultValues?: Product;
};

const ProductEditForm = ({
  closeDialog,
  defaultValues,
}: ProductEditFormProps) => {
  const { key } = useProductQueryStore();
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof editProductSchema>>({
    resolver: zodResolver(editProductSchema),
    defaultValues: {
      name: defaultValues?.name,
      description: defaultValues?.description || "",
      image: defaultValues?.image,
      image_public_id: defaultValues?.image_public_id,
      price: defaultValues?.price,
      stock: defaultValues?.stock,
      discount: defaultValues?.discount,
      categoryId: defaultValues?.categoryId,
      variants: defaultValues?.variants?.map((variant) => ({
        name: variant.name,
        price: variant.price,
        stock: variant.stock,
      })),
    },
  });

  const { control, setValue } = form;

  const variants = useWatch({ control, name: "variants" });
  const discount = useWatch({ control, name: "discount" });

  useEffect(() => {
    if (!variants || variants.length === 0) return;

    const price = variants.map((value) => value.price || 0);
    const minPrice = Math.min(...price);
    const discountedPrice = Math.max(
      Math.round(minPrice - (minPrice * discount) / 100),
      0,
    );

    setValue("price", discountedPrice);
  }, [variants, discount, setValue]);

  const onSubmit = (values: z.infer<typeof editProductSchema>) => {
    startTransition(async () => {
      try {
        const res = await fetch(`/api/products/${defaultValues?.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error("Gagal menambahkan produk");
        }

        mutate(key);
        closeDialog(false);
        toast.success(data.message);
      } catch (error) {
        console.error(error);
      }
    });
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nama</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isPending}
                      placeholder="Masukkan nama produk"
                      {...field}
                      className="font-medium focus-visible:border-none focus-visible:ring-2 focus-visible:ring-orange-400"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <ProductImageInput form={form} />

            <ProductCategorySelect form={form} />
          </div>

          <div className="space-y-6">
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Deskripsi</FormLabel>
                  <FormControl>
                    <Textarea
                      disabled={isPending}
                      placeholder="Deskripsi"
                      {...field}
                      className="font-medium focus-visible:border-none focus-visible:ring-2 focus-visible:ring-orange-400"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="discount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Diskon (%)</FormLabel>
                  <FormControl>
                    <Input
                      min={0}
                      max={100}
                      onInput={(e) => {
                        e.currentTarget.value = e.currentTarget.value.replace(
                          /\D/g,
                          "",
                        );
                        field.onChange(e);
                      }}
                      disabled={isPending}
                      placeholder="Diskon"
                      {...field}
                      className="font-medium focus-visible:border-none focus-visible:ring-2 focus-visible:ring-orange-400"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <ProductVariant form={form} />

            <FormField
              control={control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Harga / Harga setelah diskon</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      value={field.value}
                      readOnly
                      className="cursor-not-allowed bg-gray-100"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <Button
          type="submit"
          size="lg"
          disabled={isPending}
          className="w-full cursor-pointer bg-orange-500 hover:bg-orange-600"
        >
          {isPending ? "Memuat..." : "Edit Produk"}
        </Button>
      </form>
    </Form>
  );
};

export default ProductEditForm;
