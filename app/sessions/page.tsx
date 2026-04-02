"use client";

import { useState } from "react";
import { Calendar, Clock, Users, Radio, Play, ArrowRight } from "lucide-react";
import { UPCOMING_SESSIONS } from "@/lib/data";
import Footer from "@/components/Footer";

const PAST_SESSIONS = [
  {
    id: 10,
    title: "How I Scored 720/720 in NEET — No Myths, Just Facts",
    host: "Priya Mehta",
    role: "AIIMS Delhi",
    date: "March 22, 2026",
    duration: "87 min",
    views: "14,203",
    type: "Recording",
    color: "rose",
  },
  {
    id: 11,
    title: "JEE Mains 2026 Paper Analysis & What's Coming in Advanced",
    host: "Dev Patel",
    role: "IIT Delhi | Microsoft",
    date: "March 28, 2026",
    duration: "62 min",
    views: "22,841",
    type: "Recording",
    color: "blue",
  },
  {
    id: 12,
    title: "CAT 2025 Toppers Panel — Strategy, Mistakes & Wins",
    host: "Rohit Verma",
    role: "IIM-A | Goldman Sachs",
    date: "March 15, 2026",
    duration: "110 min",
    views: "9,674",
    type: "Recording",
    color: "emerald",
  },
];

const colorMap: Record<string, { bg: string; text: string; dot: string }> = {
  blue: { bg: "bg-blue-50", text: "text-blue-600", dot: "bg-blue-500" },
  rose: { bg: "bg-rose-50", text: "text-rose-600", dot: "bg-rose-500" },
  emerald: {
    bg: "bg-emerald-50",
    text: "text-emerald-600",
    dot: "bg-emerald-500",
  },
};

export default function SessionsPage() {
  const [tab, setTab] = useState<"upcoming" | "past">("upcoming");

  return (
    <>
      <div className="min-h-screen bg-[#FFFAF7] pt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="section-badge inline-flex mb-3">
              <Radio className="w-3 h-3" />
              Free for all learners
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-dark-800 mb-4">
              Live sessions &{" "}
              <span className="gradient-text">recordings</span>
            </h1>
            <p className="text-lg text-gray-500 max-w-xl mx-auto">
              Free webinars, AMAs, and workshops hosted by Vedantu alumni every
              week. No sign-up needed to watch recordings.
            </p>
          </div>

          {/* Tab switcher */}
          <div className="flex justify-center mb-10">
            <div className="flex p-1 bg-white border border-gray-200 rounded-2xl gap-1">
              {(["upcoming", "past"] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={`px-6 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                    tab === t
                      ? "bg-orange-500 text-white shadow-md"
                      : "text-gray-500 hover:text-orange-500"
                  }`}
                >
                  {t === "upcoming" ? "Upcoming Sessions" : "Watch Recordings"}
                </button>
              ))}
            </div>
          </div>

          {/* Upcoming */}
          {tab === "upcoming" && (
            <div className="grid lg:grid-cols-3 gap-6">
              {UPCOMING_SESSIONS.map((session) => {
                const c = colorMap[session.color];
                return (
                  <div
                    key={session.id}
                    className="bg-white rounded-2xl border border-gray-100 p-6 card-hover shadow-sm group"
                  >
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
                        Open
                      </div>
                    </div>

                    <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors">
                      {session.title}
                    </h3>
                    <p className="text-sm text-gray-400 mb-5">
                      by{" "}
                      <span className="text-orange-500 font-medium">
                        {session.host}
                      </span>{" "}
                      • {session.role}
                    </p>

                    <div className="flex flex-col gap-2 text-xs text-gray-400 mb-5">
                      <span className="flex items-center gap-2">
                        <Calendar className="w-3.5 h-3.5 text-orange-400" />
                        {session.date} • {session.time}
                      </span>
                      <span className="flex items-center gap-2">
                        <Clock className="w-3.5 h-3.5 text-orange-400" />
                        {session.duration} long
                      </span>
                      <span className="flex items-center gap-2">
                        <Users className="w-3.5 h-3.5 text-orange-400" />
                        {session.attendees.toLocaleString()} already registered
                      </span>
                    </div>

                    <button className="w-full py-3 btn-orange rounded-xl text-sm">
                      Register Free
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                );
              })}
            </div>
          )}

          {/* Past recordings */}
          {tab === "past" && (
            <div className="grid lg:grid-cols-3 gap-6">
              {PAST_SESSIONS.map((session) => {
                const c = colorMap[session.color];
                return (
                  <div
                    key={session.id}
                    className="bg-white rounded-2xl border border-gray-100 overflow-hidden card-hover shadow-sm group"
                  >
                    {/* Thumbnail placeholder */}
                    <div
                      className={`h-40 ${c.bg} flex items-center justify-center relative`}
                    >
                      <div className="w-14 h-14 rounded-full bg-white shadow-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Play className={`w-6 h-6 ${c.text} fill-current ml-1`} />
                      </div>
                      <span className="absolute bottom-3 right-3 bg-black/60 text-white text-xs px-2 py-0.5 rounded-md">
                        {session.duration}
                      </span>
                    </div>

                    <div className="p-5">
                      <h3 className="font-bold text-gray-900 mb-2 text-sm leading-snug group-hover:text-orange-600 transition-colors">
                        {session.title}
                      </h3>
                      <p className="text-xs text-gray-400 mb-3">
                        {session.host} • {session.date}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-400 flex items-center gap-1">
                          <Play className="w-3 h-3" />
                          {session.views} views
                        </span>
                        <button className="text-xs font-semibold text-orange-500 hover:text-orange-600 flex items-center gap-1">
                          Watch Now <ArrowRight className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
