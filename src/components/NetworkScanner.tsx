
import { useState } from "react";
import ScanForm from "@/components/scanner/ScanForm";
import ScanStatus from "@/components/scanner/ScanStatus";
import ScanResults from "@/components/scanner/ScanResults";
import ScanProfiles from "@/components/scanner/ScanProfiles";
import { useNetworkScanner } from "@/components/scanner/useNetworkScanner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

/**
 * Network scanner component that integrates various scanner sub-components
 * 
 * This component serves as the main interface for the network scanner functionality,
 * bringing together the scan form, profiles, status, and results displays.
 * It manages the state and interactions between these subcomponents.
 * 
 * @returns {JSX.Element} The complete network scanner interface
 */
const NetworkScanner = () => {
  const [activeTab, setActiveTab] = useState("scanner");
  
  const {
    target,
    setTarget,
    portRange,
    setPortRange,
    scanning,
    scanComplete,
    scanResults,
    handleScan
  } = useNetworkScanner();

  /**
   * Handles selecting a scan profile
   * Updates the scanner form with the profile's configuration
   * 
   * @param {Object} profile - The selected scan profile
   */
  const handleSelectProfile = (profile: { target: string; portRange: string }) => {
    if (profile.target) {
      setTarget(profile.target);
    }
    setPortRange(profile.portRange);
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="scanner" onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-6 bg-gray-700">
          <TabsTrigger value="scanner" className="data-[state=active]:bg-gray-600">Scanner</TabsTrigger>
          <TabsTrigger value="profiles" className="data-[state=active]:bg-gray-600">Scan Profiles</TabsTrigger>
        </TabsList>
        
        <TabsContent value="scanner" className="mt-0 space-y-6">
          <ScanForm
            target={target}
            portRange={portRange}
            scanning={scanning}
            onTargetChange={setTarget}
            onPortRangeChange={setPortRange}
            onScan={handleScan}
          />

          {scanning && (
            <ScanStatus target={target} portRange={portRange} />
          )}

          {scanComplete && scanResults && (
            <ScanResults results={scanResults} />
          )}
        </TabsContent>
        
        <TabsContent value="profiles" className="mt-0">
          <ScanProfiles onSelectProfile={handleSelectProfile} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default NetworkScanner;
