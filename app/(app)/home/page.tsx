import HomeView from "@/components/home/home-view";
import { use } from "react";

type HomePageProps = {
  searchParams: Promise<{ page?: string; search?: string }>;
};

export default function HomePage({ searchParams }: HomePageProps) {
  return <HomeView searchParams={use(searchParams)} />;
}
