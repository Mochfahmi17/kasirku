import { ProductResponse } from "@/types/type";
import useSWRInfinite from "swr/infinite";
import { fetcher } from "./swr/fetcher";

export function usePagination(
  search: string = "",
  order: string | undefined = "",
  category: string = "",
  url: string,
) {
  const LIMIT = 15;
  const getKey = (
    pageIndex: number,
    previousPageData: ProductResponse | null,
  ) => {
    if (previousPageData && previousPageData.data.length === 0) return null;
    const query = new URLSearchParams({
      search,
      page: (pageIndex + 1).toString(),
      limit: LIMIT.toString(),
      sortBy: "",
      order,
      category,
    });
    return `${url}?${query}`;
  };

  const { data, size, setSize, isLoading, error, mutate } =
    useSWRInfinite<ProductResponse>(getKey, fetcher);

  const productsData = data ? data.flatMap((page) => page.data) : [];

  const isReachedEnd = data ? data[data.length - 1].data.length < LIMIT : false;

  const loadingMore = data && typeof data[size - 1] === "undefined";

  return {
    productsData,
    isReachedEnd,
    loadingMore,
    size,
    setSize,
    isLoading,
    error,
    mutate,
  };
}
