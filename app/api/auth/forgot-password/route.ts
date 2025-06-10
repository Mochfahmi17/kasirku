import { db } from "@/lib/db";
import { sendOtpEmail } from "@/lib/mail";
import { forgotPasswordSchema } from "@/schema";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const validatedFields = forgotPasswordSchema.safeParse(body);
    if (!validatedFields.success) {
      return NextResponse.json(
        {
          success: false,
          message: validatedFields.error.flatten().fieldErrors,
        },
        { status: 400 },
      );
    }

    const { email } = validatedFields.data;

    const user = await db.user.findUnique({ where: { email } });
    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "Email tidak ditemukan!",
        },
        { status: 404 },
      );
    }

    const code = Math.floor(100000 + Math.random() * 900000).toString();

    const expires = new Date();
    //* Expires dalam 15 menit
    expires.setMinutes(expires.getMinutes() + 15);

    await sendOtpEmail(user.email, user.name, code);

    const existingCode = await db.passwordResetCode.findUnique({
      where: { email },
    });
    if (existingCode) {
      await db.passwordResetCode.update({
        where: { email },
        data: { code, expires },
      });
    } else {
      await db.passwordResetCode.create({
        data: { email, code, expires },
      });
    }

    const cookieStore = cookies();
    (await cookieStore).set("otp_verification", "true", {
      httpOnly: true,
      path: "/",
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 15,
    });

    (await cookieStore).set("email_for_otp", email, {
      httpOnly: true,
      path: "/",
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 15,
    });

    return NextResponse.json(
      {
        success: true,
        message:
          "Email konfirmasi Anda sudah terkirim. Silakan cek kotak masuk email Anda untuk menemukan kode OTP.",
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("email error: ", error);
    return NextResponse.json(
      {
        success: false,
        message: "Terjadi kesalahan",
      },
      { status: 500 },
    );
  }
}
