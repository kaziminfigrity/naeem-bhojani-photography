"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Search,
  MessageSquare,
  Phone,
  CheckCircle2,
  Clock,
  XCircle,
  Eye,
  CalendarDays,
  Mail,
  RefreshCw,
  X,
  UserRound,
  FileText,
  AlertCircle,
  Save,
  Trash2,
  Filter,
  ChevronRight,
  Inbox,
  Sparkles,
  ArrowUpRight,
  SlidersHorizontal,
  LayoutList,
} from "lucide-react";

import {
  getAllContactEnquiries,
  updateContactEnquiry,
  deleteContactEnquiry,
  type ContactEnquiry,
  type EnquiryStatus,
} from "@/services/api/contact-enquiries.api";

const GOLD = "#D8B56E";

const statusStyles: Record<EnquiryStatus, string> = {
  new: "border-[#c9a45c]/40 bg-[#c9a45c]/10 text-[#e6c784]",
  contacted: "border-blue-400/30 bg-blue-400/10 text-blue-300",
  "in-progress": "border-violet-400/30 bg-violet-400/10 text-violet-300",
  completed: "border-emerald-400/30 bg-emerald-400/10 text-emerald-300",
  cancelled: "border-rose-400/30 bg-rose-400/10 text-rose-300",
};

const statusLabels: Record<EnquiryStatus, string> = {
  new: "New",
  contacted: "Contacted",
  "in-progress": "In Progress",
  completed: "Completed",
  cancelled: "Cancelled",
};

