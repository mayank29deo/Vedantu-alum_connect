"use client";

import { useState } from "react";
import { Search, Filter, Star, CheckCircle, Clock, X } from "lucide-react";
import { MENTORS, CAREER_TRACKS } from "@/lib/data";
import Footer from "@/components/Footer";
import Link from "next/link";

const FIELDS = [
  "All",
  ...Array.from(new Set(MENTORS.map((m) => m.field))),
];

export default function MentorsPage() {
  const [search, setSearch] = useState("");
  const [activeField, setActiveField] = useState("All");
  const [availableOnly, setAvailableOnly] = useState(false);

  const filtered = MENTORS.filter((m) => {
    const matchSearch =
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.company.toLowerCase().includes(search.toLowerCase()) ||
      m.college.toLowerCase().includes(search.toLowerCase()) ||
      m.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));
    const matchField = activeField === "All" || m.field === activeField;
    const matchAvail = !availableOnly || m.available;
    return matchSearch && matchField && matchAvail;
  });

  return (
    <>
      <div className="min-h-screen bg-[#FFFAF7] pt-24">
        {/* Header */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-10">
            <div className="section-badge inline-flex mb-3">
              ✦ {MENTORS.length} verified alumni
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-dark-800 mb-4">
              Find your perfect{" "}
              <span className="gradient-text">mentor</span>
            </h1>
            <p className="text-lg text-gray-500 max-w-xl mx-auto">
              Browse Vedantu alumni by field, exam, or college. Every mentor
              below has personally used Vedantu to achieve what you&apos;re
              aiming for.
            </p>
          </div>

          {/* Search + Filters */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 mb-8">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by name, college, company, or skill..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-orange-300 focus:ring-2 focus:ring-orange-100"
                />
                {search && (
                  <button
                    onClick={() => setSearch("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
              <button
                onClick={() => setAvailableOnly(!availableOnly)}
                className={`flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold border transition-all ${
                  availableOnly
                    ? "bg-green-500 text-white border-green-500"
                    : "border-gray-200 text-gray-600 hover:border-orange-300"
                }`}
              >
                <Filter className="w-4 h-4" />
                Available Now
              </button>
            </div>

            {/* Field filters */}
            <div className="flex flex-wrap gap-2 mt-3">
              {FIELDS.map((field) => (
                <button
                  key={field}
                  onClick={() => setActiveField(field)}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                    activeField === field
                      ? "bg-orange-500 text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-orange-50 hover:text-orange-500"
                  }`}
                >
                  {field}
                </button>
              ))}
            </div>
          </div>

          {/* Results count */}
          <p className="text-sm text-gray-500 mb-6">
            Showing{" "}
            <strong className="text-gray-800">{filtered.length}</strong> mentors
          </p>

          {/* Mentor grid */}
          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-400 text-lg">
                No mentors match your filters.
              </p>
              <button
                onClick={() => {
                  setSearch("");
                  setActiveField("All");
                  setAvailableOnly(false);
                }}
                className="mt-4 text-orange-500 text-sm font-semibold hover:underline"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((mentor) => (
                <div
                  key={mentor.id}
                  className="bg-white rounded-2xl border border-gray-100 p-6 card-hover shadow-sm group"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div
                      className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${mentor.color} flex items-center justify-center text-white font-bold text-lg flex-shrink-0`}
                    >
                      {mentor.image}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-gray-900 truncate">
                        {mentor.name}
                      </h3>
                      <p className="text-xs text-gray-500 truncate">
                        {mentor.role} • {mentor.company}
                      </p>
                      <p className="text-xs text-orange-500 font-medium mt-0.5">
                        {mentor.college} &apos;{mentor.batch}
                      </p>
                    </div>
                    <div
                      className={`flex-shrink-0 text-xs font-semibold px-2 py-1 rounded-full ${
                        mentor.available
                          ? "bg-green-50 text-green-600"
                          : "bg-gray-50 text-gray-400"
                      }`}
                    >
                      {mentor.available ? (
                        <span className="flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                          Available
                        </span>
                      ) : (
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          Waitlist
                        </span>
                      )}
                    </div>
                  </div>

                  <p className="text-sm text-gray-500 leading-relaxed mb-4">
                    {mentor.bio}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-5">
                    {mentor.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs font-medium bg-orange-50 text-orange-600 px-2.5 py-1 rounded-lg border border-orange-100"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-orange-400 fill-orange-400" />
                      <span className="text-sm font-bold text-gray-800">
                        {mentor.rating}
                      </span>
                      <span className="text-xs text-gray-400">
                        ({mentor.sessions})
                      </span>
                    </div>
                    <button className="flex items-center gap-1.5 text-xs font-semibold text-orange-500 bg-orange-50 hover:bg-orange-500 hover:text-white px-3 py-2 rounded-xl transition-all">
                      <CheckCircle className="w-3.5 h-3.5" />
                      Book Free Call
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
