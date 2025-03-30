
import { Card } from "@/components/ui/card";
import { CheckCircle, AlertCircle, Server } from "lucide-react";

/**
 * Props for the ScanResults component
 * @interface ScanResultsProps
 */
interface ScanResultsProps {
  results: {
    target: string;
    start_time: string;
    end_time: string;
    duration: number;
    open_ports: number;
    details: Record<string, { service: string; vulnerability: string }>;
  };
}

/**
 * Displays network scan results in a structured format
 * 
 * This component renders a detailed view of scan findings, including:
 * - Basic scan information (target, duration, open port count)
 * - Detailed information about each open port
 * - Associated services and potential vulnerabilities
 * 
 * @param {ScanResultsProps} props - Component props containing scan results
 * @returns {JSX.Element} A card displaying detailed scan results
 */
const ScanResults = ({ results }: ScanResultsProps) => {
  return (
    <Card className="p-6 bg-gray-700 border-gray-600">
      {/* Header section */}
      <h3 className="text-xl font-bold mb-4 flex items-center">
        <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
        Scan Results
      </h3>
      
      {/* Summary information */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 text-sm">
        <div className="bg-gray-800 p-3 rounded">
          <span className="text-gray-400">Target:</span>
          <div className="font-mono mt-1">{results.target}</div>
        </div>
        <div className="bg-gray-800 p-3 rounded">
          <span className="text-gray-400">Scan Duration:</span>
          <div className="font-mono mt-1">{results.duration.toFixed(2)}s</div>
        </div>
        <div className="bg-gray-800 p-3 rounded">
          <span className="text-gray-400">Open Ports:</span>
          <div className="font-mono mt-1">{results.open_ports}</div>
        </div>
      </div>
      
      {/* Port details section */}
      <h4 className="font-bold text-lg mb-3">Port Details</h4>
      
      {results.open_ports > 0 ? (
        // Display each open port with service and vulnerability info
        <div className="space-y-4">
          {Object.keys(results.details).map((port) => (
            <div key={port} className="bg-gray-800 rounded p-4">
              <div className="flex items-start">
                <Server className="h-5 w-5 text-blue-400 mr-2 mt-1" />
                <div>
                  <h5 className="font-bold text-white">
                    Port {port}: {results.details[port].service}
                  </h5>
                  <div className="mt-2 flex items-start">
                    <AlertCircle className="h-4 w-4 text-red-400 mr-2 mt-0.5 flex-shrink-0" />
                    <p className="text-red-300 text-sm">
                      {results.details[port].vulnerability}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        // Displayed when no open ports are found
        <p className="text-gray-400">No open ports found.</p>
      )}
      
      {/* Disclaimer note */}
      <div className="mt-6 p-3 bg-yellow-900 bg-opacity-30 border border-yellow-700 rounded text-sm">
        <p className="text-yellow-300">
          Note: This is a simulated scan for demonstration purposes. 
          In a real environment, the Python tool would perform actual network scanning.
        </p>
      </div>
    </Card>
  );
};

export default ScanResults;
