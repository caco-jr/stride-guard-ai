import { ComponentData } from "@/lib/mock-data";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ShieldAlert } from "lucide-react";

interface DetailedAnalysisProps {
  components: ComponentData[];
}

function threatBadgeVariant(level: string) {
  if (level === "High") return "destructive" as const;
  return "secondary" as const;
}

export function DetailedAnalysis({ components }: DetailedAnalysisProps) {
  return (
    <Accordion type="multiple" className="space-y-2">
      {components.map((comp, i) => (
        <AccordionItem
          key={i}
          value={`item-${i}`}
          className="rounded-lg border bg-card px-4 data-[state=open]:neon-border"
        >
          <AccordionTrigger className="py-3 hover:no-underline">
            <div className="flex items-center gap-3 text-left">
              <ShieldAlert className={`h-4 w-4 shrink-0 ${comp.threat.threat_level === "High" ? "text-threat-high" : "text-threat-medium"}`} />
              <span className="text-sm font-semibold">{comp.name}</span>
              <Badge variant={threatBadgeVariant(comp.threat.threat_level)} className={`text-xs ${comp.threat.threat_level === "Medium" ? "bg-threat-medium/15 text-threat-medium border-threat-medium/30" : ""}`}>
                {comp.threat.threat_level}
              </Badge>
            </div>
          </AccordionTrigger>
          <AccordionContent className="pb-4 pt-1">
            <div className="space-y-3">
              <p className="text-sm text-muted-foreground">{comp.description}</p>
              <div className="rounded-md bg-muted/50 p-3 space-y-2">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs font-mono">
                    {comp.threat.threat_type}
                  </Badge>
                </div>
                <p className="text-sm">{comp.threat.description}</p>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
