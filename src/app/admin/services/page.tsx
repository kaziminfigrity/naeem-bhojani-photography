"use client";

import { useEffect, useState, type ChangeEvent, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";

import {
  Home,
  Layers,
  Star,
  Workflow,
  Phone,
  Camera,
  Image as ImageIcon,
  Eye,
  EyeOff,
  Save,
  RotateCcw,
  Plus,
  Trash2,
  Upload,
  Loader2,
  CheckCircle2,
  AlertCircle,
  GripVertical,
  ArrowUpRight,
  X,
} from "lucide-react";

import {
  getServicesData,
  updateServicesData,
} from "@/services/api/services.api";

import { uploadHomepageImage } from "@/services/api/upload.api";

import type {
  ServicesData,
  ServiceButton,
  ServiceStat,
  ServiceCard,
  ServiceFeature,
  ProcessStep,
} from "@/types/services.types";

/* --------------------------------------------------
   TYPES
-------------------------------------------------- */

type Tab =
  | "hero"
  | "services"
  | "whyChooseUs"
  | "howItWorks"
  | "contactCTA";

/* --------------------------------------------------
   TABS
-------------------------------------------------- */

const tabs: {
  id: Tab;
  label: string;
  icon: typeof Home;
}[] = [
  { id: "hero", label: "Hero Section", icon: Home },
  { id: "services", label: "Services List", icon: Layers },
  { id: "whyChooseUs", label: "Why Choose Us", icon: Star },
  { id: "howItWorks", label: "How It Works", icon: Workflow },
  { id: "contactCTA", label: "Contact CTA", icon: Phone },
];

/* --------------------------------------------------
   EMPTY DATA
-------------------------------------------------- */

const emptyServices: ServicesData = {
  hero: {
    eyebrow: "",
    heading: "",
    subtitle: "",
    description: "",
    backgroundImage: "",
    backgroundImageAlt: "",
    buttons: [],
    stats: [],
  },

  services: {
    eyebrow: "",
    heading: "",
    description: "",
    secondaryDescription: "",
    closingText: "",
    ctaLabel: "",
    ctaHref: "",
    items: [],
  },

  whyChooseUs: {
    eyebrow: "",
    heading: "",
    description: "",
    backgroundImage: "",
    backgroundImageAlt: "",
    ctaLabel: "",
    ctaHref: "",
    features: [],
  },

  howItWorks: {
    eyebrow: "",
    heading: "",
    description: "",
    closingHeading: "",
    closingDescription: "",
    steps: [],
  },

  contactCTA: {
    eyebrow: "",
    heading: "",
    description: "",
    backgroundImage: "",
    backgroundImageAlt: "",
    buttonLabel: "",
    buttonHref: "",
    features: [],
  },
};

/* --------------------------------------------------
   COMMON STYLES
-------------------------------------------------- */

const inputClass =
  "w-full min-w-0 rounded-lg border border-white/10 bg-[#303039] px-3.5 py-3 text-sm text-white outline-none transition placeholder:text-gray-500 focus:border-[#e8b968]";

const labelClass = "mb-2 block text-sm font-medium text-gray-300";

/* --------------------------------------------------
   FIELD COMPONENT
-------------------------------------------------- */

function Field({
  label,
  value,
  onChange,
  placeholder,
  multiline = false,
  rows = 4,
}: {
  label: string;
  value: string | number;
  onChange: (value: string) => void;
  placeholder?: string;
  multiline?: boolean;
  rows?: number;
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
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          className={inputClass}
        />
      )}
    </div>
  );
}

/* --------------------------------------------------
   PANEL COMPONENT
-------------------------------------------------- */

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

/* --------------------------------------------------
   IMAGE FIELD
-------------------------------------------------- */

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

/* --------------------------------------------------
   TOGGLE
-------------------------------------------------- */

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

/* --------------------------------------------------
   ARRAY ITEM HEADER
-------------------------------------------------- */

function ItemHeader({
  title,
  index,
  onRemove,
  active,
  onToggle,
}: {
  title: string;
  index: number;
  onRemove: () => void;
  active?: boolean;
  onToggle?: () => void;
}) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-3">
      <div className="flex items-center gap-2">
        <GripVertical size={17} className="text-gray-500" />

        <span className="text-sm font-semibold text-white">
          {title} {index + 1}
        </span>
      </div>

      <div className="flex items-center gap-3">
        {onToggle && (
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-400">
              {active ? "Active" : "Inactive"}
            </span>

            <Toggle checked={!!active} onChange={onToggle} />
          </div>
        )}

        <button
          type="button"
          onClick={onRemove}
          className="rounded-lg border border-red-500/20 p-2 text-red-400 transition hover:bg-red-500/10"
        >
          <Trash2 size={15} />
        </button>
      </div>
    </div>
  );
}

