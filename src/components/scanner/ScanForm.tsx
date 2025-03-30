
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

/**
 * Props for the ScanForm component
 * @interface ScanFormProps
 */
interface ScanFormProps {
  target: string;
  portRange: string;
  scanning: boolean;
  onTargetChange: (value: string) => void;
  onPortRangeChange: (value: string) => void;
  onScan: () => void;
}

/**
 * Form component for network scan parameter input
 * 
 * Allows users to enter a target IP/hostname and port range for scanning,
 * and includes a button to initiate the scan process.
 * 
 * @param {ScanFormProps} props - Component props
 * @returns {JSX.Element} A form with inputs for scan parameters
 */
const ScanForm = ({
  target,
  portRange,
  scanning,
  onTargetChange,
  onPortRangeChange,
  onScan,
}: ScanFormProps) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Target input field */}
        <div className="col-span-2">
          <label className="block text-sm font-medium mb-1 text-gray-300">Target IP or Hostname</label>
          <Input
            type="text"
            placeholder="e.g., 192.168.1.1 or example.com"
            value={target}
            onChange={(e) => onTargetChange(e.target.value)}
            className="bg-gray-700 border-gray-600 text-gray-200"
          />
        </div>
        
        {/* Port range input field */}
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-300">Port Range</label>
          <Input
            type="text"
            placeholder="e.g., 1-1000"
            value={portRange}
            onChange={(e) => onPortRangeChange(e.target.value)}
            className="bg-gray-700 border-gray-600 text-gray-200"
          />
        </div>
      </div>

      {/* Scan button with loading state */}
      <div className="flex justify-center">
        <Button
          onClick={onScan}
          disabled={scanning}
          className="bg-red-600 hover:bg-red-700 text-white px-6"
        >
          {scanning ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Scanning...
            </>
          ) : (
            "Start Scan"
          )}
        </Button>
      </div>
    </div>
  );
};

export default ScanForm;
