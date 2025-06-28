import { Card } from "../ui/card";

type ProductCardSkeletonProps = {
  column: number;
  showContainer?: boolean;
};

const ProductCardSkeleton = ({
  column = 6,
  showContainer,
}: ProductCardSkeletonProps) => {
  return (
    <>
      {showContainer ? (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-[repeat(auto-fill,minmax(200px,1fr))]">
          {Array(column)
            .fill(0)
            .map((_, i) => (
              <Card
                key={i}
                className="h-[260px] animate-pulse border-none bg-gray-200 shadow-none"
              ></Card>
            ))}
        </div>
      ) : (
        <>
          {Array(column)
            .fill(0)
            .map((_, i) => (
              <Card
                key={i}
                className="h-[260px] animate-pulse border-none bg-gray-200 shadow-none"
              ></Card>
            ))}
        </>
      )}
    </>
  );
};

export default ProductCardSkeleton;
