
"use client";

import { useEffect, useState, type ReactNode } from "react";
import {
  Image as ImageIcon,
  UserRound,
  BriefcaseBusiness,
  MessageSquareQuote,
  Camera,
  Upload,
  Trash2,
  Plus,
  Save,
  Eye,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Sparkles,
  LayoutDashboard,
} from "lucide-react";

import {
  getHomepageContent,
  updateHomepageContent,
} from "@/services/api/homepage.api";

import { uploadHomepageImage } from "@/services/api/upload.api";

import type { Homepage } from "@/types/homepage.types";

type SectionKey =
  | "hero"
  | "services"
  | "featuredGallery"
  | "about"
  | "behindTheLens"
  | "testimonials"
  | "weddingCTA";

type Tab = SectionKey | "preview";

const tabs: { id: Tab; label: string; icon: any }[] = [
  { id: "hero", label: "Hero Banner", icon: ImageIcon },
  { id: "services", label: "Services", icon: BriefcaseBusiness },
  { id: "featuredGallery", label: "Featured Gallery", icon: Camera },
  { id: "about", label: "About", icon: UserRound },
  { id: "behindTheLens", label: "Behind The Lens", icon: LayoutDashboard },
  { id: "testimonials", label: "Testimonials", icon: MessageSquareQuote },
  { id: "weddingCTA", label: "Wedding CTA", icon: Sparkles },
  { id: "preview", label: "Full Homepage Preview", icon: Eye },
];

const inputClass =
  "w-full min-w-0 rounded-lg border border-[#343434] bg-[#191919] px-3 py-3 text-sm text-white outline-none transition placeholder:text-gray-500 focus:border-[#d8b56e] focus:ring-1 focus:ring-[#d8b56e]/30 sm:px-4";

const labelClass = "mb-2 block text-xs font-medium text-gray-300";

const sectionNames: Record<SectionKey, string> = {
  hero: "Hero Banner",
  services: "Services",
  featuredGallery: "Featured Gallery",
  about: "About",
  behindTheLens: "Behind The Lens",
  testimonials: "Testimonials",
  weddingCTA: "Wedding CTA",
};

const buttonClass =
  "inline-flex min-h-10 items-center justify-center gap-2 rounded-lg bg-[#dfb969] px-4 py-2.5 text-xs font-bold text-black transition hover:bg-[#edca83] disabled:cursor-not-allowed disabled:opacity-50";

const secondaryButtonClass =
  "inline-flex min-h-10 items-center justify-center gap-2 rounded-lg border border-[#b18a42] px-4 py-2.5 text-xs font-bold text-[#e3bd70] transition hover:bg-[#211b10]";

function Field({
  label,
  value,
  onChange,
  textarea = false,
  type = "text",
  placeholder = "",
}: {
  label: string;
  value: any;
  onChange: (value: string) => void;
  textarea?: boolean;
  type?: string;
  placeholder?: string;
}) {
  return (
    <div className="min-w-0">
      <label className={labelClass}>{label}</label>

      {textarea ? (
        <textarea
          rows={4}
          className={`${inputClass} resize-y leading-6`}
          value={value ?? ""}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
        />
      ) : (
        <input
          type={type}
          min={type === "number" ? 1 : undefined}
          max={type === "number" ? 5 : undefined}
          className={inputClass}
          value={value ?? ""}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
        />
      )}
    </div>
  );
}

function ImageField({
  label,
  value,
  onChange,
  onUpload,
  uploading,
  onRemove,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  onUpload: (file: File) => Promise<void>;
  uploading: boolean;
  onRemove?: () => void;
}) {
  return (
    <div className="min-w-0 rounded-xl border border-[#333] bg-[#151515] p-3 sm:p-4">
      <label className={labelClass}>{label}</label>

      {value && (
        <div className="mb-3 overflow-hidden rounded-lg border border-[#333] bg-[#101010]">
          <img
            src={value}
            alt={label}
            className="h-40 w-full object-cover sm:h-48"
          />
        </div>
      )}

      <input
        className={inputClass}
        value={value ?? ""}
        placeholder="Image URL"
        onChange={(e) => onChange(e.target.value)}
      />

      <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
        <label
          className={`${buttonClass} cursor-pointer ${
            uploading ? "pointer-events-none" : ""
          }`}
        >
          {uploading ? (
            <Loader2 size={15} className="animate-spin" />
          ) : (
            <Upload size={15} />
          )}

          {uploading ? "Uploading..." : "Upload Image"}

          <input
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif"
            disabled={uploading}
            className="hidden"
            onChange={async (e) => {
              const file = e.target.files?.[0];

              if (file) {
                await onUpload(file);
              }

              e.target.value = "";
            }}
          />
        </label>

        {value && onRemove && (
          <button
            type="button"
            onClick={onRemove}
            disabled={uploading}
            className="inline-flex min-h-10 items-center justify-center gap-2 rounded-lg border border-red-900 px-4 py-2.5 text-xs text-red-400 transition hover:bg-red-950/30 disabled:opacity-50"
          >
            <Trash2 size={14} />
            Remove Image
          </button>
        )}
      </div>
    </div>
  );
}

function Panel({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <div className="min-w-0 rounded-xl border border-[#292929] bg-[#111111] p-4 sm:p-5 md:p-6">
      <div className="mb-5">
        <h3 className="text-base font-bold text-white sm:text-lg">
          {title}
        </h3>

        {description && (
          <p className="mt-1 text-xs leading-5 text-gray-500">
            {description}
          </p>
        )}
      </div>

      {children}
    </div>
  );
}

