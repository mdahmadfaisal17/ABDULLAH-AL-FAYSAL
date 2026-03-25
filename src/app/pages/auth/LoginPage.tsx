import { useState, type FormEvent } from "react";
import { useLocation, useNavigate } from "react-router";
import { ShieldCheck, LockKeyhole, Mail, Eye, EyeOff } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";

type LocationState = {
  from?: string;
};

export function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const redirectTo = ((location.state as LocationState | null)?.from ?? "/") as string;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const isLoggedIn = await login(email, password);

      if (!isLoggedIn) {
        setError("Invalid admin credentials. Please try again.");
        return;
      }

      navigate(redirectTo, { replace: true });
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "Could not sign in right now. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#07091a] px-4 py-10 text-slate-100">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(225,254,93,0.12),transparent_30%),radial-gradient(circle_at_80%_20%,rgba(159,116,255,0.18),transparent_24%),linear-gradient(180deg,#07091a_0%,#0a0b1a_55%,#060714_100%)]" />
      <div className="absolute left-[-6rem] top-16 h-72 w-72 rounded-full bg-[#E1FE5D]/10 blur-3xl" />
      <div className="absolute bottom-10 right-[-5rem] h-72 w-72 rounded-full bg-[#9F74FF]/12 blur-3xl" />

      <div className="relative grid w-full max-w-6xl gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div className="hidden rounded-[2rem] border border-white/10 bg-white/5 p-10 shadow-2xl shadow-slate-950/30 lg:block">
          <p className="text-xs font-medium uppercase tracking-[0.34em] text-[#E1FE5D]/80">
            Secure Access
          </p>
          <h1 className="mt-5 max-w-xl text-5xl font-semibold tracking-tight text-white">
            Secure admin access for managing projects and content
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300">
            Secure access to manage projects, content, and growth.
          </p>

          <div className="mt-12 grid gap-5 sm:grid-cols-3">
            {[
              {
                title: "Protected Routes",
                text: "Secure access to all admin pages",
                icon: ShieldCheck,
              },
              {
                title: "Mock CMS",
                text: "Manage blog and portfolio content easily",
                icon: LockKeyhole,
              },
              {
                title: "Scalable Layout",
                text: "Built for future growth and expansion",
                icon: Mail,
              },
            ].map(({ title, text, icon: Icon }) => (
              <div
                key={title}
                className="rounded-3xl border border-white/10 bg-slate-950/60 p-6"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#9F74FF]/15 text-[#E1FE5D]">
                  <Icon className="h-5 w-5" />
                </div>
                <h2 className="mt-4 text-lg font-semibold text-white">{title}</h2>
                <p className="mt-3 text-sm leading-7 text-slate-400">{text}</p>
              </div>
            ))}
          </div>
        </div>

        <Card className="border-white/10 bg-slate-950/85 shadow-[0_24px_80px_rgba(2,6,23,0.55)] backdrop-blur-xl">
          <CardContent className="p-8 sm:p-10">
            <p className="text-xs font-medium uppercase tracking-[0.34em] text-[#E1FE5D]/80">
              Admin Login
            </p>
            <h2 className="mt-4 text-3xl font-semibold text-white">
              Sign in to continue
            </h2>

            <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-slate-200">
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="Enter admin email"
                  className="h-13 rounded-2xl border-white/10 bg-white/5 px-4 text-slate-100 placeholder:text-slate-500 focus-visible:border-[#9F74FF] focus-visible:ring-[3px] focus-visible:ring-[#9F74FF]/20"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-slate-200">
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="Enter admin password"
                    className="h-13 rounded-2xl border-white/10 bg-white/5 px-4 pr-12 text-slate-100 placeholder:text-slate-500 focus-visible:border-[#9F74FF] focus-visible:ring-[3px] focus-visible:ring-[#9F74FF]/20"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 transition-colors hover:text-white"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              {error ? (
                <div className="rounded-2xl border border-red-400/20 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                  {error}
                </div>
              ) : null}

              <Button
                type="submit"
                disabled={isSubmitting}
                className="h-12 w-full rounded-2xl bg-[#E1FE5D] text-[#07091a] transition-all duration-300 hover:scale-[1.01] hover:bg-[#d4f15a]"
              >
                {isSubmitting ? "Signing In..." : "Access Admin Panel"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
