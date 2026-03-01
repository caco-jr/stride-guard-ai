import { useCallback, useRef } from "react";
import { Upload, Image as ImageIcon, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface UploadAreaProps {
  file: File | null;
  preview: string | null;
  onFileSelect: (file: File | null) => void;
}

export function UploadArea({ file, preview, onFileSelect }: UploadAreaProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile && droppedFile.type.startsWith("image/")) {
        onFileSelect(droppedFile);
      }
    },
    [onFileSelect]
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) onFileSelect(selected);
  };

  return (
    <div
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
      onClick={() => !file && inputRef.current?.click()}
      className={`relative flex min-h-[180px] cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed transition-all ${
        file
          ? "border-primary/40 bg-primary/5"
          : "border-muted-foreground/25 hover:border-primary/50 hover:bg-muted/50"
      }`}
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleChange}
        className="hidden"
      />

      {preview && file ? (
        <div className="relative w-full p-3">
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 top-2 z-10 h-7 w-7 rounded-full bg-background/80 backdrop-blur"
            onClick={(e) => {
              e.stopPropagation();
              onFileSelect(null);
            }}
          >
            <X className="h-3.5 w-3.5" />
          </Button>
          <img
            src={preview}
            alt="Uploaded diagram"
            className="mx-auto max-h-[160px] rounded-md object-contain"
          />
          <p className="mt-2 text-center text-xs text-muted-foreground font-mono truncate">
            {file.name}
          </p>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-3 p-6">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
            <Upload className="h-5 w-5 text-muted-foreground" />
          </div>
          <div className="text-center">
            <p className="text-sm font-medium">Drop architecture diagram here</p>
            <p className="text-xs text-muted-foreground mt-1">
              PNG, JPG, SVG up to 10MB
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
