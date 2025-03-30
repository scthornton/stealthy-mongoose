
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

/**
 * Interface for scan results data structure
 * @interface ScanResults
 */
export interface ScanResults {
  target: string;
  start_time: string;
  end_time: string;
  duration: number;
  open_ports: number;
  details: Record<string, { service: string; vulnerability: string }>;
}

/**
 * Custom hook for managing network scanning functionality
 * 
 * This hook encapsulates the state and logic for performing network scans,
 * including input validation, scan execution, and results processing.
 * 
 * @returns {Object} An object containing scan state and control functions
 */
export const useNetworkScanner = () => {
  // State for form inputs
  const [target, setTarget] = useState("");
  const [portRange, setPortRange] = useState("1-1000");
  
  // State for scan operation
  const [scanning, setScanning] = useState(false);
  const [scanComplete, setScanComplete] = useState(false);
  const [scanResults, setScanResults] = useState<ScanResults | null>(null);
  
  // Notification system
  const { toast } = useToast();

  /**
   * Validates user inputs before starting a scan
   * @returns {boolean} True if inputs are valid, false otherwise
   */
  const validateInputs = () => {
    // Validate target IP/hostname
    if (!target) {
      toast({
        title: "Input Error",
        description: "Please enter a target IP or hostname",
        variant: "destructive",
      });
      return false;
    }

    // Validate port range format (start-end)
    const portRangePattern = /^\d+-\d+$/;
    if (!portRangePattern.test(portRange)) {
      toast({
        title: "Input Error",
        description: "Port range must be in the format start-end (e.g., 1-1000)",
        variant: "destructive",
      });
      return false;
    }

    return true;
  };

  /**
   * Initiates a network scan with the current target and port range
   * For demonstration purposes, this simulates a scan with pre-defined or random results
   */
  const handleScan = () => {
    if (!validateInputs()) return;

    // Set scanning state
    setScanning(true);
    setScanComplete(false);
    setScanResults(null);

    // Simulate scanning process with setTimeout
    setTimeout(() => {
      // Generate specific scan results
      let openPorts: Record<string, { service: string; vulnerability: string }> = {};
      
      // For specific IP (192.168.5.68), show predetermined results
      if (target === "192.168.5.68") {
        openPorts = {
          "22": {
            service: "SSH",
            vulnerability: "SSH service might be configured with weak ciphers or vulnerable to brute force"
          },
          "80": {
            service: "HTTP",
            vulnerability: "Web server might have various vulnerabilities (XSS, SQLi, etc)"
          },
          "443": {
            service: "HTTPS",
            vulnerability: "HTTPS might have SSL/TLS vulnerabilities or misconfiguration"
          }
        };
      } else {
        // For other IPs, generate random results
        const numOpenPorts = Math.floor(Math.random() * 5) + 1;
        const commonPorts = [22, 80, 443, 3306, 8080];
        
        for (let i = 0; i < numOpenPorts; i++) {
          const port = commonPorts[i];
          let service = "";
          let vulnerability = "";
          
          switch (port) {
            case 22:
              service = "SSH";
              vulnerability = "SSH service might be configured with weak ciphers or vulnerable to brute force";
              break;
            case 80:
              service = "HTTP";
              vulnerability = "Web server might have various vulnerabilities (XSS, SQLi, etc)";
              break;
            case 443:
              service = "HTTPS";
              vulnerability = "HTTPS might have SSL/TLS vulnerabilities or misconfiguration";
              break;
            case 3306:
              service = "MySQL";
              vulnerability = "MySQL database might be vulnerable to SQL injection";
              break;
            case 8080:
              service = "HTTP Proxy";
              vulnerability = "Web proxy might have various vulnerabilities";
              break;
          }
          
          openPorts[port.toString()] = {
            service,
            vulnerability
          };
        }
      }
      
      const numOpenPorts = Object.keys(openPorts).length;
      
      // Format scan results
      const results = {
        target,
        start_time: new Date().toISOString(),
        end_time: new Date().toISOString(),
        duration: 2.34,
        open_ports: numOpenPorts,
        details: openPorts
      };

      // Update state with scan results
      setScanResults(results);
      setScanning(false);
      setScanComplete(true);

      // Notify user of scan completion
      toast({
        title: "Scan Complete",
        description: `Found ${numOpenPorts} open ports on ${target}`,
      });
    }, 3000); // Simulate 3-second scan duration
  };

  // Return state and functions for component use
  return {
    target,
    setTarget,
    portRange,
    setPortRange,
    scanning,
    scanComplete,
    scanResults,
    handleScan
  };
};
