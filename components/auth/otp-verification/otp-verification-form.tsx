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
import { codeSchema } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

const OtpVerificationForm = () => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof codeSchema>>({
    resolver: zodResolver(codeSchema),
    defaultValues: {
      pin: "",
    },
  });

  const onSubmit = (values: z.infer<typeof codeSchema>) => {
    startTransition(async () => {
      try {
        const res = await fetch("/api/auth/otp-verification", {
          method: "POST",
          body: JSON.stringify(values),
        });

        const data = await res.json();

        if (!res.ok) {
          toast.error(data.message || "Terjadi kesalahan.");
          return;
        }

        toast.success(data.message);
        router.push("/reset-password");
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
            name="pin"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Verifikasi OTP</FormLabel>
                <FormControl>
                  <InputOTP maxLength={6} pattern="^[0-9]+$" {...field}>
                    <InputOTPGroup className="flex items-center gap-1">
                      {Array(6)
                        .fill(0)
                        .map((_, i) => (
                          <InputOTPSlot
                            key={i}
                            index={i}
                            className="rounded border border-slate-300 font-medium first:rounded last:rounded data-[active=true]:border-none data-[active=true]:ring-2 data-[active=true]:ring-orange-400"
                          />
                        ))}
                    </InputOTPGroup>
                  </InputOTP>
                </FormControl>
                <FormMessage />
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
          {isPending ? "Memverifikasi..." : "Lanjutkan"}
        </Button>
      </form>
    </Form>
  );
};

export default OtpVerificationForm;
