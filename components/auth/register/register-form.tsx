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
import { registerSchema } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import clsx from "clsx";

const RegisterForm = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (values: z.infer<typeof registerSchema>) => {
    startTransition(async () => {
      try {
        const res = await fetch("/api/auth/register", {
          method: "POST",
          body: JSON.stringify(values),
        });

        const data = await res.json();

        if (!res.ok) {
          toast.error(data.message || "Terjadi kesalahan");
          return;
        }

        toast.success(data.message);
        router.push("/login");
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
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="John Doe"
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
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="******"
                      {...field}
                      className="font-medium focus-visible:border-none focus-visible:ring-2 focus-visible:ring-orange-400"
                    />
                    <div
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className={clsx(
                        "absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer hover:text-orange-500",
                        {
                          "text-gray-600": !showConfirmPassword,
                          "text-orange-500": showConfirmPassword,
                        },
                      )}
                    >
                      {showConfirmPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                    </div>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button
          type="submit"
          size="lg"
          disabled={!form.formState.isValid || isPending}
          className="w-full cursor-pointer bg-orange-500 text-white hover:bg-orange-600"
        >
          {isPending ? "Mendaftarkan detail Anda..." : "Register"}
        </Button>
      </form>
    </Form>
  );
};

export default RegisterForm;
