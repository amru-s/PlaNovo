"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, FileText, Sparkles, Download } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { API_ENDPOINTS } from "@/lib/api";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

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
  const [isDownloading, setIsDownloading] = useState(false);
  const srsContentRef = useRef<HTMLDivElement>(null);

  const generateSrs = async () => {
    if (!featureIdea.trim()) {
      setError("Please enter a feature idea");
      return;
    }

    setIsLoading(true);
    setError("");
    setSrsDocument("");

    try {
      const response = await fetch(API_ENDPOINTS.SRS_GENERATE, {
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

  const downloadAsPDF = async () => {
    if (!srsDocument) return;

    setIsDownloading(true);
    try {
      // Create PDF directly from text content
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pageWidth = 210;
      const pageHeight = 297;
      const margin = 20;
      const lineHeight = 6;
      const maxLineWidth = pageWidth - (margin * 2);
      const bottomMargin = 25; // Reserve space for footer
      
      let yPosition = margin;
      
      // Helper function to check if we need a new page
      const checkPageBreak = (requiredSpace: number = lineHeight) => {
        if (yPosition + requiredSpace > pageHeight - bottomMargin) {
          pdf.addPage();
          yPosition = margin;
          return true;
        }
        return false;
      };
      
      // Add title
      checkPageBreak(lineHeight * 3);
      pdf.setFontSize(16);
      pdf.setFont('helvetica', 'bold');
      pdf.text('Software Requirements Specification', margin, yPosition);
      yPosition += lineHeight * 2;
      
      // Add feature idea as subtitle
      checkPageBreak(lineHeight * 3);
      pdf.setFontSize(12);
      pdf.setFont('helvetica', 'normal');
      const wrappedTitle = pdf.splitTextToSize(`Feature: ${featureIdea}`, maxLineWidth);
      pdf.text(wrappedTitle, margin, yPosition);
      yPosition += lineHeight * wrappedTitle.length + 10;
      
      // Process the markdown content
      const lines = srsDocument.split('\n');
      pdf.setFontSize(10);
      
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        
        if (!line) {
          yPosition += lineHeight / 2;
          continue;
        }
        
        // Handle different markdown elements
        if (line.startsWith('# ')) {
          // Main heading
          checkPageBreak(lineHeight * 3);
          pdf.setFontSize(14);
          pdf.setFont('helvetica', 'bold');
          const text = line.replace('# ', '');
          const wrapped = pdf.splitTextToSize(text, maxLineWidth);
          pdf.text(wrapped, margin, yPosition);
          yPosition += lineHeight * wrapped.length + 8;
          pdf.setFontSize(10);
          pdf.setFont('helvetica', 'normal');
        } else if (line.startsWith('## ')) {
          // Section heading
          checkPageBreak(lineHeight * 2);
          pdf.setFontSize(12);
          pdf.setFont('helvetica', 'bold');
          const text = line.replace('## ', '');
          const wrapped = pdf.splitTextToSize(text, maxLineWidth);
          pdf.text(wrapped, margin, yPosition);
          yPosition += lineHeight * wrapped.length + 6;
          pdf.setFontSize(10);
          pdf.setFont('helvetica', 'normal');
        } else if (line.startsWith('### ')) {
          // Subsection heading
          checkPageBreak(lineHeight * 2);
          pdf.setFontSize(11);
          pdf.setFont('helvetica', 'bold');
          const text = line.replace('### ', '');
          const wrapped = pdf.splitTextToSize(text, maxLineWidth);
          pdf.text(wrapped, margin, yPosition);
          yPosition += lineHeight * wrapped.length + 4;
          pdf.setFontSize(10);
          pdf.setFont('helvetica', 'normal');
        } else if (line.startsWith('#### ')) {
          // Sub-subsection heading
          checkPageBreak(lineHeight * 2);
          pdf.setFontSize(10);
          pdf.setFont('helvetica', 'bold');
          const text = line.replace('#### ', '');
          const wrapped = pdf.splitTextToSize(text, maxLineWidth);
          pdf.text(wrapped, margin, yPosition);
          yPosition += lineHeight * wrapped.length + 3;
          pdf.setFont('helvetica', 'normal');
        } else if (line.startsWith('* ') || line.startsWith('- ')) {
          // Bullet points
          const text = line.replace(/^[*-] /, '• ');
          const cleanText = text.replace(/\*\*(.*?)\*\*/g, '$1'); // Remove bold markdown
          const wrapped = pdf.splitTextToSize(cleanText, maxLineWidth - 10);
          checkPageBreak(lineHeight * wrapped.length);
          pdf.text(wrapped, margin + 5, yPosition);
          yPosition += lineHeight * wrapped.length + 1;
        } else if (line.match(/^\d+\./)) {
          // Numbered lists
          const cleanText = line.replace(/\*\*(.*?)\*\*/g, '$1'); // Remove bold markdown
          const wrapped = pdf.splitTextToSize(cleanText, maxLineWidth - 10);
          checkPageBreak(lineHeight * wrapped.length);
          pdf.text(wrapped, margin + 5, yPosition);
          yPosition += lineHeight * wrapped.length + 1;
        } else if (line.startsWith('|') && line.endsWith('|')) {
          // Table rows
          if (line.includes('---')) {
            // Table separator line - skip it but add some space
            yPosition += 2;
            continue;
          }
          
          const cells = line.split('|').map(cell => cell.trim()).filter(cell => cell);
          if (cells.length === 0) continue;
          
          const cellWidth = maxLineWidth / cells.length;
          
          // Check if this is a header row (next line contains ---)
          const isHeader = i + 1 < lines.length && lines[i + 1].includes('---');
          
          // Calculate row height based on content
          let maxCellHeight = 1;
          const cellContents = cells.map(cell => {
            const cleanCell = cell.replace(/\*\*/g, '');
            const wrapped = pdf.splitTextToSize(cleanCell, cellWidth - 8);
            maxCellHeight = Math.max(maxCellHeight, wrapped.length);
            return wrapped;
          });
          
          // Limit row height to prevent extremely tall rows
          const maxRowHeight = (pageHeight - bottomMargin - margin) / 3; // Max 1/3 of page
          const calculatedRowHeight = Math.max(maxCellHeight * lineHeight + 6, lineHeight + 6);
          const rowHeight = Math.min(calculatedRowHeight, maxRowHeight);
          
          // Check if we need a new page for the table row
          checkPageBreak(rowHeight + 4);
          
          // Draw table borders and background for header
          if (isHeader) {
            // Header background
            pdf.setFillColor(240, 240, 240);
            pdf.rect(margin, yPosition - 2, maxLineWidth, rowHeight, 'F');
            pdf.setFont('helvetica', 'bold');
          }
          
          // Draw cell borders
          pdf.setDrawColor(0, 0, 0);
          pdf.setLineWidth(0.1);
          
          for (let j = 0; j < cells.length; j++) {
            const cellX = margin + (j * cellWidth);
            // Vertical lines
            pdf.line(cellX, yPosition - 2, cellX, yPosition + rowHeight - 2);
            if (j === cells.length - 1) {
              // Right border of last cell
              pdf.line(cellX + cellWidth, yPosition - 2, cellX + cellWidth, yPosition + rowHeight - 2);
            }
          }
          
          // Horizontal lines
          pdf.line(margin, yPosition - 2, margin + maxLineWidth, yPosition - 2); // Top
          pdf.line(margin, yPosition + rowHeight - 2, margin + maxLineWidth, yPosition + rowHeight - 2); // Bottom
          
          // Add cell content
          let currentX = margin;
          for (let j = 0; j < cellContents.length; j++) {
            const wrapped = cellContents[j];
            for (let k = 0; k < wrapped.length; k++) {
              pdf.text(wrapped[k], currentX + 4, yPosition + 4 + (k * lineHeight));
            }
            currentX += cellWidth;
          }
          
          yPosition += rowHeight + 2;
          
          if (isHeader) {
            pdf.setFont('helvetica', 'normal');
          }
        } else {
          // Regular paragraph text - clean up markdown formatting
          let cleanText = line.replace(/\*\*/g, ''); // Remove bold markdown for simplicity
          
          if (cleanText.trim()) {
            const wrapped = pdf.splitTextToSize(cleanText, maxLineWidth);
            checkPageBreak(lineHeight * wrapped.length + 2);
            pdf.text(wrapped, margin, yPosition);
            yPosition += lineHeight * wrapped.length + 3;
          }
        }
      }
      
      // Add footer with generation date and page numbers
      const totalPages = pdf.getNumberOfPages();
      for (let i = 1; i <= totalPages; i++) {
        pdf.setPage(i);
        pdf.setFontSize(8);
        pdf.setFont('helvetica', 'normal');
        pdf.setTextColor(128, 128, 128); // Gray color for footer
        const footerText = `Generated on ${new Date().toLocaleDateString()} - Page ${i} of ${totalPages}`;
        pdf.text(footerText, margin, pageHeight - 15);
        pdf.setTextColor(0, 0, 0); // Reset to black
      }
      
      // Generate filename
      const filename = `SRS_${featureIdea.replace(/[^a-zA-Z0-9]/g, '_').substring(0, 30)}_${new Date().toISOString().split('T')[0]}.pdf`;
      
      // Download the PDF
      pdf.save(filename);
    } catch (error) {
      console.error('Error generating PDF:', error);
      setError('Failed to generate PDF. Please try again.');
    } finally {
      setIsDownloading(false);
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
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2 text-planovo-dark font-syne">
                <FileText className="h-5 w-5 text-planovo-primary" />
                Generated SRS Document
              </CardTitle>
              <Button
                onClick={downloadAsPDF}
                disabled={isDownloading}
                variant="outline"
                className="border-planovo-primary text-planovo-primary hover:bg-planovo-primary hover:text-planovo-dark"
              >
                {isDownloading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating PDF...
                  </>
                ) : (
                  <>
                    <Download className="mr-2 h-4 w-4" />
                    Download PDF
                  </>
                )}
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div ref={srsContentRef} className="prose prose-slate max-w-none text-planovo-dark">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
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
                  table: ({ children }) => (
                    <table className="w-full border-collapse border border-planovo-light mb-4">
                      {children}
                    </table>
                  ),
                  thead: ({ children }) => (
                    <thead className="bg-planovo-light/20">
                      {children}
                    </thead>
                  ),
                  tbody: ({ children }) => (
                    <tbody>
                      {children}
                    </tbody>
                  ),
                  tr: ({ children }) => (
                    <tr className="border-b border-planovo-light/50">
                      {children}
                    </tr>
                  ),
                  th: ({ children }) => (
                    <th className="border border-planovo-light px-4 py-2 text-left font-semibold text-planovo-dark">
                      {children}
                    </th>
                  ),
                  td: ({ children }) => (
                    <td className="border border-planovo-light px-4 py-2 text-planovo-dark">
                      {children}
                    </td>
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