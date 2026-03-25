import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  type ProjectRequestPayload,
  createBlog,
  createPortfolioItem,
  submitProjectRequest,
  editBlog,
  editPortfolioItem,
  getAdminData,
  removeBlog,
  removePortfolioItem,
} from "../lib/api";
import type {
  BlogFormValues,
  BlogPost,
  PortfolioFormValues,
  PortfolioItem,
  ProjectRequest,
  Subscriber,
} from "../types/admin";

type AdminDataContextValue = {
  projectRequests: ProjectRequest[];
  blogs: BlogPost[];
  portfolioItems: PortfolioItem[];
  subscribers: Subscriber[];
  addProjectRequest: (values: ProjectRequestPayload) => Promise<void>;
  addBlog: (values: BlogFormValues) => Promise<void>;
  updateBlog: (blogId: string, values: BlogFormValues) => Promise<void>;
  deleteBlog: (blogId: string) => Promise<void>;
  addPortfolioItem: (values: PortfolioFormValues) => Promise<void>;
  updatePortfolioItem: (portfolioId: string, values: PortfolioFormValues) => Promise<void>;
  deletePortfolioItem: (portfolioId: string) => Promise<void>;
};

const AdminDataContext = createContext<AdminDataContextValue | null>(null);

function buildExcerpt(content: string) {
  const normalized = content.trim().replace(/\s+/g, " ");
  return normalized.length > 110 ? `${normalized.slice(0, 110)}...` : normalized;
}

export function AdminDataProvider({ children }: { children: ReactNode }) {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]);
  const [projectRequests, setProjectRequests] = useState<ProjectRequest[]>([]);
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);

  useEffect(() => {
    let isMounted = true;

    const loadAdminData = async () => {
      try {
        const data = await getAdminData();

        if (!isMounted) {
          return;
        }

        setBlogs(data.blogs);
        setPortfolioItems(data.portfolioItems);
        setProjectRequests(data.projectRequests);
        setSubscribers(data.subscribers);
      } catch (error) {
        console.error("Failed to load admin data from the backend.", error);
      }
    };

    void loadAdminData();

    return () => {
      isMounted = false;
    };
  }, []);

  // Normalize items loaded from localStorage so new fields always exist
  const normalizedPortfolioItems: PortfolioItem[] = portfolioItems.map((item) => ({
    ...item,
    id: item.id ?? item._id ?? "",
    title: item.title ?? "",
    imageUrl: item.imageUrl ?? item.image ?? "",
    image: item.imageUrl ?? item.image ?? "",
    category: item.category ?? "",
    description: item.description ?? "",
    link: item.link ?? item.projectLink ?? undefined,
    featuredPosition:
      item.featuredPosition !== undefined
        ? item.featuredPosition
        : item.featuredSlot !== undefined
          ? item.featuredSlot
          : null,
    createdAt: item.createdAt ?? new Date().toISOString(),
  }));

  const addBlog = async (values: BlogFormValues) => {
    try {
      const nextBlogs = await createBlog(values);
      setBlogs(nextBlogs);
    } catch (error) {
      console.error("Failed to create blog.", error);
      throw error;
    }
  };

  const addProjectRequest = async (values: ProjectRequestPayload) => {
    try {
      const createdProjectRequest = await submitProjectRequest(values);
      setProjectRequests((current) => [createdProjectRequest, ...current]);
    } catch (error) {
      console.error("Failed to submit project request.", error);
      throw error;
    }
  };

  const updateBlog = async (blogId: string, values: BlogFormValues) => {
    try {
      const nextBlogs = await editBlog(blogId, values);
      setBlogs(nextBlogs);
    } catch (error) {
      console.error("Failed to update blog.", error);
      throw error;
    }
  };

  const deleteBlog = async (blogId: string) => {
    try {
      const nextBlogs = await removeBlog(blogId);
      setBlogs(nextBlogs);
    } catch (error) {
      console.error("Failed to delete blog.", error);
      throw error;
    }
  };

  const addPortfolioItem = async (values: PortfolioFormValues) => {
    try {
      const nextItems = await createPortfolioItem(values);
      setPortfolioItems(nextItems);
    } catch (error) {
      console.error("Failed to create portfolio item.", error);
      throw error;
    }
  };

  const updatePortfolioItem = async (portfolioId: string, values: PortfolioFormValues) => {
    try {
      const nextItems = await editPortfolioItem(portfolioId, values);
      setPortfolioItems(nextItems);
    } catch (error) {
      console.error("Failed to update portfolio item.", error);
      throw error;
    }
  };

  const deletePortfolioItem = async (portfolioId: string) => {
    try {
      await removePortfolioItem(portfolioId);
      setPortfolioItems((current) =>
        current.filter((item) => (item.id ?? item._id) !== portfolioId),
      );
    } catch (error) {
      console.error("Failed to delete portfolio item.", error);
      throw error;
    }
  };

  const value = useMemo<AdminDataContextValue>(
    () => ({
      projectRequests,
      blogs,
      portfolioItems: normalizedPortfolioItems,
      subscribers,
      addProjectRequest,
      addBlog,
      updateBlog,
      deleteBlog,
      addPortfolioItem,
      updatePortfolioItem,
      deletePortfolioItem,
    }),
    [blogs, normalizedPortfolioItems, projectRequests, subscribers],
  );

  return (
    <AdminDataContext.Provider value={value}>
      {children}
    </AdminDataContext.Provider>
  );
}

export function useAdminData() {
  const context = useContext(AdminDataContext);

  if (context) {
    return context;
  }

  // Prevent hard app crash if provider is temporarily unavailable (e.g., HMR edge cases).
  return {
    projectRequests: [],
    blogs: [],
    portfolioItems: [],
    subscribers: [],
    addBlog: async () => {},
    updateBlog: async () => {},
    deleteBlog: async () => {},
    addProjectRequest: async () => {},
    addPortfolioItem: async () => {},
    updatePortfolioItem: async () => {},
    deletePortfolioItem: async () => {},
  };
}
