import Link from "next/link";
import { Sparkles, Globe, MessageCircle, Share2, PlayCircle } from "lucide-react";

const LINKS = {
  Platform: [
    { label: "Find Mentors", href: "/mentors" },
    { label: "Live Sessions", href: "/sessions" },
    { label: "Success Stories", href: "/success-stories" },
    { label: "Career Tracks", href: "/#tracks" },
    { label: "Dashboard", href: "/dashboard" },
  ],
  Alumni: [
    { label: "Become a Mentor", href: "/mentors" },
    { label: "Host a Webinar", href: "/sessions" },
    { label: "Alumni Benefits", href: "#" },
    { label: "Verify Profile", href: "#" },
  ],
  Company: [
    { label: "About Vedantu", href: "#" },
    { label: "Careers", href: "#" },
    { label: "Press", href: "#" },
    { label: "Contact", href: "#" },
  ],
};

const SOCIALS = [
  { Icon: Globe, href: "#" },
  { Icon: MessageCircle, href: "#" },
  { Icon: Share2, href: "#" },
  { Icon: PlayCircle, href: "#" },
];

export default function Footer() {
  return (
    <footer className="bg-dark-800 text-gray-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10 mb-12">
          {/* Brand */}
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4 group">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-orange-400 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-[10px] font-semibold text-orange-400 uppercase tracking-widest">
                  Vedantu
                </span>
                <span className="text-[17px] font-extrabold text-white tracking-tight">
                  AlumConnect
                </span>
              </div>
            </Link>
            <p className="text-sm text-gray-500 leading-relaxed max-w-xs mb-6">
              Bridging Vedantu&apos;s past learners with the next generation.
              Real mentors, real journeys, real results.
            </p>
            <div className="flex gap-3">
              {SOCIALS.map(({ Icon, href }, i) => (
                <Link
                  key={i}
                  href={href}
                  className="w-9 h-9 rounded-xl bg-white/5 hover:bg-orange-500 flex items-center justify-center text-gray-400 hover:text-white transition-all"
                >
                  <Icon className="w-4 h-4" />
                </Link>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(LINKS).map(([section, links]) => (
            <div key={section}>
              <h4 className="text-white text-sm font-semibold mb-4">
                {section}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-500 hover:text-orange-400 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-600">
            © 2026 Vedantu Innovations Pvt. Ltd. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs text-gray-600">
            <Link href="#" className="hover:text-orange-400 transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-orange-400 transition-colors">
              Terms of Service
            </Link>
            <Link href="#" className="hover:text-orange-400 transition-colors">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
