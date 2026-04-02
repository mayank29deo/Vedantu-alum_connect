"use client";

import { useState } from "react";
import {
  Calendar,
  Clock,
  Star,
  TrendingUp,
  BookOpen,
  Bell,
  ChevronRight,
  Target,
  CheckCircle,
  Plus,
} from "lucide-react";
import Footer from "@/components/Footer";
import Link from "next/link";

const UPCOMING_MY_SESSIONS = [
  {
    id: 1,
    mentor: "Dev Patel",
    role: "IIT Delhi | Microsoft",
    color: "from-sky-400 to-blue-500",
    initials: "DP",
    date: "Apr 5, 2026",
    time: "6:00 PM",
    topic: "DSA Strategy + Weak Chapter Review",
    status: "confirmed",
  },
  {
    id: 2,
    mentor: "Priya Mehta",
    role: "AIIMS Delhi",
    color: "from-pink-400 to-rose-500",
    initials: "PM",
    date: "Apr 8, 2026",
    time: "7:30 PM",
    topic: "60-Day NEET Revision Calendar",
    status: "pending",
  },
];

const GOALS = [
  { label: "JEE Main 2026", progress: 68, color: "bg-blue-500" },
  { label: "Mock Tests (10/15)", progress: 67, color: "bg-orange-500" },
  { label: "Physics Chapters", progress: 82, color: "bg-emerald-500" },
  { label: "Chemistry Chapters", progress: 54, color: "bg-violet-500" },
];

