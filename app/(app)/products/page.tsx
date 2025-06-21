import ProductView from "@/views/products/products-view";
import { use } from "react";

type ProductsPageProps = {
  searchParams: Promise<{ page?: string; search?: string }>;
};

export default function ProductsPage({ searchParams }: ProductsPageProps) {
  return <ProductView searchParams={use(searchParams)} />;
}
