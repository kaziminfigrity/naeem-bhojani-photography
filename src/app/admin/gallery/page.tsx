"use client";

import {
  useCallback,
  useEffect,
  useState,
  type ChangeEvent,
  type ReactNode,
} from "react";
import Image from "next/image";
import {
  Home,
  Images,
  Camera,
  Save,
  RotateCcw,
  Eye,
  Upload,
  Trash2,
  Plus,
  Loader2,
  Image as ImageIcon,
  AlertCircle,
  CheckCircle2,
  Layers,
  Heart,
  Play,
  GripVertical,
  ExternalLink,
  ChevronUp,
  ChevronDown,
} from "lucide-react";

import {
  getGalleryData,
  updateGalleryData,
} from "@/services/api/gallery.api";

import { uploadHomepageImage } from "@/services/api/upload.api";

import type {
  GalleryData,
  GalleryHero,
  GalleryCollections,
  GalleryPhoto,
  GallerySignatureFeature,
  GalleryFinalCTA,
  GallerySignatureHighlight,
} from "@/types/gallery.types";

type Tab = "hero" | "collections" | "signatureFeature" | "finalCTA";

const emptyGallery: GalleryData = {
  hero: {
    eyebrow: "",
    heading: "",
    description: "",
    backgroundImage: "",
    backgroundImageAlt: "",
    buttons: [],
    decorativeCaption: [],
  },
  collections: {
    eyebrow: "",
    heading: "",
    description: "",
    categories: [],
    photos: [],
    bottomNote: "",
    ctaLabel: "",
    ctaHref: "",
  },
  testimonialFeature: {
    backgroundImage: "",
    backgroundImageAlt: "",
    quote: "",
    highlightedText: "",
    attribution: "",
  },
  weddingFeature: {
    backgroundImage: "",
    backgroundImageAlt: "",
    eyebrow: "",
    heading: "",
    description: "",
    buttonLabel: "",
    buttonHref: "",
    supportingText: "",
    supportingCaption: "",
  },
  signatureFeature: {
    isActive: true,
    eyebrow: "",
    heading: "",
    highlightedText: "",
    description: "",
    backgroundImage: "",
    backgroundImageAlt: "",
    highlights: [],
    exploreButton: {
      label: "",
      href: "",
      isActive: true,
    },
    reelButton: {
      label: "",
      href: "",
      isActive: true,
    },
  },
  finalCTA: {
    backgroundImage: "",
    backgroundImageAlt: "",
    eyebrow: "",
    heading: "",
    description: "",
    buttonLabel: "",
    buttonHref: "",
  },
};

const inputClass =
  "w-full min-w-0 rounded-lg border border-white/10 bg-[#25252b] px-3.5 py-3 text-sm text-white outline-none transition placeholder:text-gray-500 focus:border-[#d5ad62] focus:ring-1 focus:ring-[#d5ad62]/20";

const labelClass = "mb-2 block text-sm font-medium text-white/80";

const tabs: {
  id: Tab;
  label: string;
  description: string;
  icon: typeof Home;
}[] = [
  {
    id: "hero",
    label: "Gallery Hero",
    description: "Manage the gallery page introduction",
    icon: Home,
  },
  {
    id: "collections",
    label: "Collections",
    description: "Manage categories and gallery photos",
    icon: Images,
  },
  {
    id: "signatureFeature",
    label: "Signature Feature",
    description: "Manage the photography signature section",
    icon: Camera,
  },
  {
    id: "finalCTA",
    label: "Final CTA",
    description: "Manage the closing call-to-action section",
    icon: Eye,
  },
];

function cloneData(data: GalleryData): GalleryData {
  return JSON.parse(JSON.stringify(data));
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  multiline = false,
  rows = 4,
  type = "text",
}: {
  label: string;
  value: string | number;
  onChange: (value: string) => void;
  placeholder?: string;
  multiline?: boolean;
  rows?: number;
  type?: string;
}) {
  return (
    <div className="min-w-0">
      <label className={labelClass}>{label}</label>

      {multiline ? (
        <textarea
          rows={rows}
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          className={`${inputClass} resize-y`}
        />
      ) : (
        <input
          type={type}
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          className={inputClass}
        />
      )}
    </div>
  );
}

