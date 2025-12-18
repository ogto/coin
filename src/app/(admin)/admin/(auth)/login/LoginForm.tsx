"use client";

import { useActionState, useState } from "react";
import { authenticate } from "./actions";
import { Lock, LogIn, Eye, EyeOff } from "lucide-react";

type State = { error?: string };

export default function LoginForm() {
  const [state, formAction, isPending] = useActionState<State, FormData>(authenticate, {});
  const [show, setShow] = useState(false);

  return (
    <form
      action={formAction}
      className="w-full max-w-sm space-y-4"
      autoComplete="on"
      aria-busy={isPending}
    >
      <div className="text-center">
        <div className="mx-auto grid h-12 w-12 place-items-center rounded-xl bg-white/10 ring-1 ring-white/10">
          <Lock className="h-6 w-6 text-white/90" />
        </div>
        <h1 className="mt-3 text-xl font-bold text-white">관리자 로그인</h1>
        <p className="mt-1 text-sm text-white/60">admin.haegang.io</p>
      </div>

      <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 focus-within:ring-2 focus-within:ring-emerald-400/50">
        <label htmlFor="password" className="block text-xs text-white/60">
          비밀번호
        </label>
        <div className="mt-1 flex items-center">
          <input
            id="password"
            name="password"
            type={show ? "text" : "password"}
            required
            autoFocus
            autoComplete="current-password"
            placeholder="••••••••"
            className="peer w-full bg-transparent text-white placeholder-white/40 outline-none"
          />
          <button
            type="button"
            onClick={() => setShow(v => !v)}
            className="ml-2 rounded-md p-1 text-white/60 hover:text-white/90 cursor-pointer"
            aria-label={show ? "비밀번호 숨기기" : "비밀번호 보기"}
            title={show ? "비밀번호 숨기기" : "비밀번호 보기"}
          >
            {show ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {state?.error && (
        <div
          className="rounded-lg border border-amber-400/30 bg-amber-400/10 px-3 py-2 text-sm text-amber-200"
          role="alert"
          aria-live="polite"
        >
          {state.error}
        </div>
      )}

      <button
        type="submit"
        disabled={isPending}
        aria-disabled={isPending}
        className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 px-4 py-3 font-semibold text-[#0b1220] shadow-[0_10px_30px_rgba(16,185,129,.35)] transition enabled:active:translate-y-[1px] disabled:opacity-60 cursor-pointer disabled:cursor-not-allowed"
      >
        <LogIn className="h-5 w-5" />
        {isPending ? "확인 중…" : "로그인"}
      </button>

      <p className="text-center text-xs text-white/50">
        권한이 있는 사용자만 접근 가능합니다.
      </p>
    </form>
  );
}
