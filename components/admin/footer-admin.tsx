"use client";

import { useState } from "react";
import { ShieldCheck, LogOut } from "lucide-react";
import { useAdmin, logout } from "@/lib/auth";
import { AdminLogin } from "@/components/admin/admin-login";

export function FooterAdmin() {
  const admin = useAdmin();
  const [open, setOpen] = useState(false);

  return (
    <>
      {admin ? (
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-2.5 py-1 text-[11px] font-medium text-primary">
            <ShieldCheck className="h-3 w-3" />
            Admin mode
          </span>
          <button
            onClick={logout}
            className="inline-flex items-center gap-1.5 text-xs link-muted"
          >
            <LogOut className="h-3.5 w-3.5" />
            Log out
          </button>
        </div>
      ) : (
        <button onClick={() => setOpen(true)} className="text-xs link-muted">
          Admin
        </button>
      )}

      <AdminLogin
        open={open}
        onClose={() => setOpen(false)}
        onSuccess={() => setOpen(false)}
      />
    </>
  );
}
