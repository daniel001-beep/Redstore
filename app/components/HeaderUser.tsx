"use client";

import { useSession } from "@/app/context/AuthContext";

export default function HeaderUser() {
  const { data: session } = useSession();

  const name = session?.user?.name || session?.user?.email?.split("@")[0] || "User";
  let firstName = name.trim().split(" ")[0];
  if (firstName.toLowerCase().startsWith("idowuisdaniel")) {
    firstName = "Daniel";
  }
  const initials = firstName === "Daniel" ? "D" : name
    .split(" ")
    .map((w: string) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
  const email = session?.user?.email || "";

  return (
    <div className="flex items-center gap-3 h-8">
      <div className="w-8 h-8 rounded-full bg-blue-100 border border-blue-200 flex items-center justify-center font-bold text-blue-600 text-xs shrink-0">
        {initials}
      </div>
      <div className="text-left hidden sm:block">
        <p className="text-[13px] font-semibold text-slate-800 leading-tight capitalize">{firstName}</p>
        <p className="text-[11px] text-slate-400 font-medium leading-none truncate max-w-[140px]">{email}</p>
      </div>
    </div>
  );
}
