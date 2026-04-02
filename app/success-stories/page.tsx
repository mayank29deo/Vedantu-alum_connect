import { Quote, Star, Trophy } from "lucide-react";
import { SUCCESS_STORIES } from "@/lib/data";
import Footer from "@/components/Footer";
import Link from "next/link";

const ALL_STORIES = [
  ...SUCCESS_STORIES,
  {
    id: 5,
    name: "Tanvi Sharma",
    result: "CLAT AIR 18",
    mentor: "Ananya Singh",
    quote:
      "Ananya ma'am helped me understand what NLUs actually look for. Her GK strategy was spot on.",
    field: "Law",
    college: "NLSIU Bangalore",
    image: "TS",
    color: "from-amber-400 to-orange-500",
  },
  {
    id: 6,
    name: "Karan Mehta",
    result: "CA Final — First Attempt",
    mentor: "Kavita Rao",
    quote:
      "Kavita's timetable was brutal but it worked. She knew exactly which chapters to prioritize.",
    field: "Commerce",
    college: "ICAI",
    image: "KM",
    color: "from-teal-400 to-emerald-600",
  },
  {
    id: 7,
    name: "Shreya Gupta",
    result: "NIFT Delhi — Design",
    mentor: "Dev Patel",
    quote:
      "Dev bhai connected me with a Vedantu alumna who cleared NID. That referral changed everything.",
    field: "Design",
    college: "NIFT Delhi",
    image: "SG",
    color: "from-pink-400 to-pink-600",
  },
  {
    id: 8,
    name: "Vivek Nair",
    result: "IIT Madras — CSE",
    mentor: "Arjun Sharma",
    quote:
      "Arjun's mock interview sessions for JEE counselling were insanely helpful. Chose the right branch!",
    field: "Engineering",
    college: "IIT Madras",
    image: "VN",
    color: "from-blue-400 to-cyan-500",
  },
];

export default function SuccessStoriesPage() {
  return (
    <>
      <div className="min-h-screen bg-[#FFFAF7] pt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header */}
          <div className="text-center mb-14">
            <div className="section-badge inline-flex mb-3">
              <Trophy className="w-3 h-3" /> Real Results
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-dark-800 mb-4">
              Stories that{" "}
              <span className="gradient-text">inspire futures</span>
            </h1>
            <p className="text-lg text-gray-500 max-w-xl mx-auto">
              Every story here started with one question — &quot;Can I really do
              this?&quot; And ended with a resounding yes.
            </p>
          </div>

          {/* Highlight stat bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-14">
            {[
              { val: "50,000+", label: "Learners Mentored" },
              { val: "2.4L+", label: "Sessions Completed" },
              { val: "94%", label: "Improved Rank" },
              { val: "4.9★", label: "Average Rating" },
            ].map((s, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl border border-orange-100 p-5 text-center shadow-sm"
              >
                <p className="text-3xl font-extrabold gradient-text">{s.val}</p>
                <p className="text-sm text-gray-500 mt-1">{s.label}</p>
              </div>
            ))}
          </div>

          {/* Story grid */}
          <div className="grid sm:grid-cols-2 gap-6">
            {ALL_STORIES.map((story) => (
              <div
                key={story.id}
                className="bg-white rounded-2xl border border-gray-100 p-7 card-hover shadow-sm relative overflow-hidden group"
              >
                <div
                  className={`absolute top-0 right-0 w-32 h-32 rounded-bl-[80px] bg-gradient-to-br ${story.color} opacity-5 group-hover:opacity-10 transition-opacity`}
                />

                <Quote className="w-8 h-8 text-orange-200 mb-4" />
                <p className="text-gray-700 text-base leading-relaxed mb-6 font-medium">
                  &quot;{story.quote}&quot;
                </p>

                <div className="inline-flex items-center gap-2 bg-orange-50 border border-orange-100 px-3 py-1.5 rounded-full mb-5">
                  <span className="text-lg">🏆</span>
                  <span className="text-sm font-bold text-orange-600">
                    {story.result}
                  </span>
                </div>

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

          {/* CTA */}
          <div className="mt-16 text-center">
            <p className="text-xl font-bold text-gray-900 mb-2">
              Ready to write your own story?
            </p>
            <p className="text-gray-500 mb-6">
              Your mentor is already on AlumConnect. Your first call is free.
            </p>
            <Link
              href="/mentors"
              className="btn-orange px-8 py-4 rounded-xl text-base shadow-lg shadow-orange-200"
            >
              Find My Mentor →
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