const NOTIFICATIONS = [
  {
    icon: "📅",
    text: "Session with Dev Patel confirmed for Apr 5",
    time: "2h ago",
  },
  {
    icon: "🏆",
    text: "You completed 10 mock tests! Keep it up.",
    time: "Yesterday",
  },
  {
    icon: "🎓",
    text: "New session by Ananya Singh on Apr 10 — register now",
    time: "2d ago",
  },
];

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<"overview" | "sessions" | "goals">(
    "overview"
  );

  return (
    <>
      <div className="min-h-screen bg-[#FFFAF7] pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Welcome banner */}
          <div className="relative bg-gradient-to-r from-orange-500 to-orange-400 rounded-3xl p-6 md:p-8 mb-8 overflow-hidden">
            <div className="absolute right-0 top-0 h-full w-1/3 opacity-10">
              <svg viewBox="0 0 200 200" className="w-full h-full">
                <circle cx="150" cy="50" r="80" fill="white" />
                <circle cx="50" cy="150" r="60" fill="white" />
              </svg>
            </div>
            <div className="relative z-10">
              <p className="text-orange-100 text-sm font-medium mb-1">
                Welcome back 👋
              </p>
              <h1 className="text-2xl md:text-3xl font-extrabold text-white mb-2">
                Rahul, you&apos;re on track!
              </h1>
              <p className="text-orange-100 text-sm mb-5">
                2 sessions this week • 68% of your JEE goal covered
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/mentors"
                  className="px-5 py-2.5 bg-white text-orange-500 font-bold text-sm rounded-xl hover:bg-orange-50 transition-all"
                >
                  Book Next Session
                </Link>
                <Link
                  href="/sessions"
                  className="px-5 py-2.5 bg-white/10 border border-white/20 text-white font-semibold text-sm rounded-xl hover:bg-white/20 transition-all"
                >
                  View Live Sessions
                </Link>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 bg-white border border-gray-100 rounded-2xl p-1 mb-8 w-fit">
            {(["overview", "sessions", "goals"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setActiveTab(t)}
                className={`px-5 py-2 rounded-xl text-sm font-semibold capitalize transition-all ${
                  activeTab === t
                    ? "bg-orange-500 text-white"
                    : "text-gray-500 hover:text-orange-500"
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          {/* Overview tab */}
          {activeTab === "overview" && (
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Left column */}
              <div className="lg:col-span-2 space-y-6">
                {/* Stats */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {[
                    {
                      icon: Calendar,
                      val: "8",
                      label: "Sessions Done",
                      color: "text-blue-500 bg-blue-50",
                    },
                    {
                      icon: Star,
                      val: "4.8",
                      label: "Avg Rating Given",
                      color: "text-orange-500 bg-orange-50",
                    },
                    {
                      icon: TrendingUp,
                      val: "+34",
                      label: "Rank Improved",
                      color: "text-emerald-500 bg-emerald-50",
                    },
                    {
                      icon: BookOpen,
                      val: "3",
                      label: "Mentors Connected",
                      color: "text-violet-500 bg-violet-50",
                    },
                  ].map((s, i) => (
                    <div
                      key={i}
                      className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm"
                    >
                      <div
                        className={`w-9 h-9 rounded-xl ${s.color} flex items-center justify-center mb-3`}
                      >
                        <s.icon className="w-4 h-4" />
                      </div>
                      <p className="text-2xl font-extrabold text-gray-900">
                        {s.val}
                      </p>
                      <p className="text-xs text-gray-400 mt-0.5">{s.label}</p>
                    </div>
                  ))}
                </div>

                {/* Upcoming sessions */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                  <div className="flex items-center justify-between px-6 py-4 border-b border-gray-50">
                    <h2 className="font-bold text-gray-900">
                      Upcoming Sessions
                    </h2>
                    <Link
                      href="/mentors"
                      className="text-xs font-semibold text-orange-500 flex items-center gap-1"
                    >
                      <Plus className="w-3 h-3" />
                      Book New
                    </Link>
                  </div>
                  <div className="divide-y divide-gray-50">
                    {UPCOMING_MY_SESSIONS.map((s) => (
                      <div
                        key={s.id}
                        className="px-6 py-4 flex items-center gap-4"
                      >
                        <div
                          className={`w-11 h-11 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center text-white text-sm font-bold flex-shrink-0`}
                        >
                          {s.initials}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-gray-900 truncate">
                            {s.topic}
                          </p>
                          <p className="text-xs text-gray-400">
                            {s.mentor} • {s.date} at {s.time}
                          </p>
                        </div>
                        <span
                          className={`text-xs font-semibold px-2.5 py-1 rounded-full flex-shrink-0 ${
                            s.status === "confirmed"
                              ? "bg-green-50 text-green-600"
                              : "bg-amber-50 text-amber-600"
                          }`}
                        >
                          {s.status === "confirmed" ? (
                            <span className="flex items-center gap-1">
                              <CheckCircle className="w-3 h-3" /> Confirmed
                            </span>
                          ) : (
                            "Pending"
                          )}
                        </span>
                        <ChevronRight className="w-4 h-4 text-gray-300 flex-shrink-0" />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Goal progress */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                  <div className="flex items-center gap-2 mb-5">
                    <Target className="w-5 h-5 text-orange-500" />
                    <h2 className="font-bold text-gray-900">Your Goals</h2>
                  </div>
                  <div className="space-y-4">
                    {GOALS.map((g, i) => (
                      <div key={i}>
                        <div className="flex justify-between text-sm mb-1.5">
                          <span className="font-medium text-gray-700">
                            {g.label}
                          </span>
                          <span className="text-gray-400">{g.progress}%</span>
                        </div>
                        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className={`h-full ${g.color} rounded-full transition-all duration-1000`}
                            style={{ width: `${g.progress}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right column */}
              <div className="space-y-6">
                {/* Notifications */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                  <div className="flex items-center gap-2 px-5 py-4 border-b border-gray-50">
                    <Bell className="w-4 h-4 text-orange-500" />
                    <h2 className="font-bold text-gray-900 text-sm">
                      Notifications
                    </h2>
                  </div>
                  <div className="divide-y divide-gray-50">
                    {NOTIFICATIONS.map((n, i) => (
                      <div key={i} className="px-5 py-4 flex gap-3">
                        <span className="text-xl flex-shrink-0">{n.icon}</span>
                        <div>
                          <p className="text-xs text-gray-700 leading-relaxed">
                            {n.text}
                          </p>
                          <p className="text-[10px] text-gray-400 mt-1">
                            {n.time}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Suggested mentor */}
                <div className="bg-white rounded-2xl border border-orange-100 shadow-sm p-5">
                  <p className="text-xs font-bold text-orange-500 uppercase tracking-wide mb-3">
                    Suggested for you
                  </p>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-violet-400 to-purple-600 flex items-center justify-center text-white text-sm font-bold">
                      AS
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-900">
                        Ananya Singh
                      </p>
                      <p className="text-xs text-gray-400">IAS AIR 34 • UPSC</p>
                    </div>
                    <div className="ml-auto flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 text-orange-400 fill-orange-400" />
                      <span className="text-xs font-bold text-gray-700">
                        5.0
                      </span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mb-4 leading-relaxed">
                    Based on your study plan, a Civil Services mentor could help
                    unlock your essay writing potential.
                  </p>
                  <Link
                    href="/mentors"
                    className="w-full block text-center btn-orange py-2.5 rounded-xl text-sm"
                  >
                    Book Free Intro Call
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* Sessions tab */}
          {activeTab === "sessions" && (
            <div className="space-y-4">
              <h2 className="font-bold text-gray-900 mb-4">
                All Your Sessions
              </h2>
              {[...UPCOMING_MY_SESSIONS, ...UPCOMING_MY_SESSIONS].map(
                (s, i) => (
                  <div
                    key={i}
                    className="bg-white rounded-2xl border border-gray-100 p-5 flex items-center gap-4 shadow-sm card-hover"
                  >
                    <div
                      className={`w-12 h-12 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center text-white font-bold flex-shrink-0`}
                    >
                      {s.initials}
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900 text-sm">
                        {s.topic}
                      </p>
                      <p className="text-xs text-gray-400 mt-0.5">
                        with {s.mentor} • {s.role}
                      </p>
                      <div className="flex gap-3 mt-2 text-xs text-gray-400">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" /> {s.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {s.time}
                        </span>
                      </div>
                    </div>
                    <button className="px-4 py-2 bg-orange-50 text-orange-500 font-semibold text-xs rounded-xl hover:bg-orange-500 hover:text-white transition-all">
                      Join
                    </button>
                  </div>
                )
              )}
            </div>
          )}

          {/* Goals tab */}
          {activeTab === "goals" && (
            <div className="grid sm:grid-cols-2 gap-6">
              {GOALS.map((g, i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-gray-900">{g.label}</h3>
                    <span className="text-2xl font-extrabold gradient-text">
                      {g.progress}%
                    </span>
                  </div>
                  <div className="h-3 bg-gray-100 rounded-full overflow-hidden mb-4">
                    <div
                      className={`h-full ${g.color} rounded-full`}
                      style={{ width: `${g.progress}%` }}
                    />
                  </div>
                  <p className="text-sm text-gray-500">
                    Keep going! You&apos;re making great progress.
                  </p>
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
