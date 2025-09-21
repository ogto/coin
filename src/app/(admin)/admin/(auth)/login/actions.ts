"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

type State = { error?: string };

export async function authenticate(_: State, formData: FormData): Promise<State | never> {
  const pwd = (formData.get("password") || "").toString().trim();
  const ok = pwd.length > 0 && pwd === process.env.ADMIN_PASSWORD;
  if (!ok) return { error: "비밀번호가 올바르지 않습니다." };

  const cookieStore = await cookies();
  const secure = process.env.NODE_ENV === "production";

  cookieStore.set("admin_session", "ok", {
    httpOnly: true,
    sameSite: "lax",
    secure, // 로컬은 false, 배포는 true
    path: "/",
    maxAge: 60 * 60 * 8,
  });

  redirect("/admin/dashboard"); // ⬅️ 항상 /admin 접두사
}
