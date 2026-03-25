
import { createRoot } from "react-dom/client";
import App from "./app/App.tsx";
import { router } from "./app/routes";
import { attachGaPageTracking } from "./app/lib/analytics";
import faviconUrl from "./imports/Brand_logos/favicon.svg";
import "./styles/index.css";

document.documentElement.classList.add("dark");

const existingIcon = document.querySelector<HTMLLinkElement>('link[rel="icon"]');
if (existingIcon) {
	existingIcon.href = faviconUrl;
} else {
	const faviconLink = document.createElement("link");
	faviconLink.rel = "icon";
	faviconLink.type = "image/svg+xml";
	faviconLink.href = faviconUrl;
	document.head.appendChild(faviconLink);
}

attachGaPageTracking(router);

createRoot(document.getElementById("root")!).render(<App />);
