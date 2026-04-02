"use client";

import {
  Shield,
  Zap,
  MessageCircle,
  TrendingUp,
  Lock,
  Award,
} from "lucide-react";

const FEATURES = [
  {
    icon: Shield,
    title: "100% Verified Alumni",
    desc: "Every mentor is verified via their Vedantu student ID, rank cards, or college proof. No fake profiles.",
    color: "text-blue-500 bg-blue-50",
  },
  {
    icon: Zap,
    title: "Match in Minutes",
    desc: "Our smart matching engine pairs you with the most relevant alumni in under 5 minutes.",
    color: "text-orange-500 bg-orange-50",
  },
  {
    icon: MessageCircle,
    title: "First Call Always Free",
    desc: "No commitment needed. Your first intro session is always free so you can find the right fit.",
    color: "text-emerald-500 bg-emerald-50",
  },
  {
    icon: TrendingUp,
    title: "Track Your Progress",
    desc: "Set goals, get personalized study plans, and track your improvement session by session.",
    color: "text-violet-500 bg-violet-50",
  },
  {
    icon: Lock,
    title: "Safe & Private",
    desc: "All sessions are encrypted. Your data stays yours. Moderated platform with zero tolerance for misuse.",
    color: "text-rose-500 bg-rose-50",
  },
  {
    icon: Award,
    title: "Vedantu Certified",
    desc: "Earn a Vedantu-certified mentorship badge to share on LinkedIn after completing your journey.",
    color: "text-amber-500 bg-amber-50",
  },
];

export default function WhyAlumConnect() {
  return (
    <section className="py-24 bg-white" id="why">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <div>
            <div className="section-badge">✦ Why AlumConnect</div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-dark-800 mt-2 mb-6">
              Not just another
              <br />
              <span className="gradient-text">mentorship platform</span>
            </h2>
            <p className="text-lg text-gray-500 leading-relaxed mb-8">
              The difference between a generic mentor and a Vedantu alumnus is
              that they&apos;ve used the exact same app, solved the same doubt
              sessions, and felt the same exam pressure. That shared context
              makes everything click faster.
            </p>

            {/* Big stat highlight */}
            <div className="flex gap-6">
              <div className="text-center p-6 bg-orange-50 rounded-2xl border border-orange-100">
                <p className="text-4xl font-extrabold gradient-text">94%</p>
                <p className="text-sm text-gray-500 mt-1">
                  learners improved rank
                  <br />
                  after 3 sessions
                </p>
              </div>
              <div className="text-center p-6 bg-orange-50 rounded-2xl border border-orange-100">
                <p className="text-4xl font-extrabold gradient-text">4.9★</p>
                <p className="text-sm text-gray-500 mt-1">
                  average mentor
                  <br />
                  rating across sessions
                </p>
              </div>
            </div>
          </div>

          {/* Right — feature grid */}
          <div className="grid sm:grid-cols-2 gap-4">
            {FEATURES.map((f, i) => (
              <div
                key={i}
                className="p-5 rounded-2xl border border-gray-100 bg-white shadow-sm card-hover"
              >
                <div
                  className={`w-10 h-10 rounded-xl ${f.color} flex items-center justify-center mb-3`}
                >
                  <f.icon className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold text-gray-900 mb-1">
                  {f.title}
                </h3>
                <p className="text-xs text-gray-500 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