/* --------------------------------------------------
   ADMIN PAGE
-------------------------------------------------- */

export default function ServicesAdminPage() {
  const [services, setServices] = useState<ServicesData>(emptyServices);
  const [original, setOriginal] = useState<ServicesData>(emptyServices);

  const [activeTab, setActiveTab] = useState<Tab>("hero");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [preview, setPreview] = useState(false);

  const dirty =
    JSON.stringify(services) !== JSON.stringify(original);

  /* --------------------------------------------------
     FETCH DATA
  -------------------------------------------------- */

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);

        const response = await getServicesData();

        if (!response.success || !response.data) {
          throw new Error("Services data not found.");
        }

        const data = response.data;

        setServices(data);
        setOriginal(JSON.parse(JSON.stringify(data)));
      } catch (err) {
        console.error(err);
        setError("Failed to load Services page data.");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  /* --------------------------------------------------
     UPDATE FIELD
  -------------------------------------------------- */

  const updateField = (
    section: Tab,
    field: string,
    value: unknown
  ) => {
    setServices((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));

    setSuccess("");
  };

  /* --------------------------------------------------
     UPDATE IMAGE
  -------------------------------------------------- */

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

  /* --------------------------------------------------
     SAVE CHANGES
  -------------------------------------------------- */

  const saveChanges = async () => {
    try {
      setSaving(true);
      setError("");
      setSuccess("");

      const response = await updateServicesData(services);

      if (!response.success) {
        throw new Error(response.message || "Update failed.");
      }

      const updated = response.data;

      setServices(updated);
      setOriginal(JSON.parse(JSON.stringify(updated)));

      setSuccess("Services page updated successfully!");
    } catch (err) {
      console.error(err);
      setError("Unable to save Services page changes.");
    } finally {
      setSaving(false);
    }
  };

  /* --------------------------------------------------
     RESET
  -------------------------------------------------- */

  const resetChanges = () => {
    if (!window.confirm("Discard all unsaved changes?")) return;

    setServices(JSON.parse(JSON.stringify(original)));
    setError("");
    setSuccess("");
  };

  /* --------------------------------------------------
     CHANGE TAB
  -------------------------------------------------- */

  const changeTab = (tab: Tab) => {
    if (
      dirty &&
      !window.confirm("You have unsaved changes. Continue?")
    ) {
      return;
    }

    setActiveTab(tab);
    setError("");
    setSuccess("");
  };

  /* --------------------------------------------------
     BUTTONS
  -------------------------------------------------- */

  const addButton = () => {
    const item: ServiceButton = {
      label: "",
      href: "",
      order: services.hero.buttons.length + 1,
    };

    updateField("hero", "buttons", [
      ...services.hero.buttons,
      item,
    ]);
  };

  const updateButton = (
    index: number,
    field: keyof ServiceButton,
    value: string | number
  ) => {
    const items = [...services.hero.buttons];

    items[index] = {
      ...items[index],
      [field]: value,
    };

    updateField("hero", "buttons", items);
  };

  const removeButton = (index: number) => {
    updateField(
      "hero",
      "buttons",
      services.hero.buttons.filter((_, i) => i !== index)
    );
  };

  /* --------------------------------------------------
     STATS
  -------------------------------------------------- */

  const addStat = () => {
    const item: ServiceStat = {
      value: "",
      label: "",
      icon: "camera",
      order: services.hero.stats.length + 1,
      isActive: true,
    };

    updateField("hero", "stats", [
      ...services.hero.stats,
      item,
    ]);
  };

  const updateStat = (
    index: number,
    field: keyof ServiceStat,
    value: string | number | boolean
  ) => {
    const items = [...services.hero.stats];

    items[index] = {
      ...items[index],
      [field]: value,
    };

    updateField("hero", "stats", items);
  };

  const removeStat = (index: number) => {
    updateField(
      "hero",
      "stats",
      services.hero.stats.filter((_, i) => i !== index)
    );
  };

  /* --------------------------------------------------
     SERVICE ITEMS
  -------------------------------------------------- */

  const addService = () => {
    const item: ServiceCard = {
      number: String(services.services.items.length + 1).padStart(2, "0"),
      title: "",
      description: "",
      image: "",
      alt: "",
      href: "",
      order: services.services.items.length + 1,
      isActive: true,
    };

    updateField("services", "items", [
      ...services.services.items,
      item,
    ]);
  };

  const updateService = (
    index: number,
    field: keyof ServiceCard,
    value: string | number | boolean
  ) => {
    const items = [...services.services.items];

    items[index] = {
      ...items[index],
      [field]: value,
    };

    updateField("services", "items", items);
  };

  const removeService = (index: number) => {
    updateField(
      "services",
      "items",
      services.services.items.filter((_, i) => i !== index)
    );
  };

  /* --------------------------------------------------
     FEATURES
  -------------------------------------------------- */

  const addFeature = (section: "whyChooseUs" | "contactCTA") => {
    const current = services[section].features;

    const item: ServiceFeature = {
      title: "",
      subtitle: "",
      description: "",
      icon: "camera",
      order: current.length + 1,
      isActive: true,
    };

    updateField(section, "features", [...current, item]);
  };

  const updateFeature = (
    section: "whyChooseUs" | "contactCTA",
    index: number,
    field: keyof ServiceFeature,
    value: string | number | boolean
  ) => {
    const items = [...services[section].features];

    items[index] = {
      ...items[index],
      [field]: value,
    };

    updateField(section, "features", items);
  };

  const removeFeature = (
    section: "whyChooseUs" | "contactCTA",
    index: number
  ) => {
    updateField(
      section,
      "features",
      services[section].features.filter((_, i) => i !== index)
    );
  };

  /* --------------------------------------------------
     PROCESS STEPS
  -------------------------------------------------- */

  const addStep = () => {
    const item: ProcessStep = {
      number: String(services.howItWorks.steps.length + 1).padStart(2, "0"),
      eyebrow: "",
      title: "",
      description: "",
      icon: "camera",
      order: services.howItWorks.steps.length + 1,
      isActive: true,
    };

    updateField("howItWorks", "steps", [
      ...services.howItWorks.steps,
      item,
    ]);
  };

  const updateStep = (
    index: number,
    field: keyof ProcessStep,
    value: string | number | boolean
  ) => {
    const items = [...services.howItWorks.steps];

    items[index] = {
      ...items[index],
      [field]: value,
    };

    updateField("howItWorks", "steps", items);
  };

  const removeStep = (index: number) => {
    updateField(
      "howItWorks",
      "steps",
      services.howItWorks.steps.filter((_, i) => i !== index)
    );
  };

  /* --------------------------------------------------
     LOADING SCREEN
  -------------------------------------------------- */

  if (loading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center bg-[#111217]">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="animate-spin text-[#e8b968]" size={36} />
          <p className="text-sm text-gray-400">
            Loading Services Page...
          </p>
        </div>
      </div>
    );
  }

  /* --------------------------------------------------
     HERO SECTION
  -------------------------------------------------- */

  const renderHero = () => (
    <div className="space-y-6">
      <Panel
        title="Hero Section"
        icon={<Camera size={21} />}
      >
        <div className="grid gap-5 lg:grid-cols-2">
          <Field
            label="Eyebrow Text"
            value={services.hero.eyebrow}
            onChange={(v) => updateField("hero", "eyebrow", v)}
          />

          <Field
            label="Main Heading"
            value={services.hero.heading}
            onChange={(v) => updateField("hero", "heading", v)}
          />
        </div>

        <Field
          label="Subtitle"
          value={services.hero.subtitle}
          onChange={(v) => updateField("hero", "subtitle", v)}
        />

        <Field
          label="Description"
          value={services.hero.description}
          multiline
          onChange={(v) => updateField("hero", "description", v)}
        />

        <ImageField
          label="Hero Background Image"
          value={services.hero.backgroundImage}
          alt={services.hero.backgroundImageAlt}
          onChange={(v) => updateField("hero", "backgroundImage", v)}
          onAltChange={(v) =>
            updateField("hero", "backgroundImageAlt", v)
          }
          onUpload={(file) =>
            uploadImage(file, (url) =>
              updateField("hero", "backgroundImage", url)
            )
          }
          uploading={uploading}
        />
      </Panel>

      <Panel
        title="Hero Buttons"
        icon={<ArrowUpRight size={21} />}
      >
        {services.hero.buttons.map((button, index) => (
          <div
            key={index}
            className="rounded-lg border border-white/10 bg-[#17181e] p-4"
          >
            <ItemHeader
              title="Button"
              index={index}
              onRemove={() => removeButton(index)}
            />

            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <Field
                label="Button Label"
                value={button.label}
                onChange={(v) => updateButton(index, "label", v)}
              />

              <Field
                label="Button Link"
                value={button.href}
                onChange={(v) => updateButton(index, "href", v)}
              />
            </div>

            <div className="mt-4">
              <Field
                label="Display Order"
                value={button.order}
                onChange={(v) =>
                  updateButton(index, "order", Number(v))
                }
              />
            </div>
          </div>
        ))}

        <button
          type="button"
          onClick={addButton}
          className="inline-flex items-center gap-2 rounded-lg border border-[#e8b968] px-4 py-2.5 text-sm font-medium text-[#e8b968] hover:bg-[#e8b968]/10"
        >
          <Plus size={17} />
          Add Button
        </button>
      </Panel>

      <Panel
        title="Hero Statistics"
        icon={<Star size={21} />}
      >
        {services.hero.stats.map((stat, index) => (
          <div
            key={index}
            className="rounded-lg border border-white/10 bg-[#17181e] p-4"
          >
            <ItemHeader
              title="Statistic"
              index={index}
              active={stat.isActive}
              onToggle={() =>
                updateStat(index, "isActive", !stat.isActive)
              }
              onRemove={() => removeStat(index)}
            />

            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <Field
                label="Value"
                value={stat.value}
                onChange={(v) => updateStat(index, "value", v)}
              />

              <Field
                label="Label"
                value={stat.label}
                onChange={(v) => updateStat(index, "label", v)}
              />

              <Field
                label="Icon Name"
                value={stat.icon}
                onChange={(v) => updateStat(index, "icon", v)}
              />

              <Field
                label="Display Order"
                value={stat.order}
                onChange={(v) =>
                  updateStat(index, "order", Number(v))
                }
              />
            </div>
          </div>
        ))}

        <button
          type="button"
          onClick={addStat}
          className="inline-flex items-center gap-2 rounded-lg border border-[#e8b968] px-4 py-2.5 text-sm font-medium text-[#e8b968] hover:bg-[#e8b968]/10"
        >
          <Plus size={17} />
          Add Statistic
        </button>
      </Panel>
    </div>
  );

  /* --------------------------------------------------
     SERVICES LIST
  -------------------------------------------------- */

  const renderServices = () => (
    <div className="space-y-6">
      <Panel
        title="Services Section Content"
        icon={<Layers size={21} />}
      >
        <Field
          label="Eyebrow Text"
          value={services.services.eyebrow}
          onChange={(v) => updateField("services", "eyebrow", v)}
        />

        <Field
          label="Heading"
          value={services.services.heading}
          onChange={(v) => updateField("services", "heading", v)}
        />

        <Field
          label="Description"
          value={services.services.description}
          multiline
          onChange={(v) => updateField("services", "description", v)}
        />

        <Field
          label="Secondary Description"
          value={services.services.secondaryDescription}
          multiline
          onChange={(v) =>
            updateField("services", "secondaryDescription", v)
          }
        />

        <Field
          label="Closing Text"
          value={services.services.closingText}
          multiline
          onChange={(v) =>
            updateField("services", "closingText", v)
          }
        />

        <div className="grid gap-4 sm:grid-cols-2">
          <Field
            label="CTA Label"
            value={services.services.ctaLabel}
            onChange={(v) => updateField("services", "ctaLabel", v)}
          />

          <Field
            label="CTA Link"
            value={services.services.ctaHref}
            onChange={(v) => updateField("services", "ctaHref", v)}
          />
        </div>
      </Panel>

      <Panel
        title="Service Cards"
        icon={<ImageIcon size={21} />}
      >
        {services.services.items.map((service, index) => (
          <div
            key={index}
            className="space-y-5 rounded-xl border border-white/10 bg-[#17181e] p-4 sm:p-5"
          >
            <ItemHeader
              title="Service"
              index={index}
              active={service.isActive}
              onToggle={() =>
                updateService(index, "isActive", !service.isActive)
              }
              onRemove={() => removeService(index)}
            />

            <div className="grid gap-4 sm:grid-cols-2">
              <Field
                label="Service Number"
                value={service.number}
                onChange={(v) => updateService(index, "number", v)}
              />

              <Field
                label="Service Title"
                value={service.title}
                onChange={(v) => updateService(index, "title", v)}
              />
            </div>

            <Field
              label="Description"
              value={service.description}
              multiline
              onChange={(v) =>
                updateService(index, "description", v)
              }
            />

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

            <div className="grid gap-4 sm:grid-cols-2">
              <Field
                label="Service Link"
                value={service.href}
                onChange={(v) => updateService(index, "href", v)}
              />

              <Field
                label="Display Order"
                value={service.order}
                onChange={(v) =>
                  updateService(index, "order", Number(v))
                }
              />
            </div>
          </div>
        ))}

        <button
          type="button"
          onClick={addService}
          className="inline-flex items-center gap-2 rounded-lg border border-[#e8b968] px-4 py-2.5 text-sm font-medium text-[#e8b968] hover:bg-[#e8b968]/10"
        >
          <Plus size={17} />
          Add Service
        </button>
      </Panel>
    </div>
  );

  /* --------------------------------------------------
     WHY CHOOSE US
  -------------------------------------------------- */

  const renderWhyChooseUs = () => (
    <div className="space-y-6">
      <Panel
        title="Why Choose Us Content"
        icon={<Star size={21} />}
      >
        <Field
          label="Eyebrow Text"
          value={services.whyChooseUs.eyebrow}
          onChange={(v) => updateField("whyChooseUs", "eyebrow", v)}
        />

        <Field
          label="Heading"
          value={services.whyChooseUs.heading}
          onChange={(v) => updateField("whyChooseUs", "heading", v)}
        />

        <Field
          label="Description"
          value={services.whyChooseUs.description}
          multiline
          onChange={(v) =>
            updateField("whyChooseUs", "description", v)
          }
        />

        <div className="grid gap-4 sm:grid-cols-2">
          <Field
            label="CTA Label"
            value={services.whyChooseUs.ctaLabel}
            onChange={(v) =>
              updateField("whyChooseUs", "ctaLabel", v)
            }
          />

          <Field
            label="CTA Link"
            value={services.whyChooseUs.ctaHref}
            onChange={(v) =>
              updateField("whyChooseUs", "ctaHref", v)
            }
          />
        </div>

        <ImageField
          label="Background Image"
          value={services.whyChooseUs.backgroundImage}
          alt={services.whyChooseUs.backgroundImageAlt}
          onChange={(v) =>
            updateField("whyChooseUs", "backgroundImage", v)
          }
          onAltChange={(v) =>
            updateField("whyChooseUs", "backgroundImageAlt", v)
          }
          onUpload={(file) =>
            uploadImage(file, (url) =>
              updateField("whyChooseUs", "backgroundImage", url)
            )
          }
          uploading={uploading}
        />
      </Panel>

      <Panel
        title="Why Choose Us Features"
        icon={<Star size={21} />}
      >
        {services.whyChooseUs.features.map((feature, index) => (
          <div
            key={index}
            className="space-y-4 rounded-xl border border-white/10 bg-[#17181e] p-4"
          >
            <ItemHeader
              title="Feature"
              index={index}
              active={feature.isActive}
              onToggle={() =>
                updateFeature(
                  "whyChooseUs",
                  index,
                  "isActive",
                  !feature.isActive
                )
              }
              onRemove={() => removeFeature("whyChooseUs", index)}
            />

            <Field
              label="Title"
              value={feature.title}
              onChange={(v) =>
                updateFeature("whyChooseUs", index, "title", v)
              }
            />

            <Field
              label="Subtitle"
              value={feature.subtitle}
              onChange={(v) =>
                updateFeature("whyChooseUs", index, "subtitle", v)
              }
            />

            <Field
              label="Description"
              value={feature.description}
              multiline
              onChange={(v) =>
                updateFeature("whyChooseUs", index, "description", v)
              }
            />

            <div className="grid gap-4 sm:grid-cols-2">
              <Field
                label="Icon Name"
                value={feature.icon}
                onChange={(v) =>
                  updateFeature("whyChooseUs", index, "icon", v)
                }
              />

              <Field
                label="Display Order"
                value={feature.order}
                onChange={(v) =>
                  updateFeature(
                    "whyChooseUs",
                    index,
                    "order",
                    Number(v)
                  )
                }
              />
            </div>
          </div>
        ))}

        <button
          type="button"
          onClick={() => addFeature("whyChooseUs")}
          className="inline-flex items-center gap-2 rounded-lg border border-[#e8b968] px-4 py-2.5 text-sm font-medium text-[#e8b968] hover:bg-[#e8b968]/10"
        >
          <Plus size={17} />
          Add Feature
        </button>
      </Panel>
    </div>
  );

  /* --------------------------------------------------
     HOW IT WORKS
  -------------------------------------------------- */

  const renderHowItWorks = () => (
    <div className="space-y-6">
      <Panel
        title="How It Works Content"
        icon={<Workflow size={21} />}
      >
        <Field
          label="Eyebrow Text"
          value={services.howItWorks.eyebrow}
          onChange={(v) => updateField("howItWorks", "eyebrow", v)}
        />

        <Field
          label="Heading"
          value={services.howItWorks.heading}
          onChange={(v) => updateField("howItWorks", "heading", v)}
        />

        <Field
          label="Description"
          value={services.howItWorks.description}
          multiline
          onChange={(v) =>
            updateField("howItWorks", "description", v)
          }
        />

        <Field
          label="Closing Heading"
          value={services.howItWorks.closingHeading}
          onChange={(v) =>
            updateField("howItWorks", "closingHeading", v)
          }
        />

        <Field
          label="Closing Description"
          value={services.howItWorks.closingDescription}
          onChange={(v) =>
            updateField("howItWorks", "closingDescription", v)
          }
        />
      </Panel>

      <Panel
        title="Process Steps"
        icon={<Workflow size={21} />}
      >
        {services.howItWorks.steps.map((step, index) => (
          <div
            key={index}
            className="space-y-4 rounded-xl border border-white/10 bg-[#17181e] p-4"
          >
            <ItemHeader
              title="Step"
              index={index}
              active={step.isActive}
              onToggle={() =>
                updateStep(index, "isActive", !step.isActive)
              }
              onRemove={() => removeStep(index)}
            />

            <div className="grid gap-4 sm:grid-cols-2">
              <Field
                label="Step Number"
                value={step.number}
                onChange={(v) => updateStep(index, "number", v)}
              />

              <Field
                label="Eyebrow"
                value={step.eyebrow}
                onChange={(v) => updateStep(index, "eyebrow", v)}
              />
            </div>

            <Field
              label="Title"
              value={step.title}
              onChange={(v) => updateStep(index, "title", v)}
            />

            <Field
              label="Description"
              value={step.description}
              multiline
              onChange={(v) => updateStep(index, "description", v)}
            />

            <div className="grid gap-4 sm:grid-cols-2">
              <Field
                label="Icon Name"
                value={step.icon}
                onChange={(v) => updateStep(index, "icon", v)}
              />

              <Field
                label="Display Order"
                value={step.order}
                onChange={(v) =>
                  updateStep(index, "order", Number(v))
                }
              />
            </div>
          </div>
        ))}

        <button
          type="button"
          onClick={addStep}
          className="inline-flex items-center gap-2 rounded-lg border border-[#e8b968] px-4 py-2.5 text-sm font-medium text-[#e8b968] hover:bg-[#e8b968]/10"
        >
          <Plus size={17} />
          Add Step
        </button>
      </Panel>
    </div>
  );

  /* --------------------------------------------------
     CONTACT CTA
  -------------------------------------------------- */

  const renderContactCTA = () => (
    <div className="space-y-6">
      <Panel
        title="Contact CTA Content"
        icon={<Phone size={21} />}
      >
        <Field
          label="Eyebrow Text"
          value={services.contactCTA.eyebrow}
          onChange={(v) => updateField("contactCTA", "eyebrow", v)}
        />

        <Field
          label="Heading"
          value={services.contactCTA.heading}
          onChange={(v) => updateField("contactCTA", "heading", v)}
        />

        <Field
          label="Description"
          value={services.contactCTA.description}
          multiline
          onChange={(v) =>
            updateField("contactCTA", "description", v)
          }
        />

        <div className="grid gap-4 sm:grid-cols-2">
          <Field
            label="Button Label"
            value={services.contactCTA.buttonLabel}
            onChange={(v) =>
              updateField("contactCTA", "buttonLabel", v)
            }
          />

          <Field
            label="Button Link"
            value={services.contactCTA.buttonHref}
            onChange={(v) =>
              updateField("contactCTA", "buttonHref", v)
            }
          />
        </div>

        <ImageField
          label="Background Image"
          value={services.contactCTA.backgroundImage}
          alt={services.contactCTA.backgroundImageAlt}
          onChange={(v) =>
            updateField("contactCTA", "backgroundImage", v)
          }
          onAltChange={(v) =>
            updateField("contactCTA", "backgroundImageAlt", v)
          }
          onUpload={(file) =>
            uploadImage(file, (url) =>
              updateField("contactCTA", "backgroundImage", url)
            )
          }
          uploading={uploading}
        />
      </Panel>

      <Panel
        title="CTA Features"
        icon={<Star size={21} />}
      >
        {services.contactCTA.features.map((feature, index) => (
          <div
            key={index}
            className="space-y-4 rounded-xl border border-white/10 bg-[#17181e] p-4"
          >
            <ItemHeader
              title="Feature"
              index={index}
              active={feature.isActive}
              onToggle={() =>
                updateFeature(
                  "contactCTA",
                  index,
                  "isActive",
                  !feature.isActive
                )
              }
              onRemove={() => removeFeature("contactCTA", index)}
            />

            <Field
              label="Title"
              value={feature.title}
              onChange={(v) =>
                updateFeature("contactCTA", index, "title", v)
              }
            />

            <Field
              label="Subtitle"
              value={feature.subtitle}
              onChange={(v) =>
                updateFeature("contactCTA", index, "subtitle", v)
              }
            />

            <Field
              label="Description"
              value={feature.description}
              multiline
              onChange={(v) =>
                updateFeature("contactCTA", index, "description", v)
              }
            />

            <div className="grid gap-4 sm:grid-cols-2">
              <Field
                label="Icon Name"
                value={feature.icon}
                onChange={(v) =>
                  updateFeature("contactCTA", index, "icon", v)
                }
              />

              <Field
                label="Display Order"
                value={feature.order}
                onChange={(v) =>
                  updateFeature(
                    "contactCTA",
                    index,
                    "order",
                    Number(v)
                  )
                }
              />
            </div>
          </div>
        ))}

        <button
          type="button"
          onClick={() => addFeature("contactCTA")}
          className="inline-flex items-center gap-2 rounded-lg border border-[#e8b968] px-4 py-2.5 text-sm font-medium text-[#e8b968] hover:bg-[#e8b968]/10"
        >
          <Plus size={17} />
          Add Feature
        </button>
      </Panel>
    </div>
  );

  /* --------------------------------------------------
     ACTIVE CONTENT
  -------------------------------------------------- */

  const renderContent = () => {
    switch (activeTab) {
      case "hero":
        return renderHero();

      case "services":
        return renderServices();

      case "whyChooseUs":
        return renderWhyChooseUs();

      case "howItWorks":
        return renderHowItWorks();

      case "contactCTA":
        return renderContactCTA();

      default:
        return null;
    }
  };

  /* --------------------------------------------------
     LIVE PREVIEW
  -------------------------------------------------- */

  const renderPreview = () => {
    const image =
      activeTab === "hero"
        ? services.hero.backgroundImage
        : activeTab === "whyChooseUs"
          ? services.whyChooseUs.backgroundImage
          : activeTab === "contactCTA"
            ? services.contactCTA.backgroundImage
            : "";

    const heading =
      activeTab === "hero"
        ? services.hero.heading
        : activeTab === "services"
          ? services.services.heading
          : activeTab === "whyChooseUs"
            ? services.whyChooseUs.heading
            : activeTab === "howItWorks"
              ? services.howItWorks.heading
              : services.contactCTA.heading;

    const description =
      activeTab === "hero"
        ? services.hero.description
        : activeTab === "services"
          ? services.services.description
          : activeTab === "whyChooseUs"
            ? services.whyChooseUs.description
            : activeTab === "howItWorks"
              ? services.howItWorks.description
              : services.contactCTA.description;

    return (
      <div className="overflow-hidden rounded-xl border border-white/10 bg-[#1d1e25]">
        <div className="flex items-center justify-between border-b border-white/10 px-4 py-4">
          <div className="flex items-center gap-2">
            <Eye size={18} className="text-[#e8b968]" />
            <h3 className="font-semibold text-white">Live Preview</h3>
          </div>

          <span className="text-xs text-gray-500">Current Section</span>
        </div>

        <div className="space-y-4 p-4">
          <div className="relative flex aspect-video items-center justify-center overflow-hidden rounded-lg bg-[#111217]">
            {image ? (
              <>
                <Image
                  src={image}
                  alt="Section preview"
                  fill
                  unoptimized
                  className="object-cover opacity-60"
                />

                <div className="absolute inset-0 bg-black/50" />
              </>
            ) : (
              <Camera size={38} className="text-gray-600" />
            )}

            <span className="relative z-10 rounded-full border border-[#e8b968]/50 bg-black/40 px-3 py-1 text-xs text-[#e8b968]">
              {tabs.find((tab) => tab.id === activeTab)?.label}
            </span>
          </div>

          <div>
            <p className="text-xs uppercase tracking-widest text-[#e8b968]">
              {activeTab === "hero"
                ? services.hero.eyebrow
                : activeTab === "services"
                  ? services.services.eyebrow
                  : activeTab === "whyChooseUs"
                    ? services.whyChooseUs.eyebrow
                    : activeTab === "howItWorks"
                      ? services.howItWorks.eyebrow
                      : services.contactCTA.eyebrow}
            </p>

            <h3 className="mt-3 font-serif text-2xl text-white">
              {heading || "Section Heading"}
            </h3>

            <p className="mt-3 text-sm leading-6 text-gray-400">
              {description || "Section description will appear here."}
            </p>
          </div>

          {activeTab === "hero" && (
            <div className="grid grid-cols-2 gap-2">
              {services.hero.stats
                .filter((item) => item.isActive)
                .map((item, index) => (
                  <div
                    key={index}
                    className="rounded-lg border border-white/10 bg-[#17181e] p-3"
                  >
                    <p className="font-semibold text-[#e8b968]">
                      {item.value}
                    </p>
                    <p className="mt-1 text-xs text-gray-400">
                      {item.label}
                    </p>
                  </div>
                ))}
            </div>
          )}

          {activeTab === "services" && (
            <div className="grid grid-cols-2 gap-2">
              {services.services.items
                .filter((item) => item.isActive)
                .map((item, index) => (
                  <div
                    key={index}
                    className="overflow-hidden rounded-lg border border-white/10 bg-[#17181e]"
                  >
                    <div className="relative aspect-[4/3] bg-[#25252d]">
                      {item.image && (
                        <Image
                          src={item.image}
                          alt={item.alt}
                          fill
                          unoptimized
                          className="object-cover"
                        />
                      )}
                    </div>

                    <p className="p-2 text-xs font-medium text-white">
                      {item.title || "Service title"}
                    </p>
                  </div>
                ))}
            </div>
          )}

          {activeTab === "howItWorks" && (
            <div className="space-y-2">
              {services.howItWorks.steps
                .filter((item) => item.isActive)
                .map((item, index) => (
                  <div
                    key={index}
                    className="rounded-lg border border-white/10 bg-[#17181e] p-3"
                  >
                    <p className="text-xs text-[#e8b968]">
                      STEP {item.number}
                    </p>
                    <p className="mt-1 text-sm text-white">
                      {item.title}
                    </p>
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  /* --------------------------------------------------
     MAIN LAYOUT
  -------------------------------------------------- */

  return (
    <div className="min-h-screen bg-[#111217] p-4 text-white sm:p-6 lg:p-8">
      <div className="mx-auto max-w-[1600px] space-y-6">

        {/* HEADER */}

        <div className="flex flex-col justify-between gap-5 xl:flex-row xl:items-center">
          <div>
            <div className="mb-2 flex items-center gap-2 text-sm text-gray-500">
              <span>Admin</span>
              <span>/</span>
              <span>Pages</span>
              <span>/</span>
              <span className="text-white">Services</span>
            </div>

            <h1 className="flex items-center gap-3 text-2xl font-bold sm:text-3xl">
              <Layers className="text-[#e8b968]" size={30} />
              Services Page Management
            </h1>

            <p className="mt-2 text-sm text-gray-400">
              Manage and update your services page content, sections, and photography services.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Link
              href="/services"
              target="_blank"
              className="inline-flex items-center gap-2 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-3 py-2.5 text-xs font-medium text-emerald-400"
            >
              <CheckCircle2 size={15} />
              Services Page
            </Link>

            <button
              type="button"
              onClick={() => setPreview(!preview)}
              className="inline-flex items-center gap-2 rounded-lg border border-white/15 px-3 py-2.5 text-xs font-medium text-gray-200 hover:bg-white/5"
            >
              {preview ? <EyeOff size={15} /> : <Eye size={15} />}
              {preview ? "Hide Preview" : "Preview"}
            </button>

            <button
              type="button"
              onClick={resetChanges}
              disabled={!dirty}
              className="inline-flex items-center gap-2 rounded-lg border border-white/15 px-3 py-2.5 text-xs font-medium text-gray-300 transition hover:bg-white/5 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <RotateCcw size={15} />
              Reset
            </button>

            <button
              type="button"
              onClick={saveChanges}
              disabled={saving || !dirty}
              className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-[#e8b968] to-[#f4ce87] px-5 py-2.5 text-xs font-bold text-[#17120a] transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {saving ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                <Save size={16} />
              )}
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>

        {/* ALERTS */}

        {error && (
          <div className="flex items-center gap-3 rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
            <AlertCircle size={18} />
            {error}
            <button
              type="button"
              onClick={() => setError("")}
              className="ml-auto"
            >
              <X size={16} />
            </button>
          </div>
        )}

        {success && (
          <div className="flex items-center gap-3 rounded-lg border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-400">
            <CheckCircle2 size={18} />
            {success}
          </div>
        )}

        {/* TABS */}

        <div className="grid grid-cols-2 gap-2 md:grid-cols-3 xl:grid-cols-5">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => changeTab(tab.id)}
                className={`flex min-h-[58px] items-center justify-center gap-2 rounded-xl border px-3 py-3 text-xs font-semibold transition sm:text-sm ${
                  active
                    ? "border-[#e8b968] bg-gradient-to-r from-[#e8b968]/25 to-[#e8b968]/10 text-[#f1c879]"
                    : "border-white/10 bg-[#1d1e25] text-gray-400 hover:border-white/25 hover:text-white"
                }`}
              >
                <Icon size={18} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* EDITOR AND PREVIEW */}

        <div
          className={`grid items-start gap-6 ${
            preview ? "xl:grid-cols-[minmax(0,1fr)_360px]" : "grid-cols-1"
          }`}
        >
          <div className="min-w-0 space-y-5">
            {renderContent()}

            {/* BOTTOM SAVE */}

            <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-white/10 bg-[#1d1e25] p-4">
              <p className="text-xs text-gray-400">
                {dirty
                  ? "You have unsaved changes."
                  : "All changes are saved."}
              </p>

              <button
                type="button"
                onClick={saveChanges}
                disabled={saving || !dirty}
                className="inline-flex items-center gap-2 rounded-lg bg-[#e8b968] px-5 py-2.5 text-sm font-bold text-[#17120a] hover:bg-[#f4ce87] disabled:opacity-50"
              >
                {saving ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : (
                  <Save size={16} />
                )}
                {saving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>

          {preview && (
            <aside className="min-w-0 xl:sticky xl:top-6">
              {renderPreview()}
            </aside>
          )}
        </div>
      </div>
    </div>
  );
}