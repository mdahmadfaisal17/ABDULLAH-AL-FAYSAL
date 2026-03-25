import { useEffect, useMemo, useState } from "react";
import { Outlet, useLocation } from "react-router";
import { AdminHeader } from "../components/admin/AdminHeader";
import { AdminSidebar } from "../components/admin/AdminSidebar";

const pageDetails: Record<string, { title: string; subtitle: string }> = {
  "/admin": {
    title: "Dashboard Overview",
    subtitle: "Track the latest activity across projects, content, portfolio, and subscribers.",
  },
  "/admin/projects": {
    title: "Project Requests",
    subtitle: "Review every incoming form submission and inspect request details quickly.",
  },
  "/admin/blogs": {
    title: "Blog Management",
    subtitle: "Create, edit, and remove blog content using reusable admin workflows.",
  },
  "/admin/portfolio": {
    title: "Portfolio Management",
    subtitle: "Keep showcase items fresh with mock media uploads and category tagging.",
  },
  "/admin/subscribers": {
    title: "Subscriber Directory",
    subtitle: "Monitor audience growth from signup forms across the site.",
  },
};

export function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  const currentPage = useMemo(
    () => pageDetails[location.pathname] ?? pageDetails["/admin"],
    [location.pathname],
  );

  return (
    <div className="min-h-screen bg-[#07091a] text-slate-100">
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_top_left,rgba(225,254,93,0.12),transparent_28%),radial-gradient(circle_at_85%_15%,rgba(159,116,255,0.18),transparent_22%),linear-gradient(180deg,#07091a_0%,#0a0b1a_55%,#060714_100%)]" />
      <div className="relative min-h-screen">
        <AdminSidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        <div className="lg:pl-72">
          <AdminHeader
            title={currentPage.title}
            subtitle={currentPage.subtitle}
            onMenuOpen={() => setSidebarOpen(true)}
          />

          <main className="px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}
