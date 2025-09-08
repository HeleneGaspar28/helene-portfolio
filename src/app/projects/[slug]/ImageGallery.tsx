"use client";

import Image from "next/image";
import { useState, useMemo, useEffect } from "react";

type Img = { id?: string; url: string; alt?: string | null };
export default function ImageGallery({
  coverUrl,
  images = [],
  title,
}: {
  coverUrl?: string | null;
  images?: Img[];
  title: string;
}) {
  // merge: cover first, then others without duplicating the cover
  const all = useMemo<Img[]>(() => {
    const rest = (images || []).filter((i) => i.url !== coverUrl);
    return [
      ...(coverUrl ? [{ url: coverUrl, alt: `${title} cover` }] : []),
      ...rest,
    ];
  }, [coverUrl, images, title]);

  const [active, setActive] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  // close lightbox on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setLightboxOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  if (all.length === 0) {
    return (
      <div className="bg-light w-100 ratio ratio-16x9 rounded d-flex align-items-center justify-content-center">
        <span className="text-muted small">No image</span>
      </div>
    );
  }

  return (
    <>
      {/* Big image */}
      <div
        className="position-relative ratio ratio-16x9 rounded overflow-hidden mb-3"
        role="button"
        aria-label="Open image"
        onClick={() => setLightboxOpen(true)}
      >
        <Image
          src={all[active].url}
          alt={all[active].alt || title}
          fill
          className="object-fit-cover"
          sizes="100vw"
          priority
        />
      </div>

      {/* Thumbnails */}
      {all.length > 1 && (
        <div className="d-flex flex-wrap gap-2">
          {all.map((img, i) => (
            <button
              key={img.id ?? img.url}
              type="button"
              onClick={() => setActive(i)}
              className={`position-relative border-0 p-0 rounded overflow-hidden ${
                i === active ? "ring" : ""
              }`}
              style={{
                width: 120,
                height: 72,
                outline: i === active ? "2px solid var(--bs-primary)" : "none",
              }}
              aria-label={`Show image ${i + 1}`}
            >
              <Image
                src={img.url}
                alt={img.alt || `${title} ${i + 1}`}
                fill
                className="object-fit-cover"
                sizes="120px"
              />
            </button>
          ))}
        </div>
      )}

      {/* Lightbox */}
      {lightboxOpen && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
          style={{ background: "rgba(0,0,0,0.8)", zIndex: 1050 }}
          onClick={() => setLightboxOpen(false)}
        >
          <div
            className="position-relative"
            style={{ width: "min(1200px, 95vw)", height: "min(80vh, 95vh)" }}
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={all[active].url}
              alt={all[active].alt || title}
              fill
              className="object-fit-contain"
              sizes="100vw"
            />
            <button
              type="button"
              className="btn btn-light position-absolute top-0 end-0 m-3"
              onClick={() => setLightboxOpen(false)}
              aria-label="Close"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
