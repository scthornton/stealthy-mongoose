
/**
 * Component displaying instructions for using the network scanner Python script
 * 
 * This component provides:
 * - Step-by-step installation and usage instructions
 * - Command syntax examples with correct usage patterns
 * - Parameter explanations
 * - Important security warnings
 * 
 * @returns {JSX.Element} A formatted guide with usage instructions
 */
const UsageGuide = () => {
  return (
    <div className="bg-gray-700 rounded-lg p-6 text-gray-200">
      <h3 className="text-xl font-bold mb-4">How to Use the Python Script</h3>
      
      <div className="space-y-6">
        {/* Step 1: Download and Prepare */}
        <div>
          <h4 className="font-bold text-white mb-2">Step 1: Download and Prepare</h4>
          <ol className="list-decimal list-inside space-y-2 ml-4">
            <li>Click the "Download Python Script" button below to download the script.</li>
            <li>Save the file as "network_scanner.py" to your preferred location.</li>
            <li>Make the script executable (Linux/Mac): <code className="bg-black px-2 py-1 rounded">chmod +x network_scanner.py</code></li>
          </ol>
        </div>
        
        {/* Step 2: Install Dependencies */}
        <div>
          <h4 className="font-bold text-white mb-2">Step 2: Install Dependencies</h4>
          <p className="mb-2">The script uses Python's standard libraries and doesn't require additional packages.</p>
          <p>Ensure you're using Python 3.6 or later.</p>
        </div>
        
        {/* Step 3: Run the Scanner */}
        <div>
          <h4 className="font-bold text-white mb-2">Step 3: Run the Scanner</h4>
          <div className="bg-black p-4 rounded mb-4 font-mono text-sm">
            <p className="text-gray-400"># Correct usage format:</p>
            <p>python network_scanner.py 192.168.1.1 -p 1-1000 -t 100 -o results.json -v</p>
            <p className="mt-2 text-gray-400"># Example for scanning 192.168.5.68:</p>
            <p>python network_scanner.py 192.168.5.68 -p 1-1000</p>
            <p className="mt-2 text-gray-400"># Common errors:</p>
            <p className="text-red-400"># DO NOT add the word "target" before the IP:</p>
            <p className="text-red-300 line-through">python network_scanner.py target 192.168.5.68 <span className="text-red-500">← WRONG</span></p>
          </div>
          <div className="bg-yellow-900 bg-opacity-30 border border-yellow-700 rounded p-4 mb-4">
            <p className="text-yellow-300 font-bold">Important:</p>
            <p className="text-yellow-200">The target IP or hostname should be provided directly after the script name, without the "target" keyword. The "target" is a positional argument, not a named parameter.</p>
          </div>
        </div>
        
        {/* Step 4: Understanding Results */}
        <div>
          <h4 className="font-bold text-white mb-2">Step 4: Understanding Results</h4>
          <p className="mb-2">The scanner will display the following information:</p>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li>Open ports on the target system</li>
            <li>Services running on those ports</li>
            <li>Potential vulnerabilities based on the services</li>
            <li>If requested, results will be saved to a JSON file</li>
          </ul>
        </div>
      </div>
      
      {/* Parameters section */}
      <h3 className="text-xl font-bold mt-8 mb-4">Parameters</h3>
      <ul className="space-y-2">
        <li><span className="text-green-400">target</span>: IP address or hostname to scan (positional argument)</li>
        <li><span className="text-green-400">-p, --ports</span>: Port range to scan (default: 1-1000)</li>
        <li><span className="text-green-400">-t, --threads</span>: Number of threads to use (default: 100)</li>
        <li><span className="text-green-400">-o, --output</span>: Save results to JSON file</li>
        <li><span className="text-green-400">-v, --verbose</span>: Enable verbose output</li>
        <li><span className="text-green-400">--timeout</span>: Connection timeout in seconds (default: 1.0)</li>
      </ul>
      
      {/* Security warning */}
      <div className="mt-6 p-4 bg-yellow-900 bg-opacity-30 border border-yellow-700 rounded">
        <h4 className="font-bold text-yellow-400 mb-2">⚠️ Important Security Note</h4>
        <p>
          This tool should only be used for legitimate security testing with proper authorization.
          Unauthorized scanning of networks may violate laws and regulations.
        </p>
      </div>
    </div>
  );
};

export default UsageGuide;
