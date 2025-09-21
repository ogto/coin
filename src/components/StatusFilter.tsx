import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Filter } from "lucide-react";

type Status = "new" | "in_progress" | "done";
type FilterValue = "" | Status;

const STATUS_LABEL: Record<Status, string> = {
  new: "신규",
  in_progress: "진행중",
  done: "완료",
};

const OPTIONS: { value: FilterValue; label: string; dotClass?: string }[] = [
  { value: "", label: "전체 상태" },
  { value: "new", label: STATUS_LABEL.new, dotClass: "bg-emerald-400" },
  { value: "in_progress", label: STATUS_LABEL.in_progress, dotClass: "bg-amber-400" },
  { value: "done", label: STATUS_LABEL.done, dotClass: "bg-cyan-400" },
];

export function StatusFilter({
  value,
  onChange,
}: {
  value: FilterValue;
  onChange: (v: FilterValue) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const label =
    OPTIONS.find((o) => o.value === value)?.label ??
    STATUS_LABEL[(value || "new") as Status];

  // 바깥 클릭 닫기
  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, []);

  // ESC 닫기
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="
          flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2
          text-sm text-white/90 hover:bg-white/10 transition
        "
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <Filter className="h-4 w-4 text-white/60" />
        <span className="min-w-16">{label}</span>
        <ChevronDown className="h-4 w-4 text-white/60" />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.98 }}
            transition={{ duration: 0.16 }}
            role="listbox"
            className="
              absolute right-0 z-50 mt-2 w-44 overflow-hidden rounded-xl
              border border-white/10 bg-[#0b1220] shadow-[0_16px_60px_rgba(0,0,0,0.45)]
            "
          >
            <div className="border-b border-white/5 bg-gradient-to-r from-emerald-400/20 via-cyan-400/10 to-transparent h-[2px]" />
            {OPTIONS.map((opt) => {
              const active = opt.value === value;
              return (
                <button
                  key={String(opt.value)}
                  role="option"
                  aria-selected={active}
                  onClick={() => {
                    onChange(opt.value);
                    setOpen(false);
                  }}
                  className={`
                    flex w-full items-center justify-between px-3 py-2 text-left text-sm
                    ${active ? "bg-white/[0.06] text-white" : "text-white/85 hover:bg-white/[0.06]"}
                  `}
                >
                  <span className="flex items-center gap-2">
                    {opt.dotClass && <span className={`h-2 w-2 rounded-full ${opt.dotClass}`} />}
                    {opt.label}
                  </span>
                  {active && (
                    <span className="rounded-md bg-white/5 px-1.5 py-0.5 text-[10px] text-white/70">
                      선택됨
                    </span>
                  )}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
