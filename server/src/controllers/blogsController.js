import { Blog } from "../models/Blog.js";
import { notifySubscribersAboutNewBlog } from "../services/subscriberNotificationService.js";

function buildExcerpt(content) {
  const normalized = String(content || "").trim().replace(/\s+/g, " ");
  return normalized.length > 110 ? `${normalized.slice(0, 110)}...` : normalized;
}

export async function listBlogs(_request, response, next) {
  try {
    const blogs = await Blog.find().sort({ publishedAt: -1 });
    response.json(blogs);
  } catch (error) {
    next(error);
  }
}

export async function createBlog(request, response, next) {
  try {
    const payload = request.body || {};
    const blog = await Blog.create({
      title: payload.title || "",
      slug: payload.slug || "",
      category: payload.category || "Uncategorized",
      content: payload.content || "",
      excerpt: buildExcerpt(payload.content),
      thumbnail: payload.thumbnail || "",
      publishedAt: new Date().toISOString(),
      status: payload.status || "Draft",
    });

    if (blog.status === "Published") {
      try {
        await notifySubscribersAboutNewBlog({
          id: blog.id,
          title: blog.title,
          slug: blog.slug,
        });
      } catch (emailError) {
        console.error("Failed to send blog announcement emails:", emailError);
      }
    }

    const blogs = await Blog.find().sort({ publishedAt: -1 });
    response.status(201).json(blogs);
  } catch (error) {
    next(error);
  }
}

export async function updateBlog(request, response, next) {
  try {
    const payload = request.body || {};
    const { blogId } = request.params;
    const existingBlog = await Blog.findById(blogId);

    if (!existingBlog) {
      response.status(404).json({ message: "Blog not found." });
      return;
    }

    const previousStatus = existingBlog.status;
    const nextStatus = payload.status || previousStatus || "Draft";
    const publishedAt =
      nextStatus === "Published"
        ? existingBlog.publishedAt || new Date().toISOString()
        : existingBlog.publishedAt || new Date().toISOString();

    const updatedBlog = await Blog.findByIdAndUpdate(
      blogId,
      {
        title: payload.title || "",
        slug: payload.slug || "",
        category: payload.category || existingBlog.category || "Uncategorized",
        content: payload.content || "",
        excerpt: buildExcerpt(payload.content),
        thumbnail: payload.thumbnail || "",
        status: nextStatus,
        publishedAt,
      },
      { new: true },
    );

    if (previousStatus !== "Published" && nextStatus === "Published" && updatedBlog) {
      try {
        await notifySubscribersAboutNewBlog({
          id: updatedBlog.id,
          title: updatedBlog.title,
          slug: updatedBlog.slug,
        });
      } catch (emailError) {
        console.error("Failed to send blog announcement emails:", emailError);
      }
    }

    const blogs = await Blog.find().sort({ publishedAt: -1 });
    response.json(blogs);
  } catch (error) {
    next(error);
  }
}

export async function deleteBlog(request, response, next) {
  try {
    const { blogId } = request.params;
    await Blog.findByIdAndDelete(blogId);

    const blogs = await Blog.find().sort({ publishedAt: -1 });
    response.json(blogs);
  } catch (error) {
    next(error);
  }
}
