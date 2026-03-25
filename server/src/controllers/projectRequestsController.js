import { ProjectRequest } from "../models/ProjectRequest.js";
import {
  buildAdminContactNotificationTemplate,
  buildClientAutoReplyTemplate,
} from "../utils/emailTemplates.js";
import { sendEmail } from "../utils/emailService.js";

export async function listProjectRequests(_request, response, next) {
  try {
    const projectRequests = await ProjectRequest.find().sort({ date: -1 });
    response.json(projectRequests);
  } catch (error) {
    next(error);
  }
}

export async function createProjectRequest(request, response, next) {
  try {
    const payload = request.body || {};

    const projectRequest = await ProjectRequest.create({
      fullName: payload.fullName || "",
      email: payload.email || "",
      whatsappNumber: payload.whatsappNumber || "",
      selectedService: payload.selectedService || "",
      budget: payload.budget || "",
      preferredContactMethod: payload.preferredContactMethod || "",
      projectDescription: payload.projectDescription || "",
      date: new Date(),
    });

    if (projectRequest.email) {
      try {
        await sendEmail({
          to: projectRequest.email,
          subject: "We received your details",
          html: buildClientAutoReplyTemplate({
            fullName: projectRequest.fullName,
          }),
        });
      } catch (emailError) {
        console.error("Failed to send client auto-reply email:", emailError);
      }
    }

    const adminEmail = process.env.ADMIN_EMAIL;
    if (adminEmail) {
      try {
        await sendEmail({
          to: adminEmail,
          subject: `New client form submission from ${projectRequest.fullName || "Unknown"}`,
          html: buildAdminContactNotificationTemplate({
            fullName: projectRequest.fullName,
            email: projectRequest.email,
            whatsappNumber: projectRequest.whatsappNumber,
            selectedService: projectRequest.selectedService,
            budget: projectRequest.budget,
            preferredContactMethod: projectRequest.preferredContactMethod,
            projectDescription: projectRequest.projectDescription,
          }),
        });
      } catch (emailError) {
        console.error("Failed to send admin notification email:", emailError);
      }
    }

    response.status(201).json(projectRequest);
  } catch (error) {
    next(error);
  }
}
