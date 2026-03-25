import { EntityDialog } from "./EntityDialog";
import { formatDateTime } from "../../lib/date";
import type { ProjectRequest } from "../../types/admin";

type ProjectDetailsModalProps = {
  project: ProjectRequest | null;
  onOpenChange: (open: boolean) => void;
};

export function ProjectDetailsModal({
  project,
  onOpenChange,
}: ProjectDetailsModalProps) {
  return (
    <EntityDialog
      open={Boolean(project)}
      onOpenChange={onOpenChange}
      title={project?.fullName ?? "Project Details"}
      description="Expanded view of the selected project inquiry."
      size="wide"
    >
      {project ? (
        <div className="grid gap-4 sm:grid-cols-2">
          {[
            ["Full Name", project.fullName],
            ["Email", project.email],
            ["WhatsApp Number", project.whatsappNumber],
            ["Selected Service", project.selectedService],
            ["Budget", project.budget],
            ["Preferred Contact Method", project.preferredContactMethod],
            ["Date", formatDateTime(project.date)],
          ].map(([label, value]) => (
            <div
              key={label}
              className="rounded-2xl border border-white/10 bg-white/5 p-4"
            >
              <p className="text-xs uppercase tracking-[0.24em] text-[#E1FE5D]">
                {label}
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-100">{value}</p>
            </div>
          ))}

          <div className="rounded-2xl border border-white/10 bg-white/5 p-4 sm:col-span-2">
            <p className="text-xs uppercase tracking-[0.24em] text-[#E1FE5D]">
              Project Description
            </p>
            <p className="mt-3 text-sm leading-7 text-slate-200">
              {project.projectDescription}
            </p>
          </div>
        </div>
      ) : null}
    </EntityDialog>
  );
}
