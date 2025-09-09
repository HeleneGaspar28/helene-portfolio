"use client";

import { useCallback } from "react";

type Props = {
  multiple?: boolean;
  onUpload: (files: { url: string }[]) => void; // parent can map urls
};

// Minimal typing for the widget
declare global {
  interface Window {
    cloudinary?: {
      createUploadWidget: (
        options: {
          cloudName: string;
          uploadPreset: string;
          multiple?: boolean;
        },
        cb: (error: unknown, result: { event: string; info?: { secure_url?: string } }) => void
      ) => { open: () => void };
    };
  }
}

export default function CloudinaryUpload({ multiple = false, onUpload }: Props) {
  const open = useCallback(() => {
    // guard if script hasn't loaded yet
    if (!window.cloudinary) {
      console.error("Cloudinary widget script not loaded");
      return;
    }

    const widget = window.cloudinary.createUploadWidget(
      {
        cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!,   // public env
        uploadPreset: process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!, // public env
        multiple,
      },
      (err, result) => {
        if (err) return;
        // 'success' fires once per file; pass it up as a single-element array
        if (result.event === "success" && result.info?.secure_url) {
          onUpload([{ url: result.info.secure_url }]);
        }
      }
    );

    widget.open();
  }, [multiple, onUpload]);

  return (
    <button type="button" className="rounded border px-2 py-1 text-xs" onClick={open}>
      Upload
    </button>
  );
}
