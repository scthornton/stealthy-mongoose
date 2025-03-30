
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import NetworkScanner from "@/components/NetworkScanner";
import CodeViewer from "@/components/CodeViewer";
import UsageGuide from "@/components/UsageGuide";
import Dashboard from "@/components/dashboard/Dashboard";
import ScanHistory from "@/components/history/ScanHistory";
import ScheduledScans from "@/components/scheduler/ScheduledScans";
import DownloadButton from "@/components/DownloadButton";
import { pythonCode } from "@/data/pythonCode";

/**
 * Component for organizing application content in tabs
 * 
 * This component provides a tabbed interface for accessing different
 * functionality of the application, including:
 * - Dashboard with security metrics
 * - Network scanner tool
 * - Scan history
 * - Scheduled scans
 * - Source code viewer
 * - Usage guide
 * 
 * @returns {JSX.Element} A tabbed interface with application content
 */
const TabbedContent = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <>
      <Tabs defaultValue="dashboard" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="mb-6 bg-gray-700">
          <TabsTrigger value="dashboard" className="data-[state=active]:bg-gray-600">Dashboard</TabsTrigger>
          <TabsTrigger value="tool" className="data-[state=active]:bg-gray-600">Scanner</TabsTrigger>
          <TabsTrigger value="history" className="data-[state=active]:bg-gray-600">Scan History</TabsTrigger>
          <TabsTrigger value="scheduler" className="data-[state=active]:bg-gray-600">Scheduled Scans</TabsTrigger>
          <TabsTrigger value="code" className="data-[state=active]:bg-gray-600">Source Code</TabsTrigger>
          <TabsTrigger value="usage" className="data-[state=active]:bg-gray-600">Usage Guide</TabsTrigger>
        </TabsList>
        
        <TabsContent value="dashboard" className="mt-0">
          <Dashboard />
        </TabsContent>
        
        <TabsContent value="tool" className="mt-0">
          <NetworkScanner />
        </TabsContent>
        
        <TabsContent value="history" className="mt-0">
          <ScanHistory />
        </TabsContent>
        
        <TabsContent value="scheduler" className="mt-0">
          <ScheduledScans />
        </TabsContent>
        
        <TabsContent value="code" className="mt-0">
          <CodeViewer code={pythonCode} />
        </TabsContent>
        
        <TabsContent value="usage" className="mt-0">
          <UsageGuide />
        </TabsContent>
      </Tabs>
      
      {activeTab === "tool" && (
        <DownloadButton pythonCode={pythonCode} />
      )}
    </>
  );
};

export default TabbedContent;
