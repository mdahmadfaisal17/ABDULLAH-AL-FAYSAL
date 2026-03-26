import { API_BASE_URL } from "./api";

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

type RouterLike = {
  state: {
    location: {
      pathname: string;
      search: string;
      hash: string;
    };
  };
  subscribe: (listener: () => void) => () => void;
};

const ANALYTICS_SESSION_KEY = "modern-website-analytics-session";

function isAnalyticsEnabled() {
  if (typeof window === "undefined") {
    return false;
  }

  const { hostname } = window.location;
  return hostname !== "localhost" && hostname !== "127.0.0.1";
}

function shouldTrackPath(path: string) {
  return !path.startsWith("/admin") && !path.startsWith("/auth");
}

function createSessionId() {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }

  return `session-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function getAnalyticsSessionId() {
  if (typeof window === "undefined") {
    return "";
  }

  try {
    const existing = window.localStorage.getItem(ANALYTICS_SESSION_KEY);
    if (existing) {
      return existing;
    }

    const nextId = createSessionId();
    window.localStorage.setItem(ANALYTICS_SESSION_KEY, nextId);
    return nextId;
  } catch {
    return createSessionId();
  }
}

function sendPageView(path: string) {
  if (typeof window === "undefined" || !isAnalyticsEnabled() || !shouldTrackPath(path)) {
    return;
  }

  if (typeof window.gtag !== "function") {
    return;
  }

  window.gtag("event", "page_view", {
    page_path: path,
    page_location: window.location.href,
    page_title: document.title,
  });
}

function sendBackendPageView(path: string) {
  if (typeof window === "undefined" || !isAnalyticsEnabled() || !shouldTrackPath(path)) {
    return;
  }

  const sessionId = getAnalyticsSessionId();

  if (!sessionId) {
    return;
  }

  void fetch(`${API_BASE_URL}/analytics/page-view`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    keepalive: true,
    body: JSON.stringify({
      sessionId,
      path,
      title: document.title,
    }),
  }).catch(() => {
    // Skip noisy console logging for best-effort analytics delivery.
  });
}

export function attachGaPageTracking(router: RouterLike) {
  if (typeof window === "undefined") {
    return () => undefined;
  }

  const { pathname, search, hash } = router.state.location;
  let lastPath = `${pathname}${search}${hash}`;
  sendBackendPageView(lastPath);

  const trackCurrentRoute = () => {
    const { pathname, search, hash } = router.state.location;
    const nextPath = `${pathname}${search}${hash}`;

    if (nextPath === lastPath) {
      return;
    }

    lastPath = nextPath;
    sendPageView(nextPath);
    sendBackendPageView(nextPath);
  };

  // Initial GA pageview is handled by gtag config in index.html when analytics is enabled.
  return router.subscribe(trackCurrentRoute);
}
