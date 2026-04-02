"use client";

import { STATS } from "@/lib/data";

export default function StatsBar() {
  return (
    <section className="py-10 bg-gradient-to-r from-orange-500 to-orange-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
          {STATS.map((stat, i) => (
            <div key={i} className="flex flex-col items-center">
              <span className="text-3xl md:text-4xl font-extrabold tracking-tight">
                {stat.value}
              </span>
              <span className="text-sm font-medium text-orange-100 mt-1">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
