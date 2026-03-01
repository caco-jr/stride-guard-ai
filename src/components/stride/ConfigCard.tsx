import { useState } from "react";
import { Eye, EyeOff, Settings2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

interface ConfigCardProps {
  apiToken: string;
  setApiToken: (v: string) => void;
  aiTool: string;
  setAiTool: (v: string) => void;
}

export function ConfigCard({ apiToken, setApiToken, aiTool, setAiTool }: ConfigCardProps) {
  const [showToken, setShowToken] = useState(false);

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-sm font-semibold">
          <Settings2 className="h-4 w-4 text-primary" />
          Configuration
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="api-token" className="text-xs text-muted-foreground">
            API Auth Token
          </Label>
          <div className="relative">
            <Input
              id="api-token"
              type={showToken ? "text" : "password"}
              placeholder="sk-••••••••••••••••"
              value={apiToken}
              onChange={(e) => setApiToken(e.target.value)}
              className="pr-10 font-mono text-sm"
            />
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
              onClick={() => setShowToken(!showToken)}
            >
              {showToken ? <EyeOff className="h-4 w-4 text-muted-foreground" /> : <Eye className="h-4 w-4 text-muted-foreground" />}
            </Button>
          </div>
        </div>
        <div className="space-y-2">
          <Label className="text-xs text-muted-foreground">AI Validation Tool</Label>
          <Select value={aiTool} onValueChange={setAiTool}>
            <SelectTrigger className="text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="GEMINI">GEMINI</SelectItem>
              <SelectItem value="OPENAI">OPENAI</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
}
