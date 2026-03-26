import { getEmailBrandName } from "./emailBranding.js";

function wrapEmailLayout({ title, preheader, bodyHtml }) {
  return `
  <div style="margin:0;padding:24px;background:#07091a;font-family:Arial,sans-serif;color:#e2e8f0;">
    <div style="max-width:640px;margin:0 auto;border:1px solid rgba(255,255,255,0.12);border-radius:16px;overflow:hidden;background:linear-gradient(180deg,#101327,#0c0f1f);">
      <div style="padding:24px 28px;border-bottom:1px solid rgba(255,255,255,0.12);">
        <p style="margin:0 0 8px 0;font-size:12px;letter-spacing:0.08em;color:#E1FE5D;">${getEmailBrandName()}</p>
        <h2 style="margin:0;font-size:24px;line-height:1.3;color:#ffffff;">${title}</h2>
        ${preheader ? `<p style="margin:8px 0 0 0;color:#94a3b8;font-size:14px;line-height:1.6;">${preheader}</p>` : ""}
      </div>
      <div style="padding:24px 28px;color:#cbd5e1;font-size:15px;line-height:1.7;">${bodyHtml}</div>
    </div>
  </div>`;
}

export function buildNewBlogAnnouncementTemplate({ blogTitle, blogUrl }) {
  return wrapEmailLayout({
    title: "New Blog Published",
    preheader: "I have published a new blog, check it out.",
    bodyHtml: `
      <p style="margin:0 0 14px 0;">A new blog is now live:</p>
      <p style="margin:0 0 20px 0;font-weight:700;color:#ffffff;">${blogTitle}</p>
      <a href="${blogUrl}" style="display:inline-block;padding:10px 16px;border-radius:10px;background:#9F74FF;color:#ffffff;text-decoration:none;font-weight:600;">Read Blog</a>
    `,
  });
}

export function buildNewProjectAnnouncementTemplate({ projectTitle, projectUrl }) {
  return wrapEmailLayout({
    title: "New Project Published",
    preheader: "I have published a new project, check it out.",
    bodyHtml: `
      <p style="margin:0 0 14px 0;">A new project has been published:</p>
      <p style="margin:0 0 20px 0;font-weight:700;color:#ffffff;">${projectTitle}</p>
      <a href="${projectUrl}" style="display:inline-block;padding:10px 16px;border-radius:10px;background:#9F74FF;color:#ffffff;text-decoration:none;font-weight:600;">View Project</a>
    `,
  });
}

export function buildClientAutoReplyTemplate({ fullName }) {
  return wrapEmailLayout({
    title: "Request Received",
    preheader: "We have received your details and will contact you soon.",
    bodyHtml: `
      <p style="margin:0 0 12px 0;">Hi ${fullName || "there"},</p>
      <p style="margin:0;">We have received your details and will contact you soon.</p>
    `,
  });
}

export function buildSubscriberWelcomeTemplate() {
  return wrapEmailLayout({
    title: "Thanks for Subscribing",
    preheader: "Thanks for Subscribing",
    bodyHtml: `
      <p style="margin:0;">Thanks for Subscribing</p>
    `,
  });
}

export function buildAdminContactNotificationTemplate({
  fullName,
  email,
  whatsappNumber,
  selectedService,
  budget,
  preferredContactMethod,
  projectDescription,
}) {
  return wrapEmailLayout({
    title: "New Client Form Submission",
    preheader: "A new project/contact request has been submitted.",
    bodyHtml: `
      <table style="width:100%;border-collapse:collapse;font-size:14px;">
        <tr><td style="padding:8px 0;color:#94a3b8;">Name</td><td style="padding:8px 0;color:#fff;">${fullName || "-"}</td></tr>
        <tr><td style="padding:8px 0;color:#94a3b8;">Email</td><td style="padding:8px 0;color:#fff;">${email || "-"}</td></tr>
        <tr><td style="padding:8px 0;color:#94a3b8;">WhatsApp</td><td style="padding:8px 0;color:#fff;">${whatsappNumber || "-"}</td></tr>
        <tr><td style="padding:8px 0;color:#94a3b8;">Service</td><td style="padding:8px 0;color:#fff;">${selectedService || "-"}</td></tr>
        <tr><td style="padding:8px 0;color:#94a3b8;">Budget</td><td style="padding:8px 0;color:#fff;">${budget || "-"}</td></tr>
        <tr><td style="padding:8px 0;color:#94a3b8;">Preferred Contact</td><td style="padding:8px 0;color:#fff;">${preferredContactMethod || "-"}</td></tr>
        <tr><td style="padding:8px 0;color:#94a3b8;vertical-align:top;">Message</td><td style="padding:8px 0;color:#fff;">${projectDescription || "-"}</td></tr>
      </table>
    `,
  });
}
