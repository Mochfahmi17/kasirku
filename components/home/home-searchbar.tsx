"use client";
import { FiSearch } from "react-icons/fi";
import { Input } from "@/components/ui/input";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

type HomeSearchbarProps = {
  setSize: (value: number) => void;
};

const HomeSearchbar = ({ setSize }: HomeSearchbarProps) => {
  const [inputValue, setInputValue] = useState("");
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    debounceTimeout.current = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      setSize(1);

      if (inputValue.length > 2 && inputValue.length !== 0) {
        params.set("search", inputValue);
        params.set("page", "1");
      } else {
        params.delete("search");
        params.delete("page");
      }

      const queryString = params.toString();
      router.push(queryString ? `?${params.toString()}` : "/home");
    }, 500);

    return () => {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
    };
  }, [inputValue, router, searchParams, setSize]);
  return (
    <div className="mb-8 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
      <h1 className="text-xl font-semibold md:text-2xl">
        Order <span className="font-light">menu</span>
      </h1>
      <div className="relative w-full rounded-full bg-white shadow md:w-80">
        <FiSearch className="absolute top-1/2 left-2 size-5 -translate-y-1/2 text-slate-400" />
        <Input
          onInput={(e) => {
            const value = (e.target as HTMLInputElement).value;
            setInputValue(value);
          }}
          placeholder="Search..."
          className="rounded-full pl-8 placeholder:text-slate-400 focus-visible:border-orange-500 focus-visible:ring-2 focus-visible:ring-orange-500"
        />
      </div>
    </div>
  );
};

export default HomeSearchbar;
