"use client";

import { useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import {
  RiCloseLine,
  RiArrowLeftSLine,
  RiArrowRightSLine,
} from "react-icons/ri";
import type { StrapiMedia } from "../lib/types";
import { resolveStrapiMediaUrl } from "@/lib/tools";

interface LightboxProps {
  items: StrapiMedia[];
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  onJump: (index: number) => void;
}

export default function Lightbox({
  items,
  index,
  onClose,
  onPrev,
  onNext,
  onJump,
}: LightboxProps) {
  const item = items[index];

  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    },
    [onClose, onPrev, onNext],
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [handleKey]);

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
      onClick={onClose}
    >
      {/* Close */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white/70 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors"
        aria-label="Close"
      >
        <RiCloseLine className="w-7 h-7" />
      </button>

      {/* Counter */}
      <span className="absolute top-5 left-1/2 -translate-x-1/2 text-sm text-white/60 tabular-nums">
        {index + 1} / {items.length}
      </span>

      {/* Prev */}
      {items.length > 1 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onPrev();
          }}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-white/70 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors"
          aria-label="Previous"
        >
          <RiArrowLeftSLine className="w-8 h-8" />
        </button>
      )}

      {/* Image */}
      <div
        className="max-w-[90vw] max-h-[75vh] flex items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        {item.mime.startsWith("video/") ? (
          <video
            src={item.url}
            controls
            autoPlay
            className="max-w-full max-h-[75vh] rounded-lg"
            aria-label={item.alternativeText ?? `Video ${index + 1}`}
          />
        ) : (
          <img
            src={item.url}
            alt={item.alternativeText ?? `Photo ${index + 1}`}
            className="max-w-full max-h-[75vh] rounded-lg object-contain shadow-2xl"
          />
        )}
      </div>

      {/* Next */}
      {items.length > 1 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onNext();
          }}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-white/70 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors"
          aria-label="Next"
        >
          <RiArrowRightSLine className="w-8 h-8" />
        </button>
      )}

      {/* Thumbnail strip */}
      {items.length > 1 && (
        <div
          className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 px-3 py-2 rounded-xl bg-black/40 backdrop-blur-sm max-w-[90vw] overflow-x-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {items.map((t, i) => (
            <button
              key={i}
              onClick={() => onJump(i)}
              className={`relative h-12 w-16 shrink-0 overflow-hidden rounded-md transition-all ${
                i === index
                  ? "ring-2 ring-white opacity-100"
                  : "opacity-50 hover:opacity-80"
              }`}
              aria-label={`Go to photo ${i + 1}`}
              aria-current={i === index}
            >
              {t.mime.startsWith("video/") ? (
                <video src={resolveStrapiMediaUrl(t.url)} className="h-full w-full object-cover" preload="metadata" />
              ) : (
                <img
                  src={resolveStrapiMediaUrl(t.url)}
                  alt={t.alternativeText ?? `Thumbnail ${i + 1}`}
                  className="h-full w-full object-cover"
                />
              )}
            </button>
          ))}
        </div>
      )}
    </div>,
    document.body,
  );
}
