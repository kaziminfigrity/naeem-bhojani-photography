
"use client";

import { useEffect, useState, type ChangeEvent, type ReactNode } from "react";
import Image from "next/image";
import {
  Camera,
  Image as ImageIcon,
  Eye,
  Save,
  RotateCcw,
  Plus,
  Trash2,
  Upload,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Home,
  Trophy,
  Sparkles,
  BookOpen,
  Heart,
  Users,
  BriefcaseBusiness,
  MessageSquare,
} from "lucide-react";

import {
  getAboutData,
  updateAboutData,
} from "@/services/api/about.api";
import { uploadHomepageImage } from "@/services/api/upload.api";
import type {
  AboutData,
  AboutImage,
  AchievementStat,
  ExpertiseService,
  WhyChooseFeature,
} from "@/types/about.types";

type SectionKey =
  | "hero"
  | "story"
  | "achievementStats"
  | "philosophy"
  | "expertise"
  | "whyChooseUs"
  | "workTogether";

type Tab = SectionKey;

const tabs: {
  id: Tab;
  label: string;
  icon: typeof Home;
}[] = [
  { id: "hero", label: "Hero Section", icon: Home },
  { id: "achievementStats", label: "Achievement Stats", icon: Trophy },
  { id: "expertise", label: "Our Expertise", icon: BriefcaseBusiness },
  { id: "philosophy", label: "Our Philosophy", icon: Sparkles },
  { id: "story", label: "Our Story", icon: BookOpen },
  { id: "whyChooseUs", label: "Why Choose Us", icon: Heart },
  { id: "workTogether", label: "Work Together", icon: Users },
];

const emptyAbout: AboutData = {
  _id: "",
  hero: {
    backgroundImage: "",
    backgroundImageAlt: "",
    eyebrow: "",
    headingLine1: "",
    headingLine2: "",
    highlightText: "",
    highlightText2: "",
    description: "",
    buttonText: "",
    buttonLink: "",
    photographyTypes: [],
  },
  story: {
    images: [],
    eyebrow: "",
    headingLine1: "",
    headingLine2: "",
    highlightText: "",
    paragraphs: [],
    signatureText: "",
  },
  achievementStats: [],
  philosophy: {
    eyebrow: "",
    headingLine1: "",
    highlightText: "",
    description: "",
    buttonText: "",
    buttonLink: "",
    images: [],
  },
  expertise: {
    eyebrow: "",
    headingLine1: "",
    highlightText: "",
    description: "",
    buttonText: "",
    buttonLink: "",
    services: [],
  },
  whyChooseUs: {
    eyebrow: "",
    headingLine1: "",
    highlightText: "",
    description: "",
    features: [],
  },
  workTogether: {
    backgroundImage: "",
    backgroundImageAlt: "",
    eyebrow: "",
    headingLine1: "",
    highlightText: "",
    description: "",
    primaryButtonText: "",
    primaryButtonLink: "",
    secondaryButtonText: "",
    secondaryButtonLink: "",
  },
};

const inputClass =
  "w-full min-w-0 rounded-lg border border-white/10 bg-[#303039] px-3.5 py-3 text-sm text-white outline-none transition placeholder:text-gray-500 focus:border-[#e8b968]";

const labelClass = "mb-2 block text-sm font-medium text-gray-300";

function Field({
  label,
  value,
  onChange,
  placeholder,
  required,
  multiline = false,
  rows = 4,
}: {
  label: string;
  value: string | number;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  multiline?: boolean;
  rows?: number;
}) {
  return (
    <div className="min-w-0">
      <label className={labelClass}>
        {label} {required && <span className="text-amber-400">*</span>}
      </label>

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
  icon,
  children,
}: {
  title: string;
  icon: ReactNode;
  children: ReactNode;
}) {
  return (
    <section className="min-w-0 overflow-hidden rounded-xl border border-white/10 bg-[#1d1e25]">
      <div className="flex items-center gap-3 border-b border-white/10 px-5 py-4">
        <span className="text-[#edbd72]">{icon}</span>
        <h2 className="text-lg font-semibold text-white">{title}</h2>
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
    if (file) onUpload(file);
    e.target.value = "";
  };

  return (
    <div className="min-w-0 space-y-3">
      <label className={labelClass}>{label}</label>

      <div className="relative aspect-video w-full overflow-hidden rounded-lg border border-white/10 bg-[#111217]">
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
          <div className="flex h-full flex-col items-center justify-center gap-2 text-gray-500">
            <ImageIcon size={34} />
            <span className="text-sm">No image selected</span>
          </div>
        )}

        <label className="absolute bottom-3 left-3 inline-flex cursor-pointer items-center gap-2 rounded-lg bg-[#e9b96e] px-4 py-2 text-xs font-semibold text-black hover:bg-white">
          {uploading ? (
            <Loader2 size={15} className="animate-spin" />
          ) : (
            <Upload size={15} />
          )}
          {uploading ? "Uploading..." : "Change Image"}
          <input
            type="file"
            accept="image/*"
            className="hidden"
            disabled={uploading}
            onChange={handleFile}
          />
        </label>

        {value && (
          <button
            type="button"
            onClick={() => onChange("")}
            className="absolute bottom-3 right-3 rounded-lg bg-black/80 p-2 text-white hover:bg-red-600"
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
        placeholder="https://example.com/image.jpg"
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
      className={`relative h-6 w-11 shrink-0 rounded-full transition ${
        checked ? "bg-[#e9b96e]" : "bg-gray-600"
      }`}
      aria-label="Toggle active status"
    >
      <span
        className={`absolute top-1 h-4 w-4 rounded-full bg-white transition ${
          checked ? "left-6" : "left-1"
        }`}
      />
    </button>
  );
}

