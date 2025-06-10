import Image from "next/image";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main>
      <section>
        <div className="container mx-auto text-slate-700">
          <div className="grid min-h-screen gap-8 md:grid-cols-2">
            <div className="hidden items-center justify-center bg-slate-100 md:flex md:h-screen md:rounded-tr-4xl md:rounded-br-4xl">
              <Image
                src="/cashier.png"
                alt="cashier"
                width={400}
                height={400}
                priority
                className="object-cover object-center"
              />
            </div>
            <div className="px-4">
              <div className="flex min-h-screen items-center justify-center">
                {children}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
