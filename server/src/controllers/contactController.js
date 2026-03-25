import { ProjectRequest } from "../models/ProjectRequest.js";
import {
  buildAdminContactNotificationTemplate,
  buildClientAutoReplyTemplate,
} from "../utils/emailTemplates.js";
import { sendEmail } from "../utils/emailService.js";

export async function submitContactForm(request, response, next) {
  try {
    const payload = request.body || {};
    const fullName = String(payload.name || payload.fullName || "").trim();
    const email = String(payload.email || "").trim();
    const projectDescription = String(payload.message || payload.projectDescription || "").trim();

    if (!fullName || !email || !projectDescription) {
      response.status(400).json({
        message: "name, email, and message are required.",
      });
      return;
    }

    const projectRequest = await ProjectRequest.create({
      fullName,
      email,
      whatsappNumber: "",
      selectedService: "Contact Form",
      budget: "",
      preferredContactMethod: "Email",
      projectDescription,
      date: new Date(),
    });

    try {
      await sendEmail({
        to: email,
        subject: "We received your message",
        html: buildClientAutoReplyTemplate({ fullName }),
      });
    } catch (emailError) {
      console.error("Failed to send contact auto-reply email:", emailError);
    }

    const adminEmail = process.env.ADMIN_EMAIL;
    if (adminEmail) {
      try {
        await sendEmail({
          to: adminEmail,
          subject: `New contact form submission from ${fullName}`,
          html: buildAdminContactNotificationTemplate({
            fullName,
            email,
            whatsappNumber: "-",
            selectedService: "Contact Form",
            budget: "-",
            preferredContactMethod: "Email",
            projectDescription,
          }),
        });
      } catch (emailError) {
        console.error("Failed to send contact admin notification email:", emailError);
      }
    }

    response.status(201).json({
      message: "Contact form submitted successfully.",
      submissionId: projectRequest.id,
    });
  } catch (error) {
    next(error);
  }
}
