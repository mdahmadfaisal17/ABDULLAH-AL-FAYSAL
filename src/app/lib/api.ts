import type {
  BlogFormValues,
  BlogPost,
  DashboardAnalyticsSummary,
  PortfolioFormValues,
  PortfolioItem,
  ProjectRequest,
  Subscriber,
} from "../types/admin";

export type AdminDataResponse = {
  blogs: BlogPost[];
  portfolioItems: PortfolioItem[];
  projectRequests: ProjectRequest[];
  subscribers: Subscriber[];
  analyticsSummary: DashboardAnalyticsSummary;
};

export type AdminSessionResponse = {
  authenticated: boolean;
  adminEmail: string | null;
};

export const API_BASE_URL =
  (import.meta.env.VITE_API_BASE_URL as string | undefined)?.replace(/\/$/, "") ||
  "/api";

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers || {}),
    },
    ...init,
  });

  if (!response.ok) {
    let message = `Request failed with status ${response.status}`;

    try {
      const payload = (await response.json()) as { message?: string };
      if (payload.message) {
        message = payload.message;
      }
    } catch {
      // Ignore JSON parsing errors for non-JSON responses.
    }

    throw new Error(message);
  }

  return response.json() as Promise<T>;
}

export function getAdminSession() {
  return request<AdminSessionResponse>("/auth/me");
}

export function loginAdmin(email: string, password: string) {
  return request<AdminSessionResponse>("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}

export function logoutAdmin() {
  return request<AdminSessionResponse>("/auth/logout", {
    method: "POST",
  });
}

export function getAdminData() {
  return request<AdminDataResponse>("/admin-data");
}

export function createBlog(values: BlogFormValues) {
  return request<BlogPost[]>("/blogs", {
    method: "POST",
    body: JSON.stringify(values),
  });
}

export function editBlog(blogId: string, values: BlogFormValues) {
  return request<BlogPost[]>(`/blogs/${blogId}`, {
    method: "PUT",
    body: JSON.stringify(values),
  });
}

export function removeBlog(blogId: string) {
  return request<BlogPost[]>(`/blogs/${blogId}`, {
    method: "DELETE",
  });
}

export function createPortfolioItem(values: PortfolioFormValues) {
  return request<PortfolioItem[]>("/portfolio", {
    method: "POST",
    body: JSON.stringify(values),
  });
}

export function editPortfolioItem(portfolioId: string, values: PortfolioFormValues) {
  return request<PortfolioItem[]>(`/portfolio/${portfolioId}`, {
    method: "PUT",
    body: JSON.stringify(values),
  });
}

export function removePortfolioItem(portfolioId: string) {
  return request<PortfolioItem[]>(`/portfolio/${portfolioId}`, {
    method: "DELETE",
  });
}

export type ProjectRequestPayload = {
  fullName: string;
  email: string;
  whatsappNumber: string;
  selectedService: string;
  budget: string;
  preferredContactMethod: string;
  projectDescription: string;
};

export function submitProjectRequest(values: ProjectRequestPayload) {
  return request<ProjectRequest>("/project-requests", {
    method: "POST",
    body: JSON.stringify(values),
  });
}
