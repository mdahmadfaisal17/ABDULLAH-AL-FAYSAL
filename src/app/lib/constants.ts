export const STORAGE_KEYS = {
  blogs: "modern-website-admin-blogs",
  portfolio: "modern-website-admin-portfolio",
} as const;

export function createEntityId(prefix: string) {
  const uniquePart =
    globalThis.crypto?.randomUUID?.() ??
    `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;

  return `${prefix}-${uniquePart}`;
}
