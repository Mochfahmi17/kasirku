import { db } from "@/lib/db";
import { addProductSchema } from "@/schema";
import { Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;

  const currentPage = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "10");
  const search = searchParams.get("search") || "";
  const sortBy = searchParams.get("sortBy") || "createdAt";
  const order = searchParams.get("order") === "asc" ? "asc" : "desc";
  const categoryName = searchParams.get("category");

  const skip = (currentPage - 1) * limit;

  try {
    const where: Prisma.ProductWhereInput = {
      name: {
        contains: search,
        mode: "insensitive" as Prisma.QueryMode,
      },
    };

    // Filter category jika ada
    if (categoryName) {
      where.category = {
        name: {
          equals: categoryName,
          mode: "insensitive" as Prisma.QueryMode,
        },
      };
    }

    const [products, totalItems] = await Promise.all([
      db.product.findMany({
        where,
        include: {
          category: true,
          variants: true,
        },
        orderBy: {
          [sortBy]: order,
        },
        skip,
        take: limit,
      }),
      db.product.count({ where }),
    ]);

    return NextResponse.json(
      {
        data: products,
        currentPage,
        totalItems,
        totalPages: Math.ceil(totalItems / limit),
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch products" },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedFields = addProductSchema.safeParse(body);

    if (!validatedFields.success) {
      return NextResponse.json(
        {
          success: false,
          message: validatedFields.error.flatten().fieldErrors,
        },
        { status: 400 },
      );
    }

    const data = validatedFields.data;

    const product = await db.product.create({
      data: {
        name: data.name,
        description: data.description,
        image: data.image,
        image_public_id: data.image_public_id,
        categoryId: data.categoryId,
        stock: data.stock,
        price: data.price,
        discount: data.discount,
        variants: {
          create: data.variants.map((variant) => ({
            name: variant.name,
            price: variant.price,
            stock: variant.stock,
          })),
        },
      },
      include: {
        variants: true,
      },
    });

    return NextResponse.json(
      { success: true, message: "Tambah produk berhasil!", product },
      { status: 201 },
    );
  } catch (error) {
    console.error("Create Product error: ", error);
    return NextResponse.json(
      { success: false, message: "Terjadi kesalahan" },
      { status: 500 },
    );
  }
}
