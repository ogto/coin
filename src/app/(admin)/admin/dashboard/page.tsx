// src/app/(admin)/admin/dashboard/page.tsx
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import DashboardClient from "./DashboardClient"; // ← 상대경로 import

export default async function DashboardPage() {
  const jar = await cookies();
  const session = jar.get("admin_session")?.value;

  const host = (await headers()).get("host") ?? "";
  const isLocal = host.startsWith("localhost") || host.startsWith("127.0.0.1");

  if (!session) {
    redirect(isLocal ? "/admin/login" : "/login");
  }

  return <DashboardClient />;
}
