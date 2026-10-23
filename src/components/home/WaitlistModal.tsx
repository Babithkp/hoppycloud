import { useEffect } from "react";
import { X } from "lucide-react";
import { useWaitlistModal } from "./WaitlistModalContext";
import WaitlistForm from "./WaitlistForm";

/** The one waitlist popup every "Join waitlist" button on the site opens, via WaitlistModalContext. */
export default function WaitlistModal() {
  const { open, closeModal } = useWaitlistModal();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && closeModal();
    document.addEventListener("keydown", onKey);
    // Stop the page scrolling behind the modal while it's open.
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, closeModal]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-labelledby="waitlist-modal-title">
      <button type="button" aria-label="Close" onClick={closeModal} className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      <div className="relative w-full max-w-md rounded-2xl border border-white/10 bg-[#05060a] p-8 shadow-[0_40px_120px_-30px_rgba(1,42,110,0.6)]">
        <button
          type="button"
          onClick={closeModal}
          aria-label="Close"
          className="absolute right-4 top-4 flex size-8 items-center justify-center rounded-full text-white/50 hover:bg-white/10 hover:text-white"
        >
          <X className="size-4" aria-hidden />
        </button>
        <h2 id="waitlist-modal-title" className="text-2xl font-semibold tracking-tight">
          Join the waitlist
        </h2>
        <p className="mt-2 text-sm text-white/55">We'll email you the moment Hoppycloud opens up.</p>
        <div className="mt-6">
          <WaitlistForm compact />
        </div>
      </div>
    </div>
  );
}
