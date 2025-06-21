"use client";
import { ProductResponse } from "@/types/type";
import { fetcher } from "@/lib/swr/fetcher";
import { useSearchParams } from "next/navigation";
import useSWR from "swr";
import { useEffect, useState } from "react";
import { useProductQueryStore } from "@/stores/product-query-store";
import HeaderProduct from "@/components/products/header-product";
import SearchBar from "@/components/products/search-bar";
import TableProduct from "@/components/products/table-product";
import Pagination from "@/components/products/pagination";

type ProductViewProps = {
  searchParams?: { page?: string; search?: string; order?: string };
};

const ProductView = ({ searchParams }: ProductViewProps) => {
  const params = useSearchParams();

  const [sortBy, setSortBy] = useState("createdAt");

  const page = parseInt(searchParams?.page || "1");
  const search = params.get("search") || "";
  const order = params.get("order") || "";
  const limit = 10;

  const query = new URLSearchParams({
    search,
    page: page.toString(),
    limit: limit.toString(),
    sortBy,
    order,
    category: "",
  });

  const url = `/api/products?${query.toString()}`;
  const { setKey } = useProductQueryStore();

  useEffect(() => {
    setKey(url);
  }, [url, setKey]);

  //* fetching data product GET
  const { data, isLoading } = useSWR<ProductResponse>(url, fetcher);

  return (
    <div className="rounded-xl bg-white p-4 shadow-md">
      {/* Header */}
      <HeaderProduct />

      {/* Search and sort */}
      <SearchBar
        initialSearch={searchParams?.search}
        initialOrder={searchParams?.order}
      />

      {/* Table */}
      <TableProduct
        data={data ? data.data : []}
        isLoading={isLoading}
        setSortBy={setSortBy}
      />

      {/* Pagination */}
      {data && data.totalPages > 1 && (
        <Pagination
          totalPages={data.totalPages}
          currentPage={data.currentPage}
        />
      )}
    </div>
  );
};

export default ProductView;
