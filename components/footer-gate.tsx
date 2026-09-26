"use client";

import { usePathname } from "next/navigation";
import { Footer } from "@/components/footer";

export function FooterGate() {
  const pathname = usePathname();
  if (pathname === "/login" || pathname.startsWith("/admin")) return null;
  return <Footer />;
}
