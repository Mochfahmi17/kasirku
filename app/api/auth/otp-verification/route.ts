import { db } from "@/lib/db";
import { codeSchema } from "@/schema";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const validatedFields = codeSchema.safeParse(body);
    if (!validatedFields.success) {
      return NextResponse.json(
        {
          success: false,
          message: validatedFields.error.flatten().fieldErrors,
        },
        { status: 400 },
      );
    }

    const { pin } = validatedFields.data;

    const resetCode = await db.passwordResetCode.findFirst({
      where: { code: pin, expires: { gt: new Date() } },
    });

    if (!resetCode) {
      return NextResponse.json(
        {
          success: false,
          message: "Kode OTP Anda salah atau tidak lagi berlaku.",
        },
        { status: 400 },
      );
    }

    await db.passwordResetCode.delete({ where: { email: resetCode.email } });

    return NextResponse.json(
      {
        success: true,
        message: "Verifikasi OTP Berhasil!",
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("validasi otp error: ", error);
    return NextResponse.json(
      {
        success: false,
        message: "Terjadi Kesalahan",
      },
      { status: 500 },
    );
  }
}
