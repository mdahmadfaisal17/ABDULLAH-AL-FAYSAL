import { LayoutDashboard, BriefcaseBusiness, Newspaper, Images, Users, LogOut, X } from "lucide-react";
import { NavLink } from "react-router";
import { Button } from "../ui/button";
import { cn } from "../ui/utils";
import { useAuth } from "../../context/AuthContext";

type AdminSidebarProps = {
  isOpen: boolean;
  onClose: () => void;
};

const navigationItems = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/admin/projects", label: "Projects", icon: BriefcaseBusiness },
  { to: "/admin/blogs", label: "Blogs", icon: Newspaper },
  { to: "/admin/portfolio", label: "Portfolio", icon: Images },
  { to: "/admin/subscribers", label: "Subscribers", icon: Users },
];

function SidebarContent({ onNavigate }: { onNavigate: () => void }) {
  const { logout } = useAuth();

  return (
    <div className="flex h-full flex-col border-r border-white/10 bg-[#050714]/88 px-5 py-6 backdrop-blur-xl">
      <div className="flex items-center gap-3 border-b border-white/10 pb-6">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-linear-to-br from-[#E1FE5D] via-[#9F74FF] to-[#6b4fd1] text-lg font-semibold text-[#07091a] shadow-lg shadow-[#9F74FF]/25">
          AF
        </div>
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.32em] text-[#E1FE5D]/80">
            Modern Website
          </p>
          <h1 className="mt-1 text-xl font-semibold text-white">
            Admin Panel
          </h1>
        </div>
      </div>

      <nav className="mt-6 flex flex-1 flex-col gap-2">
        {navigationItems.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            onClick={onNavigate}
            className={({ isActive }) =>
              cn(
                "group flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium text-slate-300 transition-all duration-200 hover:bg-white/6 hover:text-white",
                isActive &&
                  "bg-linear-to-r from-[#E1FE5D]/16 to-[#9F74FF]/18 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]",
              )
            }
          >
            <Icon className="h-4 w-4" />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="mt-6 rounded-3xl border border-white/10 bg-white/5 p-4">
        <p className="text-xs uppercase tracking-[0.28em] text-slate-400">
          Admin Access
        </p>
        <p className="mt-3 text-sm leading-6 text-slate-300">
          Admin access now uses backend-validated sessions so protected actions stay behind server auth.
        </p>
      </div>

      <Button
        type="button"
        variant="ghost"
        className="mt-5 h-12 justify-start rounded-2xl border border-white/10 bg-white/5 px-4 text-slate-200 hover:bg-red-500/10 hover:text-red-200"
        onClick={async () => {
          await logout();
          onNavigate();
        }}
      >
        <LogOut className="h-4 w-4" />
        Logout
      </Button>
    </div>
  );
}

export function AdminSidebar({ isOpen, onClose }: AdminSidebarProps) {
  return (
    <>
      <aside className="hidden lg:fixed lg:inset-y-0 lg:z-30 lg:block lg:w-72">
        <SidebarContent onNavigate={() => undefined} />
      </aside>

      {isOpen ? (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm lg:hidden">
          <div className="absolute inset-y-0 left-0 w-80 max-w-[86vw]">
            <div className="absolute right-4 top-4 z-10">
              <Button
                type="button"
                size="icon"
                variant="ghost"
                className="rounded-full border border-white/10 bg-slate-900/80 text-white hover:bg-white/10"
                onClick={onClose}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <SidebarContent onNavigate={onClose} />
          </div>
        </div>
      ) : null}
    </>
  );
}