export default function AboutAdminPage() {
  const [about, setAbout] = useState<AboutData>(emptyAbout);
  const [original, setOriginal] = useState<AboutData>(emptyAbout);
  const [activeTab, setActiveTab] = useState<Tab>("hero");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [preview, setPreview] = useState(true);

  const dirty = JSON.stringify(about) !== JSON.stringify(original);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const response = await getAboutData();
        const data = response.data || emptyAbout;

        setAbout(data);
        setOriginal(JSON.parse(JSON.stringify(data)));
      } catch (err) {
        console.error(err);
        setError("Failed to load About page data.");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  const updateSection = <K extends keyof AboutData>(
    section: K,
    value: AboutData[K]
  ) => {
    setAbout((prev) => ({ ...prev, [section]: value }));
    setSuccess("");
  };

  const updateField = (
    section: Tab,
    field: string,
    value: unknown
  ) => {
    setAbout((prev) => ({
      ...prev,
      [section]: {
        ...(prev[section] as object),
        [field]: value,
      },
    }));
    setSuccess("");
  };

  const uploadImage = async (
    file: File,
    callback: (url: string) => void
  ) => {
    try {
      setUploading(true);
      setError("");

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

      const response = await updateAboutData(about);

      if (!response.success) {
        throw new Error(response.message || "Update failed.");
      }

      const updated = response.data;
      setAbout(updated);
      setOriginal(JSON.parse(JSON.stringify(updated)));
      setSuccess("About page updated successfully!");
    } catch (err) {
      console.error(err);
      setError("Unable to save About page changes.");
    } finally {
      setSaving(false);
    }
  };

  const resetChanges = () => {
    if (!window.confirm("Discard all unsaved changes?")) return;
    setAbout(JSON.parse(JSON.stringify(original)));
    setError("");
    setSuccess("");
  };

  const changeTab = (tab: Tab) => {
    if (dirty && !window.confirm("You have unsaved changes. Continue?")) {
      return;
    }
    setActiveTab(tab);
    setError("");
    setSuccess("");
  };

  const addString = (section: Tab, field: string) => {
    const current = (about[section] as any)[field] || [];
    updateField(section, field, [...current, ""]);
  };

  const updateString = (
    section: Tab,
    field: string,
    index: number,
    value: string
  ) => {
    const current = [...((about[section] as any)[field] || [])];
    current[index] = value;
    updateField(section, field, current);
  };

  const removeString = (section: Tab, field: string, index: number) => {
    const current = [...((about[section] as any)[field] || [])];
    current.splice(index, 1);
    updateField(section, field, current);
  };

  const addImage = (section: "story" | "philosophy") => {
    const current = [...about[section].images];
    const newImage: AboutImage = {
      src: "",
      alt: "",
      position: "",
      order: current.length + 1,
    };
    updateField(section, "images", [...current, newImage]);
  };

  const updateImage = (
    section: "story" | "philosophy",
    index: number,
    field: keyof AboutImage,
    value: string | number
  ) => {
    const images = [...about[section].images];
    images[index] = { ...images[index], [field]: value };
    updateField(section, "images", images);
  };

  const removeImage = (
    section: "story" | "philosophy",
    index: number
  ) => {
    updateField(
      section,
      "images",
      about[section].images.filter((_, i) => i !== index)
    );
  };

  const addStat = () => {
    const item: AchievementStat = {
      value: "",
      label: "",
      icon: "camera",
      order: about.achievementStats.length + 1,
      isActive: true,
    };
    updateSection("achievementStats", [...about.achievementStats, item]);
  };

  const updateStat = (
    index: number,
    field: keyof AchievementStat,
    value: unknown
  ) => {
    const items = [...about.achievementStats];
    items[index] = { ...items[index], [field]: value };
    updateSection("achievementStats", items);
  };

  const addService = () => {
    const item: ExpertiseService = {
      title: "",
      subtitle: "",
      image: "",
      alt: "",
      link: "/services",
      order: about.expertise.services.length + 1,
      isActive: true,
    };
    updateField("expertise", "services", [
      ...about.expertise.services,
      item,
    ]);
  };

  const updateService = (
    index: number,
    field: keyof ExpertiseService,
    value: unknown
  ) => {
    const items = [...about.expertise.services];
    items[index] = { ...items[index], [field]: value };
    updateField("expertise", "services", items);
  };

  const addFeature = () => {
    const item: WhyChooseFeature = {
      title: "",
      description: "",
      icon: "star",
      order: about.whyChooseUs.features.length + 1,
      isActive: true,
    };
    updateField("whyChooseUs", "features", [
      ...about.whyChooseUs.features,
      item,
    ]);
  };

  const updateFeature = (
    index: number,
    field: keyof WhyChooseFeature,
    value: unknown
  ) => {
    const items = [...about.whyChooseUs.features];
    items[index] = { ...items[index], [field]: value };
    updateField("whyChooseUs", "features", items);
  };

  const uploadForField = (
    file: File,
    section: Tab,
    field: string
  ) => {
    uploadImage(file, (url) => updateField(section, field, url));
  };

  const renderHero = () => (
    <div className="grid min-w-0 grid-cols-1 gap-6 xl:grid-cols-2">
      <div className="min-w-0 space-y-5">
        <Field
          label="Eyebrow Text"
          value={about.hero.eyebrow}
          onChange={(v) => updateField("hero", "eyebrow", v)}
          required
        />
        <Field
          label="Heading Line 1"
          value={about.hero.headingLine1}
          onChange={(v) => updateField("hero", "headingLine1", v)}
          required
        />
        <Field
          label="Heading Line 2"
          value={about.hero.headingLine2}
          onChange={(v) => updateField("hero", "headingLine2", v)}
          required
        />
        <Field
          label="Highlight Text"
          value={about.hero.highlightText}
          onChange={(v) => updateField("hero", "highlightText", v)}
          required
        />
        <Field
          label="Highlight Text 2"
          value={about.hero.highlightText2}
          onChange={(v) => updateField("hero", "highlightText2", v)}
          required
        />
        <Field
          label="Description"
          value={about.hero.description}
          onChange={(v) => updateField("hero", "description", v)}
          multiline
          rows={5}
          required
        />
        <div className="grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2">
          <Field
            label="Button Text"
            value={about.hero.buttonText}
            onChange={(v) => updateField("hero", "buttonText", v)}
          />
          <Field
            label="Button Link"
            value={about.hero.buttonLink}
            onChange={(v) => updateField("hero", "buttonLink", v)}
          />
        </div>
      </div>

      <div className="min-w-0 space-y-5">
        <ImageField
          label="Background Image"
          value={about.hero.backgroundImage}
          alt={about.hero.backgroundImageAlt}
          onChange={(v) => updateField("hero", "backgroundImage", v)}
          onAltChange={(v) => updateField("hero", "backgroundImageAlt", v)}
          onUpload={(file) =>
            uploadForField(file, "hero", "backgroundImage")
          }
          uploading={uploading}
        />

        <Panel title="Photography Types" icon={<Camera size={19} />}>
          {about.hero.photographyTypes.map((type, index) => (
            <div key={index} className="flex min-w-0 gap-2">
              <input
                className={inputClass}
                value={type}
                onChange={(e) =>
                  updateString(
                    "hero",
                    "photographyTypes",
                    index,
                    e.target.value
                  )
                }
              />
              <button
                type="button"
                onClick={() =>
                  removeString("hero", "photographyTypes", index)
                }
                className="rounded-lg border border-white/10 p-3 text-red-400 hover:bg-red-500/10"
              >
                <Trash2 size={17} />
              </button>
            </div>
          ))}

          <button
            type="button"
            onClick={() => addString("hero", "photographyTypes")}
            className="inline-flex items-center gap-2 rounded-lg border border-[#e8b968]/40 px-4 py-2.5 text-sm text-[#e8b968] hover:bg-[#e8b968]/10"
          >
            <Plus size={16} /> Add Photography Type
          </button>
        </Panel>
      </div>
    </div>
  );

  const renderStory = () => (
    <div className="space-y-6">
      <div className="grid min-w-0 grid-cols-1 gap-5 md:grid-cols-2">
        <Field
          label="Eyebrow"
          value={about.story.eyebrow}
          onChange={(v) => updateField("story", "eyebrow", v)}
        />
        <Field
          label="Signature Text"
          value={about.story.signatureText}
          onChange={(v) => updateField("story", "signatureText", v)}
        />
        <Field
          label="Heading Line 1"
          value={about.story.headingLine1}
          onChange={(v) => updateField("story", "headingLine1", v)}
        />
        <Field
          label="Heading Line 2"
          value={about.story.headingLine2}
          onChange={(v) => updateField("story", "headingLine2", v)}
        />
        <Field
          label="Highlight Text"
          value={about.story.highlightText}
          onChange={(v) => updateField("story", "highlightText", v)}
        />
      </div>

      <Panel title="Story Paragraphs" icon={<BookOpen size={19} />}>
        {about.story.paragraphs.map((paragraph, index) => (
          <div key={index} className="flex min-w-0 items-start gap-2">
            <div className="min-w-0 flex-1">
              <Field
                label={`Paragraph ${index + 1}`}
                value={paragraph}
                multiline
                onChange={(v) =>
                  updateString("story", "paragraphs", index, v)
                }
              />
            </div>
            <button
              type="button"
              onClick={() =>
                removeString("story", "paragraphs", index)
              }
              className="mt-7 rounded-lg p-3 text-red-400 hover:bg-red-500/10"
            >
              <Trash2 size={17} />
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => addString("story", "paragraphs")}
          className="inline-flex items-center gap-2 rounded-lg border border-[#e8b968]/40 px-4 py-2.5 text-sm text-[#e8b968]"
        >
          <Plus size={16} /> Add Paragraph
        </button>
      </Panel>

      <Panel title="Story Image Collage" icon={<ImageIcon size={19} />}>
        <div className="grid min-w-0 grid-cols-1 gap-5 md:grid-cols-2">
          {about.story.images.map((image, index) => (
            <div
              key={image._id || index}
              className="min-w-0 space-y-3 rounded-xl border border-white/10 p-3"
            >
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-white">
                  Image {index + 1}
                </h3>
                <button
                  type="button"
                  onClick={() => removeImage("story", index)}
                  className="text-red-400"
                >
                  <Trash2 size={17} />
                </button>
              </div>

              <ImageField
                label="Image"
                value={image.src}
                alt={image.alt}
                onChange={(v) =>
                  updateImage("story", index, "src", v)
                }
                onAltChange={(v) =>
                  updateImage("story", index, "alt", v)
                }
                onUpload={(file) =>
                  uploadImage(file, (url) =>
                    updateImage("story", index, "src", url)
                  )
                }
                uploading={uploading}
              />
              <Field
                label="Position CSS Classes"
                value={image.position}
                onChange={(v) =>
                  updateImage("story", index, "position", v)
                }
                placeholder="left-[2%] top-[5%] ..."
              />
              <Field
                label="Order"
                value={image.order}
                onChange={(v) =>
                  updateImage("story", index, "order", Number(v))
                }
              />
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={() => addImage("story")}
          className="inline-flex items-center gap-2 rounded-lg bg-[#e8b968] px-4 py-2.5 text-sm font-semibold text-black"
        >
          <Plus size={16} /> Add Story Image
        </button>
      </Panel>
    </div>
  );

  const renderStats = () => (
    <Panel title="Achievement Statistics" icon={<Trophy size={19} />}>
      <div className="space-y-4">
        {about.achievementStats.map((item, index) => (
          <div
            key={item._id || index}
            className="min-w-0 space-y-4 rounded-xl border border-white/10 bg-[#17181e] p-4"
          >
            <div className="flex items-center justify-between gap-3">
              <h3 className="font-semibold text-white">
                Statistic {index + 1}
              </h3>
              <div className="flex items-center gap-3">
                <Toggle
                  checked={item.isActive}
                  onChange={(v) => updateStat(index, "isActive", v)}
                />
                <button
                  type="button"
                  onClick={() =>
                    updateSection(
                      "achievementStats",
                      about.achievementStats.filter((_, i) => i !== index)
                    )
                  }
                  className="text-red-400"
                >
                  <Trash2 size={17} />
                </button>
              </div>
            </div>

            <div className="grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2">
              <Field
                label="Value"
                value={item.value}
                onChange={(v) => updateStat(index, "value", v)}
                placeholder="500+"
              />
              <Field
                label="Label"
                value={item.label}
                onChange={(v) => updateStat(index, "label", v)}
                placeholder="Projects Completed"
              />
              <Field
                label="Icon"
                value={item.icon}
                onChange={(v) => updateStat(index, "icon", v)}
                placeholder="camera"
              />
              <Field
                label="Order"
                value={item.order}
                onChange={(v) =>
                  updateStat(index, "order", Number(v))
                }
              />
            </div>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={addStat}
        className="inline-flex items-center gap-2 rounded-lg bg-[#e8b968] px-4 py-3 text-sm font-semibold text-black"
      >
        <Plus size={17} /> Add Statistic
      </button>
    </Panel>
  );

  const renderPhilosophy = () => (
    <div className="space-y-6">
      <div className="grid min-w-0 grid-cols-1 gap-5 md:grid-cols-2">
        <Field
          label="Eyebrow"
          value={about.philosophy.eyebrow}
          onChange={(v) => updateField("philosophy", "eyebrow", v)}
        />
        <Field
          label="Heading Line 1"
          value={about.philosophy.headingLine1}
          onChange={(v) => updateField("philosophy", "headingLine1", v)}
        />
        <Field
          label="Highlight Text"
          value={about.philosophy.highlightText}
          onChange={(v) => updateField("philosophy", "highlightText", v)}
        />
        <Field
          label="Button Text"
          value={about.philosophy.buttonText}
          onChange={(v) => updateField("philosophy", "buttonText", v)}
        />
        <Field
          label="Button Link"
          value={about.philosophy.buttonLink}
          onChange={(v) => updateField("philosophy", "buttonLink", v)}
        />
      </div>

      <Field
        label="Description"
        value={about.philosophy.description}
        onChange={(v) => updateField("philosophy", "description", v)}
        multiline
      />

      <Panel title="Philosophy Image Collage" icon={<ImageIcon size={19} />}>
        <div className="grid min-w-0 grid-cols-1 gap-5 md:grid-cols-2">
          {about.philosophy.images.map((image, index) => (
            <div
              key={image._id || index}
              className="min-w-0 space-y-3 rounded-xl border border-white/10 p-3"
            >
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-white">
                  Image {index + 1}
                </h3>
                <button
                  type="button"
                  onClick={() => removeImage("philosophy", index)}
                  className="text-red-400"
                >
                  <Trash2 size={17} />
                </button>
              </div>
              <ImageField
                label="Image"
                value={image.src}
                alt={image.alt}
                onChange={(v) =>
                  updateImage("philosophy", index, "src", v)
                }
                onAltChange={(v) =>
                  updateImage("philosophy", index, "alt", v)
                }
                onUpload={(file) =>
                  uploadImage(file, (url) =>
                    updateImage("philosophy", index, "src", url)
                  )
                }
                uploading={uploading}
              />
              <Field
                label="Position CSS Classes"
                value={image.position}
                onChange={(v) =>
                  updateImage("philosophy", index, "position", v)
                }
                placeholder="left-[3%] top-[5%] ..."
              />
              <Field
                label="Order"
                value={image.order}
                onChange={(v) =>
                  updateImage("philosophy", index, "order", Number(v))
                }
              />
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={() => addImage("philosophy")}
          className="inline-flex items-center gap-2 rounded-lg bg-[#e8b968] px-4 py-2.5 text-sm font-semibold text-black"
        >
          <Plus size={16} /> Add Philosophy Image
        </button>
      </Panel>
    </div>
  );

  const renderExpertise = () => (
    <div className="space-y-6">
      <div className="grid min-w-0 grid-cols-1 gap-5 md:grid-cols-2">
        <Field
          label="Eyebrow"
          value={about.expertise.eyebrow}
          onChange={(v) => updateField("expertise", "eyebrow", v)}
        />
        <Field
          label="Heading Line 1"
          value={about.expertise.headingLine1}
          onChange={(v) => updateField("expertise", "headingLine1", v)}
        />
        <Field
          label="Highlight Text"
          value={about.expertise.highlightText}
          onChange={(v) => updateField("expertise", "highlightText", v)}
        />
        <Field
          label="Button Text"
          value={about.expertise.buttonText}
          onChange={(v) => updateField("expertise", "buttonText", v)}
        />
        <Field
          label="Button Link"
          value={about.expertise.buttonLink}
          onChange={(v) => updateField("expertise", "buttonLink", v)}
        />
      </div>

      <Field
        label="Description"
        value={about.expertise.description}
        onChange={(v) => updateField("expertise", "description", v)}
        multiline
      />

      <Panel title="Photography Services" icon={<Camera size={19} />}>
        <div className="grid min-w-0 grid-cols-1 gap-5 md:grid-cols-2">
          {about.expertise.services.map((service, index) => (
            <div
              key={service._id || index}
              className="min-w-0 space-y-4 rounded-xl border border-white/10 bg-[#17181e] p-4"
            >
              <div className="flex items-center justify-between gap-3">
                <h3 className="font-semibold text-white">
                  Service {index + 1}
                </h3>
                <div className="flex items-center gap-3">
                  <Toggle
                    checked={service.isActive}
                    onChange={(v) =>
                      updateService(index, "isActive", v)
                    }
                  />
                  <button
                    type="button"
                    onClick={() =>
                      updateField(
                        "expertise",
                        "services",
                        about.expertise.services.filter((_, i) => i !== index)
                      )
                    }
                    className="text-red-400"
                  >
                    <Trash2 size={17} />
                  </button>
                </div>
              </div>

              <ImageField
                label="Service Image"
                value={service.image}
                alt={service.alt}
                onChange={(v) => updateService(index, "image", v)}
                onAltChange={(v) => updateService(index, "alt", v)}
                onUpload={(file) =>
                  uploadImage(file, (url) =>
                    updateService(index, "image", url)
                  )
                }
                uploading={uploading}
              />

              <Field
                label="Title"
                value={service.title}
                onChange={(v) => updateService(index, "title", v)}
              />
              <Field
                label="Subtitle"
                value={service.subtitle}
                onChange={(v) => updateService(index, "subtitle", v)}
              />
              <Field
                label="Link"
                value={service.link}
                onChange={(v) => updateService(index, "link", v)}
              />
              <Field
                label="Order"
                value={service.order}
                onChange={(v) =>
                  updateService(index, "order", Number(v))
                }
              />
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={addService}
          className="inline-flex items-center gap-2 rounded-lg bg-[#e8b968] px-4 py-3 text-sm font-semibold text-black"
        >
          <Plus size={17} /> Add Service
        </button>
      </Panel>
    </div>
  );

  const renderWhyChooseUs = () => (
    <div className="space-y-6">
      <div className="grid min-w-0 grid-cols-1 gap-5 md:grid-cols-2">
        <Field
          label="Eyebrow"
          value={about.whyChooseUs.eyebrow}
          onChange={(v) => updateField("whyChooseUs", "eyebrow", v)}
        />
        <Field
          label="Heading Line 1"
          value={about.whyChooseUs.headingLine1}
          onChange={(v) => updateField("whyChooseUs", "headingLine1", v)}
        />
        <Field
          label="Highlight Text"
          value={about.whyChooseUs.highlightText}
          onChange={(v) => updateField("whyChooseUs", "highlightText", v)}
        />
      </div>

      <Field
        label="Description"
        value={about.whyChooseUs.description}
        onChange={(v) => updateField("whyChooseUs", "description", v)}
        multiline
      />

      <Panel title="Why Choose Us Features" icon={<Heart size={19} />}>
        <div className="space-y-4">
          {about.whyChooseUs.features.map((feature, index) => (
            <div
              key={feature._id || index}
              className="min-w-0 space-y-4 rounded-xl border border-white/10 bg-[#17181e] p-4"
            >
              <div className="flex items-center justify-between gap-3">
                <h3 className="font-semibold text-white">
                  Feature {index + 1}
                </h3>
                <div className="flex items-center gap-3">
                  <Toggle
                    checked={feature.isActive}
                    onChange={(v) =>
                      updateFeature(index, "isActive", v)
                    }
                  />
                  <button
                    type="button"
                    onClick={() =>
                      updateField(
                        "whyChooseUs",
                        "features",
                        about.whyChooseUs.features.filter(
                          (_, i) => i !== index
                        )
                      )
                    }
                    className="text-red-400"
                  >
                    <Trash2 size={17} />
                  </button>
                </div>
              </div>

              <Field
                label="Title"
                value={feature.title}
                onChange={(v) => updateFeature(index, "title", v)}
              />
              <Field
                label="Description"
                value={feature.description}
                onChange={(v) =>
                  updateFeature(index, "description", v)
                }
                multiline
              />
              <div className="grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2">
                <Field
                  label="Icon"
                  value={feature.icon}
                  onChange={(v) => updateFeature(index, "icon", v)}
                  placeholder="camera, star, heart..."
                />
                <Field
                  label="Order"
                  value={feature.order}
                  onChange={(v) =>
                    updateFeature(index, "order", Number(v))
                  }
                />
              </div>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={addFeature}
          className="inline-flex items-center gap-2 rounded-lg bg-[#e8b968] px-4 py-3 text-sm font-semibold text-black"
        >
          <Plus size={17} /> Add Feature
        </button>
      </Panel>
    </div>
  );

  const renderWorkTogether = () => (
    <div className="grid min-w-0 grid-cols-1 gap-6 xl:grid-cols-2">
      <div className="min-w-0 space-y-5">
        <Field
          label="Eyebrow"
          value={about.workTogether.eyebrow}
          onChange={(v) => updateField("workTogether", "eyebrow", v)}
        />
        <Field
          label="Heading Line 1"
          value={about.workTogether.headingLine1}
          onChange={(v) => updateField("workTogether", "headingLine1", v)}
        />
        <Field
          label="Highlight Text"
          value={about.workTogether.highlightText}
          onChange={(v) => updateField("workTogether", "highlightText", v)}
        />
        <Field
          label="Description"
          value={about.workTogether.description}
          onChange={(v) => updateField("workTogether", "description", v)}
          multiline
        />
        <div className="grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2">
          <Field
            label="Primary Button Text"
            value={about.workTogether.primaryButtonText}
            onChange={(v) =>
              updateField("workTogether", "primaryButtonText", v)
            }
          />
          <Field
            label="Primary Button Link"
            value={about.workTogether.primaryButtonLink}
            onChange={(v) =>
              updateField("workTogether", "primaryButtonLink", v)
            }
          />
          <Field
            label="Secondary Button Text"
            value={about.workTogether.secondaryButtonText}
            onChange={(v) =>
              updateField("workTogether", "secondaryButtonText", v)
            }
          />
          <Field
            label="Secondary Button Link"
            value={about.workTogether.secondaryButtonLink}
            onChange={(v) =>
              updateField("workTogether", "secondaryButtonLink", v)
            }
          />
        </div>
      </div>

      <ImageField
        label="Background Image"
        value={about.workTogether.backgroundImage}
        alt={about.workTogether.backgroundImageAlt}
        onChange={(v) => updateField("workTogether", "backgroundImage", v)}
        onAltChange={(v) =>
          updateField("workTogether", "backgroundImageAlt", v)
        }
        onUpload={(file) =>
          uploadForField(file, "workTogether", "backgroundImage")
        }
        uploading={uploading}
      />
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case "hero":
        return renderHero();
      case "story":
        return renderStory();
      case "achievementStats":
        return renderStats();
      case "philosophy":
        return renderPhilosophy();
      case "expertise":
        return renderExpertise();
      case "whyChooseUs":
        return renderWhyChooseUs();
      case "workTogether":
        return renderWorkTogether();
      default:
        return null;
    }
  };

  const renderPreview = () => (
    <div className="min-w-0 overflow-hidden rounded-xl border border-white/10 bg-[#1d1e25]">
      <div className="flex items-center justify-between gap-3 border-b border-white/10 px-4 py-4">
        <div className="flex items-center gap-2 text-white">
          <Eye size={19} className="text-[#e8b968]" />
          <h3 className="font-semibold">Live Preview</h3>
        </div>
        <span className="text-xs text-gray-400">Current section</span>
      </div>

      {activeTab === "hero" && (
        <div className="relative flex min-h-[560px] flex-col justify-between overflow-hidden bg-black p-5 sm:p-7">
          {about.hero.backgroundImage && (
            <Image
              src={about.hero.backgroundImage}
              alt=""
              fill
              unoptimized
              className="object-cover opacity-50"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/75 to-transparent" />

          <div className="relative z-10">
            <p className="mb-10 text-sm text-[#e8b968]">
              Home &nbsp; › &nbsp; About Us
            </p>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-[#e8b968]">
              {about.hero.eyebrow || "About Us"}
            </p>
            <h2 className="max-w-xl break-words font-serif text-4xl leading-tight text-white sm:text-5xl">
              {about.hero.headingLine1}
              <br />
              {about.hero.headingLine2}{" "}
              <span className="text-[#e8b968]">
                {about.hero.highlightText}
              </span>
              <br />
              <span className="italic text-[#e8b968]">
                {about.hero.highlightText2}
              </span>
            </h2>
            <p className="mt-6 max-w-lg text-sm leading-7 text-white/80">
              {about.hero.description}
            </p>
            <span className="mt-7 inline-flex rounded-full bg-[#e8b968] px-6 py-3 text-sm font-semibold text-black">
              {about.hero.buttonText || "Our Story"} →
            </span>
          </div>

          <div className="relative z-10 flex flex-wrap gap-3 border-t border-white/20 pt-5 text-xs text-white">
            {about.hero.photographyTypes.map((type, index) => (
              <span key={index}>{type}</span>
            ))}
          </div>
        </div>
      )}

      {activeTab === "story" && (
        <div className="space-y-5 p-5">
          <p className="text-xs uppercase tracking-[0.3em] text-[#e8b968]">
            {about.story.eyebrow}
          </p>
          <h2 className="font-serif text-3xl text-white">
            {about.story.headingLine1} {about.story.headingLine2}{" "}
            <span className="text-[#e8b968]">
              {about.story.highlightText}
            </span>
          </h2>
          {about.story.images.length > 0 && (
            <div className="grid grid-cols-2 gap-2">
              {about.story.images.slice(0, 4).map((image, index) => (
                <div
                  key={index}
                  className="relative aspect-square overflow-hidden rounded-lg bg-black"
                >
                  {image.src && (
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      unoptimized
                      className="object-cover"
                    />
                  )}
                </div>
              ))}
            </div>
          )}
          {about.story.paragraphs.map((p, i) => (
            <p key={i} className="text-sm leading-7 text-gray-300">
              {p}
            </p>
          ))}
          <p className="font-serif italic text-[#e8b968]">
            {about.story.signatureText}
          </p>
        </div>
      )}

      {activeTab === "achievementStats" && (
        <div className="grid grid-cols-2 gap-3 p-5">
          {about.achievementStats
            .filter((item) => item.isActive)
            .map((item, index) => (
              <div
                key={index}
                className="rounded-lg border border-[#e8b968]/20 bg-black/40 p-4"
              >
                <Trophy className="mb-3 text-[#e8b968]" />
                <p className="text-2xl font-bold text-[#e8b968]">
                  {item.value}
                </p>
                <p className="mt-1 text-sm text-gray-300">{item.label}</p>
              </div>
            ))}
        </div>
      )}

      {activeTab === "philosophy" && (
        <div className="space-y-5 p-5">
          <p className="text-xs uppercase tracking-[0.3em] text-[#e8b968]">
            {about.philosophy.eyebrow}
          </p>
          <h2 className="font-serif text-3xl text-white">
            {about.philosophy.headingLine1}{" "}
            <span className="text-[#e8b968]">
              {about.philosophy.highlightText}
            </span>
          </h2>
          <p className="text-sm leading-7 text-gray-300">
            {about.philosophy.description}
          </p>
          <div className="grid grid-cols-2 gap-2">
            {about.philosophy.images.map((image, index) => (
              <div
                key={index}
                className="relative aspect-square overflow-hidden rounded-lg bg-black"
              >
                {image.src && (
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    unoptimized
                    className="object-cover"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "expertise" && (
        <div className="space-y-5 p-5">
          <p className="text-xs uppercase tracking-[0.3em] text-[#e8b968]">
            {about.expertise.eyebrow}
          </p>
          <h2 className="font-serif text-3xl text-white">
            {about.expertise.headingLine1}{" "}
            <span className="text-[#e8b968]">
              {about.expertise.highlightText}
            </span>
          </h2>
          <p className="text-sm leading-7 text-gray-300">
            {about.expertise.description}
          </p>
          <div className="grid grid-cols-2 gap-3">
            {about.expertise.services
              .filter((service) => service.isActive)
              .map((service, index) => (
                <div
                  key={index}
                  className="relative flex aspect-[0.9/1] items-end overflow-hidden rounded-lg bg-black p-3"
                >
                  {service.image && (
                    <Image
                      src={service.image}
                      alt={service.alt}
                      fill
                      unoptimized
                      className="object-cover opacity-70"
                    />
                  )}
                  <p className="relative z-10 text-sm font-semibold text-white">
                    {service.title} {service.subtitle}
                  </p>
                </div>
              ))}
          </div>
        </div>
      )}

      {activeTab === "whyChooseUs" && (
        <div className="space-y-5 p-5">
          <p className="text-xs uppercase tracking-[0.3em] text-[#e8b968]">
            {about.whyChooseUs.eyebrow}
          </p>
          <h2 className="font-serif text-3xl text-white">
            {about.whyChooseUs.headingLine1}{" "}
            <span className="text-[#e8b968]">
              {about.whyChooseUs.highlightText}
            </span>
          </h2>
          <p className="text-sm leading-7 text-gray-300">
            {about.whyChooseUs.description}
          </p>
          {about.whyChooseUs.features
            .filter((feature) => feature.isActive)
            .map((feature, index) => (
              <div key={index} className="border-b border-white/10 pb-4">
                <h3 className="font-semibold text-[#e8b968]">
                  {feature.title}
                </h3>
                <p className="mt-1 text-sm text-gray-300">
                  {feature.description}
                </p>
              </div>
            ))}
        </div>
      )}

      {activeTab === "workTogether" && (
        <div className="relative flex min-h-[500px] flex-col justify-center overflow-hidden bg-black p-6 sm:p-8">
          {about.workTogether.backgroundImage && (
            <Image
              src={about.workTogether.backgroundImage}
              alt=""
              fill
              unoptimized
              className="object-cover opacity-40"
            />
          )}
          <div className="absolute inset-0 bg-black/50" />
          <div className="relative z-10">
            <p className="text-xs uppercase tracking-[0.3em] text-[#e8b968]">
              {about.workTogether.eyebrow}
            </p>
            <h2 className="mt-5 font-serif text-4xl text-white">
              {about.workTogether.headingLine1}
              <br />
              <span className="text-[#e8b968]">
                {about.workTogether.highlightText}
              </span>
            </h2>
            <p className="mt-5 text-sm leading-7 text-gray-200">
              {about.workTogether.description}
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <span className="rounded-full bg-[#e8b968] px-5 py-3 text-sm font-semibold text-black">
                {about.workTogether.primaryButtonText}
              </span>
              <span className="rounded-full border border-white/40 px-5 py-3 text-sm text-white">
                {about.workTogether.secondaryButtonText}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#111217] text-[#e8b968]">
        <Loader2 size={38} className="animate-spin" />
      </div>
    );
  }

  const activeLabel =
    tabs.find((tab) => tab.id === activeTab)?.label || "About Section";

  return (
    <main className="min-h-screen w-full overflow-x-hidden bg-[#111217] text-white">
      {/* Top Header */}
      <header className="sticky top-0 z-30 flex min-h-[68px] flex-wrap items-center justify-between gap-3 border-b border-white/10 bg-[#17181e]/95 px-4 py-3 backdrop-blur sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#e8b968]/10 text-[#e8b968]">
            <Camera size={23} />
          </div>
          <div>
            <p className="font-serif text-lg font-bold">LensCraft</p>
            <p className="text-[10px] text-gray-400">Admin Panel</p>
          </div>
        </div>

        <a
          href="/about"
          target="_blank"
          rel="noreferrer"
          className="rounded-lg bg-[#e8b968] px-4 py-2.5 text-xs font-semibold text-black transition hover:bg-white"
        >
          View Website ↗
        </a>
      </header>

      <div className="mx-auto w-full max-w-[1800px] min-w-0 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
        {/* Page Heading */}
        <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
          <div className="min-w-0">
            <h1 className="font-serif text-3xl font-bold sm:text-4xl">
              About Page Management
            </h1>
            <p className="mt-2 text-sm text-gray-400 sm:text-base">
              Update your about page content and images
            </p>
          </div>

          <button
            type="button"
            onClick={() => setPreview(!preview)}
            className="inline-flex items-center gap-2 rounded-lg border border-white/10 px-4 py-2.5 text-sm text-gray-300 hover:border-[#e8b968] hover:text-[#e8b968]"
          >
            <Eye size={17} />
            {preview ? "Hide Preview" : "Show Preview"}
          </button>
        </div>

        {/* Responsive Tabs - No Horizontal Scroll */}
        <nav className="mb-6 grid min-w-0 grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => changeTab(tab.id)}
                className={`flex min-w-0 items-center justify-center gap-2 rounded-lg border px-2 py-3 text-center text-xs font-medium transition sm:px-3 sm:text-sm ${
                  active
                    ? "border-[#e8b968] bg-[#e8b968]/10 text-[#e8b968]"
                    : "border-white/10 bg-[#1d1e25] text-gray-400 hover:border-white/30 hover:text-white"
                }`}
              >
                <Icon size={16} className="shrink-0" />
                <span className="break-words">{tab.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Status Messages */}
        {error && (
          <div className="mb-5 flex items-start gap-2 rounded-lg border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-300">
            <AlertCircle size={18} className="mt-0.5 shrink-0" />
            <span className="break-words">{error}</span>
          </div>
        )}

        {success && (
          <div className="mb-5 flex items-start gap-2 rounded-lg border border-green-500/20 bg-green-500/10 p-3 text-sm text-green-300">
            <CheckCircle2 size={18} className="mt-0.5 shrink-0" />
            {success}
          </div>
        )}

        {/* Editor + Preview */}
        <div
          className={`grid min-w-0 grid-cols-1 items-start gap-5 ${
            preview ? "2xl:grid-cols-[1.15fr_0.85fr]" : ""
          }`}
        >
          <div className="min-w-0 space-y-5">
            <Panel
              title={activeLabel}
              icon={<ImageIcon size={20} />}
            >
              {renderContent()}
            </Panel>

            {/* Save Actions */}
            <div className="flex flex-col-reverse gap-3 border-t border-white/10 pt-5 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs text-gray-500">
                {dirty ? "You have unsaved changes." : "All changes saved."}
              </p>

              <div className="flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={resetChanges}
                  disabled={!dirty || saving || uploading}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-white/10 px-5 py-3 text-sm text-gray-300 transition hover:bg-white/5 disabled:cursor-not-allowed disabled:opacity-40 sm:w-auto"
                >
                  <RotateCcw size={17} />
                  Reset
                </button>

                <button
                  type="button"
                  onClick={saveChanges}
                  disabled={!dirty || saving || uploading}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#e8b968] px-6 py-3 text-sm font-semibold text-black transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-40 sm:w-auto"
                >
                  {saving ? (
                    <Loader2 size={17} className="animate-spin" />
                  ) : (
                    <Save size={17} />
                  )}
                  {saving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </div>
          </div>

          {preview && (
            <aside className="min-w-0 2xl:sticky 2xl:top-24">
              {renderPreview()}
            </aside>
          )}
        </div>

        <footer className="mt-10 border-t border-white/10 py-5 text-center text-xs text-gray-500">
          LensCraft Admin Panel · About Page Management
        </footer>
      </div>
    </main>
  );
}
