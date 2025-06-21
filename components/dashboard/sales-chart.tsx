"use client";
import { fetcher } from "@/lib/swr/fetcher";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import useSWR from "swr";
import LoaderCircle from "../loader-circle";
import { DataSalesType } from "@/types/type";

const SalesChart = () => {
  const { data, isLoading } = useSWR<DataSalesType>(
    "http://localhost:3000/api/dashboard/sales",
    fetcher,
  );

  const hasIncome = data?.chartData.some((item) => item.income > 0);
  return (
    <div className="relative h-full w-full rounded-xl border bg-white p-4 shadow-md">
      <h2 className="mb-4 text-sm font-semibold lg:text-lg">
        Data Penjualan 30 Hari Terakhir
      </h2>
      {isLoading || !data ? (
        <LoaderCircle />
      ) : (
        <ResponsiveContainer width="100%" height="90%">
          <LineChart width={500} height={300} data={data.chartData}>
            <XAxis
              dataKey="date"
              tick={{ fill: "#64748b", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
              tickMargin={10}
              interval={3}
              tickFormatter={(date) => {
                const d = new Date(date);
                return `${d.toLocaleDateString()}`;
              }}
            />
            <YAxis
              domain={[0, 5000000]}
              tick={{ fill: "#64748b", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
              tickMargin={10}
              tickFormatter={(value) => {
                if (value >= 1000000) {
                  return `Rp ${value / 1000000} Jt`;
                }

                return `Rp ${value}`;
              }}
            />
            <Tooltip
              formatter={(value) => {
                return new Intl.NumberFormat("id-ID", {
                  style: "currency",
                  currency: "IDR",
                  maximumFractionDigits: 0,
                }).format(value as number);
              }}
              contentStyle={{ borderRadius: "10px", borderColor: "lightgray" }}
            />
            <Legend
              align="right"
              verticalAlign="top"
              wrapperStyle={{
                paddingTop: "10px",
                paddingBottom: "30px",
                fontSize: "14px",
              }}
              iconType="circle"
            />
            <Line
              type="monotone"
              dataKey="income"
              stroke="#f97316"
              strokeWidth={3}
              dot={!!hasIncome}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default SalesChart;
