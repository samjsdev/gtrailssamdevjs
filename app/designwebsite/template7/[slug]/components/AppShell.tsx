"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar/Navbar";
import Footer from "./Footer/Footer";
import Preloader from "./Preloader/Preloader";
import { LoadingProvider } from "../context/LoadingContext";
import SmoothScroll from "./SmoothScroll";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isPrivateRoute = pathname?.startsWith("/private/") ?? false;

  if (isPrivateRoute) {
    return <>{children}</>;
  }

  return (
    <SmoothScroll>
      <LoadingProvider>
        <Preloader />
        <Navbar />
        {children}
        <Footer />
      </LoadingProvider>
    </SmoothScroll>
  );
}
