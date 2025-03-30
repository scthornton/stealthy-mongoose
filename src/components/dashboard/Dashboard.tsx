
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, LineChart, PieChart } from "@/components/ui/charts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Shield, AlertTriangle, Server, Clock } from "lucide-react";
import { useState } from "react";

/**
 * Interface for the security metrics data structure
 * @interface SecurityMetrics
 */
interface SecurityMetrics {
  scannedHosts: number;
  vulnerabilities: {
    high: number;
    medium: number;
    low: number;
  };
  openPorts: number;
  scanHistory: Array<{
    date: string;
    scans: number;
  }>;
  vulnerabilityDistribution: Array<{
    name: string;
    value: number;
  }>;
  portDistribution: Array<{
    name: string;
    value: number;
  }>;
}

/**
 * Dashboard component for displaying security metrics and visualizations
 * 
 * This component renders charts and statistics about network security scans,
 * including vulnerability distribution, scan history, and open port statistics.
 * 
 * @returns {JSX.Element} Dashboard with security metrics and visualizations
 */
const Dashboard = () => {
  // Sample data for demonstration purposes
  // In a real implementation, this would come from a backend or scan results
  const [metrics] = useState<SecurityMetrics>({
    scannedHosts: 15,
    vulnerabilities: {
      high: 8,
      medium: 17,
      low: 24,
    },
    openPorts: 48,
    scanHistory: [
      { date: "Jan", scans: 4 },
      { date: "Feb", scans: 7 },
      { date: "Mar", scans: 5 },
      { date: "Apr", scans: 8 },
      { date: "May", scans: 11 },
      { date: "Jun", scans: 9 }
    ],
    vulnerabilityDistribution: [
      { name: "SSH Misconfiguration", value: 22 },
      { name: "Missing HTTP Headers", value: 18 },
      { name: "Outdated SSL/TLS", value: 29 },
      { name: "Default Credentials", value: 14 },
      { name: "Open Database Ports", value: 17 }
    ],
    portDistribution: [
      { name: "22 (SSH)", value: 12 },
      { name: "80 (HTTP)", value: 15 },
      { name: "443 (HTTPS)", value: 18 },
      { name: "3306 (MySQL)", value: 8 },
      { name: "Other", value: 5 }
    ]
  });

  // Custom formatter for the chart values
  const formatNumber = (value: string | number | (string | number)[]): string => {
    if (typeof value === 'number') {
      return `${value} hosts`;
    }
    return String(value);
  };

  return (
    <div className="space-y-6">
      {/* Security metrics summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">Scanned Hosts</CardTitle>
            <Server className="h-4 w-4 text-blue-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{metrics.scannedHosts}</div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">High Risk Vulnerabilities</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{metrics.vulnerabilities.high}</div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">Open Ports</CardTitle>
            <Shield className="h-4 w-4 text-yellow-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{metrics.openPorts}</div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">Total Vulnerabilities</CardTitle>
            <Shield className="h-4 w-4 text-orange-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              {metrics.vulnerabilities.high + metrics.vulnerabilities.medium + metrics.vulnerabilities.low}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts and visualizations */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="mb-6 bg-gray-700">
          <TabsTrigger value="overview" className="data-[state=active]:bg-gray-600">Overview</TabsTrigger>
          <TabsTrigger value="vulnerabilities" className="data-[state=active]:bg-gray-600">Vulnerabilities</TabsTrigger>
          <TabsTrigger value="ports" className="data-[state=active]:bg-gray-600">Port Analysis</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="mt-0">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Scan History</CardTitle>
            </CardHeader>
            <CardContent>
              <LineChart 
                data={metrics.scanHistory}
                index="date"
                categories={["scans"]}
                colors={["#3b82f6"]}
                valueFormatter={(value: string | number | (string | number)[]) => `${value} scans`}
                className="aspect-[4/3]"
              />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="vulnerabilities" className="mt-0">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Vulnerability Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <PieChart 
                data={metrics.vulnerabilityDistribution}
                index="name"
                valueFormatter={(value: string | number | (string | number)[]) => `${value} instances`}
                className="aspect-[4/3]"
              />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="ports" className="mt-0">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Open Ports Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <BarChart 
                data={metrics.portDistribution}
                index="name"
                categories={["value"]}
                colors={["#10b981"]}
                valueFormatter={formatNumber}
                className="aspect-[4/3]"
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
