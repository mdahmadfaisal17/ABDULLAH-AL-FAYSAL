import { useMemo } from "react";
import {
  Activity,
  BriefcaseBusiness,
  CalendarDays,
  Eye,
  Images,
  Newspaper,
  Sparkles,
  TrendingUp,
  Users,
} from "lucide-react";
import { Link, useSearchParams } from "react-router";
import { dashboardAnalyticsMetrics, getDashboardAnalyticsSummary } from "../../data/analyticsMock";
import { PageHeader } from "../../components/admin/PageHeader";
import { SectionCard } from "../../components/admin/SectionCard";
import { StatsCard } from "../../components/admin/StatsCard";
import { Button } from "../../components/ui/button";
import { useAdminData } from "../../context/AdminDataContext";
import { formatLongDate } from "../../lib/date";
import type { AnalyticsMetricKey } from "../../types/admin";

const analyticsIcons: Record<AnalyticsMetricKey, typeof Users> = {
  totalVisitors: Users,
  todayVisitors: CalendarDays,
  monthlyVisitors: TrendingUp,
  totalPageViews: Eye,
  totalLeads: BriefcaseBusiness,
  totalSubscribers: Activity,
};

export function DashboardPage() {
  const { projectRequests, blogs, portfolioItems, subscribers } = useAdminData();
  const [searchParams] = useSearchParams();
  const analyticsSummary = getDashboardAnalyticsSummary();
  const searchQuery = (searchParams.get("q") ?? "").trim().toLowerCase();
  const filteredProjectRequests = useMemo(() => {
    if (!searchQuery) {
      return projectRequests;
    }

    return projectRequests.filter((request) =>
      [
        request.fullName,
        request.email,
        request.selectedService,
        request.budget,
        request.projectDescription,
      ].some((field) => field.toLowerCase().includes(searchQuery)),
    );
  }, [projectRequests, searchQuery]);
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
  const filteredBlogs = useMemo(() => {
    if (!searchQuery) {
      return blogs;
    }

    return blogs.filter((blog) =>
      [blog.title, blog.category, blog.slug, blog.content, blog.status].some((field) =>
        field.toLowerCase().includes(searchQuery),
      ),
    );
  }, [blogs, searchQuery]);
  const filteredPortfolioItems = useMemo(() => {
    if (!searchQuery) {
      return portfolioItems;
    }

    return portfolioItems.filter((item) =>
      [item.title, item.category, item.description].some((field) =>
        field.toLowerCase().includes(searchQuery),
      ),
    );
  }, [portfolioItems, searchQuery]);

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Overview"
        title="Admin Dashboard"
        description="A dark, SaaS-style workspace for reviewing leads, maintaining content, and keeping the portfolio pipeline organized."
        actions={
          <Button
            asChild
            className="h-11 rounded-2xl bg-[#E1FE5D] px-5 text-[#07091a] hover:bg-[#d4f15a]"
          >
            <Link to="/admin/projects">Review Latest Requests</Link>
          </Button>
        }
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {dashboardAnalyticsMetrics.map((metric) => (
          <StatsCard
            key={metric.key}
            title={metric.title}
            value={analyticsSummary[metric.key]}
            description={metric.description}
            icon={analyticsIcons[metric.key]}
          />
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <SectionCard
          title="Recent Project Requests"
          description={
            searchQuery
              ? `Showing ${filteredProjectRequests.length} matching request${filteredProjectRequests.length === 1 ? "" : "s"}.`
              : "The newest lead submissions, sorted from latest to earliest."
          }
          action={
            <Button
              asChild
              variant="outline"
              className="rounded-2xl border-white/10 bg-white/5 text-slate-100 hover:bg-white/10"
            >
              <Link to="/admin/projects">Open Projects</Link>
            </Button>
          }
        >
          <div className="divide-y divide-white/10">
            {filteredProjectRequests.slice(0, 4).map((request) => (
              <div
                key={request.id}
                className="flex flex-col gap-4 px-6 py-5 md:flex-row md:items-center md:justify-between"
              >
                <div>
                  <p className="text-base font-semibold text-white">
                    {request.fullName}
                  </p>
                  <p className="mt-1 text-sm text-slate-400">
                    {request.selectedService} • {request.budget}
                  </p>
                  <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-300">
                    {request.projectDescription}
                  </p>
                </div>
                <div className="shrink-0 text-sm text-slate-400">
                  {formatLongDate(request.date)}
                </div>
              </div>
            ))}
          </div>
        </SectionCard>

        <div className="space-y-6">
          <SectionCard
            title="Content Snapshot"
            description="Quick-glance signals from the mock CMS modules."
          >
            <div className="grid gap-4 px-6 py-6">
              <div className="rounded-3xl border border-white/10 bg-slate-950/60 p-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#9F74FF]/15 text-[#E1FE5D]">
                    <Sparkles className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-400">Published Blogs</p>
                    <p className="text-2xl font-semibold text-white">
                      {filteredBlogs.filter((blog) => blog.status === "Published").length}
                    </p>
                  </div>
                </div>
              </div>
              <div className="rounded-3xl border border-white/10 bg-slate-950/60 p-5">
                <p className="text-sm text-slate-400">Latest Portfolio Item</p>
                <p className="mt-2 text-lg font-semibold text-white">
                  {filteredPortfolioItems[0]?.title ?? "No items yet"}
                </p>
                <p className="mt-1 text-sm text-slate-400">
                  {filteredPortfolioItems[0]?.category ?? "Add your first showcase item"}
                </p>
              </div>
            </div>
          </SectionCard>

          <SectionCard
            title="Recent Subscribers"
            description="Newest email signups captured on the site."
            action={
              <Button
                asChild
                variant="outline"
                className="rounded-2xl border-white/10 bg-white/5 text-slate-100 hover:bg-white/10"
              >
                <Link to="/admin/subscribers">View All</Link>
              </Button>
            }
          >
            <div className="space-y-1 px-6 py-4">
              {filteredSubscribers.slice(0, 4).map((subscriber) => (
                <div
                  key={subscriber.id}
                  className="flex items-center justify-between rounded-2xl px-3 py-3 hover:bg-white/5"
                >
                  <div>
                    <p className="text-sm font-medium text-white">
                      {subscriber.email}
                    </p>
                    <p className="mt-1 text-xs uppercase tracking-[0.24em] text-slate-500">
                      {subscriber.source}
                    </p>
                  </div>
                  <span className="rounded-full border border-emerald-400/15 bg-emerald-400/10 px-3 py-1 text-xs font-medium text-emerald-200">
                    {subscriber.status}
                  </span>
                </div>
              ))}
            </div>
          </SectionCard>
        </div>
      </div>
    </div>
  );
}
