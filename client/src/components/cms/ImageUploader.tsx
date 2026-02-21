import { useRef, useState, useCallback } from "react";
import { Upload, Link, X, Image as ImageIcon, Loader2 } from "lucide-react";

interface ImageUploaderProps {
  value?: string;
  onChange: (url: string) => void;
  label?: string;
  className?: string;
  aspectRatio?: "square" | "wide" | "portrait" | "free";
}

export default function ImageUploader({
  value,
  onChange,
  label = "Image",
  className = "",
  aspectRatio = "wide",
}: ImageUploaderProps) {
  const [mode, setMode] = useState<"idle" | "url">("idle");
  const [urlInput, setUrlInput] = useState("");
  const [dragging, setDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const aspectClass = {
    square: "aspect-square",
    wide: "aspect-video",
    portrait: "aspect-[3/4]",
    free: "min-h-[120px]",
  }[aspectRatio];

  async function uploadFile(file: File) {
    setUploading(true);
    setError(null);
    try {
      const form = new FormData();
      form.append("file", file);
      const res = await fetch("/api/upload/image", { method: "POST", body: form });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? "Upload failed");
      }
      const data = await res.json();
      onChange(data.url);
    } catch (e: any) {
      setError(e.message ?? "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  function handleFiles(files: FileList | null) {
    if (!files || files.length === 0) return;
    uploadFile(files[0]);
  }

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    handleFiles(e.dataTransfer.files);
  }, []);

  function applyUrl() {
    const trimmed = urlInput.trim();
    if (!trimmed) return;
    onChange(trimmed);
    setMode("idle");
    setUrlInput("");
  }

  return (
    <div className={`space-y-2 ${className}`}>
      {label && (
        <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide">
          {label}
        </label>
      )}

      {/* Preview */}
      {value && (
        <div className={`relative rounded-lg overflow-hidden bg-gray-100 ${aspectClass}`}>
          <img
            src={value}
            alt="Preview"
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Crect width='100' height='100' fill='%23e5e7eb'/%3E%3Ctext x='50' y='55' text-anchor='middle' fill='%239ca3af' font-size='12'%3ENo image%3C/text%3E%3C/svg%3E";
            }}
          />
          <button
            type="button"
            onClick={() => onChange("")}
            className="absolute top-2 right-2 bg-black/60 hover:bg-black/80 text-white rounded-full p-1 transition-colors"
            title="Remove image"
          >
            <X size={14} />
          </button>
        </div>
      )}

      {/* Drop zone */}
      {!value && (
        <div
          onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
          className={`relative rounded-lg border-2 border-dashed cursor-pointer transition-all flex flex-col items-center justify-center gap-2 py-8 px-4 text-center
            ${dragging ? "border-[#C8102E] bg-red-50" : "border-gray-200 hover:border-[#C8102E] hover:bg-gray-50"}
            ${aspectClass}`}
        >
          {uploading ? (
            <Loader2 size={28} className="text-[#C8102E] animate-spin" />
          ) : (
            <ImageIcon size={28} className="text-gray-300" />
          )}
          <p className="text-sm text-gray-500">
            {uploading ? "Uploading…" : "Drag & drop or click to upload"}
          </p>
          <p className="text-xs text-gray-400">JPG, PNG, WebP up to 10MB</p>
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => handleFiles(e.target.files)}
          />
        </div>
      )}

      {/* URL input mode */}
      {mode === "url" && (
        <div className="flex gap-2">
          <input
            type="url"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && applyUrl()}
            placeholder="https://example.com/image.jpg"
            className="flex-1 text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#C8102E]/30"
            autoFocus
          />
          <button
            type="button"
            onClick={applyUrl}
            className="px-3 py-2 bg-[#C8102E] text-white text-sm rounded-lg hover:bg-[#a00d24] transition-colors"
          >
            Use
          </button>
          <button
            type="button"
            onClick={() => setMode("idle")}
            className="px-3 py-2 bg-gray-100 text-gray-600 text-sm rounded-lg hover:bg-gray-200 transition-colors"
          >
            Cancel
          </button>
        </div>
      )}

      {/* Action buttons */}
      <div className="flex gap-2 flex-wrap">
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="flex items-center gap-1.5 text-xs px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
        >
          <Upload size={12} />
          {value ? "Replace" : "Upload"}
        </button>
        <button
          type="button"
          onClick={() => setMode(mode === "url" ? "idle" : "url")}
          className="flex items-center gap-1.5 text-xs px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
        >
          <Link size={12} />
          Paste URL
        </button>
        {value && (
          <button
            type="button"
            onClick={() => onChange("")}
            className="flex items-center gap-1.5 text-xs px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg transition-colors"
          >
            <X size={12} />
            Remove
          </button>
        )}
      </div>

      {error && (
        <p className="text-xs text-red-500">{error}</p>
      )}

      {/* Hidden file input (always present for programmatic click) */}
      {value && (
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />
      )}
    </div>
  );
}
