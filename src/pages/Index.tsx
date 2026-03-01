import { useState, useCallback } from "react";
import { Loader2, ScanSearch } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AppHeader } from "@/components/stride/AppHeader";
import { ConfigCard } from "@/components/stride/ConfigCard";
import { UploadArea } from "@/components/stride/UploadArea";
import { Dashboard } from "@/components/stride/Dashboard";
import { AnalysisResult } from "@/lib/mock-data";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [apiToken, setApiToken] = useState("");
  const [aiTool, setAiTool] = useState("GEMINI");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const { toast } = useToast();

  const handleFileSelect = useCallback((f: File | null) => {
    setFile(f);
    if (f) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(f);
    } else {
      setPreview(null);
    }
  }, []);

  const handleAnalyze = async () => {
    if (!file) {
      toast({
        variant: "destructive",
        title: "No diagram uploaded",
        description: "Please upload an architecture diagram before analyzing.",
      });
      return;
    }

    const apiBase = import.meta.env.VITE_API_URL;
    if (!apiBase) {
      toast({
        variant: "destructive",
        title: "API URL not configured",
        description: "Please set the VITE_API_URL environment variable.",
      });
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("image", file);

      const url = `${apiBase}/analyze?validation_tool=${encodeURIComponent(aiTool)}`;
      const res = await fetch(url, {
        method: "POST",
        headers: {
          ...(apiToken ? { Authorization: `Bearer ${apiToken}` } : {}),
        },
        body: formData,
      });

      if (!res.ok) {
        throw new Error(`Server responded with ${res.status}`);
      }

      const data: AnalysisResult = await res.json();
      setResult(data);
    } catch (err: any) {
      toast({
        variant: "destructive",
        title: "Analysis Failed",
        description:
          err?.message || "Unable to connect to the server. Please check your API token or network and try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-background grid-cyber">
      <AppHeader />
      <main className="flex flex-1 flex-col gap-6 p-4 md:p-6 lg:flex-row">
        {/* Left Column */}
        <div className="w-full space-y-4 lg:w-1/3 lg:max-w-md">
          <ConfigCard
            apiToken={apiToken}
            setApiToken={setApiToken}
            aiTool={aiTool}
            setAiTool={setAiTool}
          />
          <UploadArea
            file={file}
            preview={preview}
            onFileSelect={handleFileSelect}
          />
          <Button
            className="w-full gap-2 neon-glow"
            size="lg"
            onClick={handleAnalyze}
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Analyzing architecture...
              </>
            ) : (
              <>
                <ScanSearch className="h-4 w-4" />
                Analyze Diagram
              </>
            )}
          </Button>
        </div>

        {/* Right Column */}
        <div className="flex-1">
          <Dashboard result={result} />
        </div>
      </main>
    </div>
  );
};

export default Index;
