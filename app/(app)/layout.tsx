import NavbarView from "@/components/navbar-view";
import SideBarView from "@/views/sidebar/sidebar-view";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen">
      <SideBarView />
      <main className="text-smoke max-h-screen w-full flex-1 overflow-y-auto bg-slate-50">
        <NavbarView />
        <section className="p-4">{children}</section>
      </main>
    </div>
  );
}
