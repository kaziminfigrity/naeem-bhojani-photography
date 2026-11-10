"use client";

import { useEffect, useState, type ChangeEvent } from "react";
import Image from "next/image";
import {
  Image as ImageIcon,
  Upload,
  Loader2,
  Trash2,
} from "lucide-react";

import { uploadHomepageImage } from "@/services/api/upload.api";

import {
  getTestimonialsData,
  updateTestimonialsData,
  addTestimonial,
  updateTestimonial,
  deleteTestimonial,
} from "@/services/api/testimonials.api";

import type {
  TestimonialsData,
  Testimonial,
} from "@/types/testimonials.types";

type Tab = "hero" | "reviews" | "cta";

const emptyData: TestimonialsData = {
  hero: {
    eyebrow: "",
    heading: "",
    description: "",
    backgroundImage: "",
    backgroundImageAlt: "",
  },
  reviewsSection: {
    backgroundImage: "",
    eyebrow: "",
    heading: "",
    description: "",
    testimonials: [],
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

const emptyReview: Testimonial = {
  name: "",
  service: "",
  review: "",
  rating: 5,
  order: 0,
  isActive: true,
};

const tabs: { id: Tab; label: string; number: string }[] = [
  { id: "hero", label: "Hero Section", number: "01" },
  { id: "reviews", label: "Reviews Section", number: "02" },
  { id: "cta", label: "Final CTA", number: "03" },
];

export default function TestimonialsAdminPage() {
  const [data, setData] = useState<TestimonialsData>(emptyData);
  const [originalData, setOriginalData] =
    useState<TestimonialsData>(emptyData);

  const [activeTab, setActiveTab] = useState<Tab>("hero");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [reviewForm, setReviewForm] =
    useState<Testimonial>(emptyReview);

  const loadData = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getTestimonialsData();

      if (!response.success || !response.data) {
        throw new Error(response.message || "Failed to load testimonials");
      }

      const fetchedData = response.data;

      setData(fetchedData);
      setOriginalData(JSON.parse(JSON.stringify(fetchedData)));
    } catch (err) {
      console.error(err);
      setError("Unable to load testimonials. Please check backend connection.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const updateHero = (
    field: keyof TestimonialsData["hero"],
    value: string
  ) => {
    setData((prev) => ({
      ...prev,
      hero: { ...prev.hero, [field]: value },
    }));
  };

  const updateReviewsSection = (
    field: "eyebrow" | "heading" | "description" | "backgroundImage",
    value: string
  ) => {
    setData((prev) => ({
      ...prev,
      reviewsSection: {
        ...prev.reviewsSection,
        [field]: value,
      },
    }));
  };

  const updateCTA = (
    field: keyof TestimonialsData["finalCTA"],
    value: string
  ) => {
    setData((prev) => ({
      ...prev,
      finalCTA: { ...prev.finalCTA, [field]: value },
    }));
  };

  const saveSection = async () => {
    try {
      setSaving(true);
      setError("");
      setSuccess("");

      if (activeTab === "hero") {
        await updateTestimonialsData({ hero: data.hero });
      }

      if (activeTab === "reviews") {
        const { testimonials, ...reviewsContent } = data.reviewsSection;

        await updateTestimonialsData({
          reviewsSection: reviewsContent as TestimonialsData["reviewsSection"],
        });
      }

      if (activeTab === "cta") {
        await updateTestimonialsData({ finalCTA: data.finalCTA });
      }

      await loadData();
      setSuccess("Changes saved successfully.");
    } catch (err) {
      console.error(err);
      setError("Unable to save changes. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const resetSection = () => {
    if (activeTab === "hero") {
      setData((prev) => ({ ...prev, hero: originalData.hero }));
    }

    if (activeTab === "reviews") {
      setData((prev) => ({
        ...prev,
        reviewsSection: originalData.reviewsSection,
      }));
    }

    if (activeTab === "cta") {
      setData((prev) => ({ ...prev, finalCTA: originalData.finalCTA }));
    }

    setError("");
    setSuccess("");
  };

  const openAddModal = () => {
    setEditingId(null);
    setReviewForm({ ...emptyReview });
    setModalOpen(true);
  };

  const openEditModal = (review: Testimonial) => {
    if (!review._id) return;

    setEditingId(review._id);
    setReviewForm({ ...review });
    setModalOpen(true);
  };

  const saveReview = async () => {
    if (!reviewForm.name.trim() || !reviewForm.review.trim()) {
      setError("Client name and review are required.");
      return;
    }

    try {
      setSaving(true);
      setError("");
      setSuccess("");

      const payload = {
        name: reviewForm.name.trim(),
        service: reviewForm.service.trim(),
        review: reviewForm.review.trim(),
        rating: Number(reviewForm.rating),
        order: Number(reviewForm.order),
        isActive: reviewForm.isActive,
      };

      if (editingId) {
        await updateTestimonial(editingId, payload);
        setSuccess("Testimonial updated successfully.");
      } else {
        await addTestimonial(payload);
        setSuccess("Testimonial added successfully.");
      }

      setModalOpen(false);
      await loadData();
    } catch (err) {
      console.error(err);
      setError("Unable to save testimonial.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id?: string) => {
    if (!id) return;

    const confirmed = window.confirm(
      "Are you sure you want to delete this testimonial?"
    );

    if (!confirmed) return;

    try {
      setError("");
      setSuccess("");

      await deleteTestimonial(id);
      await loadData();

      setSuccess("Testimonial deleted successfully.");
    } catch (err) {
      console.error(err);
      setError("Unable to delete testimonial.");
    }
  };

  const toggleActive = async (review: Testimonial) => {
    if (!review._id) return;

    try {
      await updateTestimonial(review._id, {
        isActive: !review.isActive,
      });

      await loadData();
      setSuccess("Testimonial status updated.");
    } catch (err) {
      console.error(err);
      setError("Unable to update testimonial status.");
    }
  };

  const reviews = data.reviewsSection.testimonials || [];
  const activeCount = reviews.filter((item) => item.isActive).length;

  const averageRating = reviews.length
    ? (
        reviews.reduce((total, item) => total + item.rating, 0) /
        reviews.length
      ).toFixed(1)
    : "0.0";

  const inputClass =
    "mt-2 w-full rounded-lg border border-white/10 bg-[#111111] px-4 py-3 text-sm text-white outline-none transition placeholder:text-gray-600 focus:border-[#d6a94e]";

  const labelClass =
    "text-xs font-semibold uppercase tracking-wider text-gray-400";

  // CLOUDINARY IMAGE UPLOAD
  const uploadImage = async (
    file: File,
    onUploaded: (imageUrl: string) => void
  ) => {
    try {
      setUploadingImage(true);
      setError("");
      setSuccess("");

      const response = await uploadHomepageImage(file);

      if (!response.success || !response.data?.image) {
        throw new Error(response.message || "Image upload failed.");
      }

      onUploaded(response.data.image);

      setSuccess(
        "Image uploaded successfully. Click Save Changes to save it."
      );
    } catch (err) {
      console.error("Testimonials image upload error:", err);

      setError(
        err instanceof Error
          ? err.message
          : "Image upload failed. Please try again."
      );
    } finally {
      setUploadingImage(false);
    }
  };

  // REUSABLE IMAGE UPLOADER
  const renderImageUploader = (
    label: string,
    value: string,
    onChange: (imageUrl: string) => void
  ) => (
    <div className="space-y-3">
      <label className={labelClass}>{label}</label>

      <div className="overflow-hidden rounded-xl border border-white/10 bg-[#111111]">
        {value ? (
          <div className="relative h-52 w-full bg-black">
            <Image
              src={value}
              alt={`${label} preview`}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              unoptimized
              className="object-cover"
            />
          </div>
        ) : (
          <div className="flex h-40 flex-col items-center justify-center gap-2 text-gray-500">
            <ImageIcon size={28} />
            <span className="text-xs">No image selected</span>
          </div>
        )}

        <div className="flex flex-wrap items-center gap-3 border-t border-white/10 p-3">
          <label
            className={`inline-flex cursor-pointer items-center gap-2 rounded-lg bg-gradient-to-r from-[#c18b32] to-[#edc66e] px-4 py-2.5 text-xs font-bold text-black transition hover:brightness-110 ${
              uploadingImage ? "pointer-events-none opacity-50" : ""
            }`}
          >
            {uploadingImage ? (
              <Loader2 size={15} className="animate-spin" />
            ) : (
              <Upload size={15} />
            )}

            {uploadingImage ? "Uploading..." : "Upload Image"}

            <input
              type="file"
              accept="image/*"
              className="hidden"
              disabled={uploadingImage}
              onChange={(event: ChangeEvent<HTMLInputElement>) => {
                const file = event.target.files?.[0];

                if (file) {
                  void uploadImage(file, onChange);
                }

                event.target.value = "";
              }}
            />
          </label>

          {value && (
            <button
              type="button"
              onClick={() => onChange("")}
              disabled={uploadingImage}
              className="inline-flex items-center gap-2 rounded-lg border border-red-500/30 px-4 py-2.5 text-xs text-red-400 transition hover:bg-red-500/10 disabled:opacity-50"
            >
              <Trash2 size={14} />
              Remove Image
            </button>
          )}
        </div>
      </div>

      <div>
        <label className="text-[11px] text-gray-500">
          Or enter image URL manually
        </label>

        <input
          className={inputClass}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder="https://..."
          disabled={uploadingImage}
        />
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center bg-[#0b0b0b] text-[#e5b957]">
        Loading Testimonials...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0b0b0b] p-4 text-white sm:p-6 lg:p-8">
      <div className="mx-auto max-w-[1600px]">

        {/* Header */}
        <div className="mb-7 flex flex-col justify-between gap-5 xl:flex-row xl:items-center">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-[#d9ad52]">
              Admin / Pages / Testimonials
            </p>

            <h1 className="font-serif text-3xl font-bold sm:text-4xl">
              Testimonials Management
            </h1>

            <p className="mt-2 text-sm text-gray-400">
              Manage your testimonials page content and client reviews.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={loadData}
              className="rounded-lg border border-white/15 px-5 py-3 text-sm text-gray-300 transition hover:border-[#d9ad52] hover:text-white"
            >
              ↻ Refresh
            </button>

            <button
              onClick={resetSection}
              className="rounded-lg border border-white/15 px-5 py-3 text-sm text-gray-300 transition hover:border-[#d9ad52] hover:text-white"
            >
              Reset
            </button>

            <button
              onClick={saveSection}
              disabled={saving}
              className="rounded-lg bg-gradient-to-r from-[#c18b32] to-[#edc66e] px-6 py-3 text-sm font-bold text-black transition hover:brightness-110 disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>

        {/* Notifications */}
        {error && (
          <div className="mb-5 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-5 rounded-lg border border-green-500/30 bg-green-500/10 px-4 py-3 text-sm text-green-300">
            {success}
          </div>
        )}

        {/* Statistics */}
        <div className="mb-7 grid grid-cols-2 gap-4 xl:grid-cols-4">
          {[
            { label: "Total Reviews", value: reviews.length, icon: "✦" },
            { label: "Active Reviews", value: activeCount, icon: "✓" },
            {
              label: "Inactive Reviews",
              value: reviews.length - activeCount,
              icon: "◷",
            },
            { label: "Average Rating", value: `${averageRating} ★`, icon: "★" },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-xl border border-white/10 bg-gradient-to-br from-[#191919] to-[#101010] p-5"
            >
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-400">{item.label}</p>
                <span className="text-xl text-[#dfb45c]">{item.icon}</span>
              </div>

              <p className="mt-4 text-3xl font-bold text-white">
                {item.value}
              </p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                setError("");
                setSuccess("");
              }}
              className={`flex items-center justify-between rounded-xl border px-5 py-4 text-left transition ${
                activeTab === tab.id
                  ? "border-[#d9ad52] bg-gradient-to-r from-[#72501e]/50 to-[#241b0e] text-[#f1c66d]"
                  : "border-white/10 bg-[#151515] text-gray-400 hover:border-white/30"
              }`}
            >
              <span className="font-semibold">{tab.label}</span>
              <span className="text-xs">{tab.number}</span>
            </button>
          ))}
        </div>

        {/* HERO SECTION */}
        {activeTab === "hero" && (
          <section className="rounded-xl border border-white/10 bg-[#151515]">
            <div className="border-b border-white/10 px-5 py-5 sm:px-7">
              <p className="text-lg font-semibold">Hero Section</p>
              <p className="mt-1 text-sm text-gray-500">
                Manage the main heading and background of the testimonials page.
              </p>
            </div>

            <div className="grid gap-7 p-5 sm:p-7 lg:grid-cols-2">
              <div className="space-y-5">
                <div>
                  <label className={labelClass}>Eyebrow Text</label>
                  <input
                    className={inputClass}
                    value={data.hero.eyebrow}
                    onChange={(e) => updateHero("eyebrow", e.target.value)}
                  />
                </div>

                <div>
                  <label className={labelClass}>Heading</label>
                  <input
                    className={inputClass}
                    value={data.hero.heading}
                    onChange={(e) => updateHero("heading", e.target.value)}
                  />
                </div>

                <div>
                  <label className={labelClass}>Description</label>
                  <textarea
                    rows={5}
                    className={inputClass}
                    value={data.hero.description}
                    onChange={(e) => updateHero("description", e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-5">
                {renderImageUploader(
                  "Hero Background Image",
                  data.hero.backgroundImage,
                  (value) => updateHero("backgroundImage", value)
                )}

                <div>
                  <label className={labelClass}>Background Image Alt Text</label>
                  <input
                    className={inputClass}
                    value={data.hero.backgroundImageAlt}
                    onChange={(e) =>
                      updateHero("backgroundImageAlt", e.target.value)
                    }
                  />
                </div>
              </div>
            </div>
          </section>
        )}

        {/* REVIEWS SECTION */}
        {activeTab === "reviews" && (
          <section className="rounded-xl border border-white/10 bg-[#151515]">
            <div className="flex flex-col justify-between gap-4 border-b border-white/10 px-5 py-5 sm:flex-row sm:items-center sm:px-7">
              <div>
                <p className="text-lg font-semibold">Reviews Section</p>
                <p className="mt-1 text-sm text-gray-500">
                  Manage section content and individual client testimonials.
                </p>
              </div>

              <button
                onClick={openAddModal}
                className="rounded-lg bg-gradient-to-r from-[#c18b32] to-[#edc66e] px-5 py-3 text-sm font-bold text-black"
              >
                + Add Testimonial
              </button>
            </div>

            <div className="grid gap-5 border-b border-white/10 p-5 sm:grid-cols-2 sm:p-7">
              <div>
                <label className={labelClass}>Eyebrow Text</label>
                <input
                  className={inputClass}
                  value={data.reviewsSection.eyebrow}
                  onChange={(e) =>
                    updateReviewsSection("eyebrow", e.target.value)
                  }
                />
              </div>

              <div>
                <label className={labelClass}>Heading</label>
                <input
                  className={inputClass}
                  value={data.reviewsSection.heading}
                  onChange={(e) =>
                    updateReviewsSection("heading", e.target.value)
                  }
                />
              </div>

              <div className="sm:col-span-2">
                <label className={labelClass}>Description</label>
                <textarea
                  rows={3}
                  className={inputClass}
                  value={data.reviewsSection.description}
                  onChange={(e) =>
                    updateReviewsSection("description", e.target.value)
                  }
                />
              </div>

              <div className="sm:col-span-2">
                {renderImageUploader(
                  "Reviews Section Background Image",
                  data.reviewsSection.backgroundImage,
                  (value) => updateReviewsSection("backgroundImage", value)
                )}
              </div>
            </div>

            {/* Review list */}
            <div className="p-5 sm:p-7">
              <div className="mb-5 flex items-center justify-between">
                <h3 className="font-semibold">Client Reviews</h3>
                <span className="text-xs text-gray-500">
                  {reviews.length} total
                </span>
              </div>

              {reviews.length === 0 ? (
                <div className="rounded-xl border border-dashed border-white/15 py-14 text-center">
                  <p className="text-gray-400">No testimonials added yet.</p>
                  <button
                    onClick={openAddModal}
                    className="mt-4 text-sm font-semibold text-[#e5b957]"
                  >
                    + Add your first testimonial
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  {[...reviews]
                    .sort((a, b) => a.order - b.order)
                    .map((review, index) => (
                      <div
                        key={review._id || index}
                        className="rounded-xl border border-white/10 bg-[#101010] p-4 sm:p-5"
                      >
                        <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
                          <div className="min-w-0 flex-1">
                            <div className="flex flex-wrap items-center gap-3">
                              <h4 className="font-semibold">{review.name}</h4>

                              <span className="text-xs text-[#e5b957]">
                                {"★".repeat(review.rating)}
                                <span className="text-gray-700">
                                  {"★".repeat(5 - review.rating)}
                                </span>
                              </span>

                              <span
                                className={`rounded-full px-3 py-1 text-[10px] font-semibold ${
                                  review.isActive
                                    ? "bg-green-500/10 text-green-400"
                                    : "bg-gray-500/10 text-gray-400"
                                }`}
                              >
                                {review.isActive ? "ACTIVE" : "INACTIVE"}
                              </span>
                            </div>

                            <p className="mt-1 text-xs text-gray-500">
                              {review.service || "General"} · Order: {review.order}
                            </p>

                            <p className="mt-3 line-clamp-2 text-sm leading-6 text-gray-400">
                              {review.review}
                            </p>
                          </div>

                          <div className="flex shrink-0 items-center gap-2">
                            <button
                              onClick={() => toggleActive(review)}
                              className="rounded-lg border border-white/10 px-3 py-2 text-xs text-gray-300 hover:border-[#d9ad52]"
                            >
                              {review.isActive ? "Deactivate" : "Activate"}
                            </button>

                            <button
                              onClick={() => openEditModal(review)}
                              className="rounded-lg border border-[#d9ad52]/40 px-4 py-2 text-xs text-[#e5b957] hover:bg-[#d9ad52]/10"
                            >
                              Edit
                            </button>

                            <button
                              onClick={() => handleDelete(review._id)}
                              className="rounded-lg border border-red-500/30 px-4 py-2 text-xs text-red-400 hover:bg-red-500/10"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </div>
          </section>
        )}

        {/* FINAL CTA SECTION */}
        {activeTab === "cta" && (
          <section className="rounded-xl border border-white/10 bg-[#151515]">
            <div className="border-b border-white/10 px-5 py-5 sm:px-7">
              <p className="text-lg font-semibold">Final CTA Section</p>
              <p className="mt-1 text-sm text-gray-500">
                Manage the final call-to-action section.
              </p>
            </div>

            <div className="grid gap-7 p-5 sm:p-7 lg:grid-cols-2">
              <div className="space-y-5">
                <div>
                  <label className={labelClass}>Eyebrow Text</label>
                  <input
                    className={inputClass}
                    value={data.finalCTA.eyebrow}
                    onChange={(e) => updateCTA("eyebrow", e.target.value)}
                  />
                </div>

                <div>
                  <label className={labelClass}>Heading</label>
                  <input
                    className={inputClass}
                    value={data.finalCTA.heading}
                    onChange={(e) => updateCTA("heading", e.target.value)}
                  />
                </div>

                <div>
                  <label className={labelClass}>Description</label>
                  <textarea
                    rows={5}
                    className={inputClass}
                    value={data.finalCTA.description}
                    onChange={(e) => updateCTA("description", e.target.value)}
                  />
                </div>

                <div>
                  <label className={labelClass}>Button Label</label>
                  <input
                    className={inputClass}
                    value={data.finalCTA.buttonLabel}
                    onChange={(e) => updateCTA("buttonLabel", e.target.value)}
                  />
                </div>

                <div>
                  <label className={labelClass}>Button Link</label>
                  <input
                    className={inputClass}
                    value={data.finalCTA.buttonHref}
                    onChange={(e) => updateCTA("buttonHref", e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-5">
                {renderImageUploader(
                  "Final CTA Background Image",
                  data.finalCTA.backgroundImage,
                  (value) => updateCTA("backgroundImage", value)
                )}

                <div>
                  <label className={labelClass}>Background Image Alt Text</label>
                  <input
                    className={inputClass}
                    value={data.finalCTA.backgroundImageAlt}
                    onChange={(e) =>
                      updateCTA("backgroundImageAlt", e.target.value)
                    }
                  />
                </div>
              </div>
            </div>
          </section>
        )}

        <p className="mt-5 text-right text-xs text-gray-600">
          Naeem Bhojani Photography · Testimonials Management
        </p>
      </div>

      {/* ADD / EDIT MODAL */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/80 p-4 backdrop-blur-sm">
          <div className="my-auto w-full max-w-2xl rounded-2xl border border-[#d9ad52]/30 bg-[#171717] shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 p-5 sm:p-6">
              <div>
                <h2 className="text-xl font-semibold">
                  {editingId ? "Edit Testimonial" : "Add Testimonial"}
                </h2>
                <p className="mt-1 text-xs text-gray-500">
                  Enter the client's review details.
                </p>
              </div>

              <button
                onClick={() => setModalOpen(false)}
                className="text-xl text-gray-400 hover:text-white"
              >
                ×
              </button>
            </div>

            <div className="space-y-5 p-5 sm:p-6">
              <div>
                <label className={labelClass}>Client Name *</label>
                <input
                  className={inputClass}
                  value={reviewForm.name}
                  onChange={(e) =>
                    setReviewForm((prev) => ({
                      ...prev,
                      name: e.target.value,
                    }))
                  }
                  placeholder="Enter client name"
                />
              </div>

              <div>
                <label className={labelClass}>Service</label>
                <input
                  className={inputClass}
                  value={reviewForm.service}
                  onChange={(e) =>
                    setReviewForm((prev) => ({
                      ...prev,
                      service: e.target.value,
                    }))
                  }
                  placeholder="Wedding Photography"
                />
              </div>

              <div>
                <label className={labelClass}>Client Review *</label>
                <textarea
                  rows={5}
                  className={inputClass}
                  value={reviewForm.review}
                  onChange={(e) =>
                    setReviewForm((prev) => ({
                      ...prev,
                      review: e.target.value,
                    }))
                  }
                  placeholder="Write the client's review..."
                />
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className={labelClass}>Rating</label>
                  <select
                    className={inputClass}
                    value={reviewForm.rating}
                    onChange={(e) =>
                      setReviewForm((prev) => ({
                        ...prev,
                        rating: Number(e.target.value),
                      }))
                    }
                  >
                    {[5, 4, 3, 2, 1].map((rating) => (
                      <option key={rating} value={rating}>
                        {rating} Stars
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className={labelClass}>Display Order</label>
                  <input
                    type="number"
                    min="0"
                    className={inputClass}
                    value={reviewForm.order}
                    onChange={(e) =>
                      setReviewForm((prev) => ({
                        ...prev,
                        order: Number(e.target.value),
                      }))
                    }
                  />
                </div>
              </div>

              <label className="flex cursor-pointer items-center gap-3 text-sm text-gray-300">
                <input
                  type="checkbox"
                  checked={reviewForm.isActive}
                  onChange={(e) =>
                    setReviewForm((prev) => ({
                      ...prev,
                      isActive: e.target.checked,
                    }))
                  }
                  className="h-4 w-4 accent-[#d9ad52]"
                />
                Publish this testimonial
              </label>
            </div>

            <div className="flex justify-end gap-3 border-t border-white/10 p-5 sm:p-6">
              <button
                onClick={() => setModalOpen(false)}
                className="rounded-lg border border-white/15 px-5 py-3 text-sm text-gray-300"
              >
                Cancel
              </button>

              <button
                onClick={saveReview}
                disabled={saving}
                className="rounded-lg bg-gradient-to-r from-[#c18b32] to-[#edc66e] px-6 py-3 text-sm font-bold text-black disabled:opacity-50"
              >
                {saving
                  ? "Saving..."
                  : editingId
                    ? "Update Review"
                    : "Add Review"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}