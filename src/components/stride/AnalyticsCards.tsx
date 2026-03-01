import { AlertTriangle, AlertCircle, Layers } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface AnalyticsCardsProps {
  high: number;
  medium: number;
  total: number;
}

export function AnalyticsCards({ high, medium, total }: AnalyticsCardsProps) {
  const cards = [
    {
      label: "High Risk Threats",
      value: high,
      icon: AlertTriangle,
      className: "text-threat-high",
      bgClass: "bg-threat-high/10",
    },
    {
      label: "Medium Risk Threats",
      value: medium,
      icon: AlertCircle,
      className: "text-threat-medium",
      bgClass: "bg-threat-medium/10",
    },
    {
      label: "Components Analyzed",
      value: total,
      icon: Layers,
      className: "text-primary",
      bgClass: "bg-primary/10",
    },
  ];

  return (
    <div className="grid gap-3 sm:grid-cols-3">
      {cards.map((card) => (
        <Card key={card.label} className="overflow-hidden">
          <CardContent className="flex items-center gap-4 p-4">
            <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${card.bgClass}`}>
              <card.icon className={`h-5 w-5 ${card.className}`} />
            </div>
            <div>
              <p className={`text-2xl font-bold font-mono ${card.className}`}>
                {card.value}
              </p>
              <p className="text-xs text-muted-foreground">{card.label}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
