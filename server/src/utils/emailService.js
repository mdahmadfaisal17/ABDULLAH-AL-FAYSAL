import { Resend } from "resend";

let resendClient;

function getResendClient() {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    throw new Error("RESEND_API_KEY is not configured.");
  }

  if (!resendClient) {
    resendClient = new Resend(apiKey);
  }

  return resendClient;
}

function getDefaultFromAddress() {
  return process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";
}

export async function sendEmail({ to, subject, html, from }) {
  const client = getResendClient();
  const sender = from || getDefaultFromAddress();

  const attemptSend = async (fromAddress) => {
    const result = await client.emails.send({
      from: fromAddress,
      to: Array.isArray(to) ? to : [to],
      subject,
      html,
    });

    if (result.error) {
      throw new Error(result.error.message || "Failed to send email through Resend.");
    }

    return result.data;
  };

  try {
    return await attemptSend(sender);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    const isDomainNotVerified = /domain is not verified/i.test(message);
    const isAlreadyUsingDevSender = sender.toLowerCase().includes("onboarding@resend.dev");

    if (isDomainNotVerified && !isAlreadyUsingDevSender) {
      console.warn("Primary sender domain is not verified. Retrying with onboarding@resend.dev.");
      return attemptSend("onboarding@resend.dev");
    }

    throw error;
  }
}

export async function sendBulkEmail({ recipients, subject, html, from }) {
  if (!Array.isArray(recipients) || recipients.length === 0) {
    return { sent: 0, failed: 0 };
  }

  const settled = await Promise.allSettled(
    recipients.map((email) => sendEmail({ to: email, subject, html, from })),
  );

  const sent = settled.filter((result) => result.status === "fulfilled").length;
  const failed = settled.length - sent;

  if (failed > 0) {
    console.warn(`Email delivery completed with partial failures: ${failed}/${settled.length}`);
  }

  return { sent, failed };
}
