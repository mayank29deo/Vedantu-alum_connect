"use client";

import Link from "next/link";
import { ArrowRight, Users } from "lucide-react";
import { CAREER_TRACKS } from "@/lib/data";

const colorMap: Record<
  string,
  { bg: string; border: string; text: string; badge: string }
> = {
  blue: {
    bg: "hover:bg-blue-50",
    border: "hover:border-blue-200",
    text: "text-blue-600",
    badge: "bg-blue-50 text-blue-600",
  },
  rose: {
    bg: "hover:bg-rose-50",
    border: "hover:border-rose-200",
    text: "text-rose-600",
    badge: "bg-rose-50 text-rose-600",
  },
  emerald: {
    bg: "hover:bg-emerald-50",
    border: "hover:border-emerald-200",
    text: "text-emerald-600",
    badge: "bg-emerald-50 text-emerald-600",
  },
  violet: {
    bg: "hover:bg-violet-50",
    border: "hover:border-violet-200",
    text: "text-violet-600",
    badge: "bg-violet-50 text-violet-600",
  },
  amber: {
    bg: "hover:bg-amber-50",
    border: "hover:border-amber-200",
    text: "text-amber-600",
    badge: "bg-amber-50 text-amber-600",
  },
  pink: {
    bg: "hover:bg-pink-50",
    border: "hover:border-pink-200",
    text: "text-pink-600",
    badge: "bg-pink-50 text-pink-600",
  },
};

export default function CareerTracks() {
  return (
    <section className="py-24 bg-white" id="tracks">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="section-badge inline-flex">✦ Career Paths</div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-dark-800 mt-2 mb-4">
            Every path has a
            <br />
            <span className="gradient-text">mentor who&apos;s walked it</span>
          </h2>
          <p className="text-lg text-gray-500 max-w-xl mx-auto">
            From IITs to AIIMS, IIMs to LBSNAA — we have alumni across every
            major career track ready to guide you.
          </p>
        </div>

        {/* Track cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {CAREER_TRACKS.map((track) => {
            const c = colorMap[track.color];
            return (
              <Link
                key={track.id}
                href={`/mentors?field=${track.id}`}
                className={`group p-6 rounded-2xl border border-gray-100 bg-white card-hover ${c.bg} ${c.border} transition-all cursor-pointer`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <span className="text-3xl mb-3 block">{track.icon}</span>
                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-gray-800">
                      {track.label}
                    </h3>
                  </div>
                  <ArrowRight
                    className={`w-5 h-5 ${c.text} opacity-0 group-hover:opacity-100 transition-opacity mt-1 flex-shrink-0`}
                  />
                </div>

                {/* Exams */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {track.exams.map((exam) => (
                    <span
                      key={exam}
                      className={`text-xs font-medium px-2.5 py-1 rounded-lg ${c.badge}`}
                    >
                      {exam}
                    </span>
                  ))}
                </div>

                {/* Mentor count */}
                <div className="flex items-center gap-1.5 text-sm text-gray-500">
                  <Users className="w-4 h-4" />
                  <span>
                    <strong className="text-gray-800">{track.mentors}</strong>{" "}
                    mentors available
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
