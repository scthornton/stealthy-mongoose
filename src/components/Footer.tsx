
import { Shield, Github, Coffee } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 border-t border-gray-700 py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <Shield className="h-6 w-6 text-red-500 mr-2" />
            <span className="text-gray-300">Red Team Toolkit</span>
          </div>
          
          <div className="text-sm text-gray-400 mb-4 md:mb-0 text-center md:text-left">
            <p>This tool is for educational and authorized testing purposes only.</p>
            <p>Use responsibly and with proper authorization.</p>
          </div>
          
          <div className="flex space-x-4">
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <Github className="h-5 w-5" />
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <Coffee className="h-5 w-5" />
            </a>
          </div>
        </div>
        
        <div className="mt-6 pt-4 border-t border-gray-700 text-center text-xs text-gray-500">
          <p>© {new Date().getFullYear()} Your Name. All rights reserved.</p>
          <p className="mt-1">Always obtain proper authorization before conducting security assessments.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
