import { Button } from "@/components/ui/button";
import { Categories } from "@/types/type";
import HomeCategoriesSkeleton from "./home-categories-skeleton";
import { Dispatch } from "react";
import clsx from "clsx";

type HomeCategoriesProps = {
  categories: Categories[];
  isLoading: boolean;
  setCategory: Dispatch<React.SetStateAction<string>>;
  categoryName: string;
};

const HomeCategories = ({
  categories,
  isLoading,
  setCategory,
  categoryName,
}: HomeCategoriesProps) => {
  return (
    <div className="mb-8 space-y-2">
      <h2 className="text-base font-semibold md:text-xl">Kategori</h2>
      <div className="flex items-center gap-4 overflow-x-auto py-2">
        {isLoading && categories.length === 0 ? (
          <HomeCategoriesSkeleton rows={6} />
        ) : (
          <>
            {categories.map((category) => (
              <Button
                key={category.id}
                variant="outline"
                size="lg"
                onClick={() =>
                  setCategory((prev) =>
                    prev === category.name ? "" : category.name,
                  )
                }
                className={clsx(
                  "cursor-pointer hover:bg-orange-500 hover:text-white",
                  {
                    "bg-orange-500 text-white": categoryName === category.name,
                  },
                )}
              >
                {category.name}
              </Button>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default HomeCategories;
