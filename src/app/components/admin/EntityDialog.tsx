import type { ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

type EntityDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  children: ReactNode;
  size?: "default" | "wide";
};

export function EntityDialog({
  open,
  onOpenChange,
  title,
  description,
  children,
  size = "default",
}: EntityDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={`flex max-h-[90vh] flex-col border-white/10 bg-slate-950 text-slate-100 ${
          size === "wide" ? "sm:max-w-3xl" : "sm:max-w-xl"
        }`}
      >
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription className="text-slate-400">
            {description}
          </DialogDescription>
        </DialogHeader>
        <div className="overflow-y-auto pr-1">
          {children}
        </div>
      </DialogContent>
    </Dialog>
  );
}
