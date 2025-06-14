"use client";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { loginSchema } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import clsx from "clsx";

const LoginForm = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof loginSchema>) => {
    startTransition(async () => {
      try {
        const res = await fetch("/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        });

        const data = await res.json();

        if (!res.ok) {
          toast.error(data.message || "Terjadi kesalahan.");
          return;
        }

        toast.success(data.message);
        router.push("/home");
      } catch (error) {
        console.log(error);
      }
    });
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="johndoe@example.com"
                    {...field}
                    className="font-medium focus-visible:border-none focus-visible:ring-2 focus-visible:ring-orange-400"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="******"
                      {...field}
                      className="font-medium focus-visible:border-none focus-visible:ring-2 focus-visible:ring-orange-400"
                    />
                    <div
                      onClick={() => setShowPassword(!showPassword)}
                      className={clsx(
                        "absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer hover:text-orange-500",
                        {
                          "text-gray-600": !showPassword,
                          "text-orange-500": showPassword,
                        },
                      )}
                    >
                      {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                    </div>
                  </div>
                </FormControl>
                <div className="flex items-center gap-2">
                  <FormMessage />
                  <Button
                    size="sm"
                    variant="link"
                    asChild
                    className="ml-auto w-fit p-0 text-sm hover:text-orange-500"
                  >
                    <Link href="/forgot-password">Forgot password?</Link>
                  </Button>
                </div>
              </FormItem>
            )}
          />
        </div>
        <Button
          type="submit"
          size="lg"
          disabled={isPending}
          className="w-full cursor-pointer bg-orange-500 text-white hover:bg-orange-600"
        >
          {isPending ? "Memproses Login Anda..." : "Login"}
        </Button>
      </form>
    </Form>
  );
};

export default LoginForm;
