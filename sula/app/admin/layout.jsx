"use client";
import "flatpickr/dist/flatpickr.min.css";
import "@/styles/globals.css"
import React, { useEffect, useState } from "react";
import Loader from "@/components/admin/Loader.jsx";

export default function RootLayout({children}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // const pathname = usePathname();

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <div className="dark:bg-boxdark-2 dark:text-bodydark">
          {loading ? <Loader /> : children}
        </div>
      </body>
    </html>
  );
}
