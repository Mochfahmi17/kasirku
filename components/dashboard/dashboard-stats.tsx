"use client";
import { FaDollarSign, FaCartShopping, FaBoxArchive } from "react-icons/fa6";
import { IoWarning } from "react-icons/io5";
import CardStats from "./card-stats";
import { DashboardStatsType } from "@/types/type";
import { useEffect, useState } from "react";

const DashboardStats = () => {
  const [stats, setStats] = useState<{
    revenueToday: number;
    transactionCount: number;
    totalProducts: number;
    lowStock: number;
  }>({ revenueToday: 0, transactionCount: 0, totalProducts: 0, lowStock: 0 });

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(value);
  };

  useEffect(() => {
    const fetchDashboardStats = async (): Promise<void> => {
      try {
        const res = await fetch("http://localhost:3000/api/dashboard/stats", {
          cache: "no-store",
        });

        const data: DashboardStatsType = await res.json();

        if (!res.ok) {
          throw new Error("failed to fetch Dashboard Stats");
        }

        setStats(data);
      } catch (error: unknown) {
        let errorMessage = "Something went wrong";
        if (error instanceof Error) {
          errorMessage = error.message;
        }
        console.error("Error fetching: ", errorMessage);
      }
    };

    fetchDashboardStats();
  }, []);
  return (
    <div className="flex w-full flex-wrap justify-between gap-4">
      <CardStats title="Pendapatan hari ini" Icon={FaDollarSign}>
        {formatCurrency(stats.revenueToday)}
      </CardStats>
      <CardStats title="Transaksi hari ini" Icon={FaCartShopping}>
        {stats.transactionCount}
      </CardStats>
      <CardStats title="Total produk" Icon={FaBoxArchive}>
        {stats.totalProducts}
      </CardStats>
      <CardStats title="Stok hampir habis" Icon={IoWarning}>
        {stats.lowStock}
      </CardStats>
    </div>
  );
};

export default DashboardStats;
