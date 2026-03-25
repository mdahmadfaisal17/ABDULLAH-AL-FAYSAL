import type { LucideIcon } from "lucide-react";
import { Card, CardContent } from "../ui/card";

type StatsCardProps = {
  title: string;
  value: number;
  description: string;
  icon: LucideIcon;
};

export function StatsCard({
  title,
  value,
  description,
  icon: Icon,
}: StatsCardProps) {
  return (
    <Card className="overflow-hidden border-white/10 bg-white/5 shadow-2xl shadow-slate-950/30">
      <CardContent className="p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-slate-400">{title}</p>
            <p className="mt-4 text-4xl font-semibold tracking-tight text-white">
              {value.toLocaleString()}
            </p>
            <p className="mt-3 text-sm leading-6 text-slate-400">
              {description}
            </p>
          </div>
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-linear-to-br from-[#E1FE5D]/20 to-[#9F74FF]/20 text-[#E1FE5D] ring-1 ring-white/10">
            <Icon className="h-5 w-5" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
