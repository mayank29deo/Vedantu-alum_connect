"use client";

import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

export default function CTASection() {
  return (
    <section className="py-24 bg-[#FFFAF7]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative bg-gradient-to-br from-orange-500 to-orange-400 rounded-3xl overflow-hidden p-12 md:p-16 text-center shadow-2xl shadow-orange-200/60">
          {/* Background pattern */}
          <div className="absolute inset-0 pointer-events-none">
            <svg
              className="absolute inset-0 w-full h-full opacity-10"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <pattern
                  id="ctogrid"
                  width="32"
                  height="32"
                  patternUnits="userSpaceOnUse"
                >
                  <path
                    d="M 32 0 L 0 0 0 32"
                    fill="none"
                    stroke="white"
                    strokeWidth="1"
                  />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#ctogrid)" />
            </svg>
            <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-white/10 blur-2xl" />
            <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-white/10 blur-2xl" />
          </div>

          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 bg-white/20 text-white text-xs font-semibold px-4 py-2 rounded-full mb-6">
              <Sparkles className="w-3.5 h-3.5" />
              Free for all Vedantu learners
            </div>

            <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4 leading-tight">
              Your dream rank has
              <br />
              someone waiting to help.
            </h2>

            <p className="text-lg text-orange-100 max-w-lg mx-auto mb-10">
              Join 50,000+ learners who are already getting personalised
              guidance from Vedantu alumni who've cracked exactly what you're
              aiming for.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/mentors"
                className="flex items-center justify-center gap-2 bg-white text-orange-500 font-bold px-8 py-4 rounded-xl hover:bg-orange-50 transition-all shadow-lg hover:-translate-y-1 text-base"
              >
                Find My Mentor Now
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/sessions"
                className="flex items-center justify-center gap-2 bg-white/10 border border-white/30 text-white font-semibold px-8 py-4 rounded-xl hover:bg-white/20 transition-all text-base"
              >
                Attend a Free Session
              </Link>
            </div>

            <p className="text-orange-200 text-sm mt-6">
              No credit card needed · First call always free · Cancel anytime
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
