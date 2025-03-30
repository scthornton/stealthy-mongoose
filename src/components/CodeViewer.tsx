
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

/**
 * Props for the CodeViewer component
 * @interface CodeViewerProps
 * @property {string} code - The code content to be displayed and copied
 */
interface CodeViewerProps {
  code: string;
}

/**
 * Component for displaying and copying code snippets
 * 
 * Features:
 * - Displays code in a scrollable container with syntax highlighting
 * - Provides a copy button that copies code to clipboard
 * - Shows a toast notification when code is copied
 * 
 * @param {CodeViewerProps} props - Component props
 * @returns {JSX.Element} A code display container with copy functionality
 */
const CodeViewer = ({ code }: CodeViewerProps) => {
  const { toast } = useToast();

  /**
   * Handles copying code to clipboard
   * Shows a toast notification when complete
   */
  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    toast({
      title: "Code Copied",
      description: "The Python code has been copied to your clipboard.",
    });
  };

  return (
    <div className="relative">
      {/* Copy button positioned in top-right corner */}
      <div className="absolute top-3 right-3">
        <Button 
          onClick={handleCopy} 
          variant="outline" 
          size="sm"
          className="bg-gray-700 hover:bg-gray-600 border-gray-600 text-gray-200"
        >
          <Copy className="h-4 w-4 mr-2" />
          Copy
        </Button>
      </div>
      
      {/* Code display container */}
      <div className="bg-gray-900 rounded-lg overflow-auto max-h-[600px] p-4">
        <pre className="font-mono text-sm text-gray-300 whitespace-pre-wrap">
          {code}
        </pre>
      </div>
    </div>
  );
};

export default CodeViewer;
