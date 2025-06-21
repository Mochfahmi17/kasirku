import { Button } from "../ui/button";
import AddProductDialog from "../../views/products/add-product/add-product-dialog";

const HeaderProduct = () => {
  return (
    <div className="mb-6 flex items-center justify-between text-sm lg:text-lg">
      <h2 className="font-semibold">Daftar Produk</h2>
      <AddProductDialog>
        <Button className="cursor-pointer bg-orange-500 hover:bg-orange-600">
          Tambah Produk
        </Button>
      </AddProductDialog>
    </div>
  );
};

export default HeaderProduct;
