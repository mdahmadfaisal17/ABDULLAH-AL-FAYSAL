export type ProjectRequest = {
  id: string;
  fullName: string;
  email: string;
  whatsappNumber: string;
  selectedService: string;
  budget: string;
  preferredContactMethod: string;
  projectDescription: string;
  date: string;
};

export type BlogPost = {
  id: string;
  title: string;
  slug: string;
  category: string;
  content: string;
  excerpt: string;
  thumbnail: string;
  publishedAt: string;
  status: "Draft" | "Published";
};

export type PortfolioItem = {
  id: string;
  _id?: string;
  title: string;
  imageUrl?: string;
  image: string;
  category: string;
  description: string;
  link?: string;
  projectLink?: string;
  featuredPosition: number | null;
  featuredSlot?: number | null;
  createdAt: string;
};

export type Subscriber = {
  id: string;
  email: string;
  source: string;
  subscribedAt: string;
  status: "Active" | "Paused";
};

export type BlogFormValues = {
  title: string;
  slug: string;
  category: string;
  content: string;
  thumbnail: string;
  status: "Draft" | "Published";
};

export type PortfolioFormValues = {
  title: string;
  image: string;
  category: string;
  description: string;
  link: string;
  featuredPosition: number | null;
};

export type AnalyticsMetricKey =
  | "totalVisitors"
  | "todayVisitors"
  | "monthlyVisitors"
  | "totalPageViews"
  | "totalLeads"
  | "totalSubscribers";

export type AnalyticsDataSource = "google-analytics" | "backend";

export type DashboardAnalyticsSummary = Record<AnalyticsMetricKey, number>;

export type DashboardAnalyticsMetric = {
  key: AnalyticsMetricKey;
  title: string;
  description: string;
  source: AnalyticsDataSource;
};