function ArrayHeader({
  title,
  onAdd,
  onRemove,
  active,
  onToggle,
}: {
  title: string;
  onAdd?: () => void;
  onRemove?: () => void;
  active?: boolean;
  onToggle?: () => void;
}) {
  return (
    <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
      <h4 className="min-w-0 text-sm font-bold text-white">{title}</h4>

      <div className="flex flex-wrap items-center gap-2">
        {onToggle && (
          <label className="flex min-h-9 items-center gap-2 rounded-lg border border-[#333] px-3 text-xs text-gray-400">
            <input
              type="checkbox"
              checked={!!active}
              onChange={onToggle}
              className="accent-[#d8b56e]"
            />
            Active
          </label>
        )}

        {onRemove && (
          <button
            type="button"
            onClick={onRemove}
            aria-label={`Remove ${title}`}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-red-900 text-red-400 transition hover:bg-red-950/30"
          >
            <Trash2 size={15} />
          </button>
        )}

        {onAdd && (
          <button type="button" onClick={onAdd} className={buttonClass}>
            <Plus size={14} />
            Add
          </button>
        )}
      </div>
    </div>
  );
}

function PreviewImage({
  src,
  alt,
}: {
  src?: string;
  alt?: string;
}) {
  if (!src) return null;

  return (
    <img
      src={src}
      alt={alt || ""}
      loading="lazy"
      className="h-40 w-full rounded-lg object-cover sm:h-48"
    />
  );
}

