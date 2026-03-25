import type { ProjectRequest } from "../../types/admin";
import { formatLongDate } from "../../lib/date";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";

type ProjectCardProps = {
  project: ProjectRequest;
  onViewDetails: (project: ProjectRequest) => void;
};

export function ProjectCard({ project, onViewDetails }: ProjectCardProps) {
  return (
    <Card className="border-white/10 bg-white/5 shadow-2xl shadow-slate-950/20 transition-all duration-200 hover:border-white/20 hover:bg-white/[0.07]">
      <CardContent className="p-6">
        <div className="grid grid-cols-3 gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-[#E1FE5D]">
              Client Name
            </p>
            <h3 className="mt-2 text-xl font-semibold text-white">{project.fullName}</h3>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-[#E1FE5D]">Budget</p>
            <p className="mt-2 text-xl font-semibold text-white">{project.budget}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-[#E1FE5D]">Submission Date</p>
            <p className="mt-2 text-xl font-semibold text-white">
              {formatLongDate(project.date)}
            </p>
          </div>
        </div>

        <Button
          type="button"
          className="mt-6 rounded-2xl bg-[#E1FE5D] text-[#07091a] hover:bg-[#d4f15a]"
          onClick={() => onViewDetails(project)}
        >
          View Details
        </Button>
      </CardContent>
    </Card>
  );
}
