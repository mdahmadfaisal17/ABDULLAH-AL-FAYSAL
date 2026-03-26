import type { DashboardAnalyticsMetric } from "../types/admin";

export const dashboardAnalyticsMetrics: DashboardAnalyticsMetric[] = [
  {
    key: "totalVisitors",
    title: "Total Visitors",
    description: "All unique public-site visitors captured by live backend tracking.",
    source: "backend",
  },
  {
    key: "todayVisitors",
    title: "Today Visitors",
    description: "Unique visitors recorded today on the live website.",
    source: "backend",
  },
  {
    key: "monthlyVisitors",
    title: "Monthly Visitors",
    description: "Rolling 30-day unique visitor count from live site traffic.",
    source: "backend",
  },
  {
    key: "totalPageViews",
    title: "Total Page Views",
    description: "Total public page views tracked by the website backend.",
    source: "backend",
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
