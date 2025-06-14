import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const today = new Date();
    const past30Days = new Date();
    past30Days.setDate(today.getDate() - 29); // 30 hari termasuk hari ini

    //   Ambil semua transaksi dalam 30 hari terakhir
    const transactions = await db.transaction.findMany({
      where: { createdAt: { gte: past30Days, lte: today } },
      select: { totalPrice: true, createdAt: true },
    });

    // Buat array tanggal dari 30 hari terakhir
    const dailyData: Record<string, number> = {};
    for (let i = 29; i >= 0; i--) {
      const date = new Date();
      date.setDate(today.getDate() - i);
      const key = date.toISOString().split("T")[0];
      dailyData[key] = 0;
    }

    // Hitung total income per tanggal
    transactions.forEach((trx) => {
      const dateKey = trx.createdAt.toISOString().split("T")[0];
      if (dailyData[dateKey] !== undefined) {
        dailyData[dateKey] += trx.totalPrice;
      }
    });

    // Ubah ke bentuk array untuk chart
    const chartData = Object.entries(dailyData).map(([date, income]) => ({
      date,
      income,
    }));

    return NextResponse.json(
      {
        success: true,
        chartData,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Get status error: ", error);
    return NextResponse.json(
      {
        success: false,
        message: "Terjadi kesalahan",
      },
      { status: 500 },
    );
  }
}
