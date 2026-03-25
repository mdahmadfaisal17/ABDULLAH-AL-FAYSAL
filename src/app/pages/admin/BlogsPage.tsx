import { useMemo, useState, type FormEvent } from "react";
import { useSearchParams } from "react-router";
import Cropper from "react-easy-crop";
import type { Area } from "react-easy-crop";
import { PencilLine, Plus, Trash2 } from "lucide-react";
import { EmptyState } from "../../components/admin/EmptyState";
import { EntityDialog } from "../../components/admin/EntityDialog";
import { FormField } from "../../components/admin/FormField";
import { PageHeader } from "../../components/admin/PageHeader";
import { SectionCard } from "../../components/admin/SectionCard";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import { useAdminData } from "../../context/AdminDataContext";
import { formatLongDate } from "../../lib/date";
import { readFileAsDataUrl } from "../../lib/file";
import type { BlogFormValues, BlogPost } from "../../types/admin";

const emptyBlogForm: BlogFormValues = {
  title: "",
  slug: "",
  category: "",
  content: "",
  thumbnail: "",
  status: "Draft",
};

async function getCroppedImg(imageSrc: string, pixelCrop: Area): Promise<string> {
  const image = new Image();
  image.src = imageSrc;
  await new Promise<void>((resolve) => {
    image.onload = () => resolve();
  });

  const canvas = document.createElement("canvas");
  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;

  const context = canvas.getContext("2d");
  if (!context) {
    throw new Error("Unable to crop the selected image.");
  }

  context.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height,
  );

  return canvas.toDataURL("image/jpeg", 0.92);
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function BlogsPage() {
  const { blogs, addBlog, updateBlog, deleteBlog } = useAdminData();
  const [searchParams] = useSearchParams();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState<BlogPost | null>(null);
  const [formValues, setFormValues] = useState<BlogFormValues>(emptyBlogForm);
  const [formError, setFormError] = useState("");
  const [rawThumbnail, setRawThumbnail] = useState("");
  const [isCropping, setIsCropping] = useState(false);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

  const dialogTitle = useMemo(
    () => (editingBlog ? "Edit Blog Post" : "Add New Blog"),
    [editingBlog],
  );
  const searchQuery = (searchParams.get("q") ?? "").trim().toLowerCase();
  const filteredBlogs = useMemo(() => {
    if (!searchQuery) {
      return blogs;
    }

    return blogs.filter((blog) =>
      [blog.title, blog.category, blog.slug, blog.excerpt, blog.content].some((field) =>
        field.toLowerCase().includes(searchQuery),
      ),
    );
  }, [blogs, searchQuery]);

  const openCreateDialog = () => {
    setEditingBlog(null);
    setFormValues(emptyBlogForm);
    setFormError("");
    setRawThumbnail("");
    setIsCropping(false);
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    setCroppedAreaPixels(null);
    setIsDialogOpen(true);
  };

  const openEditDialog = (blog: BlogPost) => {
    setEditingBlog(blog);
    setFormValues({
      title: blog.title,
      slug: blog.slug,
      category: blog.category || "",
      content: blog.content,
      thumbnail: blog.thumbnail,
      status: blog.status,
    });
    setFormError("");
    setRawThumbnail(blog.thumbnail);
    setIsCropping(false);
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    setCroppedAreaPixels(null);
    setIsDialogOpen(true);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!formValues.thumbnail) {
      setFormError("Please upload a thumbnail image before saving the blog.");
      return;
    }

    try {
      if (editingBlog) {
        await updateBlog(editingBlog.id, formValues);
      } else {
        await addBlog(formValues);
      }

      setIsDialogOpen(false);
      setEditingBlog(null);
      setFormValues(emptyBlogForm);
      setFormError("");
      setRawThumbnail("");
      setIsCropping(false);
      setCrop({ x: 0, y: 0 });
      setZoom(1);
      setCroppedAreaPixels(null);
    } catch (error) {
      console.error("Blog save failed.", error);
      setFormError("Failed to save the blog post. Please try again.");
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Content"
        title="Blog Management"
        description="Create, update, and remove blog posts with a reusable form modal. Uploads are stored as local mock data so the UI stays interactive without a backend."
        actions={
          <Button
            type="button"
            onClick={openCreateDialog}
            className="h-11 rounded-2xl bg-[#E1FE5D] px-5 text-[#07091a] hover:bg-[#d4f15a]"
          >
            <Plus className="h-4 w-4" />
            Add New Blog
          </Button>
        }
      />

      <SectionCard
        title="All Blog Posts"
        description={
          searchQuery
            ? `Showing ${filteredBlogs.length} result${filteredBlogs.length === 1 ? "" : "s"} for \"${searchQuery}\".`
            : "Blog changes are persisted locally in the browser so you can test the management workflow."
        }
      >
        {blogs.length === 0 ? (
          <EmptyState
            title="No blog posts available"
            description="Use the add button to create your first post and preview how the CMS workflow feels."
          />
        ) : filteredBlogs.length === 0 ? (
          <EmptyState
            title="No matching blog posts"
            description="Try a different keyword or clear the search to see every post again."
          />
        ) : (
          <div className="space-y-4 p-5">
            {filteredBlogs.map((blog) => (
              <article
                key={blog.id}
                className="group overflow-hidden rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] shadow-[0_24px_60px_rgba(0,0,0,0.18)] transition-all duration-200 hover:border-white/20 hover:bg-[linear-gradient(180deg,rgba(255,255,255,0.075),rgba(255,255,255,0.03))]"
              >
                <div className="grid gap-0 lg:grid-cols-[280px_minmax(0,1fr)_220px]">
                  <div className="relative overflow-hidden border-b border-white/10 lg:border-r lg:border-b-0">
                    <img
                      src={blog.thumbnail}
                      alt={blog.title}
                      className="h-56 w-full object-cover transition-transform duration-500 group-hover:scale-[1.03] lg:h-full"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent,rgba(7,9,26,0.14))]" />
                  </div>

                  <div className="flex min-w-0 flex-col justify-between p-6 lg:p-7">
                    <div>
                      <div className="mb-4 flex flex-wrap items-center gap-2">
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-medium ${
                            blog.status === "Published"
                              ? "border border-emerald-400/20 bg-emerald-400/10 text-emerald-200"
                              : "border border-amber-400/20 bg-amber-400/10 text-amber-200"
                          }`}
                        >
                          {blog.status}
                        </span>
                        <span className="rounded-full border border-[#9F74FF]/30 bg-[#9F74FF]/10 px-3 py-1 text-xs font-medium text-[#d8c8ff]">
                          {blog.category || "Uncategorized"}
                        </span>
                      </div>

                      <h3 className="max-w-2xl text-xl font-semibold leading-tight text-white lg:text-2xl">
                        {blog.title}
                      </h3>

                      <p className="mt-3 line-clamp-3 max-w-3xl text-sm leading-7 text-slate-300 lg:text-[15px]">
                        {blog.excerpt}
                      </p>
                    </div>

                    <div className="mt-6 space-y-3">
                      <div>
                        <p className="text-[11px] font-medium uppercase tracking-[0.24em] text-slate-500">
                          Slug
                        </p>
                        <p className="mt-1 break-all text-sm text-slate-300">
                          {blog.slug}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col justify-between border-t border-white/10 bg-white/[0.02] p-6 lg:border-t-0 lg:border-l lg:border-white/10 lg:p-7">
                    <div>
                      <p className="text-[11px] font-medium uppercase tracking-[0.24em] text-slate-500">
                        Published
                      </p>
                      <p className="mt-2 text-sm text-slate-200 lg:text-base">
                        {formatLongDate(blog.publishedAt)}
                      </p>
                    </div>

                    <div className="mt-6 flex flex-col gap-3">
                      <Button
                        type="button"
                        variant="outline"
                        className="h-11 justify-center rounded-2xl border-white/10 bg-white/5 text-slate-100 hover:bg-white/10"
                        onClick={() => openEditDialog(blog)}
                      >
                        <PencilLine className="h-4 w-4" />
                        Edit Post
                      </Button>
                      <Button
                        type="button"
                        variant="ghost"
                        className="h-11 justify-center rounded-2xl border border-red-400/10 bg-red-500/5 text-red-200 hover:bg-red-500/10"
                        onClick={async () => {
                          if (window.confirm(`Delete "${blog.title}"?`)) {
                            try {
                              await deleteBlog(blog.id);
                            } catch (error) {
                              console.error("Blog delete failed.", error);
                            }
                          }
                        }}
                      >
                        <Trash2 className="h-4 w-4" />
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </SectionCard>

      <EntityDialog
        open={isDialogOpen}
        onOpenChange={(open) => {
          setIsDialogOpen(open);
          if (!open) {
            setEditingBlog(null);
            setFormError("");
            setRawThumbnail("");
            setIsCropping(false);
            setCrop({ x: 0, y: 0 });
            setZoom(1);
            setCroppedAreaPixels(null);
          }
        }}
        title={dialogTitle}
        description="Fill in the blog details below. Uploads are kept as local preview data for now."
        size="wide"
      >
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="grid gap-5 md:grid-cols-2">
            <FormField label="Title" htmlFor="blog-title">
              <Input
                id="blog-title"
                value={formValues.title}
                onChange={(event) => {
                  const nextTitle = event.target.value;
                  setFormValues((current) => ({
                    ...current,
                    title: nextTitle,
                    slug:
                      current.slug === "" || current.slug === slugify(current.title)
                        ? slugify(nextTitle)
                        : current.slug,
                  }));
                }}
                className="h-11 rounded-2xl border-white/10 bg-white/5 text-slate-100"
                placeholder="Enter blog title"
                required
              />
            </FormField>

            <FormField
              label="Slug"
              htmlFor="blog-slug"
              hint="Auto-generated from the title, but you can edit it manually."
            >
              <Input
                id="blog-slug"
                value={formValues.slug}
                onChange={(event) =>
                  setFormValues((current) => ({
                    ...current,
                    slug: slugify(event.target.value),
                  }))
                }
                className="h-11 rounded-2xl border-white/10 bg-white/5 text-slate-100"
                placeholder="blog-post-slug"
                required
              />
            </FormField>
          </div>

          <FormField
            label="Category"
            htmlFor="blog-category"
            hint="Enter a category like Branding, Design, Development, etc."
          >
            <Input
              id="blog-category"
              value={formValues.category}
              onChange={(event) =>
                setFormValues((current) => ({
                  ...current,
                  category: event.target.value,
                }))
              }
              className="h-11 rounded-2xl border-white/10 bg-white/5 text-slate-100"
              placeholder="e.g. Branding, Design, Development"
              required
            />
          </FormField>

          <FormField
            label="Publishing"
            htmlFor="blog-status"
            hint="Choose whether this post stays in draft or becomes published when you save changes."
          >
            <select
              id="blog-status"
              value={formValues.status}
              onChange={(event) =>
                setFormValues((current) => ({
                  ...current,
                  status: event.target.value as BlogFormValues["status"],
                }))
              }
              className="h-11 w-full rounded-2xl border border-white/10 bg-white/5 px-3 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#9F74FF]/40"
            >
              <option value="Draft" className="bg-slate-900 text-slate-100">Draft</option>
              <option value="Published" className="bg-slate-900 text-slate-100">Published</option>
            </select>
          </FormField>

          <FormField
            label="Content"
            htmlFor="blog-content"
            hint="This is mock CMS content, so plain text is enough for now."
          >
            <Textarea
              id="blog-content"
              value={formValues.content}
              onChange={(event) =>
                setFormValues((current) => ({
                  ...current,
                  content: event.target.value,
                }))
              }
              className="min-h-44 rounded-3xl border-white/10 bg-white/5 text-slate-100"
              placeholder="Write the blog content here..."
              required
            />
          </FormField>

          <FormField
            label="Thumbnail Upload"
            htmlFor="blog-thumbnail"
            hint="Recommended size: 1200x675px (16:9 ratio). JPG or PNG. Upload an image, then crop it before saving."
          >
            <Input
              id="blog-thumbnail"
              type="file"
              accept="image/*"
              className="h-11 rounded-2xl border-white/10 bg-white/5 text-slate-100 file:text-slate-100"
              onChange={async (event) => {
                const file = event.target.files?.[0];

                if (!file) {
                  return;
                }

                const imageDataUrl = await readFileAsDataUrl(file);
                setRawThumbnail(imageDataUrl);
                setCrop({ x: 0, y: 0 });
                setZoom(1);
                setCroppedAreaPixels(null);
                setIsCropping(true);
                setFormValues((current) => ({
                  ...current,
                  thumbnail: "",
                }));
              }}
            />
          </FormField>

          {isCropping && rawThumbnail ? (
            <div className="overflow-hidden rounded-[1.5rem] border border-white/10 bg-black/40">
              <p className="px-5 pt-4 pb-2 text-xs text-slate-400">
                Drag to reposition · Scroll or use slider to zoom · 16:9 ratio
              </p>
              <div className="relative h-72">
                <Cropper
                  image={rawThumbnail}
                  crop={crop}
                  zoom={zoom}
                  aspect={16 / 9}
                  onCropChange={setCrop}
                  onZoomChange={setZoom}
                  onCropComplete={(_, pixels) => setCroppedAreaPixels(pixels)}
                  style={{
                    containerStyle: { borderRadius: "0" },
                    cropAreaStyle: {
                      border: "2px solid #E1FE5D",
                      boxShadow: "0 0 0 9999px rgba(0,0,0,0.55)",
                    },
                  }}
                />
              </div>
              <div className="flex items-center gap-3 border-t border-white/10 px-5 py-3">
                <span className="shrink-0 text-xs text-slate-400">Zoom</span>
                <input
                  type="range"
                  min={1}
                  max={3}
                  step={0.05}
                  value={zoom}
                  onChange={(event) => setZoom(Number(event.target.value))}
                  className="h-1 flex-1 accent-[#E1FE5D]"
                />
                <span className="w-8 shrink-0 text-right text-xs text-slate-400">
                  {zoom.toFixed(1)}x
                </span>
              </div>
              <div className="flex items-center justify-between gap-3 border-t border-white/10 px-5 pt-3 pb-4">
                <button
                  type="button"
                  className="text-sm text-slate-400 transition-colors hover:text-slate-200"
                  onClick={() => {
                    setIsCropping(false);
                    setFormValues((current) => ({
                      ...current,
                      thumbnail: rawThumbnail,
                    }));
                  }}
                >
                  Skip crop
                </button>
                <button
                  type="button"
                  className="rounded-2xl bg-[#E1FE5D] px-5 py-2 text-sm font-semibold text-[#07091a] transition-colors hover:bg-[#d4f15a] disabled:opacity-50"
                  disabled={!croppedAreaPixels}
                  onClick={async () => {
                    if (!croppedAreaPixels) {
                      return;
                    }

                    const croppedImage = await getCroppedImg(rawThumbnail, croppedAreaPixels);
                    setFormValues((current) => ({
                      ...current,
                      thumbnail: croppedImage,
                    }));
                    setIsCropping(false);
                  }}
                >
                  Crop &amp; Use
                </button>
              </div>
            </div>
          ) : formValues.thumbnail ? (
            <div className="overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/5">
              <img
                src={formValues.thumbnail}
                alt="Blog thumbnail preview"
                className="h-56 w-full object-cover"
              />
              <div className="flex justify-between border-t border-white/10 px-4 py-3">
                <Button
                  type="button"
                  variant="ghost"
                  className="rounded-2xl border border-white/10 bg-white/5 px-4 text-sm text-slate-300 hover:bg-white/10"
                  onClick={() => {
                    setCrop({ x: 0, y: 0 });
                    setZoom(1);
                    setRawThumbnail(formValues.thumbnail);
                    setIsCropping(true);
                  }}
                >
                  Re-crop
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  className="rounded-2xl border border-red-400/15 bg-red-500/5 px-4 text-sm text-red-300 hover:bg-red-500/10"
                  onClick={() => {
                    setFormValues((current) => ({
                      ...current,
                      thumbnail: "",
                    }));
                    setRawThumbnail("");
                    setIsCropping(false);
                    const input = document.getElementById("blog-thumbnail") as HTMLInputElement | null;
                    if (input) {
                      input.value = "";
                    }
                  }}
                >
                  Remove Image
                </Button>
              </div>
            </div>
          ) : null}

          {formError ? (
            <div className="rounded-2xl border border-red-400/20 bg-red-500/10 px-4 py-3 text-sm text-red-200">
              {formError}
            </div>
          ) : null}

          <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:justify-end">
            <Button
              type="button"
              variant="outline"
              className="rounded-2xl border-white/10 bg-white/5 text-slate-100 hover:bg-white/10"
              onClick={() => setIsDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="rounded-2xl bg-[#E1FE5D] text-[#07091a] hover:bg-[#d4f15a]"
            >
              {editingBlog ? "Save Changes" : "Create Blog"}
            </Button>
          </div>
        </form>
      </EntityDialog>
    </div>
  );
}