function Panel({
  title,
  description,
  icon,
  children,
}: {
  title: string;
  description?: string;
  icon: ReactNode;
  children: ReactNode;
}) {
  return (
    <section className="min-w-0 overflow-hidden rounded-xl border border-white/10 bg-[#171717] shadow-xl shadow-black/10">
      <div className="flex items-center gap-3 border-b border-white/10 px-5 py-4">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-[#b18a4a]/30 bg-[#b18a4a]/10 text-[#d5ad62]">
          {icon}
        </span>

        <div className="min-w-0">
          <h2 className="font-semibold text-white">{title}</h2>
          {description && (
            <p className="mt-1 text-xs text-white/45">{description}</p>
          )}
        </div>
      </div>

      <div className="min-w-0 space-y-5 p-4 sm:p-5">{children}</div>
    </section>
  );
}

function ImageField({
  label,
  value,
  alt,
  onChange,
  onAltChange,
  onUpload,
  uploading,
}: {
  label: string;
  value: string;
  alt?: string;
  onChange: (value: string) => void;
  onAltChange?: (value: string) => void;
  onUpload: (file: File) => void;
  uploading: boolean;
}) {
  const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      if (!file.type.startsWith("image/")) {
        window.alert("Please select a valid image file.");
        e.target.value = "";
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        window.alert("Image size must be less than 5 MB.");
        e.target.value = "";
        return;
      }

      onUpload(file);
    }

    e.target.value = "";
  };

  return (
    <div className="min-w-0 space-y-3">
      <label className={labelClass}>{label}</label>

      <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-white/10 bg-[#101010]">
        {value ? (
          <Image
            src={value}
            alt={alt || label}
            fill
            unoptimized
            sizes="(max-width: 768px) 100vw, 500px"
            className="object-cover"
          />
        ) : (
          <div className="flex h-full flex-col items-center justify-center gap-2 text-white/30">
            <ImageIcon size={35} />
            <span className="text-sm">No image selected</span>
          </div>
        )}

        <label className="absolute bottom-3 left-3 inline-flex cursor-pointer items-center gap-2 rounded-lg bg-[#d5ad62] px-4 py-2.5 text-xs font-semibold text-black transition hover:bg-white">
          {uploading ? (
            <Loader2 size={15} className="animate-spin" />
          ) : (
            <Upload size={15} />
          )}

          {uploading ? "Uploading..." : "Change Image"}

          <input
            type="file"
            accept="image/png,image/jpeg,image/webp"
            className="hidden"
            disabled={uploading}
            onChange={handleFile}
          />
        </label>

        {value && (
          <button
            type="button"
            onClick={() => onChange("")}
            className="absolute bottom-3 right-3 rounded-lg bg-black/80 p-2.5 text-white transition hover:bg-red-600"
            title="Remove image"
          >
            <Trash2 size={16} />
          </button>
        )}
      </div>

      <Field
        label="Image URL"
        value={value}
        onChange={onChange}
        placeholder="/images/gallery/example.png"
      />

      {onAltChange && (
        <Field
          label="Image Alt Text"
          value={alt || ""}
          onChange={onAltChange}
          placeholder="Describe the image"
        />
      )}
    </div>
  );
}

function Toggle({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      aria-label="Toggle active status"
      className={`relative h-6 w-11 shrink-0 rounded-full transition ${
        checked ? "bg-[#d5ad62]" : "bg-gray-600"
      }`}
    >
      <span
        className={`absolute top-1 h-4 w-4 rounded-full bg-white transition ${
          checked ? "left-6" : "left-1"
        }`}
      />
    </button>
  );
}

function StatusMessage({
  error,
  success,
}: {
  error: string;
  success: string;
}) {
  if (!error && !success) return null;

  return (
    <div
      className={`flex items-center gap-2 rounded-lg border px-4 py-3 text-sm ${
        error
          ? "border-red-500/20 bg-red-500/10 text-red-300"
          : "border-green-500/20 bg-green-500/10 text-green-300"
      }`}
    >
      {error ? <AlertCircle size={17} /> : <CheckCircle2 size={17} />}
      {error || success}
    </div>
  );
}

