export function createGradientPlaceholder(
  title: string,
  accentFrom: string,
  accentTo: string,
) {
  const safeTitle = title.slice(0, 36);
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 700">
      <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${accentFrom}" />
          <stop offset="100%" stop-color="${accentTo}" />
        </linearGradient>
      </defs>
      <rect width="1200" height="700" rx="48" fill="#07111f" />
      <rect x="28" y="28" width="1144" height="644" rx="36" fill="url(#bg)" opacity="0.88" />
      <circle cx="1010" cy="140" r="190" fill="#ffffff" opacity="0.08" />
      <circle cx="180" cy="560" r="210" fill="#ffffff" opacity="0.08" />
      <text x="80" y="580" fill="#f8fafc" font-family="Poppins, Arial, sans-serif" font-size="72" font-weight="700">
        ${safeTitle}
      </text>
      <text x="82" y="632" fill="#e2e8f0" font-family="Poppins, Arial, sans-serif" font-size="28">
        Modern Website Admin Asset
      </text>
    </svg>
  `;

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}