const formatDate = (date?: string | null) => {
  if (!date) return "Not specified";

  const parsed = new Date(date);

  if (Number.isNaN(parsed.getTime())) return "Not specified";

  return parsed.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const formatDateTime = (date?: string) => {
  if (!date) return "N/A";

  const parsed = new Date(date);

  if (Number.isNaN(parsed.getTime())) return "N/A";

  return parsed.toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const getInitials = (name?: string) =>
  name
    ?.trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase() || "NA";

type DetailsPanelProps = {
  selectedEnquiry: ContactEnquiry | null;
  selectedStatus: EnquiryStatus;
  setSelectedStatus: (status: EnquiryStatus) => void;
  adminNote: string;
  setAdminNote: (note: string) => void;
  saving: boolean;
  deleting: boolean;
  loading: boolean;
  onSave: () => void;
  onDelete: () => void;
  onClose: () => void;
};

export default function ContactEnquiriesPage() {
  const [enquiries, setEnquiries] = useState<ContactEnquiry[]>([]);
  const [selectedEnquiry, setSelectedEnquiry] =
    useState<ContactEnquiry | null>(null);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [eventFilter, setEventFilter] = useState("all");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [selectedStatus, setSelectedStatus] =
    useState<EnquiryStatus>("new");
  const [adminNote, setAdminNote] = useState("");

  const getAdminToken = () =>
    localStorage.getItem("adminToken") ||
    sessionStorage.getItem("adminToken") ||
    localStorage.getItem("token") ||
    sessionStorage.getItem("token");

  const fetchEnquiries = async () => {
    try {
      setLoading(true);
      setError("");
      setSuccess("");

      const token = getAdminToken();

      if (!token) {
        throw new Error("Admin authentication token not found.");
      }

      const response = await getAllContactEnquiries(token);
      const enquiryList = response.data || [];

      setEnquiries(enquiryList);

      setSelectedEnquiry((current) => {
        if (!current) return null;

        return (
          enquiryList.find((item) => item._id === current._id) || null
        );
      });
    } catch (err: unknown) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to fetch contact enquiries."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnquiries();
  }, []);

  useEffect(() => {
    if (selectedEnquiry) {
      setSelectedStatus(selectedEnquiry.status);
      setAdminNote(selectedEnquiry.adminNote || "");
    }
  }, [selectedEnquiry]);

  const handleSelectEnquiry = (item: ContactEnquiry) => {
    setSelectedEnquiry(item);
    setError("");
    setSuccess("");
  };

  const handleCloseDetails = () => {
    setSelectedEnquiry(null);
    setError("");
    setSuccess("");
  };

  const handleUpdateEnquiry = async () => {
    if (!selectedEnquiry || saving || deleting) return;

    try {
      setSaving(true);
      setError("");
      setSuccess("");

      const token = getAdminToken();

      if (!token) {
        throw new Error("Admin authentication token not found.");
      }

      const response = await updateContactEnquiry(
        selectedEnquiry._id,
        token,
        {
          status: selectedStatus,
          adminNote,
        }
      );

      const updatedEnquiry = response.data;

      setEnquiries((previous) =>
        previous.map((item) =>
          item._id === updatedEnquiry._id ? updatedEnquiry : item
        )
      );

      setSelectedEnquiry(updatedEnquiry);
      setSuccess("Enquiry updated successfully!");
    } catch (err: unknown) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to update enquiry."
      );
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteEnquiry = async () => {
    if (!selectedEnquiry || deleting || saving) return;

    const confirmed = window.confirm(
      `Are you sure you want to permanently delete the enquiry from ${selectedEnquiry.name}?`
    );

    if (!confirmed) return;

    try {
      setDeleting(true);
      setError("");
      setSuccess("");

      const token = getAdminToken();

      if (!token) {
        throw new Error("Admin authentication token not found.");
      }

      await deleteContactEnquiry(selectedEnquiry._id, token);

      setEnquiries((previous) =>
        previous.filter((item) => item._id !== selectedEnquiry._id)
      );

      setSelectedEnquiry(null);
      setAdminNote("");
      setSelectedStatus("new");
      setSuccess("Enquiry deleted successfully!");
    } catch (err: unknown) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to delete enquiry."
      );
    } finally {
      setDeleting(false);
    }
  };

  const eventTypes = useMemo(
    () =>
      Array.from(
        new Set(
          enquiries.map((item) => item.eventType).filter(Boolean)
        )
      ),
    [enquiries]
  );

  const filteredEnquiries = useMemo(() => {
    return enquiries.filter((item) => {
      const searchValue = search.toLowerCase().trim();

      const matchesSearch =
        !searchValue ||
        item.name?.toLowerCase().includes(searchValue) ||
        item.email?.toLowerCase().includes(searchValue) ||
        item.phone?.toLowerCase().includes(searchValue);

      const matchesStatus =
        statusFilter === "all" || item.status === statusFilter;

      const matchesEvent =
        eventFilter === "all" || item.eventType === eventFilter;

      return matchesSearch && matchesStatus && matchesEvent;
    });
  }, [enquiries, search, statusFilter, eventFilter]);

  const stats = [
    {
      title: "Total Enquiries",
      value: enquiries.length,
      icon: MessageSquare,
      color: "text-[#dfbd78]",
      bg: "bg-[#c9a45c]/10",
      border: "border-[#c9a45c]/30",
    },
    {
      title: "New Enquiries",
      value: enquiries.filter((item) => item.status === "new").length,
      icon: Clock,
      color: "text-[#dfbd78]",
      bg: "bg-[#c9a45c]/10",
      border: "border-[#c9a45c]/30",
    },
    {
      title: "Contacted",
      value: enquiries.filter((item) => item.status === "contacted").length,
      icon: Phone,
      color: "text-blue-300",
      bg: "bg-blue-400/10",
      border: "border-blue-400/20",
    },
    {
      title: "In Progress",
      value: enquiries.filter((item) => item.status === "in-progress").length,
      icon: RefreshCw,
      color: "text-violet-300",
      bg: "bg-violet-400/10",
      border: "border-violet-400/20",
    },
    {
      title: "Completed",
      value: enquiries.filter((item) => item.status === "completed").length,
      icon: CheckCircle2,
      color: "text-emerald-300",
      bg: "bg-emerald-400/10",
      border: "border-emerald-400/20",
    },
    {
      title: "Cancelled",
      value: enquiries.filter((item) => item.status === "cancelled").length,
      icon: XCircle,
      color: "text-rose-300",
      bg: "bg-rose-400/10",
      border: "border-rose-400/20",
    },
  ];

  const hasFilters =
    search.trim() !== "" ||
    statusFilter !== "all" ||
    eventFilter !== "all";

  const resetFilters = () => {
    setSearch("");
    setStatusFilter("all");
    setEventFilter("all");
  };

  return (
    <main className="min-h-screen bg-[#090909] px-4 py-6 text-white sm:px-6 sm:py-8 xl:px-9">
      <div className="mx-auto max-w-[1900px]">

        {/* PAGE HEADER */}
        <header className="mb-9 flex flex-col justify-between gap-6 border-b border-white/10 pb-8 md:flex-row md:items-end">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#c9a45c]/30 bg-[#c9a45c]/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-[#e1bf7d]">
              <Sparkles size={15} />
              Photography Studio · Admin
            </div>

            <h1 className="font-serif text-3xl font-bold leading-tight tracking-tight sm:text-4xl xl:text-5xl">
              Contact Enquiries
            </h1>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-400 sm:text-sm">
              A central place to manage customer enquiries, photography
              requests and upcoming bookings.
            </p>
          </div>

          <button
            onClick={fetchEnquiries}
            disabled={loading || saving || deleting}
            className="flex min-h-[54px] w-full items-center justify-center gap-3 rounded-xl bg-[#d8b56e] px-6 py-3 text-sm font-bold text-black shadow-lg shadow-[#c9a45c]/10 transition hover:bg-[#ebca8c] disabled:opacity-50 md:w-auto"
          >
            <RefreshCw
              size={19}
              className={loading ? "animate-spin" : ""}
            />
            Refresh Enquiries
          </button>
        </header>

        {/* ALERTS */}
        {error && (
          <div className="mb-6 flex items-start gap-3 rounded-xl border border-red-500/30 bg-red-500/10 p-5 text-sm text-red-300">
            <AlertCircle size={21} className="mt-0.5 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div className="mb-6 flex items-start gap-3 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-5 text-sm text-emerald-300">
            <CheckCircle2 size={21} className="mt-0.5 shrink-0" />
            <span>{success}</span>
          </div>
        )}

        {/* STATISTICS */}
        <section className="mb-10">
          <div className="mb-5 flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#d8b56e]">
                Overview
              </p>
              <h2 className="mt-2 text-xl font-bold sm:text-2xl">
                Enquiry Overview
              </h2>
            </div>

            <p className="text-sm text-gray-500">
              Real-time records from your website
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-6">
            {stats.map((stat) => {
              const Icon = stat.icon;

              return (
                <div
                  key={stat.title}
                  className={`group rounded-2xl border ${stat.border} bg-gradient-to-br from-[#1b1b1b] to-[#111111] p-5 transition duration-300 hover:-translate-y-1 hover:bg-[#202020] sm:p-6`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-sm font-semibold text-gray-400 sm:text-sm">
                      {stat.title}
                    </span>
                    <div className={`rounded-xl p-3 ${stat.bg}`}>
                      <Icon size={21} className={stat.color} />
                    </div>
                  </div>

                  <div className="mt-6 flex items-end justify-between">
                    <span className="text-2xl font-bold sm:text-3xl">
                      {loading ? "—" : stat.value}
                    </span>
                    <ArrowUpRight
                      size={20}
                      className="text-gray-600 transition group-hover:text-[#d8b56e]"
                    />
                  </div>

                  <div className="mt-5 border-t border-white/10 pt-3 text-xs font-medium uppercase tracking-wider text-gray-600">
                    Enquiry Statistics
                  </div>
                </div>
              );
            })}
          </div>
        </section>

                {/* MAIN CONTENT */}
        <section className="grid min-w-0 grid-cols-1 items-start gap-6 2xl:grid-cols-[minmax(0,1fr)_440px]">

          {/* ENQUIRY LIST */}
          <div className="min-w-0 overflow-hidden rounded-2xl border border-white/10 bg-[#111111] shadow-xl shadow-black/20">

            {/* LIST HEADER */}
            <div className="flex flex-col justify-between gap-4 border-b border-white/10 p-5 sm:flex-row sm:items-center sm:p-7">
              <div>
                <div className="flex items-center gap-3">
                  <div className="rounded-xl bg-[#c9a45c]/10 p-3">
                    <LayoutList size={22} className="text-[#d8b56e]" />
                  </div>

                  <div>
                    <h2 className="text-lg font-bold sm:text-xl">
                      All Enquiries
                    </h2>
                    <p className="mt-1 text-sm text-gray-500">
                      Manage every customer request
                    </p>
                  </div>
                </div>
              </div>

              <span className="w-fit rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-gray-400">
                {filteredEnquiries.length} Records
              </span>
            </div>

            {/* SEARCH */}
            <div className="space-y-4 border-b border-white/10 p-5 sm:p-7">
              <div className="relative">
                <Search
                  size={21}
                  className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500"
                />

                <input
                  type="search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search by customer name, email or phone..."
                  className="h-14 w-full rounded-xl border border-white/10 bg-[#191919] pl-14 pr-5 text-sm text-white outline-none transition placeholder:text-gray-500 focus:border-[#c9a45c]/70 focus:ring-2 focus:ring-[#c9a45c]/10 sm:h-16 sm:text-base"
                />
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_auto]">
                <div className="relative">
                  <Filter
                    size={17}
                    className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#d8b56e]"
                  />
                  <select
                    value={eventFilter}
                    onChange={(e) => setEventFilter(e.target.value)}
                    className="h-13 min-h-[52px] w-full rounded-xl border border-white/10 bg-[#191919] pl-11 pr-4 text-sm text-gray-300 outline-none focus:border-[#c9a45c]/70"
                  >
                    <option value="all">All Event Types</option>
                    {eventTypes.map((event) => (
                      <option key={event} value={event}>
                        {event}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="relative">
                  <SlidersHorizontal
                    size={17}
                    className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#d8b56e]"
                  />
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="min-h-[52px] w-full rounded-xl border border-white/10 bg-[#191919] pl-11 pr-4 text-sm text-gray-300 outline-none focus:border-[#c9a45c]/70"
                  >
                    <option value="all">All Status</option>
                    <option value="new">New</option>
                    <option value="contacted">Contacted</option>
                    <option value="in-progress">In Progress</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>

                {hasFilters && (
                  <button
                    onClick={resetFilters}
                    className="flex min-h-[52px] items-center justify-center gap-2 rounded-xl border border-white/10 px-5 text-sm text-gray-400 transition hover:border-red-500/40 hover:text-red-400"
                  >
                    <X size={18} />
                    Clear Filters
                  </button>
                )}
              </div>
            </div>

            {/* DESKTOP TABLE */}
            <div className="hidden overflow-x-auto xl:block">
              <table className="w-full min-w-[900px] text-left">
                <thead>
                  <tr className="border-b border-white/10 bg-white/[0.025] text-xs font-bold uppercase tracking-[0.15em] text-gray-500">
                    <th className="px-6 py-5">Customer</th>
                    <th className="px-5 py-5">Event Type</th>
                    <th className="px-5 py-5">Event Date</th>
                    <th className="px-5 py-5">Status</th>
                    <th className="px-5 py-5">Received</th>
                    <th className="px-5 py-5 text-center">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan={6} className="px-6 py-20 text-center text-sm text-gray-500">
                        <RefreshCw size={24} className="mx-auto mb-4 animate-spin text-[#d8b56e]" />
                        Loading enquiries...
                      </td>
                    </tr>
                  ) : filteredEnquiries.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="px-6 py-20 text-center">
                        <Inbox size={40} className="mx-auto mb-4 text-gray-700" />
                        <p className="text-base font-semibold text-gray-300">
                          No enquiries found
                        </p>
                        <p className="mt-2 text-sm text-gray-500">
                          Try adjusting your search or filters.
                        </p>
                      </td>
                    </tr>
                  ) : (
                    filteredEnquiries.map((item) => (
                      <tr
                        key={item._id}
                        onClick={() => handleSelectEnquiry(item)}
                        className={`cursor-pointer border-b border-white/[0.06] transition hover:bg-white/[0.035] ${
                          selectedEnquiry?._id === item._id
                            ? "bg-[#c9a45c]/[0.08]"
                            : ""
                        }`}
                      >
                        <td className="px-6 py-5">
                          <div className="flex min-w-0 items-center gap-4">
                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[#c9a45c]/30 bg-[#c9a45c]/10 text-sm font-bold text-[#e1bf7d]">
                              {getInitials(item.name)}
                            </div>

                            <div className="min-w-0">
                              <p className="truncate text-sm font-bold text-white">
                                {item.name}
                              </p>
                              <p className="mt-1 max-w-[200px] truncate text-sm text-gray-500">
                                {item.email}
                              </p>
                            </div>
                          </div>
                        </td>

                        <td className="px-5 py-5 text-sm font-medium text-gray-300">
                          {item.eventType}
                        </td>

                        <td className="whitespace-nowrap px-5 py-5 text-sm text-gray-400">
                          {formatDate(item.eventDate)}
                        </td>

                        <td className="px-5 py-5">
                          <span className={`inline-flex whitespace-nowrap rounded-full border px-3 py-2 text-xs font-bold ${statusStyles[item.status]}`}>
                            {statusLabels[item.status]}
                          </span>
                        </td>

                        <td className="whitespace-nowrap px-5 py-5 text-sm text-gray-500">
                          {formatDateTime(item.createdAt)}
                        </td>

                        <td className="px-5 py-5 text-center">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleSelectEnquiry(item);
                            }}
                            title="View enquiry"
                            className="inline-flex rounded-xl border border-white/10 p-3 text-gray-400 transition hover:border-[#c9a45c]/50 hover:bg-[#c9a45c]/10 hover:text-[#e1bf7d]"
                          >
                            <Eye size={19} />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* TABLET AND MOBILE CARDS */}
            <div className="grid grid-cols-1 gap-4 p-4 sm:p-5 xl:hidden 2xl:grid-cols-2">
              {loading ? (
                <div className="col-span-full py-16 text-center text-sm text-gray-500">
                  <RefreshCw size={25} className="mx-auto mb-4 animate-spin text-[#d8b56e]" />
                  Loading enquiries...
                </div>
              ) : filteredEnquiries.length === 0 ? (
                <div className="col-span-full py-16 text-center">
                  <Inbox size={40} className="mx-auto mb-4 text-gray-700" />
                  <p className="text-base font-semibold text-gray-300">
                    No enquiries found
                  </p>
                  <p className="mt-2 text-sm text-gray-500">
                    Try changing your filters.
                  </p>
                </div>
              ) : (
                filteredEnquiries.map((item) => (
                  <button
                    key={item._id}
                    onClick={() => handleSelectEnquiry(item)}
                    className={`w-full rounded-2xl border p-5 text-left transition sm:p-6 ${
                      selectedEnquiry?._id === item._id
                        ? "border-[#c9a45c]/60 bg-[#c9a45c]/[0.07]"
                        : "border-white/[0.08] bg-[#181818] hover:border-white/20"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex min-w-0 items-center gap-4">
                        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-[#c9a45c]/30 bg-[#c9a45c]/10 text-sm font-bold text-[#e1bf7d]">
                          {getInitials(item.name)}
                        </div>

                        <div className="min-w-0">
                          <p className="break-words text-sm font-bold text-white sm:text-base">
                            {item.name}
                          </p>
                          <p className="mt-1 break-all text-sm text-gray-500">
                            {item.email}
                          </p>
                        </div>
                      </div>

                      <ChevronRight
                        size={21}
                        className="mt-2 shrink-0 text-gray-600"
                      />
                    </div>

                    <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-white/[0.08] pt-4">
                      <div>
                        <p className="text-xs uppercase tracking-wider text-gray-600">
                          Event Type
                        </p>
                        <p className="mt-1 text-sm font-semibold text-gray-200">
                          {item.eventType}
                        </p>
                      </div>

                      <span className={`rounded-full border px-3 py-2 text-xs font-bold ${statusStyles[item.status]}`}>
                        {statusLabels[item.status]}
                      </span>
                    </div>

                    <div className="mt-4 flex flex-wrap justify-between gap-3 text-sm text-gray-500">
                      <span className="flex items-center gap-2">
                        <CalendarDays size={15} className="text-[#d8b56e]" />
                        {formatDate(item.eventDate)}
                      </span>

                      <span>{formatDateTime(item.createdAt)}</span>
                    </div>
                  </button>
                ))
              )}
            </div>

            {/* FOOTER */}
            <div className="flex flex-col justify-between gap-2 border-t border-white/10 px-5 py-5 text-sm text-gray-500 sm:flex-row sm:px-7">
              <span>
                Showing <strong className="text-gray-300">{filteredEnquiries.length}</strong> of{" "}
                <strong className="text-gray-300">{enquiries.length}</strong> enquiries
              </span>
              <span>{hasFilters ? "Filtered results" : "All enquiries"}</span>
            </div>
          </div>

          {/* DESKTOP DETAILS */}
          <aside className="hidden h-fit overflow-hidden rounded-2xl border border-white/10 bg-[#111111] shadow-xl 2xl:block">
            <DetailsPanel
              selectedEnquiry={selectedEnquiry}
              selectedStatus={selectedStatus}
              setSelectedStatus={setSelectedStatus}
              adminNote={adminNote}
              setAdminNote={setAdminNote}
              saving={saving}
              deleting={deleting}
              loading={loading}
              onSave={handleUpdateEnquiry}
              onDelete={handleDeleteEnquiry}
              onClose={handleCloseDetails}
            />
          </aside>
        </section>

        {/* TABLET AND MOBILE DETAILS DRAWER */}
        {selectedEnquiry && (
          <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/85 backdrop-blur-sm 2xl:hidden sm:items-center sm:p-5">
            <div className="max-h-[95dvh] w-full overflow-y-auto rounded-t-3xl border border-white/10 bg-[#111111] shadow-2xl sm:max-w-2xl sm:rounded-2xl">
              <DetailsPanel
                selectedEnquiry={selectedEnquiry}
                selectedStatus={selectedStatus}
                setSelectedStatus={setSelectedStatus}
                adminNote={adminNote}
                setAdminNote={setAdminNote}
                saving={saving}
                deleting={deleting}
                loading={loading}
                onSave={handleUpdateEnquiry}
                onDelete={handleDeleteEnquiry}
                onClose={handleCloseDetails}
              />
            </div>
          </div>
        )}
      </div>
    </main>
  );
}


function DetailsPanel({
  selectedEnquiry,
  selectedStatus,
  setSelectedStatus,
  adminNote,
  setAdminNote,
  saving,
  deleting,
  loading,
  onSave,
  onDelete,
  onClose,
}: DetailsPanelProps) {
  return (
    <>
      <div className="sticky top-0 z-10 flex items-center justify-between border-b border-white/10 bg-[#111111] px-6 py-5 sm:px-7">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#d8b56e]">
            Customer Workspace
          </p>
          <h2 className="mt-2 text-lg font-bold sm:text-xl">
            Enquiry Details
          </h2>
        </div>

        {selectedEnquiry && (
          <button
            onClick={onClose}
            title="Close details"
            className="rounded-xl border border-white/10 p-3 text-gray-400 transition hover:bg-white/10 hover:text-white"
          >
            <X size={21} />
          </button>
        )}
      </div>

      {selectedEnquiry ? (
        <div className="p-5 sm:p-7">

          {/* CUSTOMER */}
          <div className="mb-7 flex items-center gap-4">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-[#c9a45c]/40 bg-gradient-to-br from-[#d8b56e] to-[#785628] text-lg font-bold text-black shadow-lg shadow-[#c9a45c]/10">
              {getInitials(selectedEnquiry.name)}
            </div>

            <div className="min-w-0">
              <h3 className="break-words text-lg font-bold text-white">
                {selectedEnquiry.name}
              </h3>

              <p className="mt-1 break-all text-sm text-gray-500">
                {selectedEnquiry.email}
              </p>

              <span className={`mt-3 inline-flex rounded-full border px-3 py-1.5 text-xs font-bold ${statusStyles[selectedEnquiry.status]}`}>
                {statusLabels[selectedEnquiry.status]}
              </span>
            </div>
          </div>

          {/* CONTACT */}
          <div className="rounded-2xl border border-white/[0.08] bg-[#191919] p-5">
            <h3 className="mb-5 text-xs font-bold uppercase tracking-[0.15em] text-gray-500">
              Contact Information
            </h3>

            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="rounded-xl bg-[#c9a45c]/10 p-2.5">
                  <Phone size={18} className="text-[#d8b56e]" />
                </div>

                <div className="min-w-0">
                  <p className="text-xs text-gray-500">Phone Number</p>
                  <p className="mt-1 break-all text-sm font-medium text-gray-200">
                    {selectedEnquiry.phone || "Not provided"}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="rounded-xl bg-[#c9a45c]/10 p-2.5">
                  <Mail size={18} className="text-[#d8b56e]" />
                </div>

                <div className="min-w-0">
                  <p className="text-xs text-gray-500">Email Address</p>
                  <p className="mt-1 break-all text-sm font-medium text-gray-200">
                    {selectedEnquiry.email}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* EVENT */}
          <div className="my-6 border-b border-white/10 pb-6">
            <h3 className="mb-5 text-xs font-bold uppercase tracking-[0.15em] text-gray-500">
              Event Information
            </h3>

            <div className="space-y-5">
              <DetailRow
                icon={<CalendarDays size={18} />}
                label="Event Type"
                value={selectedEnquiry.eventType}
              />

              <DetailRow
                icon={<CalendarDays size={18} />}
                label="Event Date"
                value={formatDate(selectedEnquiry.eventDate)}
              />

              <DetailRow
                icon={<Clock size={18} />}
                label="Received On"
                value={formatDateTime(selectedEnquiry.createdAt)}
              />
            </div>
          </div>

          {/* MESSAGE */}
          <div className="mb-7">
            <h3 className="mb-4 flex items-center gap-3 text-sm font-bold">
              <MessageSquare size={19} className="text-[#d8b56e]" />
              Customer Message
            </h3>

            <div className="rounded-2xl border border-white/[0.08] bg-[#191919] p-5 text-sm leading-7 text-gray-300">
              {selectedEnquiry.message || "No message provided."}
            </div>
          </div>

          {/* STATUS */}
          <div className="mb-7">
            <h3 className="mb-4 text-sm font-bold">
              Update Enquiry Status
            </h3>

            <select
              value={selectedStatus}
              onChange={(e) =>
                setSelectedStatus(e.target.value as EnquiryStatus)
              }
              disabled={saving || deleting}
              className="min-h-[56px] w-full rounded-xl border border-[#c9a45c]/30 bg-[#191919] px-4 text-sm text-white outline-none transition focus:border-[#d8b56e] disabled:opacity-50"
            >
              <option value="new">New</option>
              <option value="contacted">Contacted</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>

          {/* ADMIN NOTES */}
          <div className="mb-7">
            <h3 className="mb-4 flex items-center gap-3 text-sm font-bold">
              <FileText size={19} className="text-[#d8b56e]" />
              Private Admin Notes
            </h3>

            <textarea
              value={adminNote}
              onChange={(e) => setAdminNote(e.target.value)}
              disabled={saving || deleting}
              placeholder="Write internal notes about this customer..."
              rows={5}
              className="w-full resize-y rounded-xl border border-white/10 bg-[#191919] p-5 text-sm leading-7 text-white outline-none transition placeholder:text-gray-600 focus:border-[#c9a45c]/60 disabled:opacity-50"
            />

            <p className="mt-3 text-sm leading-6 text-gray-600">
              These notes are private and intended only for admin use.
            </p>
          </div>

          {/* ACTIONS */}
          <div className="space-y-3 border-t border-white/10 pt-6">
            <button
              onClick={onSave}
              disabled={saving || loading || deleting}
              className="flex min-h-[56px] w-full items-center justify-center gap-3 rounded-xl bg-[#d8b56e] px-5 py-4 text-sm font-bold text-black transition hover:bg-[#ebca8c] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {saving ? (
                <>
                  <RefreshCw size={19} className="animate-spin" />
                  Saving Changes...
                </>
              ) : (
                <>
                  <Save size={19} />
                  Save Changes
                </>
              )}
            </button>

            <button
              onClick={onDelete}
              disabled={deleting || saving || loading}
              className="flex min-h-[54px] w-full items-center justify-center gap-3 rounded-xl border border-red-500/30 bg-red-500/[0.07] px-5 py-4 text-sm font-semibold text-red-400 transition hover:border-red-500/60 hover:bg-red-500/15 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {deleting ? (
                <>
                  <RefreshCw size={19} className="animate-spin" />
                  Deleting Enquiry...
                </>
              ) : (
                <>
                  <Trash2 size={19} />
                  Delete Enquiry
                </>
              )}
            </button>
          </div>
        </div>
      ) : (
        <div className="flex min-h-[500px] flex-col items-center justify-center px-8 text-center">
          <div className="mb-6 rounded-3xl border border-[#c9a45c]/20 bg-[#c9a45c]/10 p-6">
            <UserRound size={42} className="text-[#d8b56e]" />
          </div>

          <h3 className="text-lg font-bold text-white">
            No Enquiry Selected
          </h3>

          <p className="mt-3 max-w-[270px] text-sm leading-7 text-gray-500">
            Select any enquiry from the list to view customer information,
            messages and manage the booking status.
          </p>
        </div>
      )}
    </>
  );
}

function DetailRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-4">
      <div className="rounded-xl bg-[#c9a45c]/10 p-2.5 text-[#d8b56e]">
        {icon}
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-xs text-gray-500">{label}</p>
        <p className="mt-1 break-words text-sm font-semibold text-gray-200">
          {value}
        </p>
      </div>
    </div>
  );
}