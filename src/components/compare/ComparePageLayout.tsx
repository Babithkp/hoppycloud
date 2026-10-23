import LandingNavbar from "../home/LandingNavbar";
import Footer from "../home/Footer";

export default function ComparePageLayout({ title, lead, children }: { title: string; lead: string; children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-black text-white">
      <LandingNavbar />
      <main className="px-6 pb-24 pt-36 md:px-10">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-4xl font-semibold leading-[1.1] tracking-tight sm:text-5xl">{title}</h1>
          <p className="mt-5 text-lg leading-relaxed text-white/60">{lead}</p>
        </div>
        <div className="mx-auto mt-14 flex max-w-3xl flex-col gap-14">{children}</div>
      </main>
      <Footer />
    </div>
  );
}