function PreviewSection({
  title,
  eyebrow,
  heading,
  description,
  images,
  items,
}: {
  title: string;
  eyebrow?: string;
  heading?: string;
  description?: string;
  images?: { image: string; alt?: string }[];
  items?: {
    title?: string;
    name?: string;
    quote?: string;
    image?: string;
  }[];
}) {
  const validImages = (images || []).filter((image) => image.image);
  const validItems = items || [];

  return (
    <section className="min-w-0 overflow-hidden rounded-xl border border-[#554326] bg-[#111] p-4 sm:p-5 md:p-7">
      <div className="mb-5">
        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#dfb969] sm:text-xs">
          {title}
        </span>
      </div>

      {eyebrow && (
        <p className="mb-3 text-xs uppercase tracking-[0.2em] text-[#dfb969]">
          {eyebrow}
        </p>
      )}

      {heading && (
        <h2 className="mb-3 break-words font-serif text-2xl font-bold text-white sm:text-3xl">
          {heading}
        </h2>
      )}

      {description && (
        <p className="mb-5 max-w-3xl break-words text-sm leading-7 text-gray-400">
          {description}
        </p>
      )}

      {validImages.length > 0 && (
        <div className="grid grid-cols-1 gap-3 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {validImages.map((image, index) => (
            <PreviewImage
              key={index}
              src={image.image}
              alt={image.alt}
            />
          ))}
        </div>
      )}

      {validItems.length > 0 && (
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {validItems.map((item, index) => (
            <div
              key={index}
              className="min-w-0 rounded-lg border border-[#333] bg-[#191919] p-3"
            >
              {item.image && (
                <PreviewImage
                  src={item.image}
                  alt={item.title || item.name}
                />
              )}

              {(item.title || item.name) && (
                <h3 className="mt-3 break-words text-sm font-bold text-white">
                  {item.title || item.name}
                </h3>
              )}

              {item.quote && (
                <p className="mt-2 break-words text-xs leading-6 text-gray-400">
                  {item.quote}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default function HomepageManagement() {
  const [homepage, setHomepage] = useState<Homepage | null>(null);
  const [activeTab, setActiveTab] = useState<Tab>("hero");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Track unsaved changes separately for every section.
  const [dirtySections, setDirtySections] = useState<SectionKey[]>([]);

  const dirty = dirtySections.length > 0;

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await getHomepageContent();

        if (!response.success || !response.data) {
          throw new Error(response.message || "Unable to load homepage.");
        }

        setHomepage(response.data);
        setDirtySections([]);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to load homepage."
        );
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  const markSectionDirty = (section: SectionKey) => {
    setDirtySections((prev) =>
      prev.includes(section) ? prev : [...prev, section]
    );
  };

  const updateSection = (
    section: SectionKey,
    key: string,
    value: any
  ) => {
    setHomepage((prev) => {
      if (!prev) return prev;

      return {
        ...prev,
        [section]: {
          ...(prev as any)[section],
          [key]: value,
        },
      };
    });

    markSectionDirty(section);
    setSuccess("");
  };

  const updateNested = (
    section: SectionKey,
    arrayName: string,
    index: number,
    key: string,
    value: any
  ) => {
    setHomepage((prev) => {
      if (!prev) return prev;

      const sectionData = (prev as any)[section];
      const array = [...(sectionData[arrayName] || [])];

      array[index] = {
        ...array[index],
        [key]: value,
      };

      return {
        ...prev,
        [section]: {
          ...sectionData,
          [arrayName]: array,
        },
      };
    });

    markSectionDirty(section);
    setSuccess("");
  };

  const addItem = (
    section: SectionKey,
    arrayName: string,
    defaultItem: any
  ) => {
    setHomepage((prev) => {
      if (!prev) return prev;

      const current = (prev as any)[section][arrayName] || [];

      return {
        ...prev,
        [section]: {
          ...(prev as any)[section],
          [arrayName]: [
            ...current,
            { ...defaultItem, order: current.length },
          ],
        },
      };
    });

    markSectionDirty(section);
    setSuccess("");
  };

  const removeItem = (
    section: SectionKey,
    arrayName: string,
    index: number
  ) => {
    setHomepage((prev) => {
      if (!prev) return prev;

      const sectionData = (prev as any)[section];
      const current = sectionData[arrayName] || [];

      return {
        ...prev,
        [section]: {
          ...sectionData,
          [arrayName]: current
            .filter((_: any, i: number) => i !== index)
            .map((item: any, i: number) => ({
              ...item,
              order: i,
            })),
        },
      };
    });

    markSectionDirty(section);
    setSuccess("");
  };

  const uploadImage = async (
    file: File,
    callback: (url: string) => void
  ) => {
    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("Image size must be below 5 MB.");
      return;
    }

    try {
      setUploading(true);
      setError("");
      setSuccess("");

      const response = await uploadHomepageImage(file);

      if (!response.success || !response.data?.image) {
        throw new Error(response.message || "Image upload failed.");
      }

      callback(response.data.image);
      setSuccess("Image uploaded successfully to Cloudinary.");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Image upload failed."
      );
    } finally {
      setUploading(false);
    }
  };

  const handleTabChange = (nextTab: Tab) => {
    if (nextTab === activeTab) return;

    if (dirty) {
      const confirmChange = window.confirm(
        "You have unsaved changes. They will remain in memory, but you must save each changed section separately. Continue?"
      );

      if (!confirmChange) return;
    }

    setActiveTab(nextTab);
    setError("");
    setSuccess("");
  };

  const saveSection = async () => {
    if (!homepage || activeTab === "preview") return;

    const section = activeTab;

    try {
      setSaving(true);
      setError("");
      setSuccess("");

      const response = await updateHomepageContent({
        [section]: (homepage as any)[section],
      } as Partial<Homepage>);

      if (!response.success) {
        throw new Error(response.message || "Unable to save section.");
      }

      if (response.data) {
        setHomepage((prev) => {
          if (!prev) return response.data;

          return {
            ...prev,
            [section]: response.data[section],
          };
        });
      }

      setDirtySections((prev) =>
        prev.filter((item) => item !== section)
      );

      setSuccess(`${sectionNames[section]} saved successfully.`);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to save homepage."
      );
    } finally {
      setSaving(false);
    }
  };

  const uploadSingle = (
    section: SectionKey,
    key: string,
    label: string,
    value: string
  ) => (
    <ImageField
      label={label}
      value={value || ""}
      uploading={uploading}
      onChange={(url) => updateSection(section, key, url)}
      onUpload={(file) =>
        uploadImage(file, (url) => updateSection(section, key, url))
      }
      onRemove={() => updateSection(section, key, "")}
    />
  );

  const uploadArrayImage = (
    section: SectionKey,
    arrayName: string,
    index: number,
    label: string,
    value: string
  ) => (
    <ImageField
      label={label}
      value={value || ""}
      uploading={uploading}
      onChange={(url) =>
        updateNested(section, arrayName, index, "image", url)
      }
      onUpload={(file) =>
        uploadImage(file, (url) =>
          updateNested(section, arrayName, index, "image", url)
        )
      }
      onRemove={() =>
        updateNested(section, arrayName, index, "image", "")
      }
    />
  );

  const renderHero = () => {
    const hero = homepage!.hero;

    return (
      <div className="space-y-5">
        <Panel title="Hero Banner Content">
          <div className="grid min-w-0 gap-4 md:grid-cols-2">
            <Field
              label="Eyebrow"
              value={hero.eyebrow}
              onChange={(v) => updateSection("hero", "eyebrow", v)}
            />
            <Field
              label="Heading"
              value={hero.heading}
              onChange={(v) => updateSection("hero", "heading", v)}
            />

            <div className="md:col-span-2">
              <Field
                label="Description"
                value={hero.description}
                textarea
                onChange={(v) => updateSection("hero", "description", v)}
              />
            </div>

            <Field
              label="Primary Button Label"
              value={hero.primaryButtonLabel}
              onChange={(v) =>
                updateSection("hero", "primaryButtonLabel", v)
              }
            />
            <Field
              label="Primary Button Link"
              value={hero.primaryButtonHref}
              onChange={(v) =>
                updateSection("hero", "primaryButtonHref", v)
              }
            />
            <Field
              label="Secondary Button Label"
              value={hero.secondaryButtonLabel}
              onChange={(v) =>
                updateSection("hero", "secondaryButtonLabel", v)
              }
            />
            <Field
              label="Showreel Link"
              value={hero.showreelHref}
              onChange={(v) => updateSection("hero", "showreelHref", v)}
            />
          </div>
        </Panel>

        <Panel
          title="Hero Slides"
          description="Manage all homepage hero banner images."
        >
          <div className="mb-5 flex justify-end">
            <button
              type="button"
              onClick={() =>
                addItem("hero", "slides", {
                  image: "",
                  alt: "",
                  order: 0,
                })
              }
              className={buttonClass}
            >
              <Plus size={15} /> Add Slide
            </button>
          </div>

          <div className="grid min-w-0 gap-5 lg:grid-cols-2">
            {(hero.slides || []).map((slide, index) => (
              <div
                key={index}
                className="min-w-0 space-y-4 rounded-xl border border-[#333] bg-[#191919] p-3 sm:p-4"
              >
                <ArrayHeader
                  title={`Slide ${index + 1}`}
                  onRemove={() => removeItem("hero", "slides", index)}
                />

                {uploadArrayImage(
                  "hero",
                  "slides",
                  index,
                  "Slide Image",
                  slide.image
                )}

                <Field
                  label="Alt Text"
                  value={slide.alt}
                  onChange={(v) =>
                    updateNested("hero", "slides", index, "alt", v)
                  }
                />
              </div>
            ))}
          </div>
        </Panel>

        <Panel title="Hero Statistics">
          <div className="mb-5 flex justify-end">
            <button
              type="button"
              onClick={() =>
                addItem("hero", "stats", {
                  value: "",
                  label: "",
                  order: 0,
                })
              }
              className={buttonClass}
            >
              <Plus size={15} /> Add Statistic
            </button>
          </div>

          <div className="grid min-w-0 gap-4 md:grid-cols-2">
            {(hero.stats || []).map((stat, index) => (
              <div
                key={index}
                className="min-w-0 space-y-3 rounded-lg border border-[#333] bg-[#191919] p-3 sm:p-4"
              >
                <ArrayHeader
                  title={`Statistic ${index + 1}`}
                  onRemove={() => removeItem("hero", "stats", index)}
                />

                <Field
                  label="Value"
                  value={stat.value}
                  onChange={(v) =>
                    updateNested("hero", "stats", index, "value", v)
                  }
                />

                <Field
                  label="Label"
                  value={stat.label}
                  onChange={(v) =>
                    updateNested("hero", "stats", index, "label", v)
                  }
                />
              </div>
            ))}
          </div>
        </Panel>
      </div>
    );
  };

  const renderServices = () => {
    const section = homepage!.services;

    return (
      <div className="space-y-5">
        <Panel title="Services Section Content">
          <div className="grid min-w-0 gap-4 md:grid-cols-2">
            {(
              [
                "eyebrow",
                "heading",
                "description",
                "buttonLabel",
                "buttonHref",
              ] as const
            ).map((key) => (
              <Field
                key={key}
                label={key}
                value={section[key]}
                textarea={key === "description"}
                onChange={(v) => updateSection("services", key, v)}
              />
            ))}
          </div>
        </Panel>

        <Panel title="Homepage Services">
          <div className="mb-5 flex justify-end">
            <button
              type="button"
              onClick={() =>
                addItem("services", "services", {
                  title: "",
                  image: "",
                  alt: "",
                  href: "",
                  order: 0,
                  isActive: true,
                })
              }
              className={buttonClass}
            >
              <Plus size={15} /> Add Service
            </button>
          </div>

          <div className="grid min-w-0 gap-5 xl:grid-cols-2">
            {(section.services || []).map((item, index) => (
              <div
                key={index}
                className="min-w-0 space-y-4 rounded-xl border border-[#333] bg-[#191919] p-3 sm:p-4"
              >
                <ArrayHeader
                  title={`Service ${index + 1}`}
                  active={item.isActive}
                  onToggle={() =>
                    updateNested(
                      "services",
                      "services",
                      index,
                      "isActive",
                      !item.isActive
                    )
                  }
                  onRemove={() =>
                    removeItem("services", "services", index)
                  }
                />

                <Field
                  label="Title"
                  value={item.title}
                  onChange={(v) =>
                    updateNested("services", "services", index, "title", v)
                  }
                />

                {uploadArrayImage(
                  "services",
                  "services",
                  index,
                  "Service Image",
                  item.image
                )}

                <Field
                  label="Alt Text"
                  value={item.alt}
                  onChange={(v) =>
                    updateNested("services", "services", index, "alt", v)
                  }
                />

                <Field
                  label="Service Link"
                  value={item.href}
                  onChange={(v) =>
                    updateNested("services", "services", index, "href", v)
                  }
                />
              </div>
            ))}
          </div>
        </Panel>
      </div>
    );
  };

  const renderGallery = () => {
    const section = homepage!.featuredGallery;

    return (
      <div className="space-y-5">
        <Panel title="Gallery Section Content">
          <div className="grid min-w-0 gap-4 md:grid-cols-2">
            {(
              [
                "eyebrow",
                "heading",
                "description",
                "buttonLabel",
                "buttonHref",
                "viewMoreLabel",
              ] as const
            ).map((key) => (
              <Field
                key={key}
                label={key}
                value={section[key]}
                textarea={key === "description"}
                onChange={(v) =>
                  updateSection("featuredGallery", key, v)
                }
              />
            ))}
          </div>
        </Panel>

        <Panel title="Gallery Categories">
          <div className="mb-5 flex justify-end">
            <button
              type="button"
              onClick={() =>
                addItem("featuredGallery", "categories", {
                  label: "",
                  order: 0,
                  isActive: true,
                })
              }
              className={buttonClass}
            >
              <Plus size={15} /> Add Category
            </button>
          </div>

          <div className="grid min-w-0 gap-3 md:grid-cols-2">
            {(section.categories || []).map((item, index) => (
              <div
                key={index}
                className="flex min-w-0 flex-wrap items-end gap-3 rounded-lg border border-[#333] bg-[#191919] p-3"
              >
                <div className="min-w-0 flex-1 basis-full sm:basis-40">
                  <Field
                    label="Category Name"
                    value={item.label}
                    onChange={(v) =>
                      updateNested(
                        "featuredGallery",
                        "categories",
                        index,
                        "label",
                        v
                      )
                    }
                  />
                </div>

                <label className="flex min-h-10 items-center gap-2 text-xs text-gray-400">
                  <input
                    type="checkbox"
                    checked={!!item.isActive}
                    onChange={() =>
                      updateNested(
                        "featuredGallery",
                        "categories",
                        index,
                        "isActive",
                        !item.isActive
                      )
                    }
                    className="accent-[#d8b56e]"
                  />
                  Active
                </label>

                <button
                  type="button"
                  onClick={() =>
                    removeItem("featuredGallery", "categories", index)
                  }
                  aria-label="Remove category"
                  className="flex h-10 w-10 items-center justify-center rounded-lg text-red-400 hover:bg-red-950/30"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        </Panel>

        <Panel title="Featured Gallery Images">
          <div className="mb-5 flex justify-end">
            <button
              type="button"
              onClick={() =>
                addItem("featuredGallery", "items", {
                  title: "",
                  category: "",
                  image: "",
                  alt: "",
                  order: 0,
                  isActive: true,
                  layout: "",
                })
              }
              className={buttonClass}
            >
              <Plus size={15} /> Add Gallery Image
            </button>
          </div>

          <div className="grid min-w-0 gap-5 lg:grid-cols-2">
            {(section.items || []).map((item, index) => (
              <div
                key={index}
                className="min-w-0 space-y-4 rounded-xl border border-[#333] bg-[#191919] p-3 sm:p-4"
              >
                <ArrayHeader
                  title={`Gallery Image ${index + 1}`}
                  active={item.isActive}
                  onToggle={() =>
                    updateNested(
                      "featuredGallery",
                      "items",
                      index,
                      "isActive",
                      !item.isActive
                    )
                  }
                  onRemove={() =>
                    removeItem("featuredGallery", "items", index)
                  }
                />

                {uploadArrayImage(
                  "featuredGallery",
                  "items",
                  index,
                  "Gallery Image",
                  item.image
                )}

                <Field
                  label="Title"
                  value={item.title}
                  onChange={(v) =>
                    updateNested(
                      "featuredGallery",
                      "items",
                      index,
                      "title",
                      v
                    )
                  }
                />

                <Field
                  label="Category"
                  value={item.category}
                  onChange={(v) =>
                    updateNested(
                      "featuredGallery",
                      "items",
                      index,
                      "category",
                      v
                    )
                  }
                />

                <Field
                  label="Alt Text"
                  value={item.alt}
                  onChange={(v) =>
                    updateNested(
                      "featuredGallery",
                      "items",
                      index,
                      "alt",
                      v
                    )
                  }
                />

                <Field
                  label="Layout"
                  value={item.layout || ""}
                  onChange={(v) =>
                    updateNested(
                      "featuredGallery",
                      "items",
                      index,
                      "layout",
                      v
                    )
                  }
                />
              </div>
            ))}
          </div>
        </Panel>
      </div>
    );
  };

  const renderAbout = () => {
    const section = homepage!.about;

    return (
      <div className="space-y-5">
        <Panel title="About Section Content">
          <div className="grid min-w-0 gap-4 md:grid-cols-2">
            <Field
              label="Eyebrow"
              value={section.eyebrow}
              onChange={(v) => updateSection("about", "eyebrow", v)}
            />

            <Field
              label="Heading"
              value={section.heading}
              onChange={(v) => updateSection("about", "heading", v)}
            />

            <div className="md:col-span-2">
              <Field
                label="Description"
                value={section.description}
                textarea
                onChange={(v) => updateSection("about", "description", v)}
              />
            </div>

            <Field
              label="Photographer Name"
              value={section.photographerName}
              onChange={(v) =>
                updateSection("about", "photographerName", v)
              }
            />

            <Field
              label="Designation"
              value={section.designation}
              onChange={(v) => updateSection("about", "designation", v)}
            />

            <Field
              label="Button Label"
              value={section.buttonLabel}
              onChange={(v) => updateSection("about", "buttonLabel", v)}
            />

            <Field
              label="Button Link"
              value={section.buttonHref}
              onChange={(v) => updateSection("about", "buttonHref", v)}
            />
          </div>
        </Panel>

        <Panel title="About Image">
          {uploadSingle(
            "about",
            "image",
            "Photographer Image",
            section.image
          )}

          <div className="mt-4">
            <Field
              label="Image Alt Text"
              value={section.imageAlt}
              onChange={(v) => updateSection("about", "imageAlt", v)}
            />
          </div>
        </Panel>

        <Panel title="About Features">
          <div className="mb-5 flex justify-end">
            <button
              type="button"
              onClick={() =>
                addItem("about", "features", {
                  title: "",
                  description: "",
                  icon: "Camera",
                  order: 0,
                })
              }
              className={buttonClass}
            >
              <Plus size={15} /> Add Feature
            </button>
          </div>

          <div className="grid min-w-0 gap-4 md:grid-cols-2">
            {(section.features || []).map((item, index) => (
              <div
                key={index}
                className="min-w-0 space-y-3 rounded-xl border border-[#333] bg-[#191919] p-3 sm:p-4"
              >
                <ArrayHeader
                  title={`Feature ${index + 1}`}
                  onRemove={() => removeItem("about", "features", index)}
                />

                <Field
                  label="Title"
                  value={item.title}
                  onChange={(v) =>
                    updateNested("about", "features", index, "title", v)
                  }
                />

                <Field
                  label="Description"
                  value={item.description}
                  textarea
                  onChange={(v) =>
                    updateNested(
                      "about",
                      "features",
                      index,
                      "description",
                      v
                    )
                  }
                />

                <Field
                  label="Icon Name"
                  value={item.icon}
                  onChange={(v) =>
                    updateNested("about", "features", index, "icon", v)
                  }
                />
              </div>
            ))}
          </div>
        </Panel>
      </div>
    );
  };

  const renderBehindLens = () => {
    const section = homepage!.behindTheLens;

    return (
      <div className="space-y-5">
        <Panel title="Behind The Lens Content">
          <div className="grid min-w-0 gap-4 md:grid-cols-2">
            {(
              [
                "eyebrow",
                "heading",
                "description",
                "buttonLabel",
                "buttonHref",
              ] as const
            ).map((key) => (
              <Field
                key={key}
                label={key}
                value={section[key]}
                textarea={key === "description"}
                onChange={(v) =>
                  updateSection("behindTheLens", key, v)
                }
              />
            ))}
          </div>
        </Panel>

        <Panel title="Background Images">
          <div className="grid min-w-0 gap-5 md:grid-cols-2">
            {uploadSingle(
              "behindTheLens",
              "backgroundImage",
              "Background Image",
              section.backgroundImage
            )}

            {uploadSingle(
              "behindTheLens",
              "statsBackgroundImage",
              "Statistics Background Image",
              section.statsBackgroundImage
            )}
          </div>
        </Panel>

        <Panel title="Behind The Lens Services">
          <div className="mb-5 flex justify-end">
            <button
              type="button"
              onClick={() =>
                addItem("behindTheLens", "services", {
                  title: "",
                  image: "",
                  alt: "",
                  href: "",
                  order: 0,
                  isActive: true,
                })
              }
              className={buttonClass}
            >
              <Plus size={15} /> Add Service
            </button>
          </div>

          <div className="grid min-w-0 gap-5 lg:grid-cols-2">
            {(section.services || []).map((item, index) => (
              <div
                key={index}
                className="min-w-0 space-y-4 rounded-xl border border-[#333] bg-[#191919] p-3 sm:p-4"
              >
                <ArrayHeader
                  title={`Service ${index + 1}`}
                  active={item.isActive}
                  onToggle={() =>
                    updateNested(
                      "behindTheLens",
                      "services",
                      index,
                      "isActive",
                      !item.isActive
                    )
                  }
                  onRemove={() =>
                    removeItem("behindTheLens", "services", index)
                  }
                />

                <Field
                  label="Title"
                  value={item.title}
                  onChange={(v) =>
                    updateNested(
                      "behindTheLens",
                      "services",
                      index,
                      "title",
                      v
                    )
                  }
                />

                {uploadArrayImage(
                  "behindTheLens",
                  "services",
                  index,
                  "Service Image",
                  item.image
                )}

                <Field
                  label="Alt Text"
                  value={item.alt}
                  onChange={(v) =>
                    updateNested(
                      "behindTheLens",
                      "services",
                      index,
                      "alt",
                      v
                    )
                  }
                />

                <Field
                  label="Link"
                  value={item.href}
                  onChange={(v) =>
                    updateNested(
                      "behindTheLens",
                      "services",
                      index,
                      "href",
                      v
                    )
                  }
                />
              </div>
            ))}
          </div>
        </Panel>

        <Panel title="Behind The Lens Statistics">
          <div className="mb-5 flex justify-end">
            <button
              type="button"
              onClick={() =>
                addItem("behindTheLens", "stats", {
                  value: "",
                  label: "",
                  icon: "Camera",
                  order: 0,
                })
              }
              className={buttonClass}
            >
              <Plus size={15} /> Add Statistic
            </button>
          </div>

          <div className="grid min-w-0 gap-4 md:grid-cols-2">
            {(section.stats || []).map((item, index) => (
              <div
                key={index}
                className="min-w-0 space-y-3 rounded-xl border border-[#333] bg-[#191919] p-3 sm:p-4"
              >
                <ArrayHeader
                  title={`Statistic ${index + 1}`}
                  onRemove={() =>
                    removeItem("behindTheLens", "stats", index)
                  }
                />

                <Field
                  label="Value"
                  value={item.value}
                  onChange={(v) =>
                    updateNested(
                      "behindTheLens",
                      "stats",
                      index,
                      "value",
                      v
                    )
                  }
                />

                <Field
                  label="Label"
                  value={item.label}
                  onChange={(v) =>
                    updateNested(
                      "behindTheLens",
                      "stats",
                      index,
                      "label",
                      v
                    )
                  }
                />

                <Field
                  label="Icon"
                  value={item.icon || ""}
                  onChange={(v) =>
                    updateNested(
                      "behindTheLens",
                      "stats",
                      index,
                      "icon",
                      v
                    )
                  }
                />
              </div>
            ))}
          </div>
        </Panel>
      </div>
    );
  };

  const renderTestimonials = () => {
    const section = homepage!.testimonials;

    return (
      <div className="space-y-5">
        <Panel title="Testimonials Section Content">
          <div className="grid min-w-0 gap-4 md:grid-cols-2">
            <Field
              label="Eyebrow"
              value={section.eyebrow}
              onChange={(v) =>
                updateSection("testimonials", "eyebrow", v)
              }
            />

            <Field
              label="Heading"
              value={section.heading}
              onChange={(v) =>
                updateSection("testimonials", "heading", v)
              }
            />

            <div className="md:col-span-2">
              <Field
                label="Description"
                value={section.description}
                textarea
                onChange={(v) =>
                  updateSection("testimonials", "description", v)
                }
              />
            </div>
          </div>
        </Panel>

        <Panel title="Customer Testimonials">
          <div className="mb-5 flex justify-end">
            <button
              type="button"
              onClick={() =>
                addItem("testimonials", "testimonials", {
                  name: "",
                  quote: "",
                  image: "",
                  rating: 5,
                  order: 0,
                  isActive: true,
                })
              }
              className={buttonClass}
            >
              <Plus size={15} /> Add Testimonial
            </button>
          </div>

          <div className="space-y-5">
            {(section.testimonials || []).map((item, index) => (
              <div
                key={index}
                className="min-w-0 space-y-4 rounded-xl border border-[#333] bg-[#191919] p-3 sm:p-4"
              >
                <ArrayHeader
                  title={`Testimonial ${index + 1}`}
                  active={item.isActive}
                  onToggle={() =>
                    updateNested(
                      "testimonials",
                      "testimonials",
                      index,
                      "isActive",
                      !item.isActive
                    )
                  }
                  onRemove={() =>
                    removeItem("testimonials", "testimonials", index)
                  }
                />

                <div className="grid min-w-0 gap-4 md:grid-cols-2">
                  <Field
                    label="Customer Name"
                    value={item.name}
                    onChange={(v) =>
                      updateNested(
                        "testimonials",
                        "testimonials",
                        index,
                        "name",
                        v
                      )
                    }
                  />

                  <Field
                    label="Rating (1-5)"
                    type="number"
                    value={item.rating}
                    onChange={(v) => {
                      const rating = Number(v);

                      updateNested(
                        "testimonials",
                        "testimonials",
                        index,
                        "rating",
                        v === "" ? "" : Math.min(5, Math.max(1, rating))
                      );
                    }}
                  />
                </div>

                <Field
                  label="Customer Review"
                  value={item.quote}
                  textarea
                  onChange={(v) =>
                    updateNested(
                      "testimonials",
                      "testimonials",
                      index,
                      "quote",
                      v
                    )
                  }
                />

                {uploadArrayImage(
                  "testimonials",
                  "testimonials",
                  index,
                  "Customer Image",
                  item.image
                )}
              </div>
            ))}
          </div>
        </Panel>
      </div>
    );
  };

  const renderWeddingCTA = () => {
    const section = homepage!.weddingCTA;

    return (
      <div className="space-y-5">
        <Panel title="Wedding CTA Content">
          <div className="grid min-w-0 gap-4 md:grid-cols-2">
            {(
              [
                "eyebrow",
                "heading",
                "description",
                "storyTitle",
                "storySubtitle",
                "showreelHref",
                "primaryButtonLabel",
                "primaryButtonHref",
                "secondaryButtonLabel",
                "secondaryButtonHref",
              ] as const
            ).map((key) => (
              <Field
                key={key}
                label={key}
                value={section[key]}
                textarea={key === "description"}
                onChange={(v) => updateSection("weddingCTA", key, v)}
              />
            ))}
          </div>
        </Panel>

        <Panel title="Wedding CTA Images">
          {uploadSingle(
            "weddingCTA",
            "backgroundImage",
            "Background Image",
            section.backgroundImage
          )}

          <div className="mt-4">
            <Field
              label="Background Image Alt Text"
              value={section.backgroundImageAlt}
              onChange={(v) =>
                updateSection("weddingCTA", "backgroundImageAlt", v)
              }
            />
          </div>
        </Panel>

        <Panel title="Wedding CTA Thumbnails">
          <div className="mb-5 flex justify-end">
            <button
              type="button"
              onClick={() =>
                addItem("weddingCTA", "thumbnails", {
                  image: "",
                  alt: "",
                  order: 0,
                })
              }
              className={buttonClass}
            >
              <Plus size={15} /> Add Thumbnail
            </button>
          </div>

          <div className="grid min-w-0 gap-5 md:grid-cols-2">
            {(section.thumbnails || []).map((item, index) => (
              <div
                key={index}
                className="min-w-0 space-y-4 rounded-xl border border-[#333] bg-[#191919] p-3 sm:p-4"
              >
                <ArrayHeader
                  title={`Thumbnail ${index + 1}`}
                  onRemove={() =>
                    removeItem("weddingCTA", "thumbnails", index)
                  }
                />

                {uploadArrayImage(
                  "weddingCTA",
                  "thumbnails",
                  index,
                  "Thumbnail Image",
                  item.image
                )}

                <Field
                  label="Alt Text"
                  value={item.alt}
                  onChange={(v) =>
                    updateNested(
                      "weddingCTA",
                      "thumbnails",
                      index,
                      "alt",
                      v
                    )
                  }
                />
              </div>
            ))}
          </div>
        </Panel>
      </div>
    );
  };

  const renderPreview = () => {
    const data = homepage!;

    return (
      <div className="space-y-5">
        <div className="rounded-xl border border-[#554326] bg-[#17130c] p-4 sm:p-5">
          <h2 className="font-serif text-xl font-bold text-white sm:text-2xl">
            Complete Homepage Preview
          </h2>

          <p className="mt-2 text-sm leading-6 text-gray-400">
            Preview all seven homepage sections using the currently loaded
            content. This is an admin content preview, not an exact live-site
            rendering.
          </p>

          <button
            type="button"
            onClick={() => window.open("/", "_blank", "noopener,noreferrer")}
            className={`${secondaryButtonClass} mt-4 w-full sm:w-auto`}
          >
            <Eye size={15} /> Open Live Website
          </button>
        </div>

        <PreviewSection
          title="01 · Hero Banner"
          eyebrow={data.hero.eyebrow}
          heading={data.hero.heading}
          description={data.hero.description}
          images={data.hero.slides || []}
        />

        <PreviewSection
          title="02 · Services"
          eyebrow={data.services.eyebrow}
          heading={data.services.heading}
          description={data.services.description}
          items={(data.services.services || [])
            .filter((item) => item.isActive)
            .map((item) => ({
              title: item.title,
              image: item.image,
            }))}
        />

        <PreviewSection
          title="03 · Featured Gallery"
          eyebrow={data.featuredGallery.eyebrow}
          heading={data.featuredGallery.heading}
          description={data.featuredGallery.description}
          images={(data.featuredGallery.items || [])
            .filter((item) => item.isActive)
            .map((item) => ({
              image: item.image,
              alt: item.alt,
            }))}
        />

        <PreviewSection
          title="04 · About"
          eyebrow={data.about.eyebrow}
          heading={data.about.heading}
          description={data.about.description}
          images={[
            {
              image: data.about.image,
              alt: data.about.imageAlt,
            },
          ]}
          items={(data.about.features || []).map((item) => ({
            title: item.title,
            quote: item.description,
          }))}
        />

        <PreviewSection
          title="05 · Behind The Lens"
          eyebrow={data.behindTheLens.eyebrow}
          heading={data.behindTheLens.heading}
          description={data.behindTheLens.description}
          images={[
            {
              image: data.behindTheLens.backgroundImage,
              alt: "Background",
            },
            {
              image: data.behindTheLens.statsBackgroundImage,
              alt: "Statistics background",
            },
            ...(data.behindTheLens.services || [])
              .filter((item) => item.isActive)
              .map((item) => ({
                image: item.image,
                alt: item.alt,
              })),
          ]}
          items={(data.behindTheLens.stats || []).map((item) => ({
            title: item.value,
            quote: item.label,
          }))}
        />

        <PreviewSection
          title="06 · Testimonials"
          eyebrow={data.testimonials.eyebrow}
          heading={data.testimonials.heading}
          description={data.testimonials.description}
          items={(data.testimonials.testimonials || [])
            .filter((item) => item.isActive)
            .map((item) => ({
              name: item.name,
              quote: item.quote,
              image: item.image,
            }))}
        />

        <PreviewSection
          title="07 · Wedding CTA"
          eyebrow={data.weddingCTA.eyebrow}
          heading={data.weddingCTA.heading}
          description={data.weddingCTA.description}
          images={[
            {
              image: data.weddingCTA.backgroundImage,
              alt: data.weddingCTA.backgroundImageAlt,
            },
            ...(data.weddingCTA.thumbnails || []).map((item) => ({
              image: item.image,
              alt: item.alt,
            })),
          ]}
          items={[
            {
              title: data.weddingCTA.storyTitle,
              quote: data.weddingCTA.storySubtitle,
            },
          ]}
        />
      </div>
    );
  };

  const renderActiveSection = () => {
    if (!homepage) return null;

    switch (activeTab) {
      case "hero":
        return renderHero();

      case "services":
        return renderServices();

      case "featuredGallery":
        return renderGallery();

      case "about":
        return renderAbout();

      case "behindTheLens":
        return renderBehindLens();

      case "testimonials":
        return renderTestimonials();

      case "weddingCTA":
        return renderWeddingCTA();

      case "preview":
        return renderPreview();

      default:
        return null;
    }
  };

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#080808] px-4 text-white">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="animate-spin text-[#dfb969]" size={35} />

          <p className="text-center text-sm text-gray-400">
            Loading homepage content...
          </p>
        </div>
      </main>
    );
  }

  if (!homepage) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#080808] p-4 text-white sm:p-5">
        <div className="w-full max-w-lg rounded-xl border border-red-900 bg-[#151515] p-5 sm:p-6">
          <AlertCircle className="mb-3 text-red-400" size={30} />

          <p className="break-words text-sm">
            {error || "Homepage data is unavailable."}
          </p>

          <button
            type="button"
            onClick={() => window.location.reload()}
            className={`${buttonClass} mt-4`}
          >
            Reload
          </button>
        </div>
      </main>
    );
  }

  const currentSectionDirty =
    activeTab !== "preview" && dirtySections.includes(activeTab);

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#080808] p-3 text-white sm:p-5 md:p-6 lg:p-8">
      <div className="mx-auto w-full max-w-[1700px] min-w-0">
        {/* Header */}
        <header className="mb-6 flex min-w-0 flex-col gap-5 border-b border-[#292929] pb-6 sm:mb-8 sm:pb-7 xl:flex-row xl:items-center xl:justify-between">
          <div className="min-w-0">
            <span className="mb-3 inline-flex max-w-full items-center gap-2 rounded-full border border-[#5b4828] bg-[#211b10] px-3 py-2 text-[9px] font-bold tracking-[0.15em] text-[#e3bd70] sm:mb-4 sm:px-4 sm:text-[10px] sm:tracking-[0.2em]">
              <Sparkles size={13} className="shrink-0" />
              PHOTOGRAPHY STUDIO · ADMIN
            </span>

            <h1 className="break-words font-serif text-2xl font-bold sm:text-3xl md:text-4xl">
              Homepage Management
            </h1>

            <p className="mt-2 text-xs leading-6 text-gray-400 sm:text-sm">
              Manage all seven homepage sections and their images.
            </p>
          </div>

          <div className="grid w-full grid-cols-1 gap-2 sm:flex sm:w-auto sm:flex-wrap sm:gap-3">
            <button
              type="button"
              onClick={() =>
                window.open("/", "_blank", "noopener,noreferrer")
              }
              className={`${secondaryButtonClass} w-full sm:w-auto`}
            >
              <Eye size={16} />
              View Website
            </button>

            {activeTab !== "preview" && (
              <button
                type="button"
                onClick={saveSection}
                disabled={saving || uploading || !currentSectionDirty}
                className={`${buttonClass} w-full sm:w-auto`}
              >
                {saving ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : (
                  <Save size={16} />
                )}

                {saving ? "Saving..." : "Save Changes"}
              </button>
            )}
          </div>
        </header>

        {/* Status Messages */}
        {error && (
          <div
            role="alert"
            className="mb-5 flex min-w-0 items-start gap-2 rounded-lg border border-red-800 bg-red-950/30 p-3 text-xs leading-5 text-red-400"
          >
            <AlertCircle size={16} className="mt-0.5 shrink-0" />
            <span className="break-words">{error}</span>
          </div>
        )}

        {success && (
          <div
            role="status"
            className="mb-5 flex min-w-0 items-start gap-2 rounded-lg border border-green-800 bg-green-950/30 p-3 text-xs leading-5 text-green-400"
          >
            <CheckCircle2 size={16} className="mt-0.5 shrink-0" />
            <span className="break-words">{success}</span>
          </div>
        )}

        {/* Tabs */}
        <div className="mb-5 rounded-xl border border-[#292929] bg-[#111111] p-2 sm:mb-6">
          <div
            className="flex gap-2 overflow-x-auto pb-1"
            style={{ scrollbarWidth: "thin" }}
          >
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const active = activeTab === tab.id;
              const tabDirty =
                tab.id !== "preview" && dirtySections.includes(tab.id);

              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => handleTabChange(tab.id)}
                  className={`relative flex min-h-11 shrink-0 items-center gap-2 whitespace-nowrap rounded-lg px-3 py-3 text-[11px] font-semibold transition sm:px-4 sm:text-xs ${
                    active
                      ? "bg-[#dfb969] text-black"
                      : "text-gray-400 hover:bg-[#222] hover:text-white"
                  }`}
                >
                  <Icon size={15} className="shrink-0" />

                  {tab.label}

                  {tabDirty && (
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${
                        active ? "bg-black" : "bg-[#dfb969]"
                      }`}
                      title="Unsaved changes"
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Section */}
        <div className="min-w-0">{renderActiveSection()}</div>

        {/* Bottom Save Bar */}
        {activeTab !== "preview" && (
          <div className="mt-6 flex min-w-0 flex-col gap-4 rounded-xl border border-[#292929] bg-[#111111] p-4 sm:mt-7 sm:p-5 md:flex-row md:items-center md:justify-between">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <p className="text-sm font-semibold text-white">
                  {sectionNames[activeTab]}
                </p>

                {currentSectionDirty && (
                  <span className="rounded-full border border-[#5b4828] bg-[#211b10] px-2 py-1 text-[9px] font-semibold text-[#dfb969]">
                    Unsaved
                  </span>
                )}
              </div>

              <p className="mt-1 text-xs leading-5 text-gray-500">
                {currentSectionDirty
                  ? "This section has unsaved changes."
                  : "This section is synchronized with the server."}
              </p>

              {dirtySections.length > 0 && (
                <p className="mt-1 text-[11px] text-[#dfb969]">
                  {dirtySections.length} section(s) have unsaved changes.
                </p>
              )}
            </div>

            <button
              type="button"
              onClick={saveSection}
              disabled={saving || uploading || !currentSectionDirty}
              className={`${buttonClass} w-full shrink-0 sm:w-auto sm:min-w-40`}
            >
              {saving ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                <Save size={16} />
              )}

              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        )}

        {/* Unsaved Sections Notice */}
        {activeTab === "preview" && dirtySections.length > 0 && (
          <div className="mt-6 rounded-xl border border-[#5b4828] bg-[#211b10] p-4">
            <p className="text-sm font-semibold text-[#e3bd70]">
              Unsaved changes
            </p>

            <p className="mt-1 text-xs leading-5 text-gray-400">
              You still have unsaved changes in:{" "}
              {dirtySections.map((section) => sectionNames[section]).join(", ")}.
              Open each section and save it separately.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
