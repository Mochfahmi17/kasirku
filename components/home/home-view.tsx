"use client";
import HomeMenu from "./home-menu";
import HomeCategories from "./home-categories";
import HomeSearchbar from "./home-searchbar";
import useSWR from "swr";
import { CategoriesResponse } from "@/types/type";
import { fetcher } from "@/lib/swr/fetcher";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { usePagination } from "@/lib/hooks";

type HomeViewProps = {
  searchParams?: { page?: string; search?: string };
};

const HomeView = ({ searchParams }: HomeViewProps) => {
  const params = useSearchParams();
  const [category, setCategory] = useState("");

  const search = searchParams?.search || "";
  const order = params.get("order") || "";
  const loaderRef = useRef<HTMLDivElement>(null);

  // Category fetching
  const { data: categoriesData, isLoading: categoriesLoading } =
    useSWR<CategoriesResponse>("/api/categories", fetcher);

  const { productsData, setSize, isLoading, isReachedEnd, loadingMore } =
    usePagination(search, order, category, "/api/products");

  // Infinite Scroll for products
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (first.isIntersecting && !isLoading && !isReachedEnd) {
          setSize((prev) => prev + 1);
        }
      },
      { threshold: 0.5 },
    );

    const current = loaderRef.current;
    if (current) observer.observe(current);

    return () => {
      if (current) observer.unobserve(current);
    };
  }, [isLoading, isReachedEnd, setSize]);
  return (
    <div className="space-y-6">
      {/* header */}
      <HomeSearchbar setSize={setSize} />

      {/* Category */}
      <HomeCategories
        categories={categoriesData ? categoriesData.categories : []}
        isLoading={categoriesLoading}
        setCategory={(name) => {
          setCategory(name);
          setSize(1);
        }}
        categoryName={category}
      />

      {/* menu */}
      <HomeMenu
        products={productsData}
        isLoading={isLoading}
        loaderRef={loaderRef}
        loadingMore={loadingMore}
      />
    </div>
  );
};

export default HomeView;
