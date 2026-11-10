
"use client";

import { useCallback, useEffect, useState } from "react";

import {
  Globe,
  Search,
  Image as ImageIcon,
  Save,
  RotateCcw,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Plus,
  X,
  ExternalLink,
  FileText,
} from "lucide-react";

import {
  getWebsiteSettings,
  updateWebsiteSettings,
} from "@/services/api/settings.api";

import type {
  WebsiteSettings,
  SEOSettings,
  PageSEO,
  PageSEOSettings,
} from "@/types/settings.types";

// --------------------------------------------------
// TYPES
// --------------------------------------------------

type SettingsTab = "general" | "seo" | "pageSEO";

type PageSEOKey = keyof PageSEO;

// --------------------------------------------------
// DEFAULT SETTINGS
// --------------------------------------------------

const defaultSEO: SEOSettings = {
  metaTitle: "Naeem Bhojani Photography",
  metaDescription: "",
  keywords: [],
  ogImage: "",
};

const defaultPageSEOSettings: PageSEOSettings = {
  metaTitle: "",
  metaDescription: "",
  keywords: [],
  ogImage: "",
};

const defaultPageSEO: PageSEO = {
  home: { ...defaultPageSEOSettings },
  about: { ...defaultPageSEOSettings },
  services: { ...defaultPageSEOSettings },
  contact: { ...defaultPageSEOSettings },
  gallery: { ...defaultPageSEOSettings },
  testimonials: { ...defaultPageSEOSettings },
};

const pageSEOOptions: {
  key: PageSEOKey;
  label: string;
  path: string;
}[] = [
  { key: "home", label: "Home Page", path: "/" },
  { key: "about", label: "About Page", path: "/about" },
  { key: "services", label: "Services Page", path: "/services" },
  { key: "contact", label: "Contact Page", path: "/contact" },
  { key: "gallery", label: "Gallery Page", path: "/gallery" },
  {
    key: "testimonials",
    label: "Testimonials Page",
    path: "/testimonials",
  },
];

const defaultSettings: WebsiteSettings = {
  siteName: "Naeem Bhojani Photography",
  logo: "",
  favicon: "",
  seo: defaultSEO,
  pageSEO: defaultPageSEO,
  email: "",
  phone: "",
  address: "",
  socialLinks: {
    instagram: "",
    facebook: "",
    youtube: "",
  },
  navigation: [],
  headerCTA: {
    label: "Book a Session",
    href: "/contact",
    isActive: true,
  },
};

// --------------------------------------------------
// COMPONENT
// --------------------------------------------------

