"use client";

import Link from "next/link";
import { Quote, Star, ArrowRight } from "lucide-react";
import { SUCCESS_STORIES } from "@/lib/data";

export default function SuccessStories() {
  return (
    <section className="py-24 bg-[#FFFAF7]" id="stories">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <div className="section-badge">✦ Success Stories</div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-dark-800 mt-2">
              Real learners,
              <br />
              <span className="gradient-text">real results</span>
            </h2>
          </div>
          <Link
            href="/success-stories"
            className="flex items-center gap-2 text-sm font-semibold text-orange-500 hover:text-orange-600 transition-colors self-start sm:self-auto"
          >
            Read all stories <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Story cards */}
        <div className="grid sm:grid-cols-2 gap-6">
          {SUCCESS_STORIES.map((story) => (
            <div
              key={story.id}
              className="bg-white rounded-2xl border border-gray-100 p-7 card-hover shadow-sm relative overflow-hidden group"
            >
              {/* Background accent */}
              <div
                className={`absolute top-0 right-0 w-32 h-32 rounded-bl-[80px] bg-gradient-to-br ${story.color} opacity-5 group-hover:opacity-10 transition-opacity`}
              />

              {/* Quote icon */}
              <Quote className="w-8 h-8 text-orange-200 mb-4" />

              {/* Quote text */}
              <p className="text-gray-700 text-base leading-relaxed mb-6 font-medium">
                &quot;{story.quote}&quot;
              </p>

              {/* Result badge */}
              <div className="inline-flex items-center gap-2 bg-orange-50 border border-orange-100 px-3 py-1.5 rounded-full mb-5">
                <span className="text-lg">🏆</span>
                <span className="text-sm font-bold text-orange-600">
                  {story.result}
                </span>
              </div>

              {/* Person row */}
              <div className="flex items-center gap-3 pt-5 border-t border-gray-50">
                <div
                  className={`w-11 h-11 rounded-xl bg-gradient-to-br ${story.color} flex items-center justify-center text-white text-sm font-bold flex-shrink-0`}
                >
                  {story.image}
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-sm">
                    {story.name}
                  </p>
                  <p className="text-xs text-gray-400">{story.college}</p>
                </div>
                <div className="ml-auto text-right">
                  <p className="text-[10px] text-gray-400">Mentored by</p>
                  <p className="text-xs font-semibold text-orange-500">
                    {story.mentor}
                  </p>
                </div>
              </div>

              {/* Stars */}
              <div className="absolute top-6 right-6 flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-3 h-3 text-orange-300 fill-orange-300"
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 bg-white rounded-2xl border border-orange-100 px-8 py-6 shadow-sm">
            <div className="text-left">
              <p className="font-bold text-gray-900">
                Your success story starts here.
              </p>
              <p className="text-sm text-gray-500">
                Join 50,000+ learners already getting mentored.
              </p>
            </div>
            <Link
              href="/mentors"
              className="btn-orange text-sm px-6 py-3 rounded-xl whitespace-nowrap"
            >
              Find My Mentor
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
