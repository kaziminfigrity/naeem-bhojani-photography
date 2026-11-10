
"use client";

import { useEffect, useRef, useState } from "react";
import {
  Save,
  Upload,
  Plus,
  Trash2,
  GripVertical,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Menu,
  PanelTop,
  Link2,
  Image as ImageIcon,
  RotateCcw,
} from "lucide-react";

import {
  FaInstagram,
  FaFacebookF,
  FaYoutube,
} from "react-icons/fa";

import {
  getWebsiteSettings,
  updateWebsiteSettings,
} from "@/services/api/settings.api";

import { uploadHomepageImage } from "@/services/api/upload.api";

import type {
  WebsiteSettings,
  NavigationItem,
} from "@/types/settings.types";

import type {
  FooterSettings,
  FooterLink,
  FooterService,
} from "@/types/footer.types";

/* -------------------------------------------------------
   DEFAULT SETTINGS
------------------------------------------------------- */

const defaultSettings: WebsiteSettings = {
  siteName: "Naeem Bhojani Photography",
  logo: "",
  email: "",
  phone: "",
  address: "",
  socialLinks: {
    instagram: "",
    facebook: "",
    youtube: "",
  },
  navigation: [
    { label: "About", href: "/about", order: 1, isActive: true },
    { label: "Services", href: "/services", order: 2, isActive: true },
    { label: "Gallery", href: "/gallery", order: 3, isActive: true },
    {
      label: "Testimonials",
      href: "/testimonials",
      order: 4,
      isActive: true,
    },
    { label: "Contact", href: "/contact", order: 5, isActive: true },
  ],
  headerCTA: {
    label: "Book a Session",
    href: "/contact",
    isActive: true,
  },
  favicon: "",
  seo: {
    metaTitle: "Naeem Bhojani Photography",
    metaDescription: "",
    keywords: [],
    ogImage: "",
  },

  pageSEO: {
  home: {
    metaTitle: "",
    metaDescription: "",
    keywords: [],
    ogImage: "",
  },
  about: {
    metaTitle: "",
    metaDescription: "",
    keywords: [],
    ogImage: "",
  },
  services: {
    metaTitle: "",
    metaDescription: "",
    keywords: [],
    ogImage: "",
  },
  contact: {
    metaTitle: "",
    metaDescription: "",
    keywords: [],
    ogImage: "",
  },
  gallery: {
    metaTitle: "",
    metaDescription: "",
    keywords: [],
    ogImage: "",
  },
  testimonials: {
    metaTitle: "",
    metaDescription: "",
    keywords: [],
    ogImage: "",
  },
},
};

const defaultFooter: FooterSettings = {
  description:
    "Preserving the emotions, the little details and the unforgettable moments that make your story uniquely yours.",
  tagline: "Capturing timeless stories, one frame at a time.",
  ctaEyebrow: "Your story deserves to be captured",
  ctaHeading: "Let's create something timeless.",
  exploreTitle: "Explore",
  quickLinks: [
    { label: "Home", href: "/", order: 1, isActive: true },
    { label: "About Us", href: "/about", order: 2, isActive: true },
    { label: "Our Services", href: "/services", order: 3, isActive: true },
    { label: "Gallery", href: "/gallery", order: 4, isActive: true },
    { label: "Testimonials", href: "/testimonials", order: 5, isActive: true },
    { label: "Contact Us", href: "/contact", order: 6, isActive: true },
  ],
  servicesTitle: "Our Services",
  services: [
    { label: "Wedding Photography", href: "/services", order: 1, isActive: true },
    { label: "Pre-Wedding Photography", href: "/services", order: 2, isActive: true },
    { label: "Birthday Photography", href: "/services", order: 3, isActive: true },
    { label: "Family Portraits", href: "/services", order: 4, isActive: true },
    { label: "Corporate Events", href: "/services", order: 5, isActive: true },
    { label: "Product Photography", href: "/services", order: 6, isActive: true },
  ],
  contactTitle: "Get in Touch",
  phoneLabel: "Call Us",
  emailLabel: "Email Us",
  locationLabel: "Studio Location",
  privacyPolicy: {
    label: "Privacy Policy",
    href: "/privacy-policy",
    isActive: true,
  },
  terms: {
    label: "Terms & Conditions",
    href: "/terms",
    isActive: true,
  },
  copyrightText: "All rights reserved.",
};