export default function WebsiteSettingsPage() {
  const [settings, setSettings] =
    useState<WebsiteSettings>(defaultSettings);

  const [originalSettings, setOriginalSettings] =
    useState<WebsiteSettings>(defaultSettings);

  const [activeTab, setActiveTab] =
    useState<SettingsTab>("general");

  const [selectedPage, setSelectedPage] =
    useState<PageSEOKey>("home");

  const [keywordInput, setKeywordInput] = useState("");
  const [pageKeywordInput, setPageKeywordInput] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const isDirty =
    JSON.stringify(settings) !==
    JSON.stringify(originalSettings);

  // --------------------------------------------------
  // NORMALIZE SETTINGS
  // --------------------------------------------------

  const normalizeSettings = useCallback(
    (data: Partial<WebsiteSettings>): WebsiteSettings => {
      const incomingPageSEO = data.pageSEO;

      return {
        ...defaultSettings,
        ...data,

        seo: {
          ...defaultSEO,
          ...data.seo,
          keywords: data.seo?.keywords || [],
        },

        socialLinks: {
          ...defaultSettings.socialLinks,
          ...data.socialLinks,
        },

        headerCTA: {
          ...defaultSettings.headerCTA,
          ...data.headerCTA,
        },

        navigation: data.navigation || [],

        pageSEO: {
          home: {
            ...defaultPageSEOSettings,
            ...incomingPageSEO?.home,
            keywords: incomingPageSEO?.home?.keywords || [],
          },

          about: {
            ...defaultPageSEOSettings,
            ...incomingPageSEO?.about,
            keywords: incomingPageSEO?.about?.keywords || [],
          },

          services: {
            ...defaultPageSEOSettings,
            ...incomingPageSEO?.services,
            keywords: incomingPageSEO?.services?.keywords || [],
          },

          contact: {
            ...defaultPageSEOSettings,
            ...incomingPageSEO?.contact,
            keywords: incomingPageSEO?.contact?.keywords || [],
          },

          gallery: {
            ...defaultPageSEOSettings,
            ...incomingPageSEO?.gallery,
            keywords: incomingPageSEO?.gallery?.keywords || [],
          },

          testimonials: {
            ...defaultPageSEOSettings,
            ...incomingPageSEO?.testimonials,
            keywords: incomingPageSEO?.testimonials?.keywords || [],
          },
        },
      };
    },
    []
  );

  // --------------------------------------------------
  // LOAD SETTINGS
  // --------------------------------------------------

  const loadSettings = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getWebsiteSettings();

      if (!response.success || !response.settings) {
        throw new Error("Unable to load website settings.");
      }

      const normalized = normalizeSettings(response.settings);

      setSettings(normalized);
      setOriginalSettings(normalized);
    } catch (err) {
      console.error("Load website settings error:", err);

      setError(
        "Failed to load website settings. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }, [normalizeSettings]);

  useEffect(() => {
    loadSettings();
  }, [loadSettings]);

  // --------------------------------------------------
  // GENERAL FIELD UPDATE
  // --------------------------------------------------

  const updateField = <K extends keyof WebsiteSettings>(
    field: K,
    value: WebsiteSettings[K]
  ) => {
    setSettings((prev) => ({
      ...prev,
      [field]: value,
    }));

    setSuccess("");
  };

  // --------------------------------------------------
  // GLOBAL SEO UPDATE
  // --------------------------------------------------

  const updateSEOField = <K extends keyof SEOSettings>(
    field: K,
    value: SEOSettings[K]
  ) => {
    setSettings((prev) => ({
      ...prev,
      seo: {
        ...prev.seo,
        [field]: value,
      },
    }));

    setSuccess("");
  };

  // --------------------------------------------------
  // GLOBAL SEO KEYWORDS
  // --------------------------------------------------

  const addKeyword = () => {
    const keyword = keywordInput.trim();

    if (!keyword) return;

    const exists = settings.seo.keywords.some(
      (item) => item.toLowerCase() === keyword.toLowerCase()
    );

    if (exists) {
      setKeywordInput("");
      return;
    }

    updateSEOField("keywords", [
      ...settings.seo.keywords,
      keyword,
    ]);

    setKeywordInput("");
  };

  const removeKeyword = (keyword: string) => {
    updateSEOField(
      "keywords",
      settings.seo.keywords.filter(
        (item) => item !== keyword
      )
    );
  };

  // --------------------------------------------------
  // PAGE-WISE SEO UPDATE
  // --------------------------------------------------

  const updatePageSEOField = <
    K extends keyof PageSEOSettings
  >(
    field: K,
    value: PageSEOSettings[K]
  ) => {
    setSettings((prev) => ({
      ...prev,

      pageSEO: {
        ...prev.pageSEO,

        [selectedPage]: {
          ...prev.pageSEO[selectedPage],
          [field]: value,
        },
      },
    }));

    setSuccess("");
  };

  // --------------------------------------------------
  // PAGE-WISE SEO KEYWORDS
  // --------------------------------------------------

  const addPageKeyword = () => {
    const keyword = pageKeywordInput.trim();

    if (!keyword) return;

    const currentKeywords =
      settings.pageSEO[selectedPage].keywords;

    const exists = currentKeywords.some(
      (item) => item.toLowerCase() === keyword.toLowerCase()
    );

    if (exists) {
      setPageKeywordInput("");
      return;
    }

    updatePageSEOField("keywords", [
      ...currentKeywords,
      keyword,
    ]);

    setPageKeywordInput("");
  };

  const removePageKeyword = (keyword: string) => {
    updatePageSEOField(
      "keywords",
      settings.pageSEO[selectedPage].keywords.filter(
        (item) => item !== keyword
      )
    );
  };

  // --------------------------------------------------
  // SAVE SETTINGS
  // --------------------------------------------------

  const handleSave = async () => {
    try {
      setSaving(true);
      setError("");
      setSuccess("");

      const payload: Partial<WebsiteSettings> = {
        siteName: settings.siteName,
        logo: settings.logo,
        favicon: settings.favicon,
        seo: settings.seo,
        pageSEO: settings.pageSEO,
      };

      const response = await updateWebsiteSettings(payload);

      if (!response.success || !response.settings) {
        throw new Error("Settings update failed.");
      }

      const normalized = normalizeSettings({
        ...settings,
        ...response.settings,
      });

      setSettings(normalized);
      setOriginalSettings(normalized);

      setSuccess("Website settings saved successfully.");
    } catch (err) {
      console.error("Save website settings error:", err);

      setError("Failed to save settings. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  // --------------------------------------------------
  // RESET SETTINGS
  // --------------------------------------------------

  const handleReset = () => {
    setSettings(originalSettings);

    setKeywordInput("");
    setPageKeywordInput("");

    setError("");
    setSuccess("");
  };

  // --------------------------------------------------
  // STYLES
  // --------------------------------------------------

  const inputClass =
    "w-full min-w-0 rounded-xl border border-[#343434] bg-[#111111] px-4 py-3 text-sm text-white outline-none transition placeholder:text-[#666] focus:border-[#b18a4a]";

  const labelClass =
    "mb-2 block text-sm font-medium text-[#d6d0c5]";

  const panelClass =
    "min-w-0 rounded-2xl border border-[#303030] bg-[#171717] p-5 sm:p-6 xl:p-7";

  const imageFrameClass =
    "flex h-[110px] w-full items-center justify-center overflow-hidden rounded-xl border border-[#353535] bg-[#101010] p-3";

  const currentPageSEO = settings.pageSEO[selectedPage];

  const selectedPageDetails = pageSEOOptions.find(
    (page) => page.key === selectedPage
  );

  // --------------------------------------------------
  // LOADING
  // --------------------------------------------------

  if (loading) {
    return (
      <div className="flex min-h-[60vh] w-full items-center justify-center bg-[#101010]">
        <div className="flex items-center gap-3 text-[#c5a36a]">
          <Loader2 className="h-6 w-6 animate-spin" />

          <span className="text-sm">
            Loading website settings...
          </span>
        </div>
      </div>
    );
  }

  // --------------------------------------------------
  // MAIN UI
  // --------------------------------------------------

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-[#101010] text-white">

      <div className="w-full space-y-6 px-3 sm:px-4 lg:px-5 xl:px-6">

        {/* PAGE HEADER */}

        <div className="flex flex-col justify-between gap-5 border-b border-[#303030] pb-6 lg:flex-row lg:items-center">

          <div>
            <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#b18a4a]">
              <Globe size={15} />
              Website Configuration
            </div>

            <h1 className="text-2xl font-semibold tracking-wide sm:text-3xl">
              Website Settings
            </h1>

            <p className="mt-2 text-sm text-[#929292]">
              Manage your website identity, favicon and search engine settings.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">

            <button
              type="button"
              onClick={handleReset}
              disabled={!isDirty || saving}
              className="flex items-center justify-center gap-2 rounded-xl border border-[#3a3a3a] px-5 py-3 text-sm text-[#d1d1d1] transition hover:border-[#b18a4a] disabled:cursor-not-allowed disabled:opacity-40"
            >
              <RotateCcw size={16} />
              Reset
            </button>

            <button
              type="button"
              onClick={handleSave}
              disabled={!isDirty || saving}
              className="flex items-center justify-center gap-2 rounded-xl bg-[#b18a4a] px-5 py-3 text-sm font-semibold text-black transition hover:bg-[#d5ad62] disabled:cursor-not-allowed disabled:opacity-40"
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

        {/* ALERTS */}

        {success && (
          <div className="flex items-center gap-3 rounded-xl border border-green-900/60 bg-green-950/30 p-4 text-sm text-green-400">
            <CheckCircle2 size={18} />
            {success}
          </div>
        )}

        {error && (
          <div className="flex items-center gap-3 rounded-xl border border-red-900/60 bg-red-950/30 p-4 text-sm text-red-400">
            <AlertCircle size={18} />
            {error}
          </div>
        )}

        {/* TABS */}

        <div className="flex flex-wrap items-center gap-2 border-b border-[#303030] pb-4">

          <button
            type="button"
            onClick={() => setActiveTab("general")}
            className={`flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-medium transition ${
              activeTab === "general"
                ? "bg-[#b18a4a] text-black shadow-lg shadow-[#b18a4a]/10"
                : "border border-[#303030] bg-[#191919] text-[#aaa] hover:border-[#70572f] hover:text-white"
            }`}
          >
            <Globe size={17} />
            General Settings
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("seo")}
            className={`flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-medium transition ${
              activeTab === "seo"
                ? "bg-[#b18a4a] text-black shadow-lg shadow-[#b18a4a]/10"
                : "border border-[#303030] bg-[#191919] text-[#aaa] hover:border-[#70572f] hover:text-white"
            }`}
          >
            <Search size={17} />
            Global SEO
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("pageSEO")}
            className={`flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-medium transition ${
              activeTab === "pageSEO"
                ? "bg-[#b18a4a] text-black shadow-lg shadow-[#b18a4a]/10"
                : "border border-[#303030] bg-[#191919] text-[#aaa] hover:border-[#70572f] hover:text-white"
            }`}
          >
            <FileText size={17} />
            Page-wise SEO
          </button>

        </div>

        {/* ========================================= */}
        {/* GENERAL SETTINGS */}
        {/* ========================================= */}

        {activeTab === "general" && (

          <div className="grid w-full grid-cols-1 items-start gap-5 2xl:grid-cols-[1.1fr_0.9fr]">

            {/* WEBSITE IDENTITY */}

            <section className={panelClass}>

              <div className="mb-7 flex items-center gap-3 border-b border-[#303030] pb-5">

                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#b18a4a]/10 text-[#c5a36a]">
                  <Globe size={21} />
                </div>

                <div>
                  <h2 className="font-semibold text-white">
                    Website Identity
                  </h2>

                  <p className="mt-1 text-xs text-[#888]">
                    Configure your website name, logo and favicon.
                  </p>
                </div>

              </div>

              <div className="space-y-6">

                {/* WEBSITE NAME */}

                <div>
                  <label className={labelClass}>
                    Website Name
                  </label>

                  <input
                    type="text"
                    value={settings.siteName}
                    onChange={(e) =>
                      updateField("siteName", e.target.value)
                    }
                    placeholder="Naeem Bhojani Photography"
                    className={inputClass}
                  />
                </div>

                {/* LOGO */}

                <div>
                  <label className={labelClass}>
                    Website Logo URL
                  </label>

                  <input
                    type="text"
                    value={settings.logo}
                    onChange={(e) =>
                      updateField("logo", e.target.value)
                    }
                    placeholder="/images/logo.png"
                    className={inputClass}
                  />

                  <div className="mt-3 flex flex-col gap-3 rounded-xl border border-[#303030] bg-[#111] p-4 sm:flex-row sm:items-center">

                    <div className={`${imageFrameClass} sm:w-[190px]`}>
                      {settings.logo ? (
                        <img
                          src={settings.logo}
                          alt="Website logo preview"
                          className="block h-full max-h-[82px] w-full max-w-[160px] object-contain"
                        />
                      ) : (
                        <ImageIcon
                          size={28}
                          className="text-[#665438]"
                        />
                      )}
                    </div>

                    <div className="min-w-0">
                      <p className="text-sm font-medium text-white">
                        Logo Preview
                      </p>

                      <p className="mt-1 text-xs leading-5 text-[#888]">
                        Your logo is displayed inside a fixed preview area.
                        The original image proportions are preserved.
                      </p>
                    </div>

                  </div>
                </div>

                {/* FAVICON */}

                <div>
                  <label className={labelClass}>
                    Favicon URL
                  </label>

                  <input
                    type="text"
                    value={settings.favicon}
                    onChange={(e) =>
                      updateField("favicon", e.target.value)
                    }
                    placeholder="/images/favicon.png"
                    className={inputClass}
                  />

                  <div className="mt-3 flex items-center gap-4 rounded-xl border border-[#303030] bg-[#111] p-4">

                    <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-[#444] bg-[#222] p-2">

                      {settings.favicon ? (
                        <img
                          src={settings.favicon}
                          alt="Favicon preview"
                          className="h-full w-full object-contain"
                        />
                      ) : (
                        <Globe
                          size={25}
                          className="text-[#b18a4a]"
                        />
                      )}

                    </div>

                    <div className="min-w-0">
                      <p className="text-sm font-medium text-white">
                        Favicon Preview
                      </p>

                      <p className="mt-1 text-xs leading-5 text-[#888]">
                        Recommended size: 32 × 32 or 48 × 48 pixels.
                      </p>
                    </div>

                  </div>
                </div>

              </div>
            </section>

            {/* BRAND PREVIEW */}

            <section className={panelClass}>

              <div className="mb-7 flex items-center gap-3 border-b border-[#303030] pb-5">

                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#b18a4a]/10 text-[#c5a36a]">
                  <ImageIcon size={21} />
                </div>

                <div>
                  <h2 className="font-semibold text-white">
                    Brand Preview
                  </h2>

                  <p className="mt-1 text-xs text-[#888]">
                    Preview how your website identity looks.
                  </p>
                </div>

              </div>

              {/* BROWSER PREVIEW */}

              <div className="overflow-hidden rounded-xl border border-[#353535] bg-[#111]">

                <div className="flex min-w-0 items-center gap-3 border-b border-[#333] px-4 py-4">

                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#252525]">

                    {settings.favicon ? (
                      <img
                        src={settings.favicon}
                        alt="Favicon"
                        className="h-5 w-5 object-contain"
                      />
                    ) : (
                      <Globe
                        size={17}
                        className="text-[#b18a4a]"
                      />
                    )}

                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm text-[#ddd]">
                      {settings.siteName || "Your Website"}
                    </p>

                    <p className="text-[11px] text-[#777]">
                      Website identity preview
                    </p>
                  </div>

                  <span className="shrink-0 rounded-full border border-[#393939] px-3 py-1 text-[10px] text-[#888]">
                    Preview
                  </span>

                </div>

                <div className="flex min-h-[240px] items-center justify-center bg-[#191919] p-6 sm:p-8">

                  {settings.logo ? (
                    <img
                      src={settings.logo}
                      alt="Website brand preview"
                      className="block h-[180px] w-full max-w-full object-contain"
                    />
                  ) : (
                    <div className="text-center">
                      <Globe
                        size={40}
                        className="mx-auto mb-3 text-[#b18a4a]"
                      />

                      <p className="text-sm text-[#888]">
                        Your website logo will appear here.
                      </p>
                    </div>
                  )}

                </div>

              </div>

              {/* GUIDELINES */}

              <div className="mt-5 rounded-xl border border-[#403522] bg-[#b18a4a]/5 p-5">

                <div className="mb-3 flex items-center gap-2">
                  <ImageIcon
                    size={17}
                    className="text-[#d5ad62]"
                  />

                  <p className="text-sm font-semibold text-[#d5ad62]">
                    Image Guidelines
                  </p>
                </div>

                <ul className="space-y-2 text-xs leading-5 text-[#999]">
                  <li>• Use transparent PNG or WebP for logos.</li>
                  <li>• Maintain the original logo aspect ratio.</li>
                  <li>• Use a square image for the favicon.</li>
                  <li>• Make sure image URLs are publicly accessible.</li>
                </ul>

              </div>

            </section>

          </div>
        )}

        {/* ========================================= */}
        {/* GLOBAL SEO SETTINGS */}
        {/* ========================================= */}

        {activeTab === "seo" && (

          <div className="grid w-full grid-cols-1 items-start gap-5 2xl:grid-cols-[1.1fr_0.9fr]">

            {/* SEO FORM */}

            <section className={panelClass}>

              <div className="mb-7 flex items-center gap-3 border-b border-[#303030] pb-5">

                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#b18a4a]/10 text-[#c5a36a]">
                  <Search size={21} />
                </div>

                <div>
                  <h2 className="font-semibold text-white">
                    Global Search Engine Optimization
                  </h2>

                  <p className="mt-1 text-xs text-[#888]">
                    Configure default website search appearance.
                  </p>
                </div>

              </div>

              <div className="space-y-6">

                {/* META TITLE */}

                <div>
                  <div className="mb-2 flex items-center justify-between gap-3">

                    <label className="text-sm font-medium text-[#d6d0c5]">
                      Meta Title
                    </label>

                    <span className="shrink-0 text-xs text-[#888]">
                      {settings.seo.metaTitle.length}/60
                    </span>

                  </div>

                  <input
                    type="text"
                    maxLength={60}
                    value={settings.seo.metaTitle}
                    onChange={(e) =>
                      updateSEOField("metaTitle", e.target.value)
                    }
                    placeholder="Your SEO title"
                    className={inputClass}
                  />
                </div>

                {/* META DESCRIPTION */}

                <div>
                  <div className="mb-2 flex items-center justify-between gap-3">

                    <label className="text-sm font-medium text-[#d6d0c5]">
                      Meta Description
                    </label>

                    <span className="shrink-0 text-xs text-[#888]">
                      {settings.seo.metaDescription.length}/160
                    </span>

                  </div>

                  <textarea
                    rows={5}
                    maxLength={160}
                    value={settings.seo.metaDescription}
                    onChange={(e) =>
                      updateSEOField(
                        "metaDescription",
                        e.target.value
                      )
                    }
                    placeholder="Describe your photography website..."
                    className={`${inputClass} resize-none`}
                  />
                </div>

                {/* KEYWORDS */}

                <div>
                  <label className={labelClass}>
                    SEO Keywords
                  </label>

                  <div className="flex gap-2">

                    <input
                      type="text"
                      value={keywordInput}
                      onChange={(e) =>
                        setKeywordInput(e.target.value)
                      }
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          addKeyword();
                        }
                      }}
                      placeholder="Enter a keyword"
                      className={inputClass}
                    />

                    <button
                      type="button"
                      onClick={addKeyword}
                      className="flex h-11 w-12 shrink-0 items-center justify-center rounded-xl bg-[#b18a4a] text-black transition hover:bg-[#d5ad62]"
                    >
                      <Plus size={19} />
                    </button>

                  </div>

                  <div className="mt-3 flex flex-wrap gap-2">

                    {settings.seo.keywords.map((keyword) => (
                      <span
                        key={keyword}
                        className="flex items-center gap-2 rounded-full border border-[#55452c] bg-[#b18a4a]/10 px-3 py-2 text-xs text-[#d5ad62]"
                      >
                        {keyword}

                        <button
                          type="button"
                          onClick={() => removeKeyword(keyword)}
                          className="transition hover:text-white"
                          aria-label={`Remove ${keyword}`}
                        >
                          <X size={13} />
                        </button>
                      </span>
                    ))}

                    {settings.seo.keywords.length === 0 && (
                      <p className="text-xs text-[#777]">
                        No keywords added yet.
                      </p>
                    )}

                  </div>
                </div>

                {/* OG IMAGE */}

                <div>
                  <label className={labelClass}>
                    Open Graph Image URL
                  </label>

                  <input
                    type="text"
                    value={settings.seo.ogImage}
                    onChange={(e) =>
                      updateSEOField("ogImage", e.target.value)
                    }
                    placeholder="/images/og-image.jpg"
                    className={inputClass}
                  />

                  {settings.seo.ogImage && (
                    <div className="mt-3 overflow-hidden rounded-xl border border-[#333] bg-[#111] p-2">

                      <img
                        src={settings.seo.ogImage}
                        alt="Open Graph preview"
                        className="block max-h-[240px] w-full rounded-lg object-cover"
                      />

                    </div>
                  )}

                  <p className="mt-2 text-xs text-[#777]">
                    Recommended social sharing image ratio: 1200 × 630 pixels.
                  </p>

                </div>

              </div>
            </section>

            {/* SEO PREVIEW */}

            <section className={panelClass}>

              <div className="mb-7 flex items-center gap-3 border-b border-[#303030] pb-5">

                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#b18a4a]/10 text-[#c5a36a]">
                  <Search size={21} />
                </div>

                <div>
                  <h2 className="font-semibold text-white">
                    Search Result Preview
                  </h2>

                  <p className="mt-1 text-xs text-[#888]">
                    Preview your default website search appearance.
                  </p>
                </div>

              </div>

              <div className="rounded-xl border border-[#333] bg-[#111] p-5 sm:p-6">

                <div className="mb-4 flex items-center gap-3">

                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#252525]">
                    <Globe
                      size={18}
                      className="text-[#b18a4a]"
                    />
                  </div>

                  <div className="min-w-0">
                    <p className="truncate text-sm text-[#ddd]">
                      {settings.siteName}
                    </p>

                    <p className="text-xs text-[#777]">
                      Your website
                    </p>
                  </div>

                  <ExternalLink
                    size={15}
                    className="ml-auto shrink-0 text-[#777]"
                  />

                </div>

                <h3 className="break-words text-lg text-[#8ab4f8]">
                  {settings.seo.metaTitle || "Your website meta title"}
                </h3>

                <p className="mt-2 break-words text-sm leading-6 text-[#aaa]">
                  {settings.seo.metaDescription ||
                    "Your meta description will appear here as a search result preview."}
                </p>

              </div>

              <div className="mt-5 rounded-xl border border-[#403522] bg-[#b18a4a]/5 p-5">

                <p className="text-sm font-semibold text-[#d5ad62]">
                  SEO Recommendations
                </p>

                <ul className="mt-3 space-y-2 text-xs leading-5 text-[#999]">
                  <li>• Keep your meta title concise and relevant.</li>
                  <li>• Write a unique and useful meta description.</li>
                  <li>• Use relevant photography-related keywords.</li>
                  <li>• Use a high-quality Open Graph image.</li>
                </ul>

              </div>

            </section>

          </div>
        )}

        {/* ========================================= */}
        {/* PAGE-WISE SEO SETTINGS */}
        {/* ========================================= */}

        {activeTab === "pageSEO" && (

          <div className="grid w-full grid-cols-1 items-start gap-5 2xl:grid-cols-[1.1fr_0.9fr]">

            {/* PAGE SEO FORM */}

            <section className={panelClass}>

              <div className="mb-7 flex items-center gap-3 border-b border-[#303030] pb-5">

                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#b18a4a]/10 text-[#c5a36a]">
                  <FileText size={21} />
                </div>

                <div>
                  <h2 className="font-semibold text-white">
                    Page-wise SEO Management
                  </h2>

                  <p className="mt-1 text-xs text-[#888]">
                    Manage SEO metadata individually for every website page.
                  </p>
                </div>

              </div>

              {/* PAGE SELECTOR */}

              <div className="mb-7">

                <label className={labelClass}>
                  Select Website Page
                </label>

                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">

                  {pageSEOOptions.map((page) => (

                    <button
                      key={page.key}
                      type="button"
                      onClick={() => {
                        setSelectedPage(page.key);
                        setPageKeywordInput("");
                        setSuccess("");
                      }}
                      className={`rounded-xl border px-3 py-3 text-left text-sm transition ${
                        selectedPage === page.key
                          ? "border-[#b18a4a] bg-[#b18a4a]/10 text-[#d5ad62]"
                          : "border-[#303030] bg-[#111] text-[#aaa] hover:border-[#70572f] hover:text-white"
                      }`}
                    >

                      <span className="block font-medium">
                        {page.label}
                      </span>

                      <span className="mt-1 block text-xs text-[#777]">
                        {page.path}
                      </span>

                    </button>

                  ))}

                </div>

              </div>

              <div className="space-y-6">

                {/* META TITLE */}

                <div>

                  <div className="mb-2 flex items-center justify-between gap-3">

                    <label className="text-sm font-medium text-[#d6d0c5]">
                      Meta Title
                    </label>

                    <span className="shrink-0 text-xs text-[#888]">
                      {currentPageSEO.metaTitle.length}/60
                    </span>

                  </div>

                  <input
                    type="text"
                    maxLength={60}
                    value={currentPageSEO.metaTitle}
                    onChange={(e) =>
                      updatePageSEOField(
                        "metaTitle",
                        e.target.value
                      )
                    }
                    placeholder={`Enter ${selectedPageDetails?.label} SEO title`}
                    className={inputClass}
                  />

                </div>

                {/* META DESCRIPTION */}

                <div>

                  <div className="mb-2 flex items-center justify-between gap-3">

                    <label className="text-sm font-medium text-[#d6d0c5]">
                      Meta Description
                    </label>

                    <span className="shrink-0 text-xs text-[#888]">
                      {currentPageSEO.metaDescription.length}/160
                    </span>

                  </div>

                  <textarea
                    rows={5}
                    maxLength={160}
                    value={currentPageSEO.metaDescription}
                    onChange={(e) =>
                      updatePageSEOField(
                        "metaDescription",
                        e.target.value
                      )
                    }
                    placeholder={`Describe your ${selectedPageDetails?.label}...`}
                    className={`${inputClass} resize-none`}
                  />

                </div>

                {/* KEYWORDS */}

                <div>

                  <label className={labelClass}>
                    SEO Keywords
                  </label>

                  <div className="flex gap-2">

                    <input
                      type="text"
                      value={pageKeywordInput}
                      onChange={(e) =>
                        setPageKeywordInput(e.target.value)
                      }
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          addPageKeyword();
                        }
                      }}
                      placeholder="Enter a keyword"
                      className={inputClass}
                    />

                    <button
                      type="button"
                      onClick={addPageKeyword}
                      className="flex h-11 w-12 shrink-0 items-center justify-center rounded-xl bg-[#b18a4a] text-black transition hover:bg-[#d5ad62]"
                    >
                      <Plus size={19} />
                    </button>

                  </div>

                  <div className="mt-3 flex flex-wrap gap-2">

                    {currentPageSEO.keywords.map((keyword) => (

                      <span
                        key={keyword}
                        className="flex items-center gap-2 rounded-full border border-[#55452c] bg-[#b18a4a]/10 px-3 py-2 text-xs text-[#d5ad62]"
                      >
                        {keyword}

                        <button
                          type="button"
                          onClick={() => removePageKeyword(keyword)}
                          className="transition hover:text-white"
                          aria-label={`Remove ${keyword}`}
                        >
                          <X size={13} />
                        </button>

                      </span>

                    ))}

                    {currentPageSEO.keywords.length === 0 && (
                      <p className="text-xs text-[#777]">
                        No keywords added yet.
                      </p>
                    )}

                  </div>

                </div>

                {/* OPEN GRAPH IMAGE */}

                <div>

                  <label className={labelClass}>
                    Open Graph Image URL
                  </label>

                  <input
                    type="text"
                    value={currentPageSEO.ogImage}
                    onChange={(e) =>
                      updatePageSEOField(
                        "ogImage",
                        e.target.value
                      )
                    }
                    placeholder="/images/og-image.jpg"
                    className={inputClass}
                  />

                  {currentPageSEO.ogImage && (

                    <div className="mt-3 overflow-hidden rounded-xl border border-[#333] bg-[#111] p-2">

                      <img
                        src={currentPageSEO.ogImage}
                        alt={`${selectedPageDetails?.label} Open Graph preview`}
                        className="block max-h-[240px] w-full rounded-lg object-cover"
                      />

                    </div>

                  )}

                  <p className="mt-2 text-xs text-[#777]">
                    Recommended image ratio: 1200 × 630 pixels.
                  </p>

                </div>

              </div>

            </section>

            {/* PAGE SEO PREVIEW */}

            <section className={panelClass}>

              <div className="mb-7 flex items-center gap-3 border-b border-[#303030] pb-5">

                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#b18a4a]/10 text-[#c5a36a]">
                  <Search size={21} />
                </div>

                <div>
                  <h2 className="font-semibold text-white">
                    Page SEO Preview
                  </h2>

                  <p className="mt-1 text-xs text-[#888]">
                    Preview the selected page search appearance.
                  </p>
                </div>

              </div>

              {/* SEARCH PREVIEW */}

              <div className="rounded-xl border border-[#333] bg-[#111] p-5 sm:p-6">

                <div className="mb-4 flex items-center gap-3">

                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#252525]">
                    <Globe
                      size={18}
                      className="text-[#b18a4a]"
                    />
                  </div>

                  <div className="min-w-0">
                    <p className="truncate text-sm text-[#ddd]">
                      {settings.siteName}
                    </p>

                    <p className="text-xs text-[#777]">
                      {selectedPageDetails?.path}
                    </p>
                  </div>

                  <ExternalLink
                    size={15}
                    className="ml-auto shrink-0 text-[#777]"
                  />

                </div>

                <h3 className="break-words text-lg text-[#8ab4f8]">
                  {currentPageSEO.metaTitle ||
                    `${selectedPageDetails?.label} Meta Title`}
                </h3>

                <p className="mt-2 break-words text-sm leading-6 text-[#aaa]">
                  {currentPageSEO.metaDescription ||
                    "Your page meta description will appear here."}
                </p>

              </div>

              {/* SELECTED PAGE INFORMATION */}

              <div className="mt-5 rounded-xl border border-[#303030] bg-[#111] p-5">

                <p className="text-sm font-semibold text-white">
                  Selected Page Information
                </p>

                <div className="mt-4 space-y-3">

                  <div className="flex items-center justify-between gap-3">
                    <span className="text-xs text-[#888]">
                      Page
                    </span>

                    <span className="text-xs font-medium text-[#d5ad62]">
                      {selectedPageDetails?.label}
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-3">
                    <span className="text-xs text-[#888]">
                      URL Path
                    </span>

                    <span className="text-xs text-white">
                      {selectedPageDetails?.path}
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-3">
                    <span className="text-xs text-[#888]">
                      Keywords
                    </span>

                    <span className="text-xs text-white">
                      {currentPageSEO.keywords.length}
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-3">
                    <span className="text-xs text-[#888]">
                      OG Image
                    </span>

                    <span className="text-xs text-white">
                      {currentPageSEO.ogImage ? "Added" : "Not added"}
                    </span>
                  </div>

                </div>

              </div>

              {/* GUIDELINES */}

              <div className="mt-5 rounded-xl border border-[#403522] bg-[#b18a4a]/5 p-5">

                <p className="text-sm font-semibold text-[#d5ad62]">
                  Page SEO Guidelines
                </p>

                <ul className="mt-3 space-y-2 text-xs leading-5 text-[#999]">
                  <li>• Write a unique title for every page.</li>
                  <li>• Keep descriptions relevant to page content.</li>
                  <li>• Add page-specific photography keywords.</li>
                  <li>• Use a relevant social sharing image.</li>
                  <li>• Avoid duplicate metadata across pages.</li>
                </ul>

              </div>

            </section>

          </div>
        )}

        {/* ========================================= */}
        {/* BOTTOM SAVE BAR */}
        {/* ========================================= */}

        <div className="flex flex-col justify-between gap-4 rounded-2xl border border-[#303030] bg-[#171717] p-5 sm:flex-row sm:items-center sm:px-7">

          <div>
            <p className="text-sm font-medium text-white">
              Website Settings
            </p>

            <p className="mt-1 text-xs text-[#888]">
              {isDirty
                ? "You have unsaved changes."
                : "All changes are saved."}
            </p>
          </div>

          <button
            type="button"
            onClick={handleSave}
            disabled={!isDirty || saving}
            className="flex items-center justify-center gap-2 rounded-xl bg-[#b18a4a] px-6 py-3 text-sm font-semibold text-black transition hover:bg-[#d5ad62] disabled:cursor-not-allowed disabled:opacity-40"
          >
            {saving ? (
              <Loader2 size={17} className="animate-spin" />
            ) : (
              <Save size={17} />
            )}

            {saving ? "Saving..." : "Save Website Settings"}
          </button>

        </div>

      </div>
    </div>
  );
}
