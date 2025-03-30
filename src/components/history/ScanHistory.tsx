
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, Download, Trash, Search } from "lucide-react";
import { ScanResults } from "@/components/scanner/useNetworkScanner";

/**
 * Interface for the scan history entry
 * @interface ScanHistoryEntry
 */
interface ScanHistoryEntry {
  id: string;
  timestamp: string;
  target: string;
  portRange: string;
  openPorts: number;
  vulnerabilities: number;
  results: ScanResults;
}

/**
 * Sample scan history data for demonstration purposes
 * In a real implementation, this would be stored in a database or local storage
 */
const SAMPLE_HISTORY: ScanHistoryEntry[] = [
  {
    id: "scan-001",
    timestamp: "2023-07-15 14:32:45",
    target: "192.168.1.1",
    portRange: "1-1000",
    openPorts: 3,
    vulnerabilities: 2,
    results: {
      target: "192.168.1.1",
      start_time: "2023-07-15T14:30:12Z",
      end_time: "2023-07-15T14:32:45Z",
      duration: 2.55,
      open_ports: 3,
      details: {
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
      }
    }
  },
  {
    id: "scan-002",
    timestamp: "2023-07-16 09:15:20",
    target: "192.168.1.5",
    portRange: "1-2000",
    openPorts: 5,
    vulnerabilities: 3,
    results: {
      target: "192.168.1.5",
      start_time: "2023-07-16T09:12:10Z",
      end_time: "2023-07-16T09:15:20Z",
      duration: 3.17,
      open_ports: 5,
      details: {
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
        },
        "3306": {
          service: "MySQL",
          vulnerability: "MySQL database might be vulnerable to SQL injection"
        },
        "8080": {
          service: "HTTP Proxy",
          vulnerability: "Web proxy might have various vulnerabilities"
        }
      }
    }
  },
  {
    id: "scan-003",
    timestamp: "2023-07-17 16:45:12",
    target: "192.168.5.68",
    portRange: "1-1000",
    openPorts: 3,
    vulnerabilities: 3,
    results: {
      target: "192.168.5.68",
      start_time: "2023-07-17T16:42:30Z",
      end_time: "2023-07-17T16:45:12Z",
      duration: 2.7,
      open_ports: 3,
      details: {
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
      }
    }
  }
];

/**
 * Component for displaying and managing scan history
 * 
 * This component renders a table of past scan results with options to:
 * - Search through scan history by target
 * - View detailed results of a particular scan
 * - Download scan results as JSON
 * - Delete scan history entries
 * 
 * @returns {JSX.Element} A table displaying scan history with management options
 */
const ScanHistory = () => {
  const [history] = useState<ScanHistoryEntry[]>(SAMPLE_HISTORY);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedScan, setSelectedScan] = useState<ScanResults | null>(null);

  /**
   * Filters scan history based on search term
   * @returns {ScanHistoryEntry[]} Filtered scan history entries
   */
  const filteredHistory = history.filter(entry =>
    entry.target.toLowerCase().includes(searchTerm.toLowerCase())
  );

  /**
   * Handles viewing detailed results of a specific scan
   * @param {ScanResults} results - The results of the selected scan
   */
  const handleViewScan = (results: ScanResults) => {
    setSelectedScan(results);
  };

  /**
   * Simulates downloading scan results as a JSON file
   * In a real implementation, this would create an actual file download
   * @param {ScanResults} results - The results to download
   */
  const handleDownload = (results: ScanResults) => {
    // In a real implementation, this would create a JSON file and initiate download
    console.log("Downloading results for", results.target);
    // Example implementation would be:
    // const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(results, null, 2));
    // const downloadAnchorNode = document.createElement('a');
    // downloadAnchorNode.setAttribute("href", dataStr);
    // downloadAnchorNode.setAttribute("download", `scan_${results.target.replace(/\./g, "_")}.json`);
    // document.body.appendChild(downloadAnchorNode);
    // downloadAnchorNode.click();
    // downloadAnchorNode.remove();
  };

  return (
    <div className="space-y-6">
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-white">Scan History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 mb-4">
            <Search className="h-5 w-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Search by target IP/hostname..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-gray-700 border-gray-600 text-gray-200"
            />
          </div>

          <div className="rounded-md border border-gray-700">
            <Table>
              <TableHeader className="bg-gray-700">
                <TableRow>
                  <TableHead className="text-gray-200">Timestamp</TableHead>
                  <TableHead className="text-gray-200">Target</TableHead>
                  <TableHead className="text-gray-200">Port Range</TableHead>
                  <TableHead className="text-gray-200">Open Ports</TableHead>
                  <TableHead className="text-gray-200">Vulns</TableHead>
                  <TableHead className="text-gray-200 text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredHistory.length > 0 ? (
                  filteredHistory.map((entry) => (
                    <TableRow key={entry.id} className="bg-gray-800 border-b border-gray-700">
                      <TableCell className="font-medium text-gray-300">{entry.timestamp}</TableCell>
                      <TableCell className="font-mono text-gray-300">{entry.target}</TableCell>
                      <TableCell className="text-gray-300">{entry.portRange}</TableCell>
                      <TableCell className="text-gray-300">{entry.openPorts}</TableCell>
                      <TableCell className="text-gray-300">{entry.vulnerabilities}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end space-x-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleViewScan(entry.results)}
                            title="View scan details"
                          >
                            <Eye className="h-4 w-4 text-blue-400" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDownload(entry.results)}
                            title="Download scan results"
                          >
                            <Download className="h-4 w-4 text-green-400" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            title="Delete from history"
                          >
                            <Trash className="h-4 w-4 text-red-400" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-4 text-gray-400">
                      No scan history found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Selected scan details */}
      {selectedScan && (
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-white">Scan Details: {selectedScan.target}</CardTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSelectedScan(null)}
              className="text-gray-400 hover:text-white"
            >
              ×
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 text-sm">
                <div className="bg-gray-700 p-3 rounded">
                  <span className="text-gray-400">Start Time:</span>
                  <div className="font-mono mt-1 text-gray-200">{selectedScan.start_time}</div>
                </div>
                <div className="bg-gray-700 p-3 rounded">
                  <span className="text-gray-400">End Time:</span>
                  <div className="font-mono mt-1 text-gray-200">{selectedScan.end_time}</div>
                </div>
                <div className="bg-gray-700 p-3 rounded">
                  <span className="text-gray-400">Duration:</span>
                  <div className="font-mono mt-1 text-gray-200">{selectedScan.duration.toFixed(2)}s</div>
                </div>
              </div>

              <h4 className="font-bold text-lg text-white mb-2">Open Ports ({selectedScan.open_ports})</h4>
              {Object.keys(selectedScan.details).length > 0 ? (
                <div className="space-y-2">
                  {Object.entries(selectedScan.details).map(([port, info]) => (
                    <div key={port} className="bg-gray-700 rounded p-3">
                      <h5 className="font-bold text-white">
                        Port {port}: {info.service}
                      </h5>
                      <p className="text-red-300 text-sm mt-1">
                        {info.vulnerability}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-400">No open ports found.</p>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ScanHistory;
