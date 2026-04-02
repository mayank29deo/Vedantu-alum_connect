"use client";

import Link from "next/link";
import { Star, ArrowRight, CheckCircle, Clock } from "lucide-react";
import { MENTORS } from "@/lib/data";

export default function FeaturedMentors() {
  return (
    <section className="py-24 bg-[#FFFAF7]" id="mentors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <div className="section-badge">✦ Top Mentors</div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-dark-800 mt-2">
              Meet the alumni
              <br />
              <span className="gradient-text">changing futures</span>
            </h2>
          </div>
          <Link
            href="/mentors"
            className="flex items-center gap-2 text-sm font-semibold text-orange-500 hover:text-orange-600 transition-colors self-start sm:self-auto"
          >
            View all mentors <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Cards grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {MENTORS.map((mentor) => (
            <div
              key={mentor.id}
              className="bg-white rounded-2xl border border-gray-100 p-6 card-hover shadow-sm group"
            >
              {/* Top row */}
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
                  <p className="text-xs text-orange-500 font-medium mt-0.5 truncate">
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

              {/* Bio */}
              <p className="text-sm text-gray-500 leading-relaxed mb-4">
                {mentor.bio}
              </p>

              {/* Tags */}
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

              {/* Stats row */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-orange-400 fill-orange-400" />
                  <span className="text-sm font-bold text-gray-800">
                    {mentor.rating}
                  </span>
                  <span className="text-xs text-gray-400">
                    ({mentor.sessions} sessions)
                  </span>
                </div>
                <Link
                  href={`/mentors/${mentor.id}`}
                  className="flex items-center gap-1.5 text-xs font-semibold text-orange-500 bg-orange-50 hover:bg-orange-500 hover:text-white px-3 py-2 rounded-xl transition-all"
                >
                  <CheckCircle className="w-3.5 h-3.5" />
                  Book Free Call
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