export default function GalleryAdminPage() {
  const [gallery, setGallery] = useState<GalleryData>(emptyGallery);
  const [original, setOriginal] = useState<GalleryData>(emptyGallery);

  const [activeTab, setActiveTab] = useState<Tab>("hero");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const dirty =
    JSON.stringify(gallery) !== JSON.stringify(original);

  const loadGallery = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getGalleryData();

      if (!response.success || !response.data) {
        throw new Error(
          response.message || "Unable to load Gallery page."
        );
      }

      const data: GalleryData = {
        ...emptyGallery,
        ...response.data,
        hero: {
          ...emptyGallery.hero,
          ...response.data.hero,
        },
        collections: {
          ...emptyGallery.collections,
          ...response.data.collections,
        },
        signatureFeature: {
          ...emptyGallery.signatureFeature,
          ...response.data.signatureFeature,
          exploreButton: {
            ...emptyGallery.signatureFeature.exploreButton,
            ...response.data.signatureFeature?.exploreButton,
          },
          reelButton: {
            ...emptyGallery.signatureFeature.reelButton,
            ...response.data.signatureFeature?.reelButton,
          },
        },
        finalCTA: {
          ...emptyGallery.finalCTA,
          ...response.data.finalCTA,
        },
      };

      setGallery(data);
      setOriginal(cloneData(data));
    } catch (err) {
      console.error(err);
      setError("Failed to load Gallery page data.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadGallery();
  }, [loadGallery]);

  const updateSection = <K extends Tab>(
    section: K,
    patch: Partial<GalleryData[K]>
  ) => {
    setGallery((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        ...patch,
      },
    }));

    setSuccess("");
    setError("");
  };

  const uploadImage = async (
    file: File,
    callback: (url: string) => void
  ) => {
    try {
      setUploading(true);
      setError("");
      setSuccess("");

      const response = await uploadHomepageImage(file);

      if (!response.success || !response.data?.image) {
        throw new Error(response.message || "Image upload failed.");
      }

      callback(response.data.image);
    } catch (err) {
      console.error(err);
      setError("Image upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const saveChanges = async () => {
    try {
      setSaving(true);
      setError("");
      setSuccess("");

      // Only update the sections managed on this page.
      // testimonialFeature and weddingFeature remain untouched.
      const payload: Partial<GalleryData> = {
        hero: gallery.hero,
        collections: gallery.collections,
        signatureFeature: gallery.signatureFeature,
        finalCTA: gallery.finalCTA,
      };

      const response = await updateGalleryData(payload);

      if (!response.success || !response.data) {
        throw new Error(response.message || "Gallery update failed.");
      }

      const updated: GalleryData = {
        ...gallery,
        ...response.data,
      };

      setGallery(updated);
      setOriginal(cloneData(updated));
      setSuccess("Gallery page updated successfully!");
    } catch (err) {
      console.error(err);
      setError("Unable to save Gallery page changes.");
    } finally {
      setSaving(false);
    }
  };

  const resetChanges = () => {
    if (!window.confirm("Discard all unsaved Gallery changes?")) return;

    setGallery(cloneData(original));
    setError("");
    setSuccess("Changes have been reset.");
  };

  const switchTab = (tab: Tab) => {
    if (dirty) {
      const confirmed = window.confirm(
        "You have unsaved changes. Do you want to switch tabs?"
      );

      if (!confirmed) return;
    }

    setActiveTab(tab);
    setError("");
    setSuccess("");
  };

  // HERO HELPERS
  const updateHero = (patch: Partial<GalleryHero>) => {
    updateSection("hero", patch);
  };

  const addHeroButton = () => {
    updateHero({
      buttons: [
        ...gallery.hero.buttons,
        {
          label: "New Button",
          href: "/contact",
          order: gallery.hero.buttons.length + 1,
        },
      ],
    });
  };

  const updateHeroButton = (
    index: number,
    patch: Partial<GalleryHero["buttons"][number]>
  ) => {
    const buttons = [...gallery.hero.buttons];
    buttons[index] = { ...buttons[index], ...patch };
    updateHero({ buttons });
  };

  const removeHeroButton = (index: number) => {
    updateHero({
      buttons: gallery.hero.buttons.filter((_, i) => i !== index),
    });
  };

  // COLLECTION HELPERS
  const updateCollections = (patch: Partial<GalleryCollections>) => {
    updateSection("collections", patch);
  };

  const addCategory = () => {
    const name = window.prompt("Enter category name:");

    if (!name?.trim()) return;

    if (
      gallery.collections.categories.some(
        (category) => category.toLowerCase() === name.trim().toLowerCase()
      )
    ) {
      window.alert("This category already exists.");
      return;
    }

    updateCollections({
      categories: [...gallery.collections.categories, name.trim()],
    });
  };

  const renameCategory = (index: number) => {
    const current = gallery.collections.categories[index];
    const name = window.prompt("Update category name:", current);

    if (!name?.trim()) return;

    const categories = [...gallery.collections.categories];
    categories[index] = name.trim();

    updateCollections({ categories });
  };

  const removeCategory = (index: number) => {
    const category = gallery.collections.categories[index];

    const isUsed = gallery.collections.photos.some(
      (photo) => photo.category === category
    );

    if (isUsed) {
      window.alert(
        "This category is assigned to photos. Update those photos before deleting the category."
      );
      return;
    }

    if (!window.confirm(`Delete category "${category}"?`)) return;

    updateCollections({
      categories: gallery.collections.categories.filter(
        (_, i) => i !== index
      ),
    });
  };

  const addPhoto = () => {
    const firstCategory = gallery.collections.categories[0] || "Wedding";

    const newPhoto: GalleryPhoto = {
      title: "New Photo",
      category: firstCategory,
      image: "",
      alt: "",
      size: "medium",
      order: gallery.collections.photos.length + 1,
      isActive: true,
    };

    updateCollections({
      photos: [...gallery.collections.photos, newPhoto],
    });
  };

  const updatePhoto = (
    index: number,
    patch: Partial<GalleryPhoto>
  ) => {
    const photos = [...gallery.collections.photos];
    photos[index] = { ...photos[index], ...patch };
    updateCollections({ photos });
  };

  const removePhoto = (index: number) => {
    if (!window.confirm("Are you sure you want to delete this photo?")) {
      return;
    }

    updateCollections({
      photos: gallery.collections.photos
        .filter((_, i) => i !== index)
        .map((photo, i) => ({ ...photo, order: i + 1 })),
    });
  };

  const movePhoto = (index: number, direction: "up" | "down") => {
    const photos = [...gallery.collections.photos];
    const targetIndex = direction === "up" ? index - 1 : index + 1;

    if (targetIndex < 0 || targetIndex >= photos.length) return;

    [photos[index], photos[targetIndex]] = [
      photos[targetIndex],
      photos[index],
    ];

    updateCollections({
      photos: photos.map((photo, i) => ({ ...photo, order: i + 1 })),
    });
  };

  // SIGNATURE FEATURE HELPERS
  const signature = gallery.signatureFeature;

  const updateSignature = (
    patch: Partial<GallerySignatureFeature>
  ) => {
    updateSection("signatureFeature", patch);
  };

  const updateHighlight = (
    index: number,
    patch: Partial<GallerySignatureHighlight>
  ) => {
    const highlights = [...signature.highlights];
    highlights[index] = { ...highlights[index], ...patch };
    updateSignature({ highlights });
  };

  const addHighlight = () => {
    updateSignature({
      highlights: [
        ...signature.highlights,
        {
          icon: "camera",
          title: "New Highlight",
          subtitle: "Add a short description",
          order: signature.highlights.length + 1,
          isActive: true,
        },
      ],
    });
  };

  const removeHighlight = (index: number) => {
    updateSignature({
      highlights: signature.highlights.filter((_, i) => i !== index),
    });
  };

  const updateFinalCTA = (patch: Partial<GalleryFinalCTA>) => {
    updateSection("finalCTA", patch);
  };

  const renderHeroTab = () => (
    <div className="space-y-6">
      <Panel
        title="Hero Content"
        description="Edit the main introduction of the Gallery page"
        icon={<Home size={19} />}
      >
        <div className="grid gap-5 md:grid-cols-2">
          <Field
            label="Eyebrow"
            value={gallery.hero.eyebrow}
            onChange={(value) => updateHero({ eyebrow: value })}
            placeholder="THE ART OF STORYTELLING"
          />

          <Field
            label="Heading"
            value={gallery.hero.heading}
            onChange={(value) => updateHero({ heading: value })}
            placeholder="A Collection of Moments"
          />
        </div>

        <Field
          label="Description"
          value={gallery.hero.description}
          onChange={(value) => updateHero({ description: value })}
          multiline
          rows={4}
        />

        <ImageField
          label="Hero Background Image"
          value={gallery.hero.backgroundImage}
          alt={gallery.hero.backgroundImageAlt}
          onChange={(value) => updateHero({ backgroundImage: value })}
          onAltChange={(value) =>
            updateHero({ backgroundImageAlt: value })
          }
          onUpload={(file) =>
            uploadImage(file, (url) =>
              updateHero({ backgroundImage: url })
            )
          }
          uploading={uploading}
        />

        <div>
          <div className="mb-3 flex items-center justify-between gap-3">
            <div>
              <h3 className="text-sm font-semibold text-white">
                Hero Buttons
              </h3>
              <p className="mt-1 text-xs text-white/40">
                Add or update the buttons shown in the hero.
              </p>
            </div>

            <button
              type="button"
              onClick={addHeroButton}
              className="inline-flex items-center gap-2 rounded-lg border border-[#b18a4a]/30 bg-[#b18a4a]/10 px-3 py-2 text-xs font-semibold text-[#d5ad62] hover:bg-[#b18a4a]/20"
            >
              <Plus size={15} />
              Add Button
            </button>
          </div>

          <div className="space-y-3">
            {gallery.hero.buttons.map((button, index) => (
              <div
                key={index}
                className="grid gap-3 rounded-lg border border-white/10 bg-[#202020] p-3 md:grid-cols-[1fr_1fr_100px_auto]"
              >
                <Field
                  label="Button Label"
                  value={button.label}
                  onChange={(value) =>
                    updateHeroButton(index, { label: value })
                  }
                />

                <Field
                  label="Button Link"
                  value={button.href}
                  onChange={(value) =>
                    updateHeroButton(index, { href: value })
                  }
                />

                <Field
                  label="Order"
                  type="number"
                  value={button.order}
                  onChange={(value) =>
                    updateHeroButton(index, {
                      order: Number(value) || 0,
                    })
                  }
                />

                <div className="flex items-end">
                  <button
                    type="button"
                    onClick={() => removeHeroButton(index)}
                    className="rounded-lg border border-red-500/20 p-3 text-red-400 hover:bg-red-500/10"
                    title="Remove button"
                  >
                    <Trash2 size={17} />
                  </button>
                </div>
              </div>
            ))}

            {gallery.hero.buttons.length === 0 && (
              <p className="rounded-lg border border-dashed border-white/10 p-5 text-center text-sm text-white/35">
                No hero buttons added.
              </p>
            )}
          </div>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-semibold text-white">
            Decorative Captions
          </h3>

          <div className="space-y-2">
            {gallery.hero.decorativeCaption.map((caption, index) => (
              <div key={index} className="flex gap-2">
                <input
                  value={caption}
                  onChange={(e) => {
                    const captions = [...gallery.hero.decorativeCaption];
                    captions[index] = e.target.value;
                    updateHero({ decorativeCaption: captions });
                  }}
                  className={inputClass}
                  placeholder="Decorative caption"
                />

                <button
                  type="button"
                  onClick={() =>
                    updateHero({
                      decorativeCaption:
                        gallery.hero.decorativeCaption.filter(
                          (_, i) => i !== index
                        ),
                    })
                  }
                  className="rounded-lg border border-red-500/20 px-3 text-red-400 hover:bg-red-500/10"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}

            <button
              type="button"
              onClick={() =>
                updateHero({
                  decorativeCaption: [
                    ...gallery.hero.decorativeCaption,
                    "",
                  ],
                })
              }
              className="inline-flex items-center gap-2 text-xs font-semibold text-[#d5ad62] hover:text-white"
            >
              <Plus size={15} />
              Add Caption
            </button>
          </div>
        </div>
      </Panel>
    </div>
  );

  const renderCollectionsTab = () => (
    <div className="space-y-6">
      <Panel
        title="Collections Introduction"
        description="Manage the heading and description above your photo collections"
        icon={<Images size={19} />}
      >
        <div className="grid gap-5 md:grid-cols-2">
          <Field
            label="Eyebrow"
            value={gallery.collections.eyebrow}
            onChange={(value) => updateCollections({ eyebrow: value })}
          />

          <Field
            label="Heading"
            value={gallery.collections.heading}
            onChange={(value) => updateCollections({ heading: value })}
          />
        </div>

        <Field
          label="Description"
          value={gallery.collections.description}
          onChange={(value) =>
            updateCollections({ description: value })
          }
          multiline
          rows={4}
        />
      </Panel>

      <Panel
        title="Photo Categories"
        description="Create and manage the categories used to organize photos"
        icon={<Layers size={19} />}
      >
        <div className="flex flex-wrap gap-2">
          {gallery.collections.categories.map((category, index) => (
            <div
              key={`${category}-${index}`}
              className="flex items-center gap-2 rounded-lg border border-[#b18a4a]/20 bg-[#b18a4a]/10 px-3 py-2"
            >
              <span className="text-sm text-[#e1c58e]">{category}</span>

              <button
                type="button"
                onClick={() => renameCategory(index)}
                className="text-xs text-white/50 hover:text-white"
                title="Rename category"
              >
                Edit
              </button>

              <button
                type="button"
                onClick={() => removeCategory(index)}
                className="text-white/40 hover:text-red-400"
                title="Delete category"
              >
                <Trash2 size={14} />
              </button>
            </div>
          ))}

          {gallery.collections.categories.length === 0 && (
            <p className="text-sm text-white/40">
              No categories created yet.
            </p>
          )}
        </div>

        <button
          type="button"
          onClick={addCategory}
          className="inline-flex items-center gap-2 rounded-lg border border-[#b18a4a]/30 bg-[#b18a4a]/10 px-4 py-2.5 text-xs font-semibold text-[#d5ad62] transition hover:bg-[#b18a4a]/20"
        >
          <Plus size={15} />
          Add Category
        </button>
      </Panel>

      <Panel
        title="Gallery Photos"
        description="Upload, edit, reorder and control the visibility of your gallery photos"
        icon={<Camera size={19} />}
      >
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-sm text-white">
              Total Photos:{" "}
              <span className="font-semibold text-[#d5ad62]">
                {gallery.collections.photos.length}
              </span>
            </p>
            <p className="mt-1 text-xs text-white/40">
              Only active photos should appear on the public gallery.
            </p>
          </div>

          <button
            type="button"
            onClick={addPhoto}
            className="inline-flex items-center gap-2 rounded-lg bg-[#d5ad62] px-4 py-2.5 text-xs font-semibold text-black transition hover:bg-white"
          >
            <Plus size={15} />
            Add Photo
          </button>
        </div>

        <div className="space-y-5">
          {gallery.collections.photos.map((photo, index) => (
            <div
              key={photo._id || `photo-${index}`}
              className="overflow-hidden rounded-xl border border-white/10 bg-[#202020]"
            >
              <div className="flex items-center justify-between gap-3 border-b border-white/10 px-4 py-3">
                <div className="flex items-center gap-2">
                  <GripVertical size={17} className="text-white/30" />
                  <span className="text-sm font-semibold text-white">
                    Photo #{index + 1}
                  </span>
                  <span
                    className={`rounded-full px-2 py-1 text-[10px] font-semibold ${
                      photo.isActive
                        ? "bg-green-500/10 text-green-400"
                        : "bg-gray-500/10 text-gray-400"
                    }`}
                  >
                    {photo.isActive ? "Active" : "Inactive"}
                  </span>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    disabled={index === 0}
                    onClick={() => movePhoto(index, "up")}
                    className="rounded-md p-2 text-white/50 transition hover:bg-white/10 hover:text-white disabled:opacity-20"
                    title="Move up"
                  >
                    <ChevronUp size={17} />
                  </button>

                  <button
                    type="button"
                    disabled={
                      index === gallery.collections.photos.length - 1
                    }
                    onClick={() => movePhoto(index, "down")}
                    className="rounded-md p-2 text-white/50 transition hover:bg-white/10 hover:text-white disabled:opacity-20"
                    title="Move down"
                  >
                    <ChevronDown size={17} />
                  </button>

                  <button
                    type="button"
                    onClick={() => removePhoto(index)}
                    className="rounded-md p-2 text-red-400 transition hover:bg-red-500/10"
                    title="Delete photo"
                  >
                    <Trash2 size={17} />
                  </button>
                </div>
              </div>

              <div className="grid gap-5 p-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]">
                <ImageField
                  label="Photo Image"
                  value={photo.image}
                  alt={photo.alt}
                  onChange={(value) =>
                    updatePhoto(index, { image: value })
                  }
                  onAltChange={(value) =>
                    updatePhoto(index, { alt: value })
                  }
                  onUpload={(file) =>
                    uploadImage(file, (url) =>
                      updatePhoto(index, { image: url })
                    )
                  }
                  uploading={uploading}
                />

                <div className="space-y-4">
                  <Field
                    label="Photo Title"
                    value={photo.title}
                    onChange={(value) =>
                      updatePhoto(index, { title: value })
                    }
                    placeholder="Wedding Photography"
                  />

                  <div>
                    <label className={labelClass}>Category</label>
                    <select
                      value={photo.category}
                      onChange={(e) =>
                        updatePhoto(index, { category: e.target.value })
                      }
                      className={inputClass}
                    >
                      {gallery.collections.categories.map((category) => (
                        <option
                          key={category}
                          value={category}
                          className="bg-[#202020]"
                        >
                          {category}
                        </option>
                      ))}
                      {!gallery.collections.categories.includes(
                        photo.category
                      ) && (
                        <option value={photo.category}>
                          {photo.category}
                        </option>
                      )}
                    </select>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className={labelClass}>Display Size</label>
                      <select
                        value={photo.size}
                        onChange={(e) =>
                          updatePhoto(index, { size: e.target.value })
                        }
                        className={inputClass}
                      >
                        <option value="small">Small</option>
                        <option value="medium">Medium</option>
                        <option value="large">Large</option>
                        <option value="wide">Wide</option>
                        <option value="tall">Tall</option>
                      </select>
                    </div>

                    <Field
                      label="Display Order"
                      type="number"
                      value={photo.order}
                      onChange={(value) =>
                        updatePhoto(index, {
                          order: Number(value) || 0,
                        })
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between rounded-lg border border-white/10 bg-[#181818] px-4 py-3">
                    <div>
                      <p className="text-sm font-medium text-white">
                        Photo Visibility
                      </p>
                      <p className="mt-1 text-xs text-white/40">
                        Show this photo on the website
                      </p>
                    </div>

                    <Toggle
                      checked={photo.isActive}
                      onChange={(value) =>
                        updatePhoto(index, { isActive: value })
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}

          {gallery.collections.photos.length === 0 && (
            <div className="rounded-xl border border-dashed border-white/10 py-12 text-center">
              <Images size={35} className="mx-auto text-white/20" />
              <p className="mt-3 text-sm text-white/50">
                No photos added yet.
              </p>
              <p className="mt-1 text-xs text-white/30">
                Click Add Photo to create your first gallery item.
              </p>
            </div>
          )}
        </div>

        <Field
          label="Bottom Note"
          value={gallery.collections.bottomNote}
          onChange={(value) => updateCollections({ bottomNote: value })}
          multiline
          rows={3}
        />

        <div className="grid gap-5 md:grid-cols-2">
          <Field
            label="CTA Button Label"
            value={gallery.collections.ctaLabel}
            onChange={(value) => updateCollections({ ctaLabel: value })}
          />

          <Field
            label="CTA Button Link"
            value={gallery.collections.ctaHref}
            onChange={(value) => updateCollections({ ctaHref: value })}
          />
        </div>
      </Panel>
    </div>
  );

  const renderSignatureTab = () => (
    <div className="space-y-6">
      <Panel
        title="Signature Feature Visibility"
        description="Enable or disable the entire signature feature section"
        icon={<Camera size={19} />}
      >
        <div className="flex items-center justify-between rounded-lg border border-white/10 bg-[#202020] p-4">
          <div>
            <p className="text-sm font-semibold text-white">
              Show Signature Feature
            </p>
            <p className="mt-1 text-xs text-white/40">
              Control whether this section appears on the Gallery page.
            </p>
          </div>

          <Toggle
            checked={signature.isActive}
            onChange={(value) => updateSignature({ isActive: value })}
          />
        </div>
      </Panel>

      <Panel
        title="Signature Feature Content"
        description="Manage the text and composite background image"
        icon={<Images size={19} />}
      >
        <div className="grid gap-5 md:grid-cols-2">
          <Field
            label="Eyebrow"
            value={signature.eyebrow}
            onChange={(value) => updateSignature({ eyebrow: value })}
          />

          <Field
            label="Heading"
            value={signature.heading}
            onChange={(value) => updateSignature({ heading: value })}
          />

          <Field
            label="Highlighted Text"
            value={signature.highlightedText}
            onChange={(value) =>
              updateSignature({ highlightedText: value })
            }
          />
        </div>

        <Field
          label="Description"
          value={signature.description}
          onChange={(value) => updateSignature({ description: value })}
          multiline
          rows={4}
        />

        <ImageField
          label="Composite Background Image"
          value={signature.backgroundImage}
          alt={signature.backgroundImageAlt}
          onChange={(value) =>
            updateSignature({ backgroundImage: value })
          }
          onAltChange={(value) =>
            updateSignature({ backgroundImageAlt: value })
          }
          onUpload={(file) =>
            uploadImage(file, (url) =>
              updateSignature({ backgroundImage: url })
            )
          }
          uploading={uploading}
        />
      </Panel>

      <Panel
        title="Feature Highlights"
        description="Manage the highlights displayed in the signature feature"
        icon={<Heart size={19} />}
      >
        <div className="flex justify-end">
          <button
            type="button"
            onClick={addHighlight}
            className="inline-flex items-center gap-2 rounded-lg border border-[#b18a4a]/30 bg-[#b18a4a]/10 px-3 py-2 text-xs font-semibold text-[#d5ad62] hover:bg-[#b18a4a]/20"
          >
            <Plus size={15} />
            Add Highlight
          </button>
        </div>

        <div className="space-y-3">
          {signature.highlights.map((highlight, index) => (
            <div
              key={index}
              className="rounded-lg border border-white/10 bg-[#202020] p-4"
            >
              <div className="mb-4 flex items-center justify-between">
                <p className="text-sm font-semibold text-white">
                  Highlight #{index + 1}
                </p>

                <div className="flex items-center gap-3">
                  <Toggle
                    checked={highlight.isActive}
                    onChange={(value) =>
                      updateHighlight(index, { isActive: value })
                    }
                  />

                  <button
                    type="button"
                    onClick={() => removeHighlight(index)}
                    className="rounded-md p-2 text-red-400 hover:bg-red-500/10"
                    title="Delete highlight"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className={labelClass}>Icon</label>
                  <select
                    value={highlight.icon}
                    onChange={(e) =>
                      updateHighlight(index, {
                        icon: e.target.value as GallerySignatureHighlight["icon"],
                      })
                    }
                    className={inputClass}
                  >
                    <option value="camera">Camera</option>
                    <option value="layers">Layers</option>
                    <option value="play">Play</option>
                    <option value="heart">Heart</option>
                  </select>
                </div>

                <Field
                  label="Display Order"
                  type="number"
                  value={highlight.order}
                  onChange={(value) =>
                    updateHighlight(index, {
                      order: Number(value) || 0,
                    })
                  }
                />

                <Field
                  label="Title"
                  value={highlight.title}
                  onChange={(value) =>
                    updateHighlight(index, { title: value })
                  }
                />

                <Field
                  label="Subtitle"
                  value={highlight.subtitle}
                  onChange={(value) =>
                    updateHighlight(index, { subtitle: value })
                  }
                />
              </div>
            </div>
          ))}

          {signature.highlights.length === 0 && (
            <p className="rounded-lg border border-dashed border-white/10 p-5 text-center text-sm text-white/40">
              No highlights added.
            </p>
          )}
        </div>
      </Panel>

      <Panel
        title="Signature Feature Buttons"
        description="Configure the Explore and Reel buttons"
        icon={<ExternalLink size={19} />}
      >
        <div className="grid gap-5 md:grid-cols-2">
          <div className="space-y-4 rounded-lg border border-white/10 bg-[#202020] p-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-white">
                Explore Button
              </h3>
              <Toggle
                checked={signature.exploreButton.isActive}
                onChange={(value) =>
                  updateSignature({
                    exploreButton: {
                      ...signature.exploreButton,
                      isActive: value,
                    },
                  })
                }
              />
            </div>

            <Field
              label="Button Label"
              value={signature.exploreButton.label}
              onChange={(value) =>
                updateSignature({
                  exploreButton: {
                    ...signature.exploreButton,
                    label: value,
                  },
                })
              }
            />

            <Field
              label="Button Link"
              value={signature.exploreButton.href}
              onChange={(value) =>
                updateSignature({
                  exploreButton: {
                    ...signature.exploreButton,
                    href: value,
                  },
                })
              }
            />
          </div>

          <div className="space-y-4 rounded-lg border border-white/10 bg-[#202020] p-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-white">
                Reel Button
              </h3>
              <Toggle
                checked={signature.reelButton.isActive}
                onChange={(value) =>
                  updateSignature({
                    reelButton: {
                      ...signature.reelButton,
                      isActive: value,
                    },
                  })
                }
              />
            </div>

            <Field
              label="Button Label"
              value={signature.reelButton.label}
              onChange={(value) =>
                updateSignature({
                  reelButton: {
                    ...signature.reelButton,
                    label: value,
                  },
                })
              }
            />

            <Field
              label="Button Link"
              value={signature.reelButton.href}
              onChange={(value) =>
                updateSignature({
                  reelButton: {
                    ...signature.reelButton,
                    href: value,
                  },
                })
              }
            />
          </div>
        </div>
      </Panel>
    </div>
  );

  const renderFinalCTATab = () => (
    <div className="space-y-6">
      <Panel
        title="Final Call To Action"
        description="Manage the closing section of the Gallery page"
        icon={<Eye size={19} />}
      >
        <div className="grid gap-5 md:grid-cols-2">
          <Field
            label="Eyebrow"
            value={gallery.finalCTA.eyebrow}
            onChange={(value) => updateFinalCTA({ eyebrow: value })}
          />

          <Field
            label="Heading"
            value={gallery.finalCTA.heading}
            onChange={(value) => updateFinalCTA({ heading: value })}
          />
        </div>

        <Field
          label="Description"
          value={gallery.finalCTA.description}
          onChange={(value) => updateFinalCTA({ description: value })}
          multiline
          rows={4}
        />

        <ImageField
          label="CTA Background Image"
          value={gallery.finalCTA.backgroundImage}
          alt={gallery.finalCTA.backgroundImageAlt}
          onChange={(value) =>
            updateFinalCTA({ backgroundImage: value })
          }
          onAltChange={(value) =>
            updateFinalCTA({ backgroundImageAlt: value })
          }
          onUpload={(file) =>
            uploadImage(file, (url) =>
              updateFinalCTA({ backgroundImage: url })
            )
          }
          uploading={uploading}
        />

        <div className="grid gap-5 md:grid-cols-2">
          <Field
            label="Button Label"
            value={gallery.finalCTA.buttonLabel}
            onChange={(value) =>
              updateFinalCTA({ buttonLabel: value })
            }
          />

          <Field
            label="Button Link"
            value={gallery.finalCTA.buttonHref}
            onChange={(value) =>
              updateFinalCTA({ buttonHref: value })
            }
          />
        </div>
      </Panel>
    </div>
  );

  const renderActiveTab = () => {
    switch (activeTab) {
      case "hero":
        return renderHeroTab();
      case "collections":
        return renderCollectionsTab();
      case "signatureFeature":
        return renderSignatureTab();
      case "finalCTA":
        return renderFinalCTATab();
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center bg-[#101010]">
        <div className="flex flex-col items-center gap-3">
          <Loader2 size={35} className="animate-spin text-[#d5ad62]" />
          <p className="text-sm text-white/50">
            Loading Gallery Management...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen min-w-0 bg-[#101010] px-4 py-6 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1500px] space-y-6">
        {/* Page Header */}
        <div className="flex flex-col justify-between gap-4 xl:flex-row xl:items-center">
          <div>
            <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[2px] text-[#d5ad62]">
              <Camera size={15} />
              Website Management
            </div>

            <h1 className="text-2xl font-semibold text-white sm:text-3xl">
              Gallery Management
            </h1>

            <p className="mt-2 text-sm text-white/45">
              Manage gallery content, collections, images and sections.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <a
              href="/gallery"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.04] px-4 py-2.5 text-xs font-semibold text-white/80 transition hover:border-[#b18a4a]/40 hover:text-[#d5ad62]"
            >
              <ExternalLink size={15} />
              View Gallery
            </a>

            <button
              type="button"
              onClick={resetChanges}
              disabled={!dirty || saving}
              className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.04] px-4 py-2.5 text-xs font-semibold text-white/70 transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-30"
            >
              <RotateCcw size={15} />
              Reset
            </button>

            <button
              type="button"
              onClick={saveChanges}
              disabled={!dirty || saving || uploading}
              className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-[#d5ad62] to-[#a9823d] px-5 py-2.5 text-xs font-bold text-black shadow-lg shadow-[#b18a4a]/10 transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {saving ? (
                <Loader2 size={15} className="animate-spin" />
              ) : (
                <Save size={15} />
              )}
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>

        <StatusMessage error={error} success={success} />

        {/* Unsaved Changes Indicator */}
        {dirty && (
          <div className="flex items-center gap-2 rounded-lg border border-[#d5ad62]/20 bg-[#b18a4a]/10 px-4 py-3 text-xs text-[#e3c78f]">
            <AlertCircle size={15} />
            You have unsaved changes. Click Save Changes to publish them.
          </div>
        )}

        {/* Tabs */}
        <div className="grid grid-cols-2 gap-2 lg:grid-cols-4">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => switchTab(tab.id)}
                className={`flex min-w-0 items-center gap-3 rounded-xl border p-3 text-left transition sm:p-4 ${
                  isActive
                    ? "border-[#d5ad62]/40 bg-gradient-to-br from-[#b18a4a]/20 to-[#171717] shadow-lg shadow-black/20"
                    : "border-white/10 bg-[#171717] hover:border-white/20 hover:bg-[#202020]"
                }`}
              >
                <span
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
                    isActive
                      ? "bg-[#b18a4a]/20 text-[#e0bd79]"
                      : "bg-white/5 text-white/50"
                  }`}
                >
                  <Icon size={18} />
                </span>

                <span className="min-w-0">
                  <span
                    className={`block truncate text-xs font-semibold sm:text-sm ${
                      isActive ? "text-[#e0bd79]" : "text-white/80"
                    }`}
                  >
                    {tab.label}
                  </span>
                  <span className="mt-1 hidden text-[10px] text-white/35 sm:block">
                    {tab.description}
                  </span>
                </span>
              </button>
            );
          })}
        </div>

        {/* Active Tab Content */}
        <div className="min-w-0">{renderActiveTab()}</div>

        {/* Bottom Save Bar */}
        <div className="flex flex-col justify-between gap-3 rounded-xl border border-white/10 bg-[#171717] p-4 sm:flex-row sm:items-center">
          <div>
            <p className="text-sm font-semibold text-white">
              Gallery Page Settings
            </p>
            <p className="mt-1 text-xs text-white/40">
              {dirty
                ? "You have unsaved changes."
                : "All changes are saved."}
            </p>
          </div>

          <button
            type="button"
            onClick={saveChanges}
            disabled={!dirty || saving || uploading}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#d5ad62] px-5 py-3 text-xs font-bold text-black transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-40"
          >
            {saving ? (
              <Loader2 size={15} className="animate-spin" />
            ) : (
              <Save size={15} />
            )}
            {saving ? "Saving..." : "Save Gallery Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}