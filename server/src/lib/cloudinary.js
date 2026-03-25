import { configureCloudinary } from "../config/cloudinary.js";

function isBase64DataUrl(value) {
  return typeof value === "string" && value.startsWith("data:image/");
}

export async function uploadPortfolioImage(image) {
  if (!image) {
    return { imageUrl: "", publicId: undefined };
  }

  if (!isBase64DataUrl(image)) {
    return { imageUrl: image, publicId: undefined };
  }

  const cloudinary = configureCloudinary();
  const result = await cloudinary.uploader.upload(image, {
    folder: "modern-website/portfolio",
    resource_type: "image",
  });

  return {
    imageUrl: result.secure_url,
    publicId: result.public_id,
  };
}

export async function destroyCloudinaryImage(publicId) {
  if (!publicId) {
    return;
  }

  const cloudinary = configureCloudinary();
  await cloudinary.uploader.destroy(publicId, {
    resource_type: "image",
  });
}
