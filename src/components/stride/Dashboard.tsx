import { AnalysisResult, countThreats } from "@/lib/mock-data";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AnalyticsCards } from "./AnalyticsCards";
import { DetailedAnalysis } from "./DetailedAnalysis";
import { MitigationPlan } from "./MitigationPlan";
import { EmptyState } from "./EmptyState";
import { Cloud, FileSearch, ListChecks } from "lucide-react";

interface DashboardProps {
  result: AnalysisResult | null;
}

export function Dashboard({ result }: DashboardProps) {
  if (!result) return <EmptyState />;

  const counts = countThreats(result.components);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Overview */}
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <h2 className="text-xl font-bold">{result.title}</h2>
          <Badge variant="outline" className="gap-1 font-mono text-xs">
            <Cloud className="h-3 w-3" />
            {result.cloud}
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {result.description}
        </p>
      </div>

      {/* Analytics */}
      <AnalyticsCards high={counts.high} medium={counts.medium} total={counts.total} />

      {/* Tabs */}
      <Tabs defaultValue="analysis" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="analysis" className="gap-2 text-sm">
            <FileSearch className="h-4 w-4" />
            Detailed Analysis
          </TabsTrigger>
          <TabsTrigger value="mitigation" className="gap-2 text-sm">
            <ListChecks className="h-4 w-4" />
            Mitigation Plan
          </TabsTrigger>
        </TabsList>
        <TabsContent value="analysis">
          <DetailedAnalysis components={result.components} />
        </TabsContent>
        <TabsContent value="mitigation">
          <MitigationPlan components={result.components} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
