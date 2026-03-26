const DEFAULT_EMAIL_BRAND_NAME = "Abdullah Al Faysal | Brand Identity Designer & Mockup Expert";

export const DEFAULT_RESEND_FALLBACK_ADDRESS = "onboarding@resend.dev";

export function getEmailBrandName() {
  const configuredBrandName = String(process.env.EMAIL_BRAND_NAME || "").trim();
  return configuredBrandName || DEFAULT_EMAIL_BRAND_NAME;
}

export function formatEmailSender(address = DEFAULT_RESEND_FALLBACK_ADDRESS) {
  const normalizedAddress = String(address || "").trim() || DEFAULT_RESEND_FALLBACK_ADDRESS;

  if (normalizedAddress.includes("<") && normalizedAddress.includes(">")) {
    return normalizedAddress;
  }

  return `"${getEmailBrandName()}" <${normalizedAddress}>`;
}