/* -------------------------------------------------------
   REUSABLE STYLES
------------------------------------------------------- */

const inputClass =
  "w-full rounded-lg border border-white/10 bg-[#15130f] px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/25 focus:border-[#c9a45c]/70";

const labelClass =
  "mb-2 block text-xs font-medium uppercase tracking-wider text-white/55";

const sectionClass =
  "rounded-xl border border-[#b18a4a]/20 bg-[#11100e] p-5 sm:p-6";

type EditableLink = NavigationItem | FooterLink | FooterService;

interface LinkListEditorProps {
  title: string;
  items: EditableLink[];
  onChange: (items: EditableLink[]) => void;
  emptyLabel: string;
}

function LinkListEditor({
  title,
  items,
  onChange,
  emptyLabel,
}: LinkListEditorProps) {
  const updateItem = (
    index: number,
    field: keyof EditableLink,
    value: string | number | boolean
  ) => {
    const updated = items.map((item, i) =>
      i === index ? { ...item, [field]: value } : item
    );

    onChange(updated);
  };

  const addItem = () => {
    onChange([
      ...items,
      {
        label: "",
        href: "/",
        order: items.length + 1,
        isActive: true,
      },
    ]);
  };

  const removeItem = (index: number) => {
    const updated = items
      .filter((_, i) => i !== index)
      .map((item, i) => ({ ...item, order: i + 1 }));

    onChange(updated);
  };

  const moveItem = (index: number, direction: -1 | 1) => {
    const targetIndex = index + direction;

    if (targetIndex < 0 || targetIndex >= items.length) return;

    const updated = [...items];
    [updated[index], updated[targetIndex]] = [
      updated[targetIndex],
      updated[index],
    ];

    onChange(
      updated.map((item, i) => ({
        ...item,
        order: i + 1,
      }))
    );
  };

  return (
    <div className={sectionClass}>
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3 className="font-serif text-xl text-[#e5c17e]">{title}</h3>
          <p className="mt-1 text-xs text-white/40">
            Manage links, visibility and display order.
          </p>
        </div>

        <button
          type="button"
          onClick={addItem}
          className="flex items-center gap-2 rounded-lg border border-[#b18a4a]/40 bg-[#b18a4a]/10 px-4 py-2.5 text-xs font-semibold text-[#e5c17e] transition hover:bg-[#b18a4a]/20"
        >
          <Plus size={15} />
          Add Link
        </button>
      </div>

      {items.length === 0 ? (
        <p className="rounded-lg border border-dashed border-white/10 py-8 text-center text-sm text-white/40">
          {emptyLabel}
        </p>
      ) : (
        <div className="space-y-3">
          {items.map((item, index) => (
            <div
              key={index}
              className="rounded-lg border border-white/[0.08] bg-[#0d0c0a] p-3 sm:p-4"
            >
              <div className="mb-3 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-white/40">
                  <GripVertical size={15} />
                  Item {index + 1}
                </div>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => moveItem(index, -1)}
                    disabled={index === 0}
                    className="text-xs text-white/50 hover:text-[#e5c17e] disabled:opacity-20"
                  >
                    ↑
                  </button>

                  <button
                    type="button"
                    onClick={() => moveItem(index, 1)}
                    disabled={index === items.length - 1}
                    className="text-xs text-white/50 hover:text-[#e5c17e] disabled:opacity-20"
                  >
                    ↓
                  </button>

                  <button
                    type="button"
                    onClick={() => removeItem(index)}
                    className="rounded-md p-1.5 text-red-400 transition hover:bg-red-400/10"
                    aria-label="Delete link"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <label className={labelClass}>Label</label>
                  <input
                    className={inputClass}
                    value={item.label}
                    onChange={(e) =>
                      updateItem(index, "label", e.target.value)
                    }
                    placeholder="Link label"
                  />
                </div>

                <div>
                  <label className={labelClass}>URL / Path</label>
                  <input
                    className={inputClass}
                    value={item.href}
                    onChange={(e) =>
                      updateItem(index, "href", e.target.value)
                    }
                    placeholder="/about"
                  />
                </div>
              </div>

              <div className="mt-3 flex items-center justify-between">
                <span className="text-xs text-white/40">
                  Display order: {item.order}
                </span>

                <label className="flex cursor-pointer items-center gap-2 text-xs text-white/65">
                  <input
                    type="checkbox"
                    checked={item.isActive}
                    onChange={(e) =>
                      updateItem(index, "isActive", e.target.checked)
                    }
                    className="accent-[#c9a45c]"
                  />
                  Active
                </label>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* -------------------------------------------------------
   MAIN PAGE
------------------------------------------------------- */

export default function HeaderFooterAdminPage() {
  const [activeTab, setActiveTab] = useState<"header" | "footer">("header");

  const [settings, setSettings] =
    useState<WebsiteSettings>(defaultSettings);

  const [footer, setFooter] =
    useState<FooterSettings>(defaultFooter);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const fileInputRef = useRef<HTMLInputElement>(null);

  /* -----------------------------------------------
     FETCH SETTINGS
  ----------------------------------------------- */

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        setLoading(true);

        const response = await getWebsiteSettings();

        if (isMounted && response.success && response.settings) {
          const fetchedSettings = response.settings;

          setSettings({
            ...defaultSettings,
            ...fetchedSettings,
            socialLinks: {
              ...defaultSettings.socialLinks,
              ...fetchedSettings.socialLinks,
            },
            headerCTA: {
              ...defaultSettings.headerCTA,
              ...fetchedSettings.headerCTA,
            },
            navigation:
              fetchedSettings.navigation?.length
                ? fetchedSettings.navigation
                : defaultSettings.navigation,
          });

          setFooter({
            ...defaultFooter,
            ...(fetchedSettings.footer || {}),
            privacyPolicy: {
              ...defaultFooter.privacyPolicy,
              ...fetchedSettings.footer?.privacyPolicy,
            },
            terms: {
              ...defaultFooter.terms,
              ...fetchedSettings.footer?.terms,
            },
            quickLinks:
              fetchedSettings.footer?.quickLinks?.length
                ? fetchedSettings.footer.quickLinks
                : defaultFooter.quickLinks,
            services:
              fetchedSettings.footer?.services?.length
                ? fetchedSettings.footer.services
                : defaultFooter.services,
          });
        }
      } catch (error) {
        console.error("Failed to load website settings:", error);
        if (isMounted) {
          setErrorMessage("Failed to load settings. Please refresh the page.");
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, []);

  /* -----------------------------------------------
     UPDATE HELPERS
  ----------------------------------------------- */

  const updateHeader = <K extends keyof WebsiteSettings>(
    field: K,
    value: WebsiteSettings[K]
  ) => {
    setSettings((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const updateFooter = <K extends keyof FooterSettings>(
    field: K,
    value: FooterSettings[K]
  ) => {
    setFooter((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleNavigationChange = (items: EditableLink[]) => {
    updateHeader("navigation", items as NavigationItem[]);
  };

  const handleQuickLinksChange = (items: EditableLink[]) => {
    updateFooter("quickLinks", items as FooterLink[]);
  };

  const handleServicesChange = (items: EditableLink[]) => {
    updateFooter("services", items as FooterService[]);
  };

  /* -----------------------------------------------
     LOGO UPLOAD
  ----------------------------------------------- */

  const handleLogoUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setErrorMessage("Please select a valid image file.");
      event.target.value = "";
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setErrorMessage("Logo image must be smaller than 5MB.");
      event.target.value = "";
      return;
    }

    try {
      setUploading(true);
      setErrorMessage("");
      setSuccessMessage("");

      const response = await uploadHomepageImage(file);

      if (response.success && response.data?.image) {
        updateHeader("logo", response.data.image);
        setSuccessMessage("Logo uploaded. Click Save Changes to publish it.");
      } else {
        setErrorMessage(response.message || "Logo upload failed.");
      }
    } catch (error) {
      console.error("Logo upload failed:", error);
      setErrorMessage("Unable to upload logo. Please try again.");
    } finally {
      setUploading(false);
      event.target.value = "";
    }
  };

  /* -----------------------------------------------
     SAVE SETTINGS
  ----------------------------------------------- */

  const handleSave = async () => {
    try {
      setSaving(true);
      setErrorMessage("");
      setSuccessMessage("");

      const payload: Partial<WebsiteSettings> = {
        siteName: settings.siteName,
        logo: settings.logo,
        email: settings.email,
        phone: settings.phone,
        address: settings.address,
        socialLinks: settings.socialLinks,
        navigation: settings.navigation.map((item, index) => ({
          ...item,
          order: index + 1,
        })),
        headerCTA: settings.headerCTA,
        footer: {
          ...footer,
          quickLinks: footer.quickLinks.map((item, index) => ({
            ...item,
            order: index + 1,
          })),
          services: footer.services.map((item, index) => ({
            ...item,
            order: index + 1,
          })),
        },
      };

      const response = await updateWebsiteSettings(payload);

      if (response.success) {
        setSuccessMessage("Header & Footer settings saved successfully.");
      } else {
        setErrorMessage(response.message || "Unable to save settings.");
      }
    } catch (error) {
      console.error("Settings update failed:", error);
      setErrorMessage("Something went wrong while saving settings.");
    } finally {
      setSaving(false);
    }
  };

  /* -----------------------------------------------
     LOADING STATE
  ----------------------------------------------- */

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center bg-[#080706]">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="animate-spin text-[#d6b477]" size={32} />
          <p className="text-sm text-white/50">
            Loading Header & Footer settings...
          </p>
        </div>
      </div>
    );
  }

  /* -----------------------------------------------
     PAGE UI
  ----------------------------------------------- */

  return (
    <div className="min-h-screen bg-[#080706] px-4 py-6 text-white sm:px-6 lg:px-8 lg:py-8">
      <div className="mx-auto max-w-[1450px]">

        {/* PAGE HEADER */}
        <div className="mb-7 flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
          <div>
            <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[2px] text-[#c9a45c]">
              <PanelTop size={15} />
              Website Management
            </div>

            <h1 className="font-serif text-3xl text-white sm:text-4xl">
              Header & Footer
            </h1>

            <p className="mt-2 max-w-xl text-sm leading-6 text-white/45">
              Manage your website navigation, branding, social links and footer content.
            </p>
          </div>

          <button
            type="button"
            onClick={handleSave}
            disabled={saving || uploading}
            className="flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-[#c9a45c] to-[#a77b37] px-6 py-3 text-sm font-semibold text-black shadow-lg shadow-[#c9a45c]/10 transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {saving ? (
              <Loader2 size={17} className="animate-spin" />
            ) : (
              <Save size={17} />
            )}
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>

        {/* NOTIFICATIONS */}
        {successMessage && (
          <div className="mb-5 flex items-center gap-3 rounded-lg border border-green-500/20 bg-green-500/10 px-4 py-3 text-sm text-green-400">
            <CheckCircle2 size={18} />
            {successMessage}
            <button
              type="button"
              onClick={() => setSuccessMessage("")}
              className="ml-auto text-xs text-green-300/70"
            >
              Dismiss
            </button>
          </div>
        )}

        {errorMessage && (
          <div className="mb-5 flex items-center gap-3 rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
            <AlertCircle size={18} />
            {errorMessage}
            <button
              type="button"
              onClick={() => setErrorMessage("")}
              className="ml-auto text-xs text-red-300/70"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* MAIN TABS */}
        <div className="mb-6 flex w-full gap-2 rounded-xl border border-white/10 bg-[#11100e] p-2 sm:w-fit">
          <button
            type="button"
            onClick={() => setActiveTab("header")}
            className={`flex flex-1 items-center justify-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold transition sm:flex-none ${
              activeTab === "header"
                ? "bg-gradient-to-r from-[#b18a4a] to-[#8e682e] text-black"
                : "text-white/55 hover:bg-white/5 hover:text-white"
            }`}
          >
            <Menu size={17} />
            Header
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("footer")}
            className={`flex flex-1 items-center justify-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold transition sm:flex-none ${
              activeTab === "footer"
                ? "bg-gradient-to-r from-[#b18a4a] to-[#8e682e] text-black"
                : "text-white/55 hover:bg-white/5 hover:text-white"
            }`}
          >
            <PanelTop size={17} />
            Footer
          </button>
        </div>

        {/* =========================================
            HEADER MANAGEMENT
        ========================================= */}

        {activeTab === "header" && (
          <div className="space-y-6">

            {/* GENERAL / LOGO */}
            <section className={sectionClass}>
              <div className="mb-5">
                <h2 className="font-serif text-xl text-[#e5c17e]">
                  Logo & General Settings
                </h2>
                <p className="mt-1 text-xs text-white/40">
                  Manage your website brand identity.
                </p>
              </div>

              <div className="grid gap-6 lg:grid-cols-2">
                <div>
                  <label className={labelClass}>Website Name</label>
                  <input
                    className={inputClass}
                    value={settings.siteName}
                    onChange={(e) => updateHeader("siteName", e.target.value)}
                    placeholder="Website name"
                  />
                </div>

                <div>
                  <label className={labelClass}>Logo Image URL</label>
                  <input
                    className={inputClass}
                    value={settings.logo}
                    onChange={(e) => updateHeader("logo", e.target.value)}
                    placeholder="/images/logo.png or image URL"
                  />
                </div>
              </div>

              <div className="mt-5 flex flex-col gap-4 rounded-lg border border-white/10 bg-[#0d0c0a] p-4 sm:flex-row sm:items-center">
                <div className="flex h-28 w-full items-center justify-center rounded-lg border border-dashed border-[#b18a4a]/30 bg-black/30 p-3 sm:w-52">
                  {settings.logo ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={settings.logo}
                      alt="Website logo preview"
                      className="max-h-full max-w-full object-contain"
                    />
                  ) : (
                    <div className="flex flex-col items-center gap-2 text-white/30">
                      <ImageIcon size={28} />
                      <span className="text-xs">No logo selected</span>
                    </div>
                  )}
                </div>

                <div className="flex-1">
                  <h3 className="text-sm font-semibold text-white">
                    Upload Website Logo
                  </h3>
                  <p className="mt-1 text-xs leading-5 text-white/40">
                    Select an image file up to 5MB. The uploaded logo will be used by the existing website Header and Footer.
                  </p>

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleLogoUpload}
                  />

                  <div className="mt-4 flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      disabled={uploading}
                      className="flex items-center gap-2 rounded-lg bg-[#b18a4a] px-4 py-2.5 text-xs font-semibold text-black transition hover:bg-[#d5b36f] disabled:opacity-50"
                    >
                      {uploading ? (
                        <Loader2 size={15} className="animate-spin" />
                      ) : (
                        <Upload size={15} />
                      )}
                      {uploading ? "Uploading..." : "Upload Logo"}
                    </button>

                    {settings.logo && (
                      <button
                        type="button"
                        onClick={() => updateHeader("logo", "")}
                        className="rounded-lg border border-red-400/20 px-4 py-2.5 text-xs text-red-400 hover:bg-red-400/10"
                      >
                        Remove Logo
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </section>

            {/* NAVIGATION */}
            <LinkListEditor
              title="Header Navigation"
              items={settings.navigation}
              onChange={handleNavigationChange}
              emptyLabel="No navigation items added."
            />

            {/* SOCIAL LINKS */}
            <section className={sectionClass}>
              <div className="mb-5">
                <h2 className="font-serif text-xl text-[#e5c17e]">
                  Social Media Links
                </h2>
                <p className="mt-1 text-xs text-white/40">
                  Add your social media profile URLs.
                </p>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label className={labelClass}>
                    <span className="flex items-center gap-2">
                      <FaInstagram size={15} />
                      Instagram URL
                    </span>
                  </label>
                  <input
                    className={inputClass}
                    value={settings.socialLinks.instagram}
                    onChange={(e) =>
                      updateHeader("socialLinks", {
                        ...settings.socialLinks,
                        instagram: e.target.value,
                      })
                    }
                    placeholder="https://instagram.com/..."
                  />
                </div>

                <div>
                  <label className={labelClass}>
                    <span className="flex items-center gap-2">
                      <FaFacebookF size={15} />
                      Facebook URL
                    </span>
                  </label>
                  <input
                    className={inputClass}
                    value={settings.socialLinks.facebook}
                    onChange={(e) =>
                      updateHeader("socialLinks", {
                        ...settings.socialLinks,
                        facebook: e.target.value,
                      })
                    }
                    placeholder="https://facebook.com/..."
                  />
                </div>

                <div>
                  <label className={labelClass}>
                    <span className="flex items-center gap-2">
                      <FaYoutube size={15} />
                      YouTube URL
                    </span>
                  </label>
                  <input
                    className={inputClass}
                    value={settings.socialLinks.youtube}
                    onChange={(e) =>
                      updateHeader("socialLinks", {
                        ...settings.socialLinks,
                        youtube: e.target.value,
                      })
                    }
                    placeholder="https://youtube.com/..."
                  />
                </div>
              </div>
            </section>

            {/* HEADER CTA */}
            <section className={sectionClass}>
              <div className="mb-5">
                <h2 className="font-serif text-xl text-[#e5c17e]">
                  Header CTA Button
                </h2>
                <p className="mt-1 text-xs text-white/40">
                  Manage the main call-to-action button.
                </p>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label className={labelClass}>Button Label</label>
                  <input
                    className={inputClass}
                    value={settings.headerCTA.label}
                    onChange={(e) =>
                      updateHeader("headerCTA", {
                        ...settings.headerCTA,
                        label: e.target.value,
                      })
                    }
                    placeholder="Book a Session"
                  />
                </div>

                <div>
                  <label className={labelClass}>Button Link</label>
                  <input
                    className={inputClass}
                    value={settings.headerCTA.href}
                    onChange={(e) =>
                      updateHeader("headerCTA", {
                        ...settings.headerCTA,
                        href: e.target.value,
                      })
                    }
                    placeholder="/contact"
                  />
                </div>
              </div>

              <label className="mt-5 flex cursor-pointer items-center gap-3 text-sm text-white/70">
                <input
                  type="checkbox"
                  checked={settings.headerCTA.isActive}
                  onChange={(e) =>
                    updateHeader("headerCTA", {
                      ...settings.headerCTA,
                      isActive: e.target.checked,
                    })
                  }
                  className="h-4 w-4 accent-[#c9a45c]"
                />
                Show CTA button in website header
              </label>
            </section>
          </div>
        )}

        {/* =========================================
            FOOTER MANAGEMENT
        ========================================= */}

        {activeTab === "footer" && (
          <div className="space-y-6">

            {/* BRAND CONTENT */}
            <section className={sectionClass}>
              <div className="mb-5">
                <h2 className="font-serif text-xl text-[#e5c17e]">
                  Footer Brand Content
                </h2>
                <p className="mt-1 text-xs text-white/40">
                  Manage the brand description and tagline.
                </p>
              </div>

              <div className="space-y-5">
                <div>
                  <label className={labelClass}>Description</label>
                  <textarea
                    rows={4}
                    className={inputClass}
                    value={footer.description}
                    onChange={(e) =>
                      updateFooter("description", e.target.value)
                    }
                    placeholder="Footer description..."
                  />
                </div>

                <div>
                  <label className={labelClass}>Tagline</label>
                  <input
                    className={inputClass}
                    value={footer.tagline}
                    onChange={(e) =>
                      updateFooter("tagline", e.target.value)
                    }
                    placeholder="Your brand tagline"
                  />
                </div>
              </div>
            </section>

            {/* FOOTER CTA */}
            <section className={sectionClass}>
              <div className="mb-5">
                <h2 className="font-serif text-xl text-[#e5c17e]">
                  Footer CTA Section
                </h2>
                <p className="mt-1 text-xs text-white/40">
                  Manage the CTA strip displayed above the footer columns.
                </p>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label className={labelClass}>CTA Eyebrow</label>
                  <input
                    className={inputClass}
                    value={footer.ctaEyebrow}
                    onChange={(e) =>
                      updateFooter("ctaEyebrow", e.target.value)
                    }
                    placeholder="Your story deserves to be captured"
                  />
                </div>

                <div>
                  <label className={labelClass}>CTA Heading</label>
                  <input
                    className={inputClass}
                    value={footer.ctaHeading}
                    onChange={(e) =>
                      updateFooter("ctaHeading", e.target.value)
                    }
                    placeholder="Let's create something timeless."
                  />
                </div>
              </div>
            </section>

            {/* QUICK LINKS */}
            <section className="space-y-5">
              <div className={sectionClass}>
                <div className="mb-5">
                  <h2 className="font-serif text-xl text-[#e5c17e]">
                    Quick Links Section
                  </h2>
                  <p className="mt-1 text-xs text-white/40">
                    Manage the Explore column title.
                  </p>
                </div>

                <label className={labelClass}>Section Title</label>
                <input
                  className={inputClass}
                  value={footer.exploreTitle}
                  onChange={(e) =>
                    updateFooter("exploreTitle", e.target.value)
                  }
                  placeholder="Explore"
                />
              </div>

              <LinkListEditor
                title="Footer Quick Links"
                items={footer.quickLinks}
                onChange={handleQuickLinksChange}
                emptyLabel="No footer quick links added."
              />
            </section>

            {/* SERVICES */}
            <section className="space-y-5">
              <div className={sectionClass}>
                <div className="mb-5">
                  <h2 className="font-serif text-xl text-[#e5c17e]">
                    Footer Services Section
                  </h2>
                  <p className="mt-1 text-xs text-white/40">
                    Manage the services column title.
                  </p>
                </div>

                <label className={labelClass}>Section Title</label>
                <input
                  className={inputClass}
                  value={footer.servicesTitle}
                  onChange={(e) =>
                    updateFooter("servicesTitle", e.target.value)
                  }
                  placeholder="Our Services"
                />
              </div>

              <LinkListEditor
                title="Footer Services"
                items={footer.services}
                onChange={handleServicesChange}
                emptyLabel="No footer services added."
              />
            </section>

            {/* CONTACT DETAILS */}
            <section className={sectionClass}>
              <div className="mb-5">
                <h2 className="font-serif text-xl text-[#e5c17e]">
                  Footer Contact Section
                </h2>
                <p className="mt-1 text-xs text-white/40">
                  These labels are displayed with the contact information from Website Settings.
                </p>
              </div>

              <div className="mb-5">
                <label className={labelClass}>Section Title</label>
                <input
                  className={inputClass}
                  value={footer.contactTitle}
                  onChange={(e) =>
                    updateFooter("contactTitle", e.target.value)
                  }
                  placeholder="Get in Touch"
                />
              </div>

              <div className="grid gap-5 md:grid-cols-3">
                <div>
                  <label className={labelClass}>Phone Label</label>
                  <input
                    className={inputClass}
                    value={footer.phoneLabel}
                    onChange={(e) =>
                      updateFooter("phoneLabel", e.target.value)
                    }
                    placeholder="Call Us"
                  />
                </div>

                <div>
                  <label className={labelClass}>Email Label</label>
                  <input
                    className={inputClass}
                    value={footer.emailLabel}
                    onChange={(e) =>
                      updateFooter("emailLabel", e.target.value)
                    }
                    placeholder="Email Us"
                  />
                </div>

                <div>
                  <label className={labelClass}>Location Label</label>
                  <input
                    className={inputClass}
                    value={footer.locationLabel}
                    onChange={(e) =>
                      updateFooter("locationLabel", e.target.value)
                    }
                    placeholder="Studio Location"
                  />
                </div>
              </div>

              <div className="mt-5 grid gap-5 md:grid-cols-3">
                <div>
                  <label className={labelClass}>Phone Number</label>
                  <input
                    className={inputClass}
                    value={settings.phone}
                    onChange={(e) => updateHeader("phone", e.target.value)}
                    placeholder="+91..."
                  />
                </div>

                <div>
                  <label className={labelClass}>Email Address</label>
                  <input
                    className={inputClass}
                    value={settings.email}
                    onChange={(e) => updateHeader("email", e.target.value)}
                    placeholder="hello@example.com"
                  />
                </div>

                <div>
                  <label className={labelClass}>Studio Address</label>
                  <input
                    className={inputClass}
                    value={settings.address}
                    onChange={(e) => updateHeader("address", e.target.value)}
                    placeholder="Studio address"
                  />
                </div>
              </div>
            </section>

            {/* LEGAL LINKS */}
            <section className={sectionClass}>
              <div className="mb-5">
                <h2 className="font-serif text-xl text-[#e5c17e]">
                  Legal Links
                </h2>
                <p className="mt-1 text-xs text-white/40">
                  Manage Privacy Policy and Terms & Conditions links.
                </p>
              </div>

              <div className="grid gap-6 lg:grid-cols-2">
                {/* PRIVACY POLICY */}
                <div className="rounded-lg border border-white/10 bg-[#0d0c0a] p-4">
                  <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold text-white">
                    <Link2 size={15} className="text-[#d6b477]" />
                    Privacy Policy
                  </h3>

                  <div className="space-y-3">
                    <div>
                      <label className={labelClass}>Label</label>
                      <input
                        className={inputClass}
                        value={footer.privacyPolicy.label}
                        onChange={(e) =>
                          updateFooter("privacyPolicy", {
                            ...footer.privacyPolicy,
                            label: e.target.value,
                          })
                        }
                      />
                    </div>

                    <div>
                      <label className={labelClass}>URL</label>
                      <input
                        className={inputClass}
                        value={footer.privacyPolicy.href}
                        onChange={(e) =>
                          updateFooter("privacyPolicy", {
                            ...footer.privacyPolicy,
                            href: e.target.value,
                          })
                        }
                      />
                    </div>

                    <label className="flex cursor-pointer items-center gap-2 text-xs text-white/65">
                      <input
                        type="checkbox"
                        checked={footer.privacyPolicy.isActive}
                        onChange={(e) =>
                          updateFooter("privacyPolicy", {
                            ...footer.privacyPolicy,
                            isActive: e.target.checked,
                          })
                        }
                        className="accent-[#c9a45c]"
                      />
                      Show Privacy Policy link
                    </label>
                  </div>
                </div>

                {/* TERMS */}
                <div className="rounded-lg border border-white/10 bg-[#0d0c0a] p-4">
                  <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold text-white">
                    <Link2 size={15} className="text-[#d6b477]" />
                    Terms & Conditions
                  </h3>

                  <div className="space-y-3">
                    <div>
                      <label className={labelClass}>Label</label>
                      <input
                        className={inputClass}
                        value={footer.terms.label}
                        onChange={(e) =>
                          updateFooter("terms", {
                            ...footer.terms,
                            label: e.target.value,
                          })
                        }
                      />
                    </div>

                    <div>
                      <label className={labelClass}>URL</label>
                      <input
                        className={inputClass}
                        value={footer.terms.href}
                        onChange={(e) =>
                          updateFooter("terms", {
                            ...footer.terms,
                            href: e.target.value,
                          })
                        }
                      />
                    </div>

                    <label className="flex cursor-pointer items-center gap-2 text-xs text-white/65">
                      <input
                        type="checkbox"
                        checked={footer.terms.isActive}
                        onChange={(e) =>
                          updateFooter("terms", {
                            ...footer.terms,
                            isActive: e.target.checked,
                          })
                        }
                        className="accent-[#c9a45c]"
                      />
                      Show Terms & Conditions link
                    </label>
                  </div>
                </div>
              </div>
            </section>

            {/* COPYRIGHT */}
            <section className={sectionClass}>
              <div className="mb-5">
                <h2 className="font-serif text-xl text-[#e5c17e]">
                  Copyright Settings
                </h2>
                <p className="mt-1 text-xs text-white/40">
                  The year and website name are generated automatically on the website.
                </p>
              </div>

              <label className={labelClass}>Copyright Text</label>
              <input
                className={inputClass}
                value={footer.copyrightText}
                onChange={(e) =>
                  updateFooter("copyrightText", e.target.value)
                }
                placeholder="All rights reserved."
              />
            </section>
          </div>
        )}

        {/* BOTTOM SAVE BAR */}
        <div className="mt-8 flex flex-col justify-between gap-4 rounded-xl border border-[#b18a4a]/20 bg-[#11100e] p-5 sm:flex-row sm:items-center">
          <div>
            <p className="text-sm font-semibold text-white">
              Ready to publish your changes?
            </p>
            <p className="mt-1 text-xs text-white/40">
              Save your settings to update the website Header and Footer.
            </p>
          </div>

          <button
            type="button"
            onClick={handleSave}
            disabled={saving || uploading}
            className="flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-[#c9a45c] to-[#a77b37] px-6 py-3 text-sm font-semibold text-black transition hover:brightness-110 disabled:opacity-50"
          >
            {saving ? (
              <Loader2 size={17} className="animate-spin" />
            ) : (
              <Save size={17} />
            )}
            {saving ? "Saving..." : "Save All Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}
