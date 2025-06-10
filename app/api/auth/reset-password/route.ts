import { db } from "@/lib/db";
import { resetPasswordSchema } from "@/schema";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const validatedFields = resetPasswordSchema.safeParse(body);

    if (!validatedFields.success) {
      return NextResponse.json({
        success: false,
        message: validatedFields.error.flatten().fieldErrors,
      });
    }

    const cookieStore = cookies();
    const email = (await cookieStore).get("email_for_otp")?.value;

    const { password } = validatedFields.data;

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    await db.user.update({
      where: { email },
      data: { password: hashPassword },
    });

    (await cookieStore).delete("email_for_otp");
    (await cookieStore).delete("otp_verification");

    return NextResponse.json(
      { success: true, message: "Password berhasil di reset." },
      { status: 200 },
    );
  } catch (error) {
    console.error("Gagal reset password: ", error);
    return NextResponse.json(
      { success: false, message: "Terjadi Kesalahan" },
      { status: 500 },
    );
  }
}
