import { Shield } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";

export function AppHeader() {
  return (
    <header className="flex items-center justify-between border-b px-6 py-4">
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary neon-glow">
          <Shield className="h-5 w-5 text-primary-foreground" />
        </div>
        <div>
          <h1 className="text-lg font-bold tracking-tight">STRIDE Analyzer</h1>
          <p className="text-xs text-muted-foreground font-mono">Threat Intelligence Platform</p>
        </div>
      </div>
      <ThemeToggle />
    </header>
  );
}
