import { VisitEvent } from "../models/VisitEvent.js";

function countDistinctSessions(match = {}) {
  return VisitEvent.aggregate([
    { $match: match },
    { $group: { _id: "$sessionId" } },
    { $count: "count" },
  ]).then((result) => result[0]?.count ?? 0);
}

export async function buildDashboardAnalyticsSummary({
  totalLeads,
  totalSubscribers,
}) {
  const now = new Date();
  const startOfToday = new Date(now);
  startOfToday.setHours(0, 0, 0, 0);

  const rollingThirtyDayStart = new Date(now);
  rollingThirtyDayStart.setDate(rollingThirtyDayStart.getDate() - 29);
  rollingThirtyDayStart.setHours(0, 0, 0, 0);

  const [totalVisitors, todayVisitors, monthlyVisitors, totalPageViews] = await Promise.all([
    countDistinctSessions(),
    countDistinctSessions({ occurredAt: { $gte: startOfToday } }),
    countDistinctSessions({ occurredAt: { $gte: rollingThirtyDayStart } }),
    VisitEvent.countDocuments(),
  ]);

  return {
    totalVisitors,
    todayVisitors,
    monthlyVisitors,
    totalPageViews,
    totalLeads,
    totalSubscribers,
  };
}
