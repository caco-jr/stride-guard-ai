import { useState } from "react";
import { ComponentData } from "@/lib/mock-data";
import { Checkbox } from "@/components/ui/checkbox";
import { CheckCircle2 } from "lucide-react";

interface MitigationPlanProps {
  components: ComponentData[];
}

export function MitigationPlan({ components }: MitigationPlanProps) {
  const [checked, setChecked] = useState<Record<number, boolean>>({});

  const toggle = (i: number) =>
    setChecked((prev) => ({ ...prev, [i]: !prev[i] }));

  return (
    <div className="space-y-2">
      {components.map((comp, i) => (
        <div
          key={i}
          className={`flex items-start gap-3 rounded-lg border p-4 transition-all ${
            checked[i] ? "bg-success/5 border-success/20" : "bg-card"
          }`}
        >
          <Checkbox
            id={`mitigation-${i}`}
            checked={!!checked[i]}
            onCheckedChange={() => toggle(i)}
            className="mt-0.5"
          />
          <label
            htmlFor={`mitigation-${i}`}
            className={`cursor-pointer text-sm leading-relaxed transition-all ${
              checked[i] ? "strikethrough" : ""
            }`}
          >
            <span className="font-semibold">{comp.name}:</span>{" "}
            <span className="text-muted-foreground">
              {comp.threat.possible_mitigation}
            </span>
          </label>
          {checked[i] && (
            <CheckCircle2 className="ml-auto h-4 w-4 shrink-0 text-success" />
          )}
        </div>
      ))}
    </div>
  );
}
