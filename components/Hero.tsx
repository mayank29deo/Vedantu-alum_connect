"use client";

import Link from "next/link";
import { ArrowRight, Play, Star, Users, BookOpen } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#FFFAF7]">
      {/* Background blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-orange-200/60 to-orange-100/30 blur-3xl" />
        <div className="absolute top-1/2 -left-60 w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-orange-100/50 to-transparent blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full bg-gradient-to-t from-orange-50/80 to-transparent blur-2xl" />
        {/* Grid pattern */}
        <svg
          className="absolute inset-0 w-full h-full opacity-[0.025]"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="grid"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke="#FF6B2B"
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left content */}
          <div>
            {/* Badge */}
            <div className="section-badge mb-6 w-fit">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
              Now live for Vedantu learners
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-[64px] font-extrabold leading-[1.08] tracking-tight text-dark-800 mb-6">
              Your future
              <br />
              <span className="gradient-text">mentor</span> already
              <br />
              walked your path.
            </h1>

            <p className="text-lg text-gray-500 leading-relaxed max-w-lg mb-10">
              Connect with Vedantu alumni — IITians, doctors, IAS officers, and
              professionals — who've been exactly where you are. Real guidance,
              real results.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 mb-14">
              <Link
                href="/mentors"
                className="btn-orange text-base px-7 py-3.5 rounded-xl shadow-lg shadow-orange-200"
              >
                Find My Mentor
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/sessions"
                className="flex items-center gap-3 px-7 py-3.5 bg-white border border-gray-200 rounded-xl text-base font-semibold text-gray-700 hover:border-orange-300 hover:text-orange-500 transition-all shadow-sm"
              >
                <span className="w-8 h-8 rounded-full bg-orange-50 flex items-center justify-center">
                  <Play className="w-3.5 h-3.5 text-orange-500 fill-orange-500 ml-0.5" />
                </span>
                Watch a Session
              </Link>
            </div>

            {/* Social proof */}
            <div className="flex flex-wrap items-center gap-6">
              <div className="flex -space-x-3">
                {["AK", "PM", "RV", "DS", "AS"].map((initials, i) => (
                  <div
                    key={i}
                    className={`w-10 h-10 rounded-full border-2 border-white flex items-center justify-center text-xs font-bold text-white ${
                      [
                        "bg-blue-500",
                        "bg-rose-500",
                        "bg-emerald-500",
                        "bg-violet-500",
                        "bg-orange-500",
                      ][i]
                    }`}
                  >
                    {initials}
                  </div>
                ))}
                <div className="w-10 h-10 rounded-full border-2 border-white bg-orange-100 flex items-center justify-center text-xs font-bold text-orange-600">
                  50K+
                </div>
              </div>
              <div>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 text-orange-400 fill-orange-400"
                    />
                  ))}
                  <span className="ml-1 text-sm font-semibold text-gray-700">
                    4.9
                  </span>
                </div>
                <p className="text-xs text-gray-400 mt-0.5">
                  from 2,40,000+ sessions
                </p>
              </div>
            </div>
          </div>

          {/* Right — visual card stack */}
          <div className="hidden lg:flex flex-col gap-3">
            {/* Main card */}
            <div className="relative bg-white rounded-3xl shadow-2xl shadow-orange-100/80 p-6 border border-orange-100">
              {/* Card header */}
              <div className="flex items-center gap-4 mb-5">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-400 to-purple-600 flex items-center justify-center text-white font-bold text-lg">
                  AS
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">Ananya Singh</h3>
                  <p className="text-sm text-gray-500">IAS Officer • AIR 34</p>
                  <div className="flex items-center gap-1 mt-1">
                    <Star className="w-3.5 h-3.5 text-orange-400 fill-orange-400" />
                    <span className="text-xs font-semibold text-gray-700">
                      5.0
                    </span>
                    <span className="text-xs text-gray-400">
                      (203 sessions)
                    </span>
                  </div>
                </div>
                <span className="ml-auto bg-green-100 text-green-600 text-xs font-semibold px-2.5 py-1 rounded-full">
                  Available
                </span>
              </div>

              <p className="text-sm text-gray-500 mb-5 leading-relaxed">
                &quot;I started on Vedantu in Class 9. Now I&apos;m giving back
                — one session at a time.&quot;
              </p>

              <div className="grid grid-cols-3 gap-3 mb-5">
                {[
                  { icon: Users, val: "203", label: "Sessions" },
                  { icon: Star, val: "5.0", label: "Rating" },
                  { icon: BookOpen, val: "UPSC", label: "Domain" },
                ].map((stat, i) => (
                  <div
                    key={i}
                    className="bg-orange-50 rounded-xl p-3 text-center"
                  >
                    <stat.icon className="w-4 h-4 text-orange-500 mx-auto mb-1" />
                    <p className="text-sm font-bold text-gray-800">{stat.val}</p>
                    <p className="text-[10px] text-gray-400">{stat.label}</p>
                  </div>
                ))}
              </div>

              <button className="w-full btn-orange py-3 rounded-xl text-sm">
                Book a Session — Free First Call
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Sub-cards row */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white rounded-2xl border border-orange-50 shadow-md p-4 flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-base flex-shrink-0">
                  🎉
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-gray-800 truncate">Session booked!</p>
                  <p className="text-[10px] text-gray-400 truncate">Arjun × Siddharth • Today 6 PM</p>
                </div>
              </div>
              <div className="bg-white rounded-2xl border border-orange-50 shadow-md p-4 flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-orange-400 to-orange-500 flex items-center justify-center text-base flex-shrink-0">
                  🏆
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-gray-800 truncate">JEE Advanced AIR 127</p>
                  <p className="text-[10px] text-gray-400 truncate">Mentored by Dev Patel</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
