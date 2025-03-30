
import { Card } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

/**
 * Props for the ScanStatus component
 * @interface ScanStatusProps
 * @property {string} target - The IP address or hostname being scanned
 * @property {string} portRange - The range of ports being scanned (e.g., "1-1000")
 */
interface ScanStatusProps {
  target: string;
  portRange: string;
}

/**
 * Displays the current scanning status with a loading animation
 * 
 * This component renders a card with a spinning loader and information
 * about the ongoing network scan, including the target IP/hostname and
 * the port range being examined.
 * 
 * @param {ScanStatusProps} props - Component props
 * @returns {JSX.Element} A status card with scan information and progress indicator
 */
const ScanStatus = ({ target, portRange }: ScanStatusProps) => {
  return (
    <Card className="p-6 bg-gray-700 border-gray-600">
      <div className="flex flex-col items-center justify-center space-y-4">
        <Loader2 className="h-10 w-10 animate-spin text-red-500" />
        <p className="text-lg font-medium">Scanning {target}...</p>
        <p className="text-sm text-gray-400">Port range: {portRange}</p>
        <div className="w-full bg-gray-600 rounded-full h-2.5">
          <div className="bg-red-600 h-2.5 rounded-full animate-pulse w-3/4"></div>
        </div>
      </div>
    </Card>
  );
};

export default ScanStatus;
