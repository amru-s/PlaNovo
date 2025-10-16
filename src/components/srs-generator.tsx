"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, FileText, Sparkles } from "lucide-react";
import ReactMarkdown from "react-markdown";

interface SrsResponse {
  srs_document: string;
  feature_idea: string;
  status: string;
}

export function SrsGenerator() {
  const [featureIdea, setFeatureIdea] = useState("");
  const [srsDocument, setSrsDocument] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const generateSrs = async () => {
    if (!featureIdea.trim()) {
      setError("Please enter a feature idea");
      return;
    }

    setIsLoading(true);
    setError("");
    setSrsDocument("");

    try {
      const response = await fetch("http://localhost:8000/api/srs/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          featureIdea: featureIdea.trim(),
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: SrsResponse = await response.json();
      setSrsDocument(data.srs_document);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to generate SRS");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
      generateSrs();
    }
  };

  return (
    <div className="space-y-6">
      {/* Input Section */}
      <Card className="border-planovo-light/50 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-planovo-dark font-syne">
            <Sparkles className="h-5 w-5 text-planovo-accent" />
            Feature Idea Input
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            placeholder="Describe your feature idea here... 

Examples:
• User authentication system with login and signup
• Task management system for teams
• Real-time chat application
• E-commerce shopping cart with payment integration"
            value={featureIdea}
            onChange={(e) => setFeatureIdea(e.target.value)}
            onKeyDown={handleKeyPress}
            className="min-h-[120px] resize-none border-planovo-light/50 focus:border-planovo-primary"
            disabled={isLoading}
          />
          
          {error && (
            <div className="text-red-600 text-sm bg-red-50 p-3 rounded-md">
              {error}
            </div>
          )}

          <div className="flex justify-between items-center">
            <p className="text-sm text-planovo-secondary">
              Press Ctrl+Enter to generate or click the button
            </p>
            <Button
              onClick={generateSrs}
              disabled={isLoading || !featureIdea.trim()}
              className="bg-planovo-primary hover:bg-planovo-accent text-planovo-dark font-semibold"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating SRS...
                </>
              ) : (
                <>
                  <FileText className="mr-2 h-4 w-4" />
                  Generate SRS
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Output Section */}
      {srsDocument && (
        <Card className="border-planovo-light/50 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-planovo-dark font-syne">
              <FileText className="h-5 w-5 text-planovo-primary" />
              Generated SRS Document
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="prose prose-slate max-w-none text-planovo-dark">
              <ReactMarkdown
                components={{
                  h2: ({ children }) => (
                    <h2 className="text-2xl font-bold text-planovo-dark mt-8 mb-4 font-syne border-b border-planovo-light pb-2">
                      {children}
                    </h2>
                  ),
                  h3: ({ children }) => (
                    <h3 className="text-xl font-semibold text-planovo-secondary mt-6 mb-3 font-syne">
                      {children}
                    </h3>
                  ),
                  ul: ({ children }) => (
                    <ul className="list-disc pl-6 space-y-2 text-planovo-dark">
                      {children}
                    </ul>
                  ),
                  li: ({ children }) => (
                    <li className="text-planovo-dark leading-relaxed">
                      {children}
                    </li>
                  ),
                  p: ({ children }) => (
                    <p className="text-planovo-dark leading-relaxed mb-4">
                      {children}
                    </p>
                  ),
                }}
              >
                {srsDocument}
              </ReactMarkdown>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}