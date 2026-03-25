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

function sendPageView(path: string) {
  if (typeof window === "undefined") {
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

export function attachGaPageTracking(router: RouterLike) {
  if (typeof window === "undefined") {
    return () => undefined;
  }

  const { pathname, search, hash } = router.state.location;
  let lastPath = `${pathname}${search}${hash}`;

  const trackCurrentRoute = () => {
    const { pathname, search, hash } = router.state.location;
    const nextPath = `${pathname}${search}${hash}`;

    if (nextPath === lastPath) {
      return;
    }

    lastPath = nextPath;
    sendPageView(nextPath);
  };

  // Initial pageview is handled by gtag config in index.html.
  return router.subscribe(trackCurrentRoute);
}
