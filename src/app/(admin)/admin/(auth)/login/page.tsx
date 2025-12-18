import LoginForm from "./LoginForm";

export default function AdminLoginPage() {
  return (
    <main className="relative grid min-h-screen place-items-center">
      {/* 중앙 카드 */}
      <div className="relative z-10 w-full max-w-md rounded-2xl border border-white/10 bg-white/[0.06] p-6 shadow-[0_28px_80px_rgba(8,15,40,0.35)] backdrop-blur">
        {/* 로고/브랜드 */}
        <div className="mb-5 flex items-center gap-3">
          <div className="h-8 w-8 rounded-lg bg-emerald-400" />
          <div>
            <div className="text-sm font-semibold text-white">Hae Gang Admin</div>
            <div className="text-xs text-white/50">Secure Console</div>
          </div>
        </div>

        <LoginForm />
      </div>
    </main>
  );
}
