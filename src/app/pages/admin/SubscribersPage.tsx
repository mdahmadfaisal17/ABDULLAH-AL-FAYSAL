import { useMemo } from "react";
import { useSearchParams } from "react-router";
import { EmptyState } from "../../components/admin/EmptyState";
import { PageHeader } from "../../components/admin/PageHeader";
import { SectionCard } from "../../components/admin/SectionCard";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import { useAdminData } from "../../context/AdminDataContext";
import { formatDateTime } from "../../lib/date";

export function SubscribersPage() {
  const { subscribers } = useAdminData();
  const [searchParams] = useSearchParams();
  const searchQuery = (searchParams.get("q") ?? "").trim().toLowerCase();
  const filteredSubscribers = useMemo(() => {
    if (!searchQuery) {
      return subscribers;
    }

    return subscribers.filter((subscriber) =>
      [subscriber.email, subscriber.source, subscriber.status].some((field) =>
        field.toLowerCase().includes(searchQuery),
      ),
    );
  }, [subscribers, searchQuery]);

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Audience"
        title="Subscribers"
        description="A clean email subscriber table that can later be replaced with real newsletter data from your backend or email platform."
      />

      <SectionCard
        title="Subscribed Email Addresses"
        description={
          searchQuery
            ? `Showing ${filteredSubscribers.length} result${filteredSubscribers.length === 1 ? "" : "s"} for \"${searchQuery}\".`
            : "Mock subscriber records with source labels and timestamps."
        }
      >
        {subscribers.length === 0 ? (
          <EmptyState
            title="No subscribers found"
            description="Once your newsletter forms are connected, subscriber emails will appear here automatically."
          />
        ) : filteredSubscribers.length === 0 ? (
          <EmptyState
            title="No matching subscribers"
            description="Try a different keyword or clear the search to see every subscriber again."
          />
        ) : (
          <Table className="min-w-[760px]">
            <TableHeader>
              <TableRow className="border-white/10 hover:bg-transparent">
                {["Email Address", "Source", "Subscribed At", "Status"].map(
                  (heading) => (
                    <TableHead key={heading} className="px-6 py-4 text-slate-400">
                      {heading}
                    </TableHead>
                  ),
                )}
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSubscribers.map((subscriber) => (
                <TableRow
                  key={subscriber.id}
                  className="border-white/10 hover:bg-white/4"
                >
                  <TableCell className="px-6 py-4 font-medium text-white">
                    {subscriber.email}
                  </TableCell>
                  <TableCell className="px-6 py-4 text-slate-300">
                    {subscriber.source}
                  </TableCell>
                  <TableCell className="px-6 py-4 text-slate-400">
                    {formatDateTime(subscriber.subscribedAt)}
                  </TableCell>
                  <TableCell className="px-6 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${
                        subscriber.status === "Active"
                          ? "border border-emerald-400/20 bg-emerald-400/10 text-emerald-200"
                          : "border border-amber-400/20 bg-amber-400/10 text-amber-200"
                      }`}
                    >
                      {subscriber.status}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </SectionCard>
    </div>
  );
}
