import { destroyCloudinaryImage, uploadPortfolioImage } from "../lib/cloudinary.js";
import { Portfolio } from "../models/Portfolio.js";
import { notifySubscribersAboutNewProject } from "../services/subscriberNotificationService.js";

export async function listPortfolio(_request, response, next) {
  try {
    const portfolioItems = await Portfolio.find().sort({ createdAt: -1 });
    response.json(portfolioItems);
  } catch (error) {
    next(error);
  }
}

export async function createPortfolio(request, response, next) {
  try {
    const payload = request.body || {};
    const featuredSlot =
      typeof payload.featuredSlot === "number"
        ? payload.featuredSlot
        : typeof payload.featuredPosition === "number"
          ? payload.featuredPosition
          : null;
    const incomingImageUrl = payload.imageUrl || payload.image || "";
    let finalImageUrl = incomingImageUrl;
    let publicId;

    if (incomingImageUrl.startsWith("data:image")) {
      const uploadResult = await uploadPortfolioImage(incomingImageUrl);
      finalImageUrl = uploadResult.imageUrl;
      publicId = uploadResult.publicId;
    }

    if (featuredSlot != null) {
      await Portfolio.updateMany(
        { featuredSlot },
        { $set: { featuredSlot: null } },
      );
    }

    let createdPortfolio;
    try {
      createdPortfolio = await Portfolio.create({
        title: payload.title || "",
        category: payload.category || "",
        imageUrl: finalImageUrl,
        projectLink: payload.projectLink || payload.link || undefined,
        featuredSlot,
        createdAt: new Date().toISOString(),
      });
    } catch (error) {
      if (publicId) {
        await destroyCloudinaryImage(publicId);
      }
      throw error;
    }

    try {
      await notifySubscribersAboutNewProject({
        id: createdPortfolio.id,
        title: createdPortfolio.title,
      });
    } catch (emailError) {
      console.error("Failed to send project announcement emails:", emailError);
    }

    const portfolioItems = await Portfolio.find().sort({ createdAt: -1 });
    response.status(201).json(portfolioItems);
  } catch (error) {
    next(error);
  }
}

export async function updatePortfolio(request, response, next) {
  try {
    const { portfolioId } = request.params;
    const payload = request.body || {};
    const featuredSlot =
      typeof payload.featuredSlot === "number"
        ? payload.featuredSlot
        : typeof payload.featuredPosition === "number"
          ? payload.featuredPosition
          : null;

    const updates = {
      title: payload.title || "",
      category: payload.category || "",
      projectLink: payload.projectLink || payload.link || undefined,
      featuredSlot,
    };

    if (featuredSlot != null) {
      await Portfolio.updateMany(
        { featuredSlot, _id: { $ne: portfolioId } },
        { $set: { featuredSlot: null } },
      );
    }

    const incomingImageUrl = payload.imageUrl || payload.image;
    if (incomingImageUrl) {
      if (incomingImageUrl.startsWith("data:image")) {
        const { imageUrl } = await uploadPortfolioImage(incomingImageUrl);
        updates.imageUrl = imageUrl;
      } else {
        updates.imageUrl = incomingImageUrl;
      }
    }

    await Portfolio.findByIdAndUpdate(portfolioId, updates);
    const portfolioItems = await Portfolio.find().sort({ createdAt: -1 });
    response.json(portfolioItems);
  } catch (error) {
    next(error);
  }
}

export async function deletePortfolio(request, response, next) {
  try {
    const { portfolioId } = request.params;
    await Portfolio.findByIdAndDelete(portfolioId);
    const portfolioItems = await Portfolio.find().sort({ createdAt: -1 });
    response.json(portfolioItems);
  } catch (error) {
    next(error);
  }
}
