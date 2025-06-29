"use client";
import CardMenu from "@/components/home/card-menu";
import { Product } from "@/types/type";
import ProductCardSkeleton from "./product-card-skeleton";
import Link from "next/link";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { motion } from "motion/react";

type HomeMenuProps = {
  products: Product[];
  isLoading: boolean;
  loaderRef: React.ForwardedRef<HTMLDivElement>;
  loadingMore: undefined | boolean;
};

const HomeMenu = ({
  products,
  isLoading,
  loaderRef,
  loadingMore,
}: HomeMenuProps) => {
  return (
    <div className="space-y-4">
      <h2 className="text-base font-semibold md:text-xl">Menu</h2>
      {isLoading && <ProductCardSkeleton column={15} showContainer />}
      {products.length > 0 ? (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-[repeat(auto-fill,minmax(200px,1fr))]">
          {products.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.2 }}
            >
              <Link href={`/home/product/${product.id}`}>
                <CardMenu
                  urlImage={product.image}
                  altImage={product.name}
                  titleProduct={product.name}
                  price={product.price}
                />
              </Link>
            </motion.div>
          ))}
          {loadingMore && <ProductCardSkeleton column={10} />}
        </div>
      ) : (
        <>
          {!isLoading && (
            <div className="flex items-center justify-center">
              <DotLottieReact
                src="https://lottie.host/36f70a20-4dd8-4adc-8260-2e4407bf3d75/Q1117SLoCR.lottie"
                loop
                autoplay
                style={{ width: 350, height: 350 }}
              />
            </div>
          )}
        </>
      )}
      <div ref={loaderRef} className="col-span-full h-1"></div>
    </div>
  );
};

export default HomeMenu;
