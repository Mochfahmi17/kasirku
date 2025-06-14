import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    //* Total pendapatan hari ini
    const todayTransactions = await db.transaction.findMany({
      where: { createdAt: { gte: today, lt: tomorrow } },
      select: { totalPrice: true },
    });
    const revenueToday = todayTransactions.reduce(
      (sum, t) => sum + t.totalPrice,
      0,
    );

    //* Total transaksi
    const transactionCount = todayTransactions.length;

    //* Total Product
    const totalProducts = await db.product.count();

    //* Stock hampir habis
    const lowStock = await db.product.count({ where: { stock: { lt: 5 } } });

    return NextResponse.json(
      {
        success: true,
        revenueToday,
        transactionCount,
        totalProducts,
        lowStock,
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
