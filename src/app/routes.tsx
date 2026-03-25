import { lazy, Suspense } from "react";
import { createBrowserRouter, Navigate } from "react-router";
import { AdminLayout } from "./layouts/AdminLayout";
import { PublicLayout } from "./layouts/PublicLayout";
import { ProtectedRoute } from "./routes/ProtectedRoute";
import { PublicOnlyRoute } from "./routes/PublicOnlyRoute";

const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Services = lazy(() => import("./pages/Services"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogDetails = lazy(() => import("./pages/BlogDetails"));
const Portfolio = lazy(() => import("./pages/Portfolio"));
const Pricing = lazy(() => import("./pages/Pricing"));
const Terms = lazy(() => import("./pages/Terms"));
const Privacy = lazy(() => import("./pages/Privacy"));

const LoginPage = lazy(() =>
  import("./pages/auth/LoginPage").then((module) => ({ default: module.LoginPage })),
);
const DashboardPage = lazy(() =>
  import("./pages/admin/DashboardPage").then((module) => ({ default: module.DashboardPage })),
);
const ProjectsPage = lazy(() =>
  import("./pages/admin/ProjectsPage").then((module) => ({ default: module.ProjectsPage })),
);
const BlogsPage = lazy(() =>
  import("./pages/admin/BlogsPage").then((module) => ({ default: module.BlogsPage })),
);
const AdminPortfolioPage = lazy(() =>
  import("./pages/admin/PortfolioPage").then((module) => ({ default: module.PortfolioPage })),
);
const SubscribersPage = lazy(() =>
  import("./pages/admin/SubscribersPage").then((module) => ({ default: module.SubscribersPage })),
);

function PageLoader() {
  return <div className="min-h-[40vh] bg-[#0a0b1a]" aria-hidden="true" />;
}

function withSuspense(element: React.ReactNode) {
  return <Suspense fallback={<PageLoader />}>{element}</Suspense>;
}

export const router = createBrowserRouter([
  {
    path: "/login",
    element: (
      <PublicOnlyRoute>
        {withSuspense(<LoginPage />)}
      </PublicOnlyRoute>
    ),
  },
  {
    path: "/",
    element: <PublicLayout />,
    children: [
      { index: true, element: withSuspense(<Home />) },
      { path: "about", element: withSuspense(<About />) },
      { path: "services", element: withSuspense(<Services />) },
      { path: "blog", element: withSuspense(<Blog />) },
      { path: "blog/:postId", element: withSuspense(<BlogDetails />) },
      { path: "portfolio", element: withSuspense(<Portfolio />) },
      { path: "pricing", element: withSuspense(<Pricing />) },
      { path: "terms", element: withSuspense(<Terms />) },
      { path: "privacy", element: withSuspense(<Privacy />) },
    ],
  },
  {
    path: "/admin",
    element: (
      <ProtectedRoute>
        <AdminLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: withSuspense(<DashboardPage />) },
      { path: "projects", element: withSuspense(<ProjectsPage />) },
      { path: "blogs", element: withSuspense(<BlogsPage />) },
      { path: "portfolio", element: withSuspense(<AdminPortfolioPage />) },
      { path: "subscribers", element: withSuspense(<SubscribersPage />) },
      { path: "*", element: <Navigate to="/admin" replace /> },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
]);
