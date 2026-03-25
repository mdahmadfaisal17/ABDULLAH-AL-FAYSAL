import { Subscriber } from "../models/Subscriber.js";
import { buildSubscriberWelcomeTemplate } from "../utils/emailTemplates.js";
import { sendEmail } from "../utils/emailService.js";

async function sendSubscriptionConfirmation(email) {
  const emailDelivery = {
    sent: false,
    error: null,
  };

  try {
    await sendEmail({
      to: email,
      subject: "Thanks for Subscribing",
      html: buildSubscriberWelcomeTemplate(),
    });
    emailDelivery.sent = true;
  } catch (emailError) {
    console.error("Failed to send subscriber welcome email:", emailError);
    emailDelivery.error =
      emailError instanceof Error ? emailError.message : "Unknown email delivery error.";
  }

  return emailDelivery;
}

export async function listSubscribers(_request, response, next) {
  try {
    const subscribers = await Subscriber.find().sort({ subscribedAt: -1 });
    response.json(subscribers);
  } catch (error) {
    next(error);
  }
}

export async function createSubscriber(request, response, next) {
  try {
    const payload = request.body || {};
    const normalizedEmail = String(payload.email || "").trim().toLowerCase();

    if (!normalizedEmail) {
      response.status(400).json({ message: "Email is required." });
      return;
    }

    const existing = await Subscriber.findOne({ email: normalizedEmail });

    if (existing) {
      if (existing.status !== "Active") {
        existing.status = "Active";
      }
      if (payload.source) {
        existing.source = payload.source;
      }
      await existing.save();
      const responsePayload = existing.toJSON();
      responsePayload.emailDelivery = await sendSubscriptionConfirmation(existing.email);
      response.status(200).json(responsePayload);
      return;
    }

    const subscriber = await Subscriber.create({
      email: normalizedEmail,
      source: payload.source || "Website Footer",
      subscribedAt: new Date(),
      status: "Active",
    });

    const responsePayload = subscriber.toJSON();
    responsePayload.emailDelivery = await sendSubscriptionConfirmation(subscriber.email);

    response.status(201).json(responsePayload);
  } catch (error) {
    next(error);
  }
}
