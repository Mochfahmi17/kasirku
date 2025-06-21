"use client";
import { FaDollarSign, FaCartShopping, FaBoxArchive } from "react-icons/fa6";
import { IoWarning } from "react-icons/io5";
import CardStats from "./card-stats";
import { DashboardStatsTypeResponse } from "@/types/type";
import useSWR from "swr";
import { fetcher } from "@/lib/swr/fetcher";

const DashboardStats = () => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(value);
  };

  const loadingCards = [
    { title: "Pendapatan hari ini", Icon: FaDollarSign },
    { title: "Transaksi hari ini", Icon: FaCartShopping },
    { title: "Total produk", Icon: FaBoxArchive },
    { title: "Stok hampir habis", Icon: IoWarning },
  ];

  const { data, isLoading } = useSWR<DashboardStatsTypeResponse>(
    "http://localhost:3000/api/dashboard/stats",
    fetcher,
  );
  return (
    <div className="flex w-full flex-wrap justify-between gap-4">
      {isLoading || !data ? (
        loadingCards.map((item, i) => (
          <CardStats key={i} title={item.title} Icon={item.Icon}>
            <div className="h-6 w-20 animate-pulse rounded bg-gray-300"></div>
          </CardStats>
        ))
      ) : (
        <>
          <CardStats title="Pendapatan hari ini" Icon={FaDollarSign}>
            <span>{formatCurrency(data.revenueToday)}</span>
          </CardStats>
          <CardStats title="Transaksi hari ini" Icon={FaCartShopping}>
            <span>{data.transactionCount}</span>
          </CardStats>
          <CardStats title="Total produk" Icon={FaBoxArchive}>
            <span>{data.totalProducts}</span>
          </CardStats>
          <CardStats title="Stok hampir habis" Icon={IoWarning}>
            <span>{data.lowStock}</span>
          </CardStats>
        </>
      )}
    </div>
  );
};

export default DashboardStats;
