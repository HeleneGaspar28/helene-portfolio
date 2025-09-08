"use client";

type Props = {
  multiple?: boolean;
  onUpload: (files: { url: string; public_id: string }[]) => void;
};

export default function CloudinaryUpload({ multiple = false, onUpload }: Props) {
  const open = () => {
    const widget = (window as any).cloudinary.createUploadWidget(
      {
        cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
        uploadPreset: process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET,
        multiple,
        sources: ["local", "url", "camera"],
        folder: "projects",
      },
      (error: any, result: any) => {
        if (!error && result && result.event === "success") {
          onUpload([{ url: result.info.secure_url, public_id: result.info.public_id }]);
        }
      }
    );
    widget.open();
  };

  return (
    <button type="button" onClick={open} className="rounded-xl border px-3 py-2">
      Upload with Cloudinary
    </button>
  );
}
