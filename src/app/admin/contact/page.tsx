
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
  Mail,
  MapPin,
  Save,
  RotateCcw,
  Eye,
  Upload,
  Trash2,
  Plus,
  Loader2,
  Image as ImageIcon,
  CheckCircle2,
  AlertCircle,
  Camera,
  ExternalLink,
  GripVertical,
} from "lucide-react";

import {
  getContactPageData,
  updateContactPageData,
} from "@/services/api/contact-page.api";

import { uploadHomepageImage } from "@/services/api/upload.api";

import type {
  ContactPageData,
  ContactItem,
} from "@/types/contact-page.types";

type Tab = "hero" | "contactSection" | "locationSection";

const emptyContact: ContactPageData = {
  hero: {
    eyebrow: "",
    heading: "",
    description: "",
    backgroundImage: "",
    backgroundImageAlt: "",
    supportingText: "",
  },
  contactSection: {
    backgroundImage: "",
    heading: "",
    description: "",
    formHeading: "",
    formDescription: "",
    privacyNote: "",
    contactItems: [],
    eventTypes: [],
  },
  locationSection: {
    eyebrow: "",
    heading: "",
    description: "",
    backgroundImage: "",
    studioName: "",
    address: "",
    mapQuery: "",
    directionsUrl: "",
    locationNote: "",
    mapCaption: "",
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
    label: "Contact Hero",
    description: "Edit the top hero section",
    icon: Home,
  },
  {
    id: "contactSection",
    label: "Contact Details & Form",
    description: "Manage contact info, form and event types",
    icon: Mail,
  },
  {
    id: "locationSection",
    label: "Contact Location",
    description: "Update studio location and map details",
    icon: MapPin,
  },
];

