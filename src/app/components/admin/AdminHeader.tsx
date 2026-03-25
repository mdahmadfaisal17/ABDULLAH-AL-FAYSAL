import { useLocation, useSearchParams } from "react-router";
import { Menu, Search } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useAuth } from "../../context/AuthContext";

const searchPlaceholders: Record<string, string> = {
  "/admin": "Search requests, subscribers, blogs, and portfolio",
  "/admin/projects": "Search project requests by client, service, budget, or message",
  "/admin/blogs": "Search blog posts by title, category, slug, or content",
  "/admin/portfolio": "Search portfolio items by title, category, description, or link",
  "/admin/subscribers": "Search subscribers by email, source, or status",
};

type AdminHeaderProps = {
  title: string;
  subtitle: string;
  onMenuOpen: () => void;
};

export function AdminHeader({ title, subtitle, onMenuOpen }: AdminHeaderProps) {
  const { adminEmail } = useAuth();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const currentQuery = searchParams.get("q") ?? "";
  const placeholder = searchPlaceholders[location.pathname] ?? "Search";

  return (
    <header className="sticky top-0 z-20 border-b border-white/10 bg-slate-950/70 backdrop-blur-xl">
      <div className="flex flex-col gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            <Button
              type="button"
              size="icon"
              variant="ghost"
              className="mt-1 rounded-2xl border border-white/10 bg-white/5 text-white hover:bg-white/10 lg:hidden"
              onClick={onMenuOpen}
            >
              <Menu className="h-5 w-5" />
            </Button>
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.3em] text-[#E1FE5D]/80">
                Admin Workspace
              </p>
              <h2 className="mt-1 text-2xl font-semibold tracking-tight text-white">
                {title}
              </h2>
              <p className="mt-1 text-sm text-slate-400">{subtitle}</p>
            </div>
          </div>

          <div className="hidden rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-right sm:block">
            <p className="text-xs uppercase tracking-[0.28em] text-slate-500">
              Signed in
            </p>
            <p className="mt-1 text-sm font-medium text-slate-100">
              {adminEmail}
            </p>
          </div>
        </div>

        <div className="relative">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
          <Input
            value={currentQuery}
            onChange={(event) => {
              const nextValue = event.target.value;
              const nextParams = new URLSearchParams(searchParams);

              if (nextValue.trim()) {
                nextParams.set("q", nextValue);
              } else {
                nextParams.delete("q");
              }

              setSearchParams(nextParams, { replace: true });
            }}
            aria-label="Admin search"
            placeholder={placeholder}
            className="h-11 rounded-2xl border-white/10 bg-white/5 pl-10 text-slate-200 placeholder:text-slate-500"
          />
        </div>
      </div>
    </header>
  );
}
