import React, { useEffect, useMemo, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const IMAGE_MAP: Record<string, string[]> = {
  joshua: [
    "https://images.unsplash.com/photo-1592878849128-9fdc2e7984ba?w=1400&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1519092437326-bfd121eb53ae?w=1400&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1520975922284-8b456906c813?w=1400&auto=format&fit=crop",
  ],
  ian: [
    "https://images.unsplash.com/photo-1520975916090-3105956dac38?w=1400&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=1400&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=1400&auto=format&fit=crop",
  ],
  duane: [
    "https://images.unsplash.com/photo-1501706362039-c06b2d715385?w=1400&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?w=1400&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1400&auto=format&fit=crop",
  ],
};

const DEFAULT_IMAGES = IMAGE_MAP.duane;
const SPRING = { type: "spring", stiffness: 520, damping: 42, mass: 0.6 };

export default function GalleryPage() {
  const { name = "" } = useParams();
  const navigate = useNavigate();
  const key = name.toLowerCase().trim();
  const IMAGES = IMAGE_MAP[key] ?? DEFAULT_IMAGES;

  const [viewportW, setViewportW] = useState<number>(
    typeof window !== "undefined" ? window.innerWidth : 0
  );
  const viewportRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = viewportRef.current;
    const read = () => setViewportW(el ? el.clientWidth : window.innerWidth);
    read();
    const ro = new ResizeObserver(read);
    if (el) ro.observe(el);
    window.addEventListener("resize", read);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", read);
    };
  }, []);

  const isMobile = viewportW > 0 && viewportW <= 600;

  // Fullscreen image (mobile only)
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  useEffect(() => {
    if (expandedIndex !== null) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [expandedIndex]);

  // =========================
  // MOBILE LAYOUT
  // =========================
  if (isMobile) {
    return (
      <main className="wrap" ref={viewportRef}>
        {/* Instruction text */}
        <div className="instruction-text">Click images to view</div>

        <div className="mobile-row">
          {IMAGES.map((src, i) => (
            <button
              key={i}
              className="mobile-cell"
              style={{ backgroundImage: `url(${src})` }}
              onClick={() => setExpandedIndex(i)}
            />
          ))}
        </div>

        {/* Fullscreen Modal */}
        <AnimatePresence>
          {expandedIndex !== null && (
            <motion.div
              className="mobile-fullscreen"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setExpandedIndex(null)}
            >
              <motion.img
                className="mobile-fullscreen-img"
                src={IMAGES[expandedIndex]}
                alt="Full image"
                initial={{ scale: 0.98, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.98, opacity: 0 }}
                transition={{ type: "spring", stiffness: 280, damping: 28 }}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Glassy bottom button */}
        <button
          className="invite-button"
          onClick={() => navigate(`/invite/${key}`)}
        >
          <img src="/suit-icon.png" alt="Suit icon" className="suit-icon" />
          Suit up
        </button>
      </main>
    );
  }

  // =========================
  // DESKTOP LAYOUT (click to expand)
  // =========================
  const n = IMAGES.length;
  const gap = 16;
  const totalGaps = gap * (n - 1);

  const [activeDesktop, setActiveDesktop] = useState<number | null>(null);

  // compute widths based on active image
  const expandedW = Math.max(220, Math.floor(viewportW * 0.52));
  const collapsedW = Math.max(
    120,
    Math.floor((viewportW - expandedW - totalGaps) / Math.max(1, n - 1))
  );

  const widths = activeDesktop === null
    ? Array(n).fill(Math.floor((viewportW - totalGaps) / n))
    : Array.from({ length: n }, (_, i) => (i === activeDesktop ? expandedW : collapsedW));

  return (
    <main className="wrap" ref={viewportRef}>
      <div className="strip">
        {IMAGES.map((src, i) => (
          <motion.button
            key={i}
            className="panel"
            style={{ backgroundImage: `url(${src})` }}
            animate={{ width: widths[i] as number }}
            transition={SPRING}
            onClick={() =>
              setActiveDesktop((prev) => (prev === i ? null : i))
            }
            whileTap={{ scale: 0.995 }}
            aria-label={`${key || "guest"} photo ${i + 1}`}
          />
        ))}
      </div>

      {/* Glassy button on desktop too */}
      <button
        className="invite-button invite-button--desktop"
        onClick={() => navigate(`/invite/${key}`)}
      >
        <img src="/suit-icon.png" alt="Suit icon" className="suit-icon" />
        Suit up
      </button>
    </main>
  );
}