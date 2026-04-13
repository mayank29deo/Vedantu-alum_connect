"use client";

import { useState, useEffect, useCallback } from "react";
import { supabase, AlumniProfile, AlumniStatus } from "@/lib/supabase";
import {
  CheckCircle,
  XCircle,
  Clock,
  Search,
  Download,
  Eye,
  RefreshCw,
  Lock,
  Sparkles,
  Users,
  Filter,
  ChevronDown,
  ExternalLink,
  X,
  Loader2,
  AlertTriangle,
} from "lucide-react";

const STATUS_CONFIG = {
  pending: { label: "Pending", color: "bg-amber-50 text-amber-600 border-amber-200", icon: Clock },
  approved: { label: "Approved", color: "bg-green-50 text-green-600 border-green-200", icon: CheckCircle },
  rejected: { label: "Rejected", color: "bg-red-50 text-red-600 border-red-200", icon: XCircle },
};

const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_SECRET ?? "vedantu_admin_2026";

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [pw, setPw] = useState("");
  const [pwError, setPwError] = useState(false);

  const [alumni, setAlumni] = useState<AlumniProfile[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | AlumniStatus>("all");
  const [fieldFilter, setFieldFilter] = useState("all");
  const [selected, setSelected] = useState<AlumniProfile | null>(null);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [note, setNote] = useState("");

  const fetchAlumni = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("alumni_profiles")
      .select("*")
      .order("created_at", { ascending: false });
    setLoading(false);
    if (!error && data) setAlumni(data as AlumniProfile[]);
  }, []);

  useEffect(() => {
    if (authed) fetchAlumni();
  }, [authed, fetchAlumni]);

  const handleLogin = () => {
    if (pw === ADMIN_PASSWORD) {
      setAuthed(true);
    } else {
      setPwError(true);
      setTimeout(() => setPwError(false), 2000);
    }
  };

  const updateStatus = async (id: string, status: AlumniStatus) => {
    setActionLoading(id + status);
    const { error } = await supabase
      .from("alumni_profiles")
      .update({
        status,
        reviewer_note: note || null,
        reviewed_at: new Date().toISOString(),
      })
      .eq("id", id);
    setActionLoading(null);
    if (!error) {
      setAlumni((prev) =>
        prev.map((a) => (a.id === id ? { ...a, status, reviewer_note: note } : a))
      );
      setSelected((s) => (s?.id === id ? { ...s, status } : s));
      setNote("");
    }
  };

  const exportCSV = () => {
    const headers = [
      "Name","Email","Phone","Status","Field","College","Degree",
      "Company","Role","City","Exam","Rank","Vedantu Years","Classes",
      "Available","Session Pref","Submitted",
    ];
    const rows = filtered.map((a) => [
      a.full_name, a.email, a.phone ?? "", a.status ?? "",
      a.field, a.college_name, a.degree,
      a.current_company ?? "", a.current_designation ?? "", a.current_city ?? "",
      a.exam_cleared ?? "", a.rank_or_result ?? "",
      a.vedantu_study_years, a.vedantu_classes,
      a.available_for_mentoring ? "Yes" : "No",
      a.session_preference ?? "",
      a.created_at ? new Date(a.created_at).toLocaleDateString("en-IN") : "",
    ]);
    const csv = [headers, ...rows].map((r) => r.map((v) => `"${v}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `alumconnect_alumni_${Date.now()}.csv`;
    a.click();
  };

  const allFields = ["all", ...Array.from(new Set(alumni.map((a) => a.field).filter(Boolean)))];

  const filtered = alumni.filter((a) => {
    const matchSearch =
      !search ||
      a.full_name?.toLowerCase().includes(search.toLowerCase()) ||
      a.email?.toLowerCase().includes(search.toLowerCase()) ||
      a.college_name?.toLowerCase().includes(search.toLowerCase()) ||
      a.current_company?.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || a.status === statusFilter;
    const matchField = fieldFilter === "all" || a.field === fieldFilter;
    return matchSearch && matchStatus && matchField;
  });

  const counts = {
    total: alumni.length,
    pending: alumni.filter((a) => a.status === "pending").length,
    approved: alumni.filter((a) => a.status === "approved").length,
    rejected: alumni.filter((a) => a.status === "rejected").length,
  };

  // ── LOGIN SCREEN ──
  if (!authed) {
    return (
      <div className="min-h-screen bg-[#FFFAF7] flex items-center justify-center px-4">
        <div className="w-full max-w-sm bg-white rounded-3xl border border-gray-100 shadow-xl p-8">
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-orange-400 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
          </div>
          <h1 className="text-xl font-extrabold text-gray-900 text-center mb-1">
            AlumConnect Admin
          </h1>
          <p className="text-sm text-gray-400 text-center mb-6">
            Chief of Staff Dashboard
          </p>
          <div className="space-y-3">
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="password"
                placeholder="Admin password"
                value={pw}
                onChange={(e) => setPw(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                className={`w-full pl-10 pr-4 py-3 text-sm bg-gray-50 border rounded-xl focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all ${
                  pwError ? "border-red-400 bg-red-50" : "border-gray-200"
                }`}
              />
            </div>
            {pwError && (
              <p className="text-xs text-red-500 flex items-center gap-1">
                <AlertTriangle className="w-3 h-3" /> Incorrect password
              </p>
            )}
            <button
              onClick={handleLogin}
              className="w-full btn-orange py-3 rounded-xl text-sm"
            >
              Enter Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── MAIN DASHBOARD ──
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top bar */}
      <div className="bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-orange-400 flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <div>
            <p className="text-xs text-orange-500 font-semibold">Vedantu</p>
            <p className="text-sm font-extrabold text-gray-900 leading-none">
              AlumConnect Admin
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={fetchAlumni}
            disabled={loading}
            className="flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-orange-500 px-3 py-2 rounded-lg hover:bg-orange-50 transition-all"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </button>
          <button
            onClick={exportCSV}
            className="flex items-center gap-2 btn-orange text-sm px-4 py-2 rounded-xl"
          >
            <Download className="w-4 h-4" />
            Export CSV
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        {/* Stat cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {[
            { label: "Total Submissions", val: counts.total, icon: Users, color: "text-gray-700 bg-gray-100" },
            { label: "Pending Review", val: counts.pending, icon: Clock, color: "text-amber-600 bg-amber-50" },
            { label: "Approved", val: counts.approved, icon: CheckCircle, color: "text-green-600 bg-green-50" },
            { label: "Rejected", val: counts.rejected, icon: XCircle, color: "text-red-500 bg-red-50" },
          ].map((s, i) => (
            <div key={i} className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
              <div className={`w-9 h-9 rounded-xl ${s.color} flex items-center justify-center mb-3`}>
                <s.icon className="w-4 h-4" />
              </div>
              <p className="text-2xl font-extrabold text-gray-900">{s.val}</p>
              <p className="text-xs text-gray-400 mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 mb-5">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name, email, college, company..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-orange-400"
              />
            </div>
            <div className="flex gap-2">
              <div className="relative">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value as "all" | AlumniStatus)}
                  className="appearance-none pl-3 pr-8 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-orange-400 cursor-pointer"
                >
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                </select>
                <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
              </div>
              <div className="relative">
                <select
                  value={fieldFilter}
                  onChange={(e) => setFieldFilter(e.target.value)}
                  className="appearance-none pl-3 pr-8 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-orange-400 cursor-pointer"
                >
                  {allFields.map((f) => (
                    <option key={f} value={f}>
                      {f === "all" ? "All Fields" : f}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>
          <p className="text-xs text-gray-400 mt-2">
            Showing <strong className="text-gray-700">{filtered.length}</strong> of {alumni.length} submissions
          </p>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-6 h-6 text-orange-500 animate-spin" />
              <span className="ml-2 text-sm text-gray-400">Loading submissions...</span>
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20">
              <Users className="w-10 h-10 text-gray-200 mx-auto mb-3" />
              <p className="text-gray-400 text-sm">No submissions yet</p>
              <p className="text-gray-300 text-xs mt-1">Share the onboarding link to get alumni registrations</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-50 bg-gray-50/60">
                    <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 whitespace-nowrap">Name</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 whitespace-nowrap">Field</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 whitespace-nowrap">College</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 whitespace-nowrap">Exam</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 whitespace-nowrap">Available</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 whitespace-nowrap">Status</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 whitespace-nowrap">Submitted</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {filtered.map((a) => {
                    const sc = STATUS_CONFIG[a.status ?? "pending"];
                    return (
                      <tr key={a.id} className="hover:bg-orange-50/30 transition-colors group">
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-3">
                            {a.profile_photo_url ? (
                              // eslint-disable-next-line @next/next/no-img-element
                              <img
                                src={a.profile_photo_url}
                                alt={a.full_name}
                                className="w-8 h-8 rounded-lg object-cover flex-shrink-0"
                              />
                            ) : (
                              <div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center text-orange-600 text-xs font-bold flex-shrink-0">
                                {a.full_name?.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                              </div>
                            )}
                            <div className="min-w-0">
                              <p className="font-semibold text-gray-900 truncate max-w-[140px]">{a.full_name}</p>
                              <p className="text-xs text-gray-400 truncate max-w-[140px]">{a.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-xs text-gray-600 whitespace-nowrap">{a.field}</td>
                        <td className="px-4 py-4 text-xs text-gray-600 max-w-[140px] truncate">{a.college_name}</td>
                        <td className="px-4 py-4 text-xs text-gray-600 whitespace-nowrap">
                          <span>{a.exam_cleared}</span>
                          {a.rank_or_result && (
                            <span className="ml-1 font-semibold text-orange-500">· {a.rank_or_result}</span>
                          )}
                        </td>
                        <td className="px-4 py-4 text-xs">
                          <span className={`px-2 py-0.5 rounded-full font-semibold ${a.available_for_mentoring ? "bg-green-50 text-green-600" : "bg-gray-100 text-gray-400"}`}>
                            {a.available_for_mentoring ? "Yes" : "No"}
                          </span>
                        </td>
                        <td className="px-4 py-4">
                          <span className={`flex items-center gap-1 w-fit text-xs font-semibold px-2.5 py-1 rounded-full border ${sc.color}`}>
                            <sc.icon className="w-3 h-3" />
                            {sc.label}
                          </span>
                        </td>
                        <td className="px-4 py-4 text-xs text-gray-400 whitespace-nowrap">
                          {a.created_at ? new Date(a.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "short" }) : "—"}
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => { setSelected(a); setNote(""); }}
                              className="p-1.5 rounded-lg text-gray-400 hover:text-orange-500 hover:bg-orange-50 transition-all"
                              title="View details"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            {a.status !== "approved" && (
                              <button
                                onClick={() => updateStatus(a.id!, "approved")}
                                disabled={!!actionLoading}
                                className="p-1.5 rounded-lg text-gray-400 hover:text-green-600 hover:bg-green-50 transition-all"
                                title="Approve"
                              >
                                {actionLoading === a.id + "approved"
                                  ? <Loader2 className="w-4 h-4 animate-spin" />
                                  : <CheckCircle className="w-4 h-4" />
                                }
                              </button>
                            )}
                            {a.status !== "rejected" && (
                              <button
                                onClick={() => updateStatus(a.id!, "rejected")}
                                disabled={!!actionLoading}
                                className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all"
                                title="Reject"
                              >
                                {actionLoading === a.id + "rejected"
                                  ? <Loader2 className="w-4 h-4 animate-spin" />
                                  : <XCircle className="w-4 h-4" />
                                }
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Share link banner */}
        <div className="mt-5 bg-orange-50 border border-orange-100 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <p className="text-sm font-bold text-gray-900">Alumni Onboarding Link</p>
            <p className="text-xs text-gray-500 mt-0.5">Share this with alumni to collect registrations</p>
          </div>
          <div className="flex items-center gap-2 bg-white border border-orange-200 rounded-xl px-3 py-2 text-sm font-mono text-gray-700">
            <span className="text-orange-500 truncate max-w-xs">
              {typeof window !== "undefined" ? window.location.origin : "https://yoursite.com"}/onboard
            </span>
            <button
              onClick={() => navigator.clipboard.writeText(`${window.location.origin}/onboard`)}
              className="text-orange-500 hover:text-orange-600 font-sans text-xs font-semibold ml-1 whitespace-nowrap"
            >
              Copy link
            </button>
          </div>
        </div>
      </div>

      {/* Detail drawer */}
      {selected && (
        <div className="fixed inset-0 z-50 flex">
          <div
            className="flex-1 bg-black/40 backdrop-blur-sm"
            onClick={() => setSelected(null)}
          />
          <div className="w-full max-w-md bg-white h-full overflow-y-auto shadow-2xl">
            {/* Drawer header */}
            <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between z-10">
              <h2 className="font-extrabold text-gray-900">Profile Detail</h2>
              <button
                onClick={() => setSelected(null)}
                className="p-2 rounded-lg hover:bg-gray-100 text-gray-500"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Photo + name */}
              <div className="flex items-center gap-4">
                {selected.profile_photo_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={selected.profile_photo_url}
                    alt={selected.full_name}
                    className="w-16 h-16 rounded-2xl object-cover"
                  />
                ) : (
                  <div className="w-16 h-16 rounded-2xl bg-orange-100 flex items-center justify-center text-orange-600 text-xl font-bold">
                    {selected.full_name?.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                  </div>
                )}
                <div>
                  <h3 className="font-bold text-gray-900">{selected.full_name}</h3>
                  <p className="text-sm text-gray-500">{selected.email}</p>
                  {selected.phone && <p className="text-xs text-gray-400">{selected.phone}</p>}
                  {selected.linkedin_url && (
                    <a
                      href={selected.linkedin_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-orange-500 flex items-center gap-1 mt-1"
                    >
                      LinkedIn <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </div>

              {/* Sections */}
              {[
                {
                  title: "Vedantu Journey",
                  rows: [
                    ["Study Years", selected.vedantu_study_years],
                    ["Classes", selected.vedantu_classes],
                    ["Subjects", (selected.vedantu_subjects ?? []).join(", ")],
                    ["Exam Cleared", selected.exam_cleared],
                    ["Rank / Result", selected.rank_or_result],
                  ],
                },
                {
                  title: "Education",
                  rows: [
                    ["College", selected.college_name],
                    ["Degree", selected.degree],
                    ["Passing Year", String(selected.college_year_of_passing ?? "—")],
                  ],
                },
                {
                  title: "Current Status",
                  rows: [
                    ["Field", selected.field],
                    ["Role", selected.current_designation],
                    ["Company", selected.current_company],
                    ["City", selected.current_city],
                    ["Specialization", selected.specialization],
                  ],
                },
                {
                  title: "Mentorship",
                  rows: [
                    ["Available", selected.available_for_mentoring ? "Yes" : "No"],
                    ["Session Pref", selected.session_preference],
                    ["Duration", `${selected.preferred_session_duration} min`],
                    ["Tags", (selected.tags ?? []).join(", ")],
                  ],
                },
              ].map((section) => (
                <div key={section.title}>
                  <p className="text-xs font-bold text-orange-500 uppercase tracking-wide mb-2">
                    {section.title}
                  </p>
                  <div className="bg-gray-50 rounded-xl divide-y divide-gray-100">
                    {section.rows.filter(([, v]) => v).map(([k, v]) => (
                      <div key={k} className="flex px-4 py-2.5 gap-3">
                        <span className="text-xs text-gray-400 w-28 flex-shrink-0">{k}</span>
                        <span className="text-xs font-medium text-gray-800">{v}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              {selected.bio && (
                <div>
                  <p className="text-xs font-bold text-orange-500 uppercase tracking-wide mb-2">Bio</p>
                  <p className="text-sm text-gray-600 bg-gray-50 rounded-xl p-4 leading-relaxed">
                    {selected.bio}
                  </p>
                </div>
              )}

              {/* Review action */}
              <div className="bg-orange-50 border border-orange-100 rounded-2xl p-4">
                <p className="text-xs font-bold text-gray-700 mb-2">Reviewer Note (optional)</p>
                <textarea
                  className="w-full text-xs bg-white border border-orange-200 rounded-xl px-3 py-2 focus:outline-none focus:border-orange-400 resize-none"
                  rows={2}
                  placeholder="e.g. 'Verified IIT rank card', 'Missing proof of result'..."
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                />
                <div className="flex gap-3 mt-3">
                  <button
                    onClick={() => updateStatus(selected.id!, "approved")}
                    disabled={!!actionLoading}
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-green-500 hover:bg-green-600 text-white text-sm font-semibold rounded-xl transition-all"
                  >
                    {actionLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle className="w-4 h-4" />}
                    Approve
                  </button>
                  <button
                    onClick={() => updateStatus(selected.id!, "rejected")}
                    disabled={!!actionLoading}
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-red-500 hover:bg-red-600 text-white text-sm font-semibold rounded-xl transition-all"
                  >
                    {actionLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <XCircle className="w-4 h-4" />}
                    Reject
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
