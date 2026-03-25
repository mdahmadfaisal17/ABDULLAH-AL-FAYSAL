import { Subscriber } from "../models/Subscriber.js";
import {
  buildNewBlogAnnouncementTemplate,
  buildNewProjectAnnouncementTemplate,
} from "../utils/emailTemplates.js";
import { sendBulkEmail } from "../utils/emailService.js";

async function getActiveSubscriberEmails() {
  const subscribers = await Subscriber.find({ status: "Active" }).select("email");
  return subscribers
    .map((subscriber) => subscriber.email)
    .filter(Boolean);
}

export async function notifySubscribersAboutNewBlog({ title, slug, id }) {
  const recipients = await getActiveSubscriberEmails();

  if (recipients.length === 0) {
    return;
  }

  const websiteBaseUrl = process.env.WEBSITE_BASE_URL || process.env.CLIENT_URL || "http://localhost:5173";
  const blogPath = slug ? `/blog/${slug}` : `/blog/${id}`;
  const blogUrl = `${websiteBaseUrl.replace(/\/$/, "")}${blogPath}`;

  const html = buildNewBlogAnnouncementTemplate({
    blogTitle: title,
    blogUrl,
  });

  await sendBulkEmail({
    recipients,
    subject: `New blog published: ${title}`,
    html,
  });
}

export async function notifySubscribersAboutNewProject({ title, id }) {
  const recipients = await getActiveSubscriberEmails();

  if (recipients.length === 0) {
    return;
  }

  const websiteBaseUrl = process.env.WEBSITE_BASE_URL || process.env.CLIENT_URL || "http://localhost:5173";
  const projectUrl = `${websiteBaseUrl.replace(/\/$/, "")}/portfolio#${id || "latest"}`;

  const html = buildNewProjectAnnouncementTemplate({
    projectTitle: title,
    projectUrl,
  });

  await sendBulkEmail({
    recipients,
    subject: `New project published: ${title}`,
    html,
  });
}
