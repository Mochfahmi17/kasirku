type HomeCategoriesSkeletonProps = {
  rows: number;
};

const HomeCategoriesSkeleton = ({ rows = 6 }: HomeCategoriesSkeletonProps) => {
  return (
    <>
      {Array(rows)
        .fill(0)
        .map((_, i) => (
          <div
            key={i}
            className="h-8 w-24 animate-pulse rounded-md bg-gray-200"
          ></div>
        ))}
    </>
  );
};

export default HomeCategoriesSkeleton;
