
import { Shield, Terminal, AlertTriangle } from "lucide-react";

const Header = () => {
  return (
    <header className="bg-gray-800 border-b border-gray-700 py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center">
          <Shield className="h-8 w-8 text-red-500 mr-3" />
          <div>
            <h1 className="text-xl font-bold">Red Team Toolkit</h1>
            <p className="text-xs text-gray-400">Security Assessment Tools</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Terminal className="h-5 w-5 text-gray-400" />
          <span className="text-sm font-mono bg-gray-700 px-2 py-1 rounded">v1.0.0</span>
          <div className="ml-4 bg-red-900 bg-opacity-30 border border-red-800 rounded-md px-2 py-1 flex items-center">
            <AlertTriangle className="h-4 w-4 text-red-500 mr-1" />
            <span className="text-xs text-red-300">For authorized use only</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
