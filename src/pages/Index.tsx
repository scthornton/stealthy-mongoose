
import { Card } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TabbedContent from "@/components/TabbedContent";

/**
 * Main application index page
 * 
 * This component serves as the root page of the application and displays:
 * 1. Application header with navigation
 * 2. Main content area with the comprehensive network security toolkit
 * 3. Footer with additional information
 * 
 * The security toolkit includes dashboard visualizations, port scanning capabilities,
 * vulnerability assessment, scan history tracking, and automation features.
 * 
 * @returns {JSX.Element} The complete page with header, content, and footer
 */
const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-white">
      {/* Application header component */}
      <Header />
      
      {/* Main content area */}
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 gap-6 mb-8">
          <Card className="bg-gray-800 border-gray-700 p-6">
            <h1 className="text-3xl font-bold mb-2 text-red-500">Network Security Scanner</h1>
            <p className="text-gray-300 mb-6">
              A comprehensive security toolkit for network reconnaissance, port scanning, service identification, 
              and vulnerability assessment. Features include a security metrics dashboard, customizable scan profiles, 
              scan history tracking, and automated scanning schedules.
            </p>
            
            {/* Tabbed interface for toolkit functionality */}
            <TabbedContent />
          </Card>
        </div>
      </main>
      
      {/* Application footer component */}
      <Footer />
    </div>
  );
};

export default Index;
