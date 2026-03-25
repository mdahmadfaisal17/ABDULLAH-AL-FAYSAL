import { useMemo, useState, type FormEvent } from "react";
import { useSearchParams } from "react-router";
import Cropper from "react-easy-crop";
import type { Area } from "react-easy-crop";
import { Plus, Trash2, Edit2 } from "lucide-react";
import { EmptyState } from "../../components/admin/EmptyState";
import { EntityDialog } from "../../components/admin/EntityDialog";
import { FormField } from "../../components/admin/FormField";
import { PageHeader } from "../../components/admin/PageHeader";
import { SectionCard } from "../../components/admin/SectionCard";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import { Textarea } from "../../components/ui/textarea";
import { useAdminData } from "../../context/AdminDataContext";
import { formatLongDate } from "../../lib/date";
import { readFileAsDataUrl } from "../../lib/file";
import type { PortfolioFormValues, PortfolioItem } from "../../types/admin";

async function getCroppedImg(imageSrc: string, pixelCrop: Area): Promise<string> {
  const image = new Image();
  image.src = imageSrc;
  await new Promise<void>((resolve) => { image.onload = () => resolve(); });
  const canvas = document.createElement("canvas");
  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;
  const ctx = canvas.getContext("2d")!;
  ctx.drawImage(image, pixelCrop.x, pixelCrop.y, pixelCrop.width, pixelCrop.height, 0, 0, pixelCrop.width, pixelCrop.height);
  return canvas.toDataURL("image/jpeg", 0.92);
}

const emptyPortfolioForm: PortfolioFormValues = {
  title: "",
  image: "",
  category: "",
  description: "",
  link: "",
  featuredPosition: null,
};

