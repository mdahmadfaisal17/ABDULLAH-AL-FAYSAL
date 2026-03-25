import { useMemo, useState } from "react";
import { useSearchParams } from "react-router";
import { EmptyState } from "../../components/admin/EmptyState";
import { PageHeader } from "../../components/admin/PageHeader";
import { ProjectCard } from "../../components/admin/ProjectCard";
import { ProjectDetailsModal } from "../../components/admin/ProjectDetailsModal";
import { SectionCard } from "../../components/admin/SectionCard";
import { useAdminData } from "../../context/AdminDataContext";
import type { ProjectRequest } from "../../types/admin";

export function ProjectsPage() {
  const { projectRequests } = useAdminData();
  const [searchParams] = useSearchParams();
  const [selectedProject, setSelectedProject] = useState<ProjectRequest | null>(
    null,
  );
  const searchQuery = (searchParams.get("q") ?? "").trim().toLowerCase();
  const filteredProjectRequests = useMemo(() => {
    if (!searchQuery) {
      return projectRequests;
    }

    return projectRequests.filter((request) =>
      [
        request.fullName,
        request.email,
        request.whatsappNumber,
        request.selectedService,
        request.budget,
        request.preferredContactMethod,
        request.projectDescription,
      ].some((field) => field.toLowerCase().includes(searchQuery)),
    );
  }, [projectRequests, searchQuery]);

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Leads"
        title="Project Requests"
        description="All submitted project form entries are listed below. Each row includes a details modal so the request can be reviewed without leaving the page."
      />

      <SectionCard
        title="Submitted Requests"
        description={
          searchQuery
            ? `Showing ${filteredProjectRequests.length} result${filteredProjectRequests.length === 1 ? "" : "s"} for \"${searchQuery}\".`
            : "Demo data for form submissions that will later come from your Node.js and MongoDB backend."
        }
      >
        {projectRequests.length === 0 ? (
          <EmptyState
            title="No project requests yet"
            description="When contact and project inquiry forms are connected, new submissions will appear here automatically."
          />
        ) : filteredProjectRequests.length === 0 ? (
          <EmptyState
            title="No matching requests"
            description="Try a different keyword or clear the search to see every submission again."
          />
        ) : (
          <div className="grid gap-4 p-6 grid-cols-1">
            {filteredProjectRequests.map((request) => (
              <ProjectCard
                key={request.id}
                project={request}
                onViewDetails={setSelectedProject}
              />
            ))}
          </div>
        )}
      </SectionCard>

      <ProjectDetailsModal
        project={selectedProject}
        onOpenChange={(open) => {
          if (!open) {
            setSelectedProject(null);
          }
        }}
      />
    </div>
  );
}
