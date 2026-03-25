import type { ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

type SectionCardProps = {
  title: string;
  description: string;
  action?: ReactNode;
  children: ReactNode;
};

export function SectionCard({
  title,
  description,
  action,
  children,
}: SectionCardProps) {
  return (
    <Card className="border-white/10 bg-white/5 shadow-2xl shadow-slate-950/20">
      <CardHeader className="flex flex-col gap-4 border-b border-white/10 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <CardTitle className="text-xl font-semibold text-white">
            {title}
          </CardTitle>
          <p className="mt-2 text-sm leading-6 text-slate-400">{description}</p>
        </div>
        {action ? <div className="shrink-0">{action}</div> : null}
      </CardHeader>
      <CardContent className="p-0">{children}</CardContent>
    </Card>
  );
}
