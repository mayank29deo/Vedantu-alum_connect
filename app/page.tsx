import Hero from "@/components/Hero";
import StatsBar from "@/components/StatsBar";
import HowItWorks from "@/components/HowItWorks";
import FeaturedMentors from "@/components/FeaturedMentors";
import CareerTracks from "@/components/CareerTracks";
import SuccessStories from "@/components/SuccessStories";
import UpcomingSessions from "@/components/UpcomingSessions";
import WhyAlumConnect from "@/components/WhyAlumConnect";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Hero />
      <StatsBar />
      <HowItWorks />
      <FeaturedMentors />
      <CareerTracks />
      <SuccessStories />
      <UpcomingSessions />
      <WhyAlumConnect />
      <CTASection />
      <Footer />
    </>
  );
}
