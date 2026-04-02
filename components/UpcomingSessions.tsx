"use client";

import Link from "next/link";
import { Calendar, Clock, Users, ArrowRight, Radio } from "lucide-react";
import { UPCOMING_SESSIONS } from "@/lib/data";

const colorMap: Record<string, { bg: string; text: string; dot: string }> = {
  blue: { bg: "bg-blue-50", text: "text-blue-600", dot: "bg-blue-500" },
  rose: { bg: "bg-rose-50", text: "text-rose-600", dot: "bg-rose-500" },
  emerald: {
    bg: "bg-emerald-50",
    text: "text-emerald-600",
    dot: "bg-emerald-500",
  },
};

export default function UpcomingSessions() {
  return (
    <section className="py-24 bg-dark-800" id="sessions">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 bg-orange-500/10 text-orange-400 text-xs font-semibold px-3 py-1.5 rounded-full border border-orange-500/20 mb-3">
              <Radio className="w-3 h-3" />
              Upcoming Live
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-white mt-1">
              Free sessions from
              <br />
              <span className="gradient-text">top alumni</span>
            </h2>
          </div>
          <Link
            href="/sessions"
            className="flex items-center gap-2 text-sm font-semibold text-orange-400 hover:text-orange-300 transition-colors self-start sm:self-auto"
          >
            View all sessions <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Session cards */}
        <div className="grid lg:grid-cols-3 gap-6">
          {UPCOMING_SESSIONS.map((session) => {
            const c = colorMap[session.color];
            return (
              <div
                key={session.id}
                className="bg-dark-700 rounded-2xl border border-white/5 p-6 card-hover group hover:border-orange-500/30"
              >
                {/* Type badge */}
                <div className="flex items-center justify-between mb-5">
                  <span
                    className={`text-xs font-semibold px-3 py-1 rounded-full ${c.bg} ${c.text}`}
                  >
                    {session.type}
                  </span>
                  <div className="flex items-center gap-1.5 text-xs text-gray-400">
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${c.dot} animate-pulse`}
                    />
                    Registrations open
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-orange-100 transition-colors">
                  {session.title}
                </h3>

                {/* Host */}
                <p className="text-sm text-gray-400 mb-5">
                  by{" "}
                  <span className="text-orange-400 font-medium">
                    {session.host}
                  </span>{" "}
                  • {session.role}
                </p>

                {/* Meta row */}
                <div className="flex flex-wrap gap-4 text-xs text-gray-400 mb-5">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-orange-400" />
                    {session.date}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-orange-400" />
                    {session.time} • {session.duration}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-orange-400" />
                    {session.attendees.toLocaleString()} registered
                  </span>
                </div>

                {/* CTA */}
                <button className="w-full py-3 bg-orange-500/10 hover:bg-orange-500 text-orange-400 hover:text-white font-semibold text-sm rounded-xl border border-orange-500/20 hover:border-transparent transition-all">
                  Register Free
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
