
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

/**
 * Props for the DownloadButton component
 * @interface DownloadButtonProps
 * @property {string} pythonCode - The Python code content to be downloaded
 */
interface DownloadButtonProps {
  pythonCode: string;
}

/**
 * Button component that allows users to download Python security tool code
 * 
 * When clicked, this component:
 * 1. Creates a Blob containing the Python code
 * 2. Generates a download link
 * 3. Triggers the download
 * 4. Shows a toast notification
 * 
 * @param {DownloadButtonProps} props - Component props
 * @returns {JSX.Element} A button that triggers Python code download
 */
const DownloadButton = ({ pythonCode }: DownloadButtonProps) => {
  const { toast } = useToast();

  /**
   * Handles the download button click
   * Creates and downloads a file containing the Python code
   */
  const handleDownload = () => {
    toast({
      title: "Download Started",
      description: "Your Python security tool is being downloaded.",
    });
    
    // Create a Blob containing the code
    const fileContent = pythonCode;
    const blob = new Blob([fileContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    
    // Create and trigger download link
    const link = document.createElement("a");
    link.href = url;
    link.download = "network_scanner.py";
    document.body.appendChild(link);
    link.click();
    
    // Clean up
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="mt-6 flex justify-center">
      <Button 
        onClick={handleDownload}
        className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded"
      >
        Download Python Script
      </Button>
    </div>
  );
};

export default DownloadButton;
