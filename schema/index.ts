import { object, string } from "zod";

export const loginSchema = object({
  email: string().email("Invalid email.").min(1, "Email is required."),
  password: string().min(1, "Password is required."),
});

export const registerSchema = object({
  name: string().min(1, "Name is required."),
  email: string().email("Invalid Email.").min(1, "Email is required."),
  password: string().min(6, "Password minimum 6 characters."),
  confirmPassword: string().min(6, "Confirm Password 6 characters."),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Password doesn't match.",
  path: ["confirmPassword"],
});

export const forgotPasswordSchema = object({
  email: string().email("Invalid Email.").min(1, "Email is required."),
});

export const codeSchema = object({
  pin: string().min(
    6,
    "Kode OTP tidak valid. Pastikan Anda memasukkan 6 angka yang telah kami kirimkan.",
  ),
});

export const resetPasswordSchema = object({
  password: string().min(6, "Password minimum 6 characters."),
  confirmPassword: string().min(6, "Confirm Password 6 characters."),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Password doesn't match.",
  path: ["confirmPassword"],
});
