"use client";

import { useState } from "react";
import {
  UserCheck,
  Search,
  CalendarDays,
  Rocket,
  GraduationCap,
  Briefcase,
  Heart,
} from "lucide-react";

const LEARNER_STEPS = [
  {
    icon: UserCheck,
    step: "01",
    title: "Create Your Profile",
    desc: "Sign in with your Vedantu account. Tell us your current class, target exam, and what you need help with.",
    color: "bg-blue-50 text-blue-500",
  },
  {
    icon: Search,
    step: "02",
    title: "Discover Your Mentor",
    desc: "Browse alumni by field, college, exam rank, and availability. Filter by what matters to you most.",
    color: "bg-orange-50 text-orange-500",
  },
  {
    icon: CalendarDays,
    step: "03",
    title: "Book a Free Intro Call",
    desc: "Your first call is on us. Meet your mentor, ask anything, and decide if it's a fit.",
    color: "bg-emerald-50 text-emerald-500",
  },
  {
    icon: Rocket,
    step: "04",
    title: "Start Your Journey",
    desc: "Regular sessions, study plan reviews, and direct support from someone who's been exactly where you are.",
    color: "bg-violet-50 text-violet-500",
  },
];

const ALUMNI_STEPS = [
  {
    icon: GraduationCap,
    step: "01",
    title: "Verify Your Story",
    desc: "Register with your Vedantu Student ID. Upload your results, admit card, or college ID for verification.",
    color: "bg-orange-50 text-orange-500",
  },
  {
    icon: Heart,
    step: "02",
    title: "Build Your Profile",
    desc: "Share your journey — from Vedantu days to where you are now. Set your availability and session type.",
    color: "bg-rose-50 text-rose-500",
  },
  {
    icon: Briefcase,
    step: "03",
    title: "Start Mentoring",
    desc: "Accept session requests, conduct 1-on-1 calls, and host free webinars for the broader community.",
    color: "bg-teal-50 text-teal-500",
  },
  {
    icon: Rocket,
    step: "04",
    title: "Earn & Give Back",
    desc: "Earn certificates, recognition, and optional stipends. Be the mentor you wish you had.",
    color: "bg-amber-50 text-amber-500",
  },
];

export default function HowItWorks() {
  const [activeTab, setActiveTab] = useState<"learner" | "alumni">("learner");
  const steps = activeTab === "learner" ? LEARNER_STEPS : ALUMNI_STEPS;

  return (
    <section className="py-24 bg-white" id="how-it-works">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="section-badge inline-flex">✦ Simple Process</div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-dark-800 mb-4">
            How it works
          </h2>
          <p className="text-lg text-gray-500 max-w-xl mx-auto">
            Whether you&apos;re a learner seeking direction or an alumnus ready
            to give back — getting started takes minutes.
          </p>
        </div>

        {/* Tab switcher */}
        <div className="flex justify-center mb-12">
          <div className="flex p-1 bg-orange-50 rounded-2xl gap-1 border border-orange-100">
            {(["learner", "alumni"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  activeTab === tab
                    ? "bg-orange-500 text-white shadow-md shadow-orange-200"
                    : "text-gray-500 hover:text-orange-500"
                }`}
              >
                {tab === "learner" ? "I'm a Learner" : "I'm an Alumni"}
              </button>
            ))}
          </div>
        </div>

        {/* Steps */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <div
              key={i}
              className="relative p-6 bg-white rounded-2xl border border-gray-100 shadow-sm card-hover group"
            >
              {/* Connector line (hidden on last item) */}
              {i < steps.length - 1 && (
                <div className="absolute top-10 left-full w-full h-px bg-gradient-to-r from-orange-200 to-transparent -z-0 hidden lg:block" />
              )}

              <div
                className={`w-12 h-12 rounded-xl ${step.color} flex items-center justify-center mb-4`}
              >
                <step.icon className="w-5 h-5" />
              </div>
              <span className="text-[11px] font-bold text-orange-400 tracking-widest mb-2 block">
                STEP {step.step}
              </span>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                {step.title}
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
