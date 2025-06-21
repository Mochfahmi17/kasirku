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
import { Plus, Trash } from "lucide-react";
import { useFieldArray, UseFormReturn } from "react-hook-form";
import { z } from "zod";

type ProductVariantProps = {
  form: UseFormReturn<z.infer<typeof addProductSchema>>;
};

const ProductVariant = ({ form }: ProductVariantProps) => {
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "variants",
  });

  const variants = form.watch("variants");

  const totalStock = variants.reduce((sum, variant) => {
    const stock = Number(variant.stock) || 0;
    return sum + stock;
  }, 0);

  form.setValue("stock", totalStock);

  return (
    <div className="space-y-2">
      <FormLabel>Varian Produk</FormLabel>
      <div className="grid gap-2">
        {fields.map((field, i) => (
          <div key={field.id} className="flex items-center gap-2">
            <div className="w-full">
              <FormField
                control={form.control}
                name={`variants.${i}.name`}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Nama"
                        {...field}
                        className="font-medium focus-visible:border-none focus-visible:ring-2 focus-visible:ring-orange-400"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="w-full">
              <FormField
                control={form.control}
                name={`variants.${i}.price`}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        onInput={(e) => {
                          e.currentTarget.value = e.currentTarget.value.replace(
                            /\D/g,
                            "",
                          );
                          field.onChange(e);
                        }}
                        placeholder="Harga"
                        {...field}
                        className="font-medium focus-visible:border-none focus-visible:ring-2 focus-visible:ring-orange-400"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="w-full">
              <FormField
                control={form.control}
                name={`variants.${i}.stock`}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        onInput={(e) => {
                          e.currentTarget.value = e.currentTarget.value.replace(
                            /\D/g,
                            "",
                          );
                          field.onChange(e);
                        }}
                        placeholder="Stock"
                        {...field}
                        className="font-medium focus-visible:border-none focus-visible:ring-2 focus-visible:ring-orange-400"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button
              type="button"
              size="icon"
              variant="ghost"
              onClick={() => remove(i)}
              className="cursor-pointer hover:bg-red-500 hover:text-white"
            >
              <Trash size={16} />
            </Button>
          </div>
        ))}
      </div>
      <Button
        type="button"
        variant="outline"
        className="mt-2 cursor-pointer"
        onClick={() => append({ name: "", price: 0, stock: 0 })}
      >
        <Plus size={16} className="mr-1" /> Tambah Varian
      </Button>
    </div>
  );
};

export default ProductVariant;
