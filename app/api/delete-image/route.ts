import cloudinary from "@/lib/cloudinary";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const publicId = body.image_public_id;

    if (!publicId) {
      return NextResponse.json(
        { success: false, message: "public_id is required" },
        { status: 400 },
      );
    }

    const result = await cloudinary.uploader.destroy(publicId);

    if (result.result !== "ok") {
      return NextResponse.json(
        { success: false, message: "Failed to delete image" },
        { status: 500 },
      );
    }

    return NextResponse.json({
      success: true,
      message: "Gambar berhasil dihapus",
    });
  } catch (error) {
    console.error("Delete image error:", error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 },
    );
  }
}
