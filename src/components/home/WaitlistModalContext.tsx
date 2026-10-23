import { createContext, useCallback, useContext, useMemo, useState } from "react";

interface WaitlistModalContextValue {
  open: boolean;
  openModal: () => void;
  closeModal: () => void;
}

const WaitlistModalContext = createContext<WaitlistModalContextValue | null>(null);

export function WaitlistModalProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const openModal = useCallback(() => setOpen(true), []);
  const closeModal = useCallback(() => setOpen(false), []);
  const value = useMemo(() => ({ open, openModal, closeModal }), [open, openModal, closeModal]);
  return <WaitlistModalContext.Provider value={value}>{children}</WaitlistModalContext.Provider>;
}

/** Lets any button on the site ("Join waitlist" in the nav, hero, footer, FAQ, compare pages…) open the same modal. */
export function useWaitlistModal() {
  const ctx = useContext(WaitlistModalContext);
  if (!ctx) throw new Error("useWaitlistModal must be used within WaitlistModalProvider");
  return ctx;
}
