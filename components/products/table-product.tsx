import { RiExpandUpDownFill } from "react-icons/ri";
import { Product } from "@/types/type";
import TableSkeleton from "./table-skeleton";
import clsx from "clsx";
import { BsPencilSquare } from "react-icons/bs";
import { FaTrashCan } from "react-icons/fa6";
import EditProductDialog from "../../views/products/edit-product/edit-product-dialog";
import { Button } from "../ui/button";
import { useState, useTransition } from "react";
import PopUp from "../popup/popup";
import { toast } from "sonner";
import { mutate } from "swr";
import { useProductQueryStore } from "@/stores/product-query-store";

type TableProductProps = {
  data: Product[] | [];
  isLoading: boolean;
  setSortBy: React.Dispatch<React.SetStateAction<string>>;
};

const TableProduct = ({ data, isLoading, setSortBy }: TableProductProps) => {
  const [showConfirm, setShowConfirm] = useState<boolean>(false);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(
    null,
  );
  const [isPending, startTransition] = useTransition();
  const { key } = useProductQueryStore();

  const toggleSortBy = (field: string) => {
    setSortBy((prev) => (prev === field ? "createdAt" : field));
  };

  const formatCurrency = (value: number) => {
    return Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(value);
  };

  const handleDelete = () => {
    startTransition(async () => {
      try {
        const res = await fetch(`/api/products/${selectedProductId}`, {
          method: "DELETE",
        });

        const data = await res.json();

        if (!res.ok) {
          toast.error(data.message || "Gagal hapus projek!");
          return;
        }

        mutate(key);
        setShowConfirm(false);
        toast.success(data.message);
      } catch (error) {
        console.error(error);
      }
    });
  };
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm">
        <thead className="bg-gray-50 text-gray-700">
          <tr>
            <th scope="col" className="w-60 px-6 py-3 whitespace-nowrap">
              Nama Produk
            </th>
            <th scope="col" className="px-6 py-3">
              <span
                onClick={() => toggleSortBy("price")}
                className="flex w-fit cursor-pointer items-center gap-1"
              >
                Harga
                <RiExpandUpDownFill className="size-4" />
              </span>
            </th>
            <th scope="col" className="px-6 py-3">
              <span
                onClick={() => toggleSortBy("stock")}
                className="flex w-fit cursor-pointer items-center gap-1"
              >
                Stok
                <RiExpandUpDownFill className="size-4" />
              </span>
            </th>
            <th scope="col" className="px-6 py-3">
              Diskon
            </th>
            <th scope="col" className="px-6 py-3">
              Kategori
            </th>
            <th scope="col" className="px-6 py-3">
              Varian
            </th>
            <th scope="col" className="px-6 py-3 text-center">
              Aksi
            </th>
          </tr>
        </thead>
        {isLoading || !data ? (
          <TableSkeleton rows={10} />
        ) : (
          <tbody className="bg-white text-gray-500">
            {data.length > 0 ? (
              data.map((item) => (
                <tr key={item.id} className="border-b border-gray-200">
                  <td title={item.name} className="px-6 py-4">
                    {item.name}
                  </td>
                  <td className="px-6 py-4">{formatCurrency(item.price)}</td>
                  <td className="px-6 py-4">
                    <span
                      className={clsx("rounded-md px-2 py-1", {
                        "bg-red-200": item.stock <= 10,
                        "bg-yellow-200": item.stock > 10 && item.stock <= 20,
                        "bg-green-200": item.stock > 20,
                      })}
                    >
                      {item.stock}
                    </span>
                  </td>
                  <td className="px-6 py-4">{item.discount}%</td>
                  <td className="px-6 py-4">{item.category.name}</td>
                  <td
                    title={item.variants.map((item) => item.name).join(", ")}
                    className="max-w-60 truncate px-6 py-4"
                  >
                    {item.variants.map((item) => item.name).join(", ")}
                  </td>
                  <td className="flex items-center justify-center gap-2 px-6 py-4 text-white">
                    <EditProductDialog productId={item.id}>
                      <Button
                        size="icon"
                        className="h-0 w-0 cursor-pointer bg-blue-400 p-4 hover:bg-blue-500"
                      >
                        <BsPencilSquare />
                      </Button>
                    </EditProductDialog>
                    <Button
                      type="button"
                      size="icon"
                      variant="destructive"
                      onClick={() => {
                        setSelectedProductId(item.id);
                        setShowConfirm(true);
                      }}
                      className="h-0 w-0 cursor-pointer bg-red-400 p-4 hover:bg-red-500"
                    >
                      <FaTrashCan />
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr className="border-b border-gray-200">
                <th colSpan={7} className="px-6 py-4 text-center">
                  Produk masih kosong!
                </th>
              </tr>
            )}
          </tbody>
        )}
      </table>

      {/* Modal */}
      {showConfirm && (
        <PopUp
          title="Yakin ingin menghapus produk ini ?"
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
            type="button"
            variant="destructive"
            onClick={handleDelete}
            disabled={isPending}
            className="cursor-pointer"
          >
            Hapus
          </Button>
        </PopUp>
      )}
    </div>
  );
};

export default TableProduct;
