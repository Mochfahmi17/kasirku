import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import clsx from "clsx";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
};

const Pagination = ({ totalPages, currentPage }: PaginationProps) => {
  const router = useRouter();

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(window.location.search);
    params.set("page", newPage.toString());
    router.push(`?${params.toString()}`);
  };

  const getPaginationNumbers = (
    currentPage: number,
    totalPages: number,
  ): (number | string)[] => {
    const pages: (number | string)[] = [];

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, "...", totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, "...", totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(
          1,
          "...",
          currentPage - 1,
          currentPage,
          currentPage + 1,
          "...",
          totalPages,
        );
      }
    }

    return pages;
  };
  return (
    <div className="mt-4 flex items-center justify-center gap-2">
      {getPaginationNumbers(currentPage, totalPages).map((pageItem, i) => {
        if (pageItem === "...") {
          return (
            <span
              key={`ellipsis-${i}`}
              className="px-3 py-1 text-gray-500 select-none"
            >
              ...
            </span>
          );
        }
        return (
          <Button
            size="icon"
            variant="outline"
            key={`page-${pageItem}`}
            onClick={() => handlePageChange(Number(pageItem))}
            className={clsx(
              "cursor-pointer hover:bg-orange-600 hover:text-white",
              {
                "bg-orange-500 text-white": pageItem === currentPage,
              },
            )}
          >
            {pageItem}
          </Button>
        );
      })}
    </div>
  );
};

export default Pagination;
