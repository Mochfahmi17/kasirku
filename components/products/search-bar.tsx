"use client";
import { FiSearch } from "react-icons/fi";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

type SearchBarProps = {
  initialSearch?: string;
  initialOrder?: string;
};

const SearchBar = ({
  initialSearch = "",
  initialOrder = "",
}: SearchBarProps) => {
  // searchParams disini hanya readOnly
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(initialSearch);
  const [order, setOrder] = useState(initialOrder);
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);
  const router = useRouter();

  const updateParams = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());

      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }

      if (key === "search" && search.length > 0) {
        params.set("page", "1");
      } else {
        params.delete("page");
      }

      const queryString = params.toString();
      router.push(queryString ? `?${params.toString()}` : "/products");
    },
    [router, searchParams, search],
  );

  const handleChangeOrder = (value: string) => {
    setOrder(value);
    updateParams("order", value);
  };

  // Debounce for search
  useEffect(() => {
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    debounceTimeout.current = setTimeout(() => {
      updateParams("search", search.length > 2 ? search : "");
    }, 500);

    return () => {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
    };
  }, [search, updateParams]);
  return (
    <div className="my-4 flex items-center justify-between">
      <div className="relative hidden w-fit rounded-full bg-slate-100 lg:block">
        <FiSearch className="absolute top-1/2 left-2 size-5 -translate-y-1/2 text-slate-500" />
        <Input
          value={search}
          onInput={(e: ChangeEvent<HTMLInputElement>) => {
            const value = e.target.value;
            setSearch(value);
          }}
          placeholder="Search..."
          className="w-80 rounded-full border-none pl-8 font-medium shadow-none focus-visible:border-none focus-visible:ring-2 focus-visible:ring-orange-400"
        />
      </div>
      <div className="ml-auto flex items-center gap-3">
        <Select value={order} onValueChange={handleChangeOrder}>
          <SelectTrigger
            size="sm"
            className="w-28 border-none bg-slate-100 focus-visible:border-orange-500 focus-visible:ring-2 focus-visible:ring-orange-500"
          >
            <SelectValue placeholder="Sort By" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="desc">Desc</SelectItem>
              <SelectItem value="asc">Asc</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default SearchBar;