export function PortfolioPage() {
  const { portfolioItems, addPortfolioItem, updatePortfolioItem, deletePortfolioItem } = useAdminData();
  const [searchParams] = useSearchParams();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  const [formValues, setFormValues] =
    useState<PortfolioFormValues>(emptyPortfolioForm);
  const [formError, setFormError] = useState("");
  const [rawImage, setRawImage] = useState("");
  const [isCropping, setIsCropping] = useState(false);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

  // Map of slot -> item title that currently occupies it (excluding the item being edited)
  const takenSlots = portfolioItems.reduce<Record<number, string>>((acc, item) => {
    if (item.featuredPosition != null && item.id !== editingItemId) acc[item.featuredPosition] = item.title;
    return acc;
  }, {});

  const selectedSlotOwner =
    formValues.featuredPosition != null
      ? takenSlots[formValues.featuredPosition]
      : null;
  const searchQuery = (searchParams.get("q") ?? "").trim().toLowerCase();
  const filteredPortfolioItems = useMemo(() => {
    if (!searchQuery) {
      return portfolioItems;
    }

    return portfolioItems.filter((item) =>
      [
        item.title,
        item.category,
        item.description,
        item.link || item.projectLink || "",
        item.featuredPosition != null ? `slot ${item.featuredPosition}` : "",
      ].some((field) => field.toLowerCase().includes(searchQuery)),
    );
  }, [portfolioItems, searchQuery]);

  const openAddDialog = () => {
    setEditingItemId(null);
    setFormValues(emptyPortfolioForm);
    setFormError("");
    setRawImage("");
    setIsCropping(false);
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    setCroppedAreaPixels(null);
    setIsDialogOpen(true);
  };

  const openEditDialog = (item: PortfolioItem) => {
    setEditingItemId(item.id || item._id || null);
    setFormValues({
      title: item.title,
      image: item.imageUrl || item.image,
      category: item.category,
      description: item.description,
      link: item.link || "",
      featuredPosition: item.featuredPosition,
    });
    setFormError("");
    setRawImage("");
    setIsCropping(false);
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    setCroppedAreaPixels(null);
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setEditingItemId(null);
    setFormError("");
    setRawImage("");
    setIsCropping(false);
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    setCroppedAreaPixels(null);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // For new items, image is required. For edits, it's optional
    if (!editingItemId && !formValues.image) {
      setFormError("Please upload an image before saving the portfolio item.");
      return;
    }

    // Confirm slot replacement if the chosen slot is already occupied
    if (selectedSlotOwner) {
      const confirmed = window.confirm(
        `Slot ${formValues.featuredPosition} is currently assigned to "${selectedSlotOwner}".\n\nReplacing it will remove that item from the homepage slot. Continue?`
      );
      if (!confirmed) return;
    }

    try {
      if (editingItemId) {
        await updatePortfolioItem(editingItemId, formValues);
      } else {
        await addPortfolioItem(formValues);
      }
      setFormValues(emptyPortfolioForm);
      setEditingItemId(null);
      setFormError("");
      setRawImage("");
      setIsCropping(false);
      setIsDialogOpen(false);
    } catch (error) {
      console.error("Portfolio save failed.", error);
      setFormError("Failed to save the portfolio item. Please try again.");
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Showcase"
        title="Portfolio Management"
        description="Add and remove portfolio items with image previews, categories, and concise descriptions. This is structured for an easy backend handoff later."
        actions={
          <Button
            type="button"
            onClick={openAddDialog}
            className="h-11 rounded-2xl bg-[#E1FE5D] px-5 text-[#07091a] hover:bg-[#d4f15a]"
          >
            <Plus className="h-4 w-4" />
            Add Portfolio Item
          </Button>
        }
      />

      <SectionCard
        title="Portfolio Items"
        description={
          searchQuery
            ? `Showing ${filteredPortfolioItems.length} result${filteredPortfolioItems.length === 1 ? "" : "s"} for \"${searchQuery}\".`
            : "Items added here are stored locally for UI testing and future API integration."
        }
      >
        {portfolioItems.length === 0 ? (
          <EmptyState
            title="No portfolio items yet"
            description="Add a showcase item to populate the admin list and preview the management flow."
          />
        ) : filteredPortfolioItems.length === 0 ? (
          <EmptyState
            title="No matching portfolio items"
            description="Try a different keyword or clear the search to see every showcase item again."
          />
        ) : (
          <Table className="min-w-[920px]">
            <TableHeader>
              <TableRow className="border-white/10 hover:bg-transparent">
                {["Item", "Category", "Featured Slot", "Project Link", "Created", "Actions"].map(
                  (heading) => (
                    <TableHead key={heading} className="px-6 py-4 text-slate-400">
                      {heading}
                    </TableHead>
                  ),
                )}
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPortfolioItems.map((item) => {
                const portfolioId = item.id || item._id;
                return (
                <TableRow key={portfolioId || item.title} className="border-white/10 hover:bg-white/4">
                  <TableCell className="px-6 py-4 whitespace-normal">
                    <div className="flex min-w-[280px] items-center gap-4">
                      {item.imageUrl ? (
                        <img
                          src={item.imageUrl}
                          alt={item.title || "Portfolio item"}
                          className="h-16 w-24 shrink-0 rounded-2xl border border-white/10 object-cover"
                        />
                      ) : (
                        <div className="h-16 w-24 shrink-0 rounded-2xl border border-white/10 bg-white/5 flex items-center justify-center">
                          <span className="text-xs text-slate-600">No image</span>
                        </div>
                      )}
                      <p className="font-medium text-white">{item.title || "Untitled"}</p>
                    </div>
                  </TableCell>
                  <TableCell className="px-6 py-4 text-slate-300">
                    {item.category}
                  </TableCell>
                  <TableCell className="px-6 py-4">
                    {item.featuredPosition != null ? (
                      <span className="inline-flex items-center rounded-xl border border-[#9F74FF]/30 bg-[#9F74FF]/10 px-3 py-1 text-xs font-medium text-[#9F74FF]">
                        Slot {item.featuredPosition}
                      </span>
                    ) : (
                      <span className="text-slate-600 text-xs">—</span>
                    )}
                  </TableCell>
                  <TableCell className="px-6 py-4">
                    {item.link ? (
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-xl border border-[#E1FE5D]/20 bg-[#E1FE5D]/5 px-3 py-1.5 text-xs text-[#E1FE5D] transition-colors hover:bg-[#E1FE5D]/10"
                      >
                        View Project ↗
                      </a>
                    ) : (
                      <span className="text-slate-600 text-xs">No link</span>
                    )}
                  </TableCell>
                  <TableCell className="px-6 py-4 text-slate-400">
                    {formatLongDate(item.createdAt)}
                  </TableCell>
                  <TableCell className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Button
                        type="button"
                        variant="ghost"
                        className="rounded-2xl border border-[#9F74FF]/20 bg-[#9F74FF]/5 text-[#9F74FF] hover:bg-[#9F74FF]/10"
                        onClick={() => openEditDialog(item)}
                      >
                        <Edit2 className="h-4 w-4" />
                        Edit
                      </Button>
                      <Button
                        type="button"
                        variant="ghost"
                        className="rounded-2xl border border-red-400/10 bg-red-500/5 text-red-200 hover:bg-red-500/10"
                        onClick={async () => {
                          if (window.confirm(`Delete "${item.title}"?`)) {
                            try {
                              if (!portfolioId) return;
                              await deletePortfolioItem(portfolioId);
                            } catch (error) {
                              console.error("Portfolio delete failed.", error);
                            }
                          }
                        }}
                      >
                        <Trash2 className="h-4 w-4" />
                        Delete
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              );
              })}
            </TableBody>
          </Table>
        )}
      </SectionCard>

      <EntityDialog
        open={isDialogOpen}
        onOpenChange={(open) => {
          if (!open) closeDialog();
        }}
        title={editingItemId ? "Edit Portfolio Item" : "Add Portfolio Item"}
        description={editingItemId ? "Update the portfolio item details and image." : "Upload an image and provide the basic project details for the showcase list."}
        size="wide"
      >
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="grid gap-5 md:grid-cols-2">
            <FormField label="Title" htmlFor="portfolio-title">
              <Input
                id="portfolio-title"
                value={formValues.title}
                onChange={(event) =>
                  setFormValues((current) => ({
                    ...current,
                    title: event.target.value,
                  }))
                }
                className="h-11 rounded-2xl border-white/10 bg-white/5 text-slate-100"
                placeholder="Project or case study title"
                required
              />
            </FormField>

            <FormField label="Category" htmlFor="portfolio-category">
              <Input
                id="portfolio-category"
                value={formValues.category}
                onChange={(event) =>
                  setFormValues((current) => ({
                    ...current,
                    category: event.target.value,
                  }))
                }
                className="h-11 rounded-2xl border-white/10 bg-white/5 text-slate-100"
                placeholder="Corporate, Branding, Ecommerce..."
                required
              />
            </FormField>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <FormField label="Behance / Project Link" htmlFor="portfolio-link">
              <Input
                id="portfolio-link"
                type="url"
                value={formValues.link}
                onChange={(event) =>
                  setFormValues((current) => ({
                    ...current,
                    link: event.target.value,
                  }))
                }
                className="h-11 rounded-2xl border-white/10 bg-white/5 text-slate-100"
                placeholder="https://www.behance.net/gallery/..."
              />
            </FormField>

            <FormField label="Featured Position" htmlFor="portfolio-featured">
              <select
                id="portfolio-featured"
                value={formValues.featuredPosition ?? ""}
                onChange={(event) =>
                  setFormValues((current) => ({
                    ...current,
                    featuredPosition: event.target.value === "" ? null : Number(event.target.value),
                  }))
                }
                className={`h-11 w-full rounded-2xl border px-3 text-sm text-slate-100 focus:outline-none focus:ring-2 ${
                  selectedSlotOwner
                    ? "border-amber-400/40 bg-amber-500/5 focus:ring-amber-400/30"
                    : "border-white/10 bg-white/5 focus:ring-[#9F74FF]/40"
                }`}
              >
                <option value="" className="bg-slate-900 text-slate-300">None</option>
                {[1, 2, 3, 4].map((slot) => {
                  const owner = takenSlots[slot];
                  return (
                    <option key={slot} value={slot} className="bg-slate-900 text-slate-100">
                      {owner ? `Slot ${slot} — Taken by "${owner}"` : `Slot ${slot} — Homepage Card ${slot}`}
                    </option>
                  );
                })}
              </select>
              {selectedSlotOwner && (
                <p className="mt-2 flex items-start gap-1.5 text-xs text-amber-400">
                  <span>⚠️</span>
                  <span>
                    Slot {formValues.featuredPosition} is taken by <strong>&ldquo;{selectedSlotOwner}&rdquo;</strong>.
                    Saving will replace it and remove that item from the homepage slot.
                  </span>
                </p>
              )}
            </FormField>
          </div>

          <FormField
            label="Image Upload"
            htmlFor="portfolio-image"
            hint="Recommended size: 800×500px (8:5 ratio). JPG or PNG. The selected image will be converted to a local preview for this mock admin UI."
          >
            <Input
              id="portfolio-image"
              type="file"
              accept="image/*"
              className="h-11 rounded-2xl border-white/10 bg-white/5 text-slate-100 file:text-slate-100"
              onChange={async (event) => {
                const file = event.target.files?.[0];
                if (!file) return;
                const imageDataUrl = await readFileAsDataUrl(file);
                setRawImage(imageDataUrl);
                setCrop({ x: 0, y: 0 });
                setZoom(1);
                setCroppedAreaPixels(null);
                setIsCropping(true);
                setFormValues((current) => ({ ...current, image: "" }));
              }}
            />
          </FormField>

          {isCropping && rawImage ? (
            <div className="rounded-[1.5rem] border border-white/10 bg-black/40 overflow-hidden">
              <p className="px-5 pt-4 pb-2 text-xs text-slate-400">Drag to reposition · Scroll or use slider to zoom · 8:5 ratio</p>
              <div className="relative h-72">
                <Cropper
                  image={rawImage}
                  crop={crop}
                  zoom={zoom}
                  aspect={8 / 5}
                  onCropChange={setCrop}
                  onZoomChange={setZoom}
                  onCropComplete={(_, pixels) => setCroppedAreaPixels(pixels)}
                  style={{
                    containerStyle: { borderRadius: "0" },
                    cropAreaStyle: { border: "2px solid #E1FE5D", boxShadow: "0 0 0 9999px rgba(0,0,0,0.55)" },
                  }}
                />
              </div>
              <div className="flex items-center gap-3 px-5 py-3 border-t border-white/10">
                <span className="text-xs text-slate-400 shrink-0">Zoom</span>
                <input
                  type="range"
                  min={1}
                  max={3}
                  step={0.05}
                  value={zoom}
                  onChange={(e) => setZoom(Number(e.target.value))}
                  className="flex-1 accent-[#E1FE5D] h-1"
                />
                <span className="text-xs text-slate-400 w-8 text-right shrink-0">{zoom.toFixed(1)}×</span>
              </div>
              <div className="flex justify-between items-center px-5 pb-4 gap-3 border-t border-white/10 pt-3">
                <button
                  type="button"
                  className="text-sm text-slate-400 hover:text-slate-200 transition-colors"
                  onClick={() => {
                    setIsCropping(false);
                    setFormValues((current) => ({ ...current, image: rawImage }));
                  }}
                >
                  Skip crop
                </button>
                <button
                  type="button"
                  className="rounded-2xl bg-[#E1FE5D] px-5 py-2 text-sm font-semibold text-[#07091a] hover:bg-[#d4f15a] transition-colors disabled:opacity-50"
                  disabled={!croppedAreaPixels}
                  onClick={async () => {
                    if (!croppedAreaPixels) return;
                    const cropped = await getCroppedImg(rawImage, croppedAreaPixels);
                    setFormValues((current) => ({ ...current, image: cropped }));
                    setIsCropping(false);
                  }}
                >
                  Crop &amp; Use
                </button>
              </div>
            </div>
          ) : formValues.image ? (
            <div className="overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/5">
              <img
                src={formValues.image}
                alt="Portfolio preview"
                className="aspect-[8/5] w-full object-cover"
              />
              <div className="flex justify-between px-4 py-3 border-t border-white/10">
                <Button
                  type="button"
                  variant="ghost"
                  className="rounded-2xl border border-white/10 bg-white/5 px-4 text-sm text-slate-300 hover:bg-white/10"
                  onClick={() => {
                    setCrop({ x: 0, y: 0 });
                    setZoom(1);
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
                    setFormValues((current) => ({ ...current, image: "" }));
                    setRawImage("");
                    setIsCropping(false);
                    const input = document.getElementById("portfolio-image") as HTMLInputElement;
                    if (input) input.value = "";
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
              {editingItemId ? "Save Changes" : "Save Portfolio Item"}
            </Button>
          </div>
        </form>
      </EntityDialog>
    </div>
  );
}
