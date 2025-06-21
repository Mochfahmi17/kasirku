import cloudinary from "@/lib/cloudinary";
import { db } from "@/lib/db";
import { editProductSchema } from "@/schema";
import { NextApiRequest } from "next";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _request: NextApiRequest,
  { params }: { params: { id: string } },
) {
  try {
    const { id } = await params;

    const product = await db.product.findUnique({
      where: { id },
      include: { category: true, variants: true },
    });

    if (!product) {
      return NextResponse.json(
        { success: false, message: "Produk tidak ditemukan." },
        { status: 400 },
      );
    }

    return NextResponse.json({ success: true, product });
  } catch (error) {
    console.error("Register error: ", error);
    return NextResponse.json(
      { success: false, message: "Terjadi kesalahan" },
      { status: 500 },
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const body = await request.json();
    const { id } = await params;

    const validatedFields = editProductSchema.safeParse(body);

    if (!validatedFields.success) {
      return NextResponse.json(
        {
          success: false,
          message: validatedFields.error.flatten().fieldErrors,
        },
        { status: 400 },
      );
    }

    const data = await validatedFields.data;

    const updateProduct = await db.product.update({
      where: { id },
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
          deleteMany: {},
          create: data.variants,
        },
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Produk berhasil di edit.",
        updateProduct,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Update Product error: ", error);
    return NextResponse.json(
      { success: false, message: "Terjadi kesalahan" },
      { status: 500 },
    );
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const { id } = await params;

    if (!id || typeof id !== "string") {
      return NextResponse.json(
        { success: false, message: "ID produk tidak valid" },
        { status: 400 },
      );
    }

    const product = await db.product.findUnique({ where: { id } });

    if (!product) {
      return NextResponse.json(
        {
          success: false,
          message: "Tidak dapat menemukan projek ini.",
        },
        { status: 404 },
      );
    }

    await cloudinary.uploader.destroy(product.image_public_id);
    await db.product.delete({ where: { id: product.id } });

    return NextResponse.json(
      { success: true, message: "Projek dihapus!" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Update Product error: ", error);
    return NextResponse.json(
      { success: false, message: "Terjadi kesalahan" },
      { status: 500 },
    );
  }
}
