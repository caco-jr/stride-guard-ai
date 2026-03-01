import { Radar } from "lucide-react";

export function EmptyState() {
  return (
    <div className="flex h-full min-h-[500px] flex-col items-center justify-center gap-4 rounded-lg border border-dashed p-8">
      <div className="relative">
        <div className="absolute inset-0 animate-ping rounded-full bg-primary/10" />
        <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-muted">
          <Radar className="h-10 w-10 text-primary animate-pulse-neon" />
        </div>
      </div>
      <div className="text-center">
        <h3 className="text-lg font-semibold">Awaiting Analysis</h3>
        <p className="mt-1 max-w-sm text-sm text-muted-foreground">
          Upload an architecture diagram and click "Analyze" to begin threat detection
        </p>
      </div>
    </div>
  );
}
