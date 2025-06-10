import { signIn } from "@/auth";
import { loginSchema } from "@/schema";
import { AuthError } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const validatedFields = loginSchema.safeParse(body);
    if (!validatedFields.success) {
      return NextResponse.json(
        {
          success: false,
          message: validatedFields.error.flatten().fieldErrors,
        },
        { status: 400 },
      );
    }

    const { email, password } = validatedFields.data;

    await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Login berhasil!",
      },
      { status: 200 },
    );
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return NextResponse.json(
            {
              success: false,
              message: "Email atau password salah.",
            },
            { status: 401 },
          );
        default:
          return NextResponse.json(
            {
              success: false,
              message: "Terjadi kesalahan saat masuk.",
            },
            { status: 500 },
          );
      }
    }
    return NextResponse.json(
      { success: false, message: "Gagal melakukan autentikasi." },
      { status: 500 },
    );
  }
}
