import { auth } from "@/auth";
import { use } from "react";

export default function DashboardPage() {
  const session = use(auth());
  return <div className="">{JSON.stringify(session)}</div>;
}
