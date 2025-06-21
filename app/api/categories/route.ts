import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const categories = await db.productCategory.findMany({
      orderBy: { name: "desc" },
    });

    return NextResponse.json({ success: true, categories });
  } catch (error) {
    console.error("Error fetching categories:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch categories" },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const categoryName = body.newCategoryName?.trim();

    if (!categoryName || categoryName.length === 0) {
      return NextResponse.json(
        { success: false, message: "Nama kategori tidak boleh kosong." },
        { status: 400 },
      );
    }

    const existing = await db.productCategory.findUnique({
      where: { name: categoryName },
    });

    if (existing) {
      return NextResponse.json(
        {
          success: false,
          message: "Kategori sudah ada.",
        },
        { status: 409 },
      );
    }

    const newCategory = await db.productCategory.create({
      data: { name: categoryName },
    });
    return NextResponse.json({ success: true, newCategory });
  } catch (error) {
    console.error("Error fetching categories: ", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch categories" },
      { status: 500 },
    );
  }
}