function cloneData(data: ContactPageData): ContactPageData {
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

export default function ContactAdminPage() {
  const [contact, setContact] =
    useState<ContactPageData>(emptyContact);

  const [original, setOriginal] =
    useState<ContactPageData>(emptyContact);

  const [activeTab, setActiveTab] = useState<Tab>("hero");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const dirty =
    JSON.stringify(contact) !== JSON.stringify(original);

  const loadContact = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getContactPageData();

      if (!response.success || !response.data) {
        throw new Error(
          response.message || "Unable to load Contact page."
        );
      }

      const data = response.data;

      setContact(data);
      setOriginal(cloneData(data));
    } catch (err) {
      console.error(err);
      setError("Failed to load Contact page data.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadContact();
  }, [loadContact]);

  const updateField = (
    section: Tab,
    field: string,
    value: unknown
  ) => {
    setContact((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
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
        throw new Error(
          response.message || "Image upload failed."
        );
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

      const response = await updateContactPageData(contact);

      if (!response.success || !response.data) {
        throw new Error(
          response.message || "Contact page update failed."
        );
      }

      const updated = response.data;

      setContact(updated);
      setOriginal(cloneData(updated));
      setSuccess("Contact page updated successfully!");

    } catch (err) {
      console.error(err);
      setError("Unable to save Contact page changes.");
    } finally {
      setSaving(false);
    }
  };

  const resetChanges = () => {
    if (!window.confirm("Discard all unsaved changes?")) {
      return;
    }

    setContact(cloneData(original));
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

  const addContactItem = () => {
    const newItem: ContactItem = {
      title: "",
      detail: "",
      note: "",
      order: contact.contactSection.contactItems.length + 1,
      isActive: true,
    };

    updateField("contactSection", "contactItems", [
      ...contact.contactSection.contactItems,
      newItem,
    ]);
  };

  const updateContactItem = (
    index: number,
    field: keyof ContactItem,
    value: string | number | boolean
  ) => {
    const items = [...contact.contactSection.contactItems];

    items[index] = {
      ...items[index],
      [field]: value,
    };

    updateField("contactSection", "contactItems", items);
  };

  const removeContactItem = (index: number) => {
    if (!window.confirm("Delete this contact item?")) return;

    const items = contact.contactSection.contactItems.filter(
      (_, i) => i !== index
    );

    updateField("contactSection", "contactItems", items);
  };

  const addEventType = () => {
    updateField("contactSection", "eventTypes", [
      ...contact.contactSection.eventTypes,
      "",
    ]);
  };

  const updateEventType = (index: number, value: string) => {
    const items = [...contact.contactSection.eventTypes];
    items[index] = value;

    updateField("contactSection", "eventTypes", items);
  };

  const removeEventType = (index: number) => {
    const items = contact.contactSection.eventTypes.filter(
      (_, i) => i !== index
    );

    updateField("contactSection", "eventTypes", items);
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
          value={contact.hero.eyebrow}
          onChange={(v) => updateField("hero", "eyebrow", v)}
          placeholder="Get in Touch"
        />

        <Field
          label="Main Heading"
          value={contact.hero.heading}
          onChange={(v) => updateField("hero", "heading", v)}
          placeholder="Let's Create Something Beautiful"
        />

        <Field
          label="Description"
          value={contact.hero.description}
          onChange={(v) => updateField("hero", "description", v)}
          multiline
          rows={5}
          placeholder="Enter your contact hero description..."
        />

        <Field
          label="Supporting Text"
          value={contact.hero.supportingText}
          onChange={(v) =>
            updateField("hero", "supportingText", v)
          }
          placeholder="Every moment deserves to be remembered"
        />
      </div>

      <div className="min-w-0">
        <ImageField
          label="Hero Background Image"
          value={contact.hero.backgroundImage}
          alt={contact.hero.backgroundImageAlt}
          onChange={(v) =>
            updateField("hero", "backgroundImage", v)
          }
          onAltChange={(v) =>
            updateField("hero", "backgroundImageAlt", v)
          }
          onUpload={(file) =>
            uploadForField(file, "hero", "backgroundImage")
          }
          uploading={uploading}
        />

        <div className="mt-5 rounded-lg border border-[#b18a4a]/20 bg-[#b18a4a]/5 p-4">
          <div className="flex items-start gap-3">
            <Camera
              size={19}
              className="mt-0.5 shrink-0 text-[#d5ad62]"
            />
            <div>
              <p className="text-sm font-semibold text-[#e4c17f]">
                Hero Section Tip
              </p>
              <p className="mt-1 text-xs leading-5 text-white/50">
                This is the main banner at the top of your Contact
                page. Keep the heading clear and engaging.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderContactSection = () => (
    <div className="space-y-6">
      <Panel
        title="Contact Section Content"
        description="Manage the content displayed beside your enquiry form."
        icon={<Mail size={20} />}
      >
        <div className="grid min-w-0 grid-cols-1 gap-5 xl:grid-cols-2">
          <Field
            label="Section Heading"
            value={contact.contactSection.heading}
            onChange={(v) =>
              updateField("contactSection", "heading", v)
            }
          />

          <Field
            label="Form Heading"
            value={contact.contactSection.formHeading}
            onChange={(v) =>
              updateField("contactSection", "formHeading", v)
            }
          />

          <Field
            label="Section Description"
            value={contact.contactSection.description}
            onChange={(v) =>
              updateField("contactSection", "description", v)
            }
            multiline
          />

          <Field
            label="Form Description"
            value={contact.contactSection.formDescription}
            onChange={(v) =>
              updateField("contactSection", "formDescription", v)
            }
            multiline
          />

          <div className="xl:col-span-2">
            <Field
              label="Privacy Note"
              value={contact.contactSection.privacyNote}
              onChange={(v) =>
                updateField("contactSection", "privacyNote", v)
              }
              multiline
              rows={2}
            />
          </div>
        </div>
      </Panel>

      <Panel
        title="Contact Background Image"
        description="Background image for the contact details and form section."
        icon={<ImageIcon size={20} />}
      >
        <div className="max-w-2xl">
          <ImageField
            label="Section Background"
            value={contact.contactSection.backgroundImage}
            onChange={(v) =>
              updateField("contactSection", "backgroundImage", v)
            }
            onUpload={(file) =>
              uploadForField(
                file,
                "contactSection",
                "backgroundImage"
              )
            }
            uploading={uploading}
          />
        </div>
      </Panel>

      <Panel
        title="Contact Information Items"
        description="Manage the contact information cards shown on your website."
        icon={<Mail size={20} />}
      >
        <div className="space-y-4">
          {contact.contactSection.contactItems.map((item, index) => (
            <div
              key={item._id || index}
              className="space-y-4 rounded-xl border border-white/10 bg-[#111111] p-4"
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <GripVertical size={17} className="text-white/30" />
                  <h3 className="font-semibold text-white">
                    Contact Item {index + 1}
                  </h3>
                </div>

                <div className="flex items-center gap-3">
                  <span
                    className={`text-xs ${
                      item.isActive
                        ? "text-green-400"
                        : "text-white/40"
                    }`}
                  >
                    {item.isActive ? "Active" : "Inactive"}
                  </span>

                  <Toggle
                    checked={item.isActive}
                    onChange={(v) =>
                      updateContactItem(index, "isActive", v)
                    }
                  />

                  <button
                    type="button"
                    onClick={() => removeContactItem(index)}
                    className="rounded-lg border border-red-500/20 p-2 text-red-400 transition hover:bg-red-500/10"
                    title="Delete contact item"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              <div className="grid min-w-0 grid-cols-1 gap-4 md:grid-cols-2">
                <Field
                  label="Title"
                  value={item.title}
                  onChange={(v) =>
                    updateContactItem(index, "title", v)
                  }
                  placeholder="Email Address"
                />

                <Field
                  label="Detail"
                  value={item.detail}
                  onChange={(v) =>
                    updateContactItem(index, "detail", v)
                  }
                  placeholder="example@email.com"
                />

                <Field
                  label="Note"
                  value={item.note}
                  onChange={(v) =>
                    updateContactItem(index, "note", v)
                  }
                  placeholder="We usually respond within 24 hours."
                />

                <Field
                  label="Display Order"
                  value={item.order}
                  type="number"
                  onChange={(v) =>
                    updateContactItem(index, "order", Number(v))
                  }
                />
              </div>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={addContactItem}
          className="inline-flex items-center gap-2 rounded-lg border border-[#b18a4a]/40 px-4 py-2.5 text-sm font-semibold text-[#d5ad62] transition hover:bg-[#b18a4a]/10"
        >
          <Plus size={17} />
          Add Contact Item
        </button>
      </Panel>

      <Panel
        title="Event Types"
        description="These options are displayed in the enquiry form."
        icon={<CheckCircle2 size={20} />}
      >
        <div className="grid min-w-0 grid-cols-1 gap-3 md:grid-cols-2">
          {contact.contactSection.eventTypes.map((event, index) => (
            <div key={index} className="flex min-w-0 gap-2">
              <div className="flex min-w-0 flex-1 items-center">
                <input
                  value={event}
                  onChange={(e) =>
                    updateEventType(index, e.target.value)
                  }
                  placeholder="Enter event type"
                  className={inputClass}
                />
              </div>

              <button
                type="button"
                onClick={() => removeEventType(index)}
                className="shrink-0 rounded-lg border border-red-500/20 p-3 text-red-400 transition hover:bg-red-500/10"
                title="Remove event type"
              >
                <Trash2 size={17} />
              </button>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={addEventType}
          className="inline-flex items-center gap-2 rounded-lg bg-[#b18a4a] px-4 py-2.5 text-sm font-semibold text-black transition hover:bg-[#d5ad62]"
        >
          <Plus size={17} />
          Add Event Type
        </button>
      </Panel>
    </div>
  );

  const renderLocation = () => (
    <div className="grid min-w-0 grid-cols-1 gap-6 xl:grid-cols-2">
      <div className="min-w-0 space-y-5">
        <Field
          label="Eyebrow Text"
          value={contact.locationSection.eyebrow}
          onChange={(v) =>
            updateField("locationSection", "eyebrow", v)
          }
          placeholder="Our Location"
        />

        <Field
          label="Main Heading"
          value={contact.locationSection.heading}
          onChange={(v) =>
            updateField("locationSection", "heading", v)
          }
          placeholder="Visit Our Studio"
        />

        <Field
          label="Description"
          value={contact.locationSection.description}
          onChange={(v) =>
            updateField("locationSection", "description", v)
          }
          multiline
        />

        <Field
          label="Studio Name"
          value={contact.locationSection.studioName}
          onChange={(v) =>
            updateField("locationSection", "studioName", v)
          }
          placeholder="Naeem Bhojani Photography"
        />

        <Field
          label="Studio Address"
          value={contact.locationSection.address}
          onChange={(v) =>
            updateField("locationSection", "address", v)
          }
          multiline
          rows={3}
        />

        <Field
          label="Location Note"
          value={contact.locationSection.locationNote}
          onChange={(v) =>
            updateField("locationSection", "locationNote", v)
          }
          multiline
        />
      </div>

      <div className="min-w-0 space-y-5">
        <ImageField
          label="Location Background Image"
          value={contact.locationSection.backgroundImage}
          onChange={(v) =>
            updateField("locationSection", "backgroundImage", v)
          }
          onUpload={(file) =>
            uploadForField(file, "locationSection", "backgroundImage")
          }
          uploading={uploading}
        />

        <Panel
          title="Google Maps Settings"
          description="Configure the map and directions displayed on your website."
          icon={<MapPin size={20} />}
        >
          <Field
            label="Google Maps Search Query"
            value={contact.locationSection.mapQuery}
            onChange={(v) =>
              updateField("locationSection", "mapQuery", v)
            }
            placeholder="Studio name, Ahmedabad, Gujarat, India"
          />

          <Field
            label="Directions URL"
            value={contact.locationSection.directionsUrl}
            onChange={(v) =>
              updateField("locationSection", "directionsUrl", v)
            }
            placeholder="https://maps.google.com/..."
          />

          <Field
            label="Map Caption"
            value={contact.locationSection.mapCaption}
            onChange={(v) =>
              updateField("locationSection", "mapCaption", v)
            }
            placeholder="AHMEDABAD, GUJARAT, INDIA"
          />

          {contact.locationSection.directionsUrl && (
            <a
              href={contact.locationSection.directionsUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-sm text-[#d5ad62] hover:text-white"
            >
              Preview Directions URL
              <ExternalLink size={15} />
            </a>
          )}
        </Panel>
      </div>
    </div>
  );

  const activeTabDetails = tabs.find(
    (tab) => tab.id === activeTab
  );

  return (
    <main className="min-h-screen w-full overflow-x-hidden bg-[#101010] px-4 py-6 text-white sm:px-6 lg:px-7 lg:py-7">
      {/* Page Heading */}
      <div className="mb-7 flex flex-col justify-between gap-5 xl:flex-row xl:items-center">
        <div className="min-w-0">
          <p className="mb-2 text-[10px] font-bold uppercase tracking-[2.5px] text-[#d5ad62]">
            Contact Page
          </p>

          <h1 className="font-serif text-3xl font-semibold text-white sm:text-4xl">
            Contact Page Management
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-white/50">
            Manage all content of your Contact page including hero,
            contact details, enquiry form and location.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <a
            href="/contact"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/15 px-4 py-3 text-sm font-medium text-white/80 transition hover:border-[#b18a4a]/50 hover:text-[#d5ad62]"
          >
            <Eye size={17} />
            View Page
          </a>

          <button
            type="button"
            onClick={resetChanges}
            disabled={!dirty || loading || saving}
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/15 px-4 py-3 text-sm font-medium text-white/80 transition hover:border-white/30 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <RotateCcw size={16} />
            Reset Changes
          </button>

          <button
            type="button"
            onClick={saveChanges}
            disabled={!dirty || loading || saving || uploading}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-[#b18a4a] to-[#d5ad62] px-5 py-3 text-sm font-bold text-black shadow-lg shadow-[#b18a4a]/10 transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40"
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

      {/* Status Messages */}
      {error && (
        <div className="mb-5 flex items-center gap-3 rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
          <AlertCircle size={18} className="shrink-0" />
          {error}
        </div>
      )}

      {success && (
        <div className="mb-5 flex items-center gap-3 rounded-lg border border-green-500/20 bg-green-500/10 px-4 py-3 text-sm text-green-300">
          <CheckCircle2 size={18} className="shrink-0" />
          {success}
        </div>
      )}

      {/* Tabs */}
      <div className="mb-6 grid grid-cols-1 gap-3 lg:grid-cols-3">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const active = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => changeTab(tab.id)}
              className={`flex min-w-0 items-center gap-4 rounded-xl border p-4 text-left transition-all duration-200 ${
                active
                  ? "border-[#d5ad62] bg-gradient-to-r from-[#a9823d]/30 to-[#62491f]/20 shadow-lg shadow-[#b18a4a]/5"
                  : "border-white/10 bg-[#171717] hover:border-[#b18a4a]/40 hover:bg-white/[0.04]"
              }`}
            >
              <span
                className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border ${
                  active
                    ? "border-[#d5ad62]/50 bg-[#b18a4a]/20 text-[#e4c17f]"
                    : "border-white/10 bg-white/5 text-white/70"
                }`}
              >
                <Icon size={22} />
              </span>

              <span className="min-w-0">
                <span className="block text-sm font-semibold text-white">
                  {tab.label}
                </span>
                <span className="mt-1 block text-xs leading-5 text-white/45">
                  {tab.description}
                </span>
              </span>
            </button>
          );
        })}
      </div>

      {/* Active Content */}
      {loading ? (
        <div className="flex min-h-[400px] flex-col items-center justify-center gap-3 rounded-xl border border-white/10 bg-[#171717]">
          <Loader2
            size={32}
            className="animate-spin text-[#d5ad62]"
          />
          <p className="text-sm text-white/50">
            Loading Contact page data...
          </p>
        </div>
      ) : (
        <section className="overflow-hidden rounded-xl border border-white/10 bg-[#171717]">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 px-5 py-5 sm:px-6">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#b18a4a]/30 bg-[#b18a4a]/10 text-[#d5ad62]">
                {activeTab === "hero" && <Home size={21} />}
                {activeTab === "contactSection" && <Mail size={21} />}
                {activeTab === "locationSection" && <MapPin size={21} />}
              </span>

              <div>
                <h2 className="text-lg font-semibold text-white">
                  {activeTabDetails?.label} Section
                </h2>
                <p className="mt-1 text-xs text-white/45">
                  Update the content displayed on your Contact page.
                </p>
              </div>
            </div>

            {dirty && (
              <span className="rounded-full border border-amber-400/20 bg-amber-400/10 px-3 py-1.5 text-[11px] font-medium text-[#e4c17f]">
                Unsaved Changes
              </span>
            )}
          </div>

          <div className="p-4 sm:p-6">
            {activeTab === "hero" && renderHero()}

            {activeTab === "contactSection" &&
              renderContactSection()}

            {activeTab === "locationSection" &&
              renderLocation()}
          </div>

          <div className="border-t border-white/10 px-5 py-4 sm:px-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="text-xs text-white/40">
                Changes will appear on your website after saving.
              </p>

              <button
                type="button"
                onClick={saveChanges}
                disabled={!dirty || saving || uploading}
                className="inline-flex items-center gap-2 rounded-lg bg-[#b18a4a] px-5 py-2.5 text-sm font-semibold text-black transition hover:bg-[#d5ad62] disabled:cursor-not-allowed disabled:opacity-40"
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
        </section>
      )}
    </main>
  );
}
