import type {
  DashboardAnalyticsMetric,
  DashboardAnalyticsSummary,
} from "../types/admin";

const mockDashboardAnalyticsSummary: DashboardAnalyticsSummary = {
  totalVisitors: 128340,
  todayVisitors: 1248,
  monthlyVisitors: 38290,
  totalPageViews: 496880,
  totalLeads: 845,
  totalSubscribers: 6210,
};

export const dashboardAnalyticsMetrics: DashboardAnalyticsMetric[] = [
  {
    key: "totalVisitors",
    title: "Total Visitors",
    description: "All-time traffic captured from GA4 property reports.",
    source: "google-analytics",
  },
  {
    key: "todayVisitors",
    title: "Today Visitors",
    description: "Unique users currently recorded for today.",
    source: "google-analytics",
  },
  {
    key: "monthlyVisitors",
    title: "Monthly Visitors",
    description: "Rolling 30-day unique user count from analytics.",
    source: "google-analytics",
  },
  {
    key: "totalPageViews",
    title: "Total Page Views",
    description: "Overall page_view events tracked across the site.",
    source: "google-analytics",
  },
  {
    key: "totalLeads",
    title: "Total Leads",
    description: "Form submissions available for sales follow-up.",
    source: "backend",
  },
  {
    key: "totalSubscribers",
    title: "Total Subscribers",
    description: "Email subscribers synced from backend forms.",
    source: "backend",
  },
];

export function getDashboardAnalyticsSummary(): DashboardAnalyticsSummary {
  // Replace this with GA4 and backend API aggregation later.
  return mockDashboardAnalyticsSummary;
}
