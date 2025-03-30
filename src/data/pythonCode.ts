
export const pythonCode = `#!/usr/bin/env python3
# Network Security Scanner
# This tool performs port scanning, service identification, and basic vulnerability checks

import socket
import sys
import threading
import time
import argparse
from datetime import datetime
import json
import os
from concurrent.futures import ThreadPoolExecutor

# Common vulnerability checks based on open ports
COMMON_VULNERABILITIES = {
    21: "FTP service might allow anonymous login or be vulnerable to brute force",
    22: "SSH service might be configured with weak ciphers or vulnerable to brute force",
    23: "Telnet sends data in cleartext and is inherently insecure",
    25: "SMTP server might be vulnerable to relay attacks or enumeration",
    53: "DNS might be vulnerable to zone transfers or cache poisoning",
    80: "Web server might have various vulnerabilities (XSS, SQLi, etc)",
    443: "HTTPS might have SSL/TLS vulnerabilities or misconfiguration",
    445: "SMB/CIFS might be vulnerable to various attacks (EternalBlue, etc)",
    1433: "MSSQL database might be vulnerable to SQL injection",
    1521: "Oracle database might be vulnerable to TNS poisoning",
    3306: "MySQL database might be vulnerable to SQL injection",
    3389: "RDP might be vulnerable to BlueKeep or similar vulnerabilities",
    5432: "PostgreSQL database might be vulnerable to SQL injection"
}

# Common service names for ports
COMMON_SERVICES = {
    21: "FTP",
    22: "SSH",
    23: "Telnet",
    25: "SMTP",
    53: "DNS",
    80: "HTTP",
    110: "POP3",
    143: "IMAP",
    443: "HTTPS",
    445: "SMB",
    1433: "MSSQL",
    1521: "Oracle DB",
    3306: "MySQL",
    3389: "RDP",
    5432: "PostgreSQL",
    5900: "VNC",
    8080: "HTTP Proxy"
}

class NetworkScanner:
    def __init__(self, target, start_port=1, end_port=1000, threads=100, timeout=1, verbose=False):
        self.target = target
        self.start_port = start_port
        self.end_port = end_port
        self.threads = threads
        self.timeout = timeout
        self.verbose = verbose
        self.open_ports = []
        self.results = {}
        self.scan_start_time = None
        self.scan_end_time = None

    def scan_port(self, port):
        """Scan a single port"""
        try:
            s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
            s.settimeout(self.timeout)
            result = s.connect_ex((self.target, port))
            if result == 0:
                service = self.identify_service(port, s)
                vulnerability = self.check_vulnerability(port)
                self.open_ports.append(port)
                self.results[port] = {
                    "service": service,
                    "vulnerability": vulnerability
                }
                if self.verbose:
                    print(f"[+] Port {port} is open - {service}")
            s.close()
        except socket.error:
            pass
        except KeyboardInterrupt:
            print("Scan interrupted by user.")
            sys.exit()

    def identify_service(self, port, sock=None):
        """Identify service running on a port"""
        if port in COMMON_SERVICES:
            service_name = COMMON_SERVICES[port]
        else:
            service_name = "Unknown service"
        
        # Try to grab banner if socket is provided
        banner = self.grab_banner(sock) if sock else ""
        if banner:
            return f"{service_name} ({banner})"
        return service_name

    def grab_banner(self, sock):
        """Grab banner from an open port"""
        try:
            sock.send(b'\\r\\n\\r\\n')
            banner = sock.recv(1024)
            return banner.decode('utf-8', errors='ignore').strip()
        except:
            return ""

    def check_vulnerability(self, port):
        """Check for common vulnerabilities based on port"""
        return COMMON_VULNERABILITIES.get(port, "No common vulnerabilities known")

    def scan(self):
        """Start scanning ports"""
        try:
            print(f"Starting scan on target: {self.target}")
            print(f"Port range: {self.start_port}-{self.end_port}")
            print(f"Threads: {self.threads}")
            print("-" * 60)
            
            self.scan_start_time = datetime.now()
            
            with ThreadPoolExecutor(max_workers=self.threads) as executor:
                executor.map(self.scan_port, range(self.start_port, self.end_port + 1))
            
            self.scan_end_time = datetime.now()
            scan_duration = (self.scan_end_time - self.scan_start_time).total_seconds()
            
            print("-" * 60)
            print(f"Scan completed in {scan_duration:.2f} seconds")
            print(f"Open ports: {len(self.open_ports)}")
            
            if self.open_ports:
                print("\\nDetailed Results:")
                print("-" * 60)
                for port in sorted(self.open_ports):
                    print(f"Port {port}: {self.results[port]['service']}")
                    print(f"Potential vulnerability: {self.results[port]['vulnerability']}")
                    print("-" * 60)
            else:
                print("No open ports found.")
                
            return {
                "target": self.target,
                "start_time": self.scan_start_time.strftime("%Y-%m-%d %H:%M:%S"),
                "end_time": self.scan_end_time.strftime("%Y-%m-%d %H:%M:%S"),
                "duration": scan_duration,
                "open_ports": len(self.open_ports),
                "details": self.results
            }
            
        except socket.gaierror:
            print("Hostname could not be resolved.")
            sys.exit()
        except socket.error:
            print("Could not connect to server.")
            sys.exit()
        except KeyboardInterrupt:
            print("Scan interrupted by user.")
            sys.exit()

    def save_results(self, filename="scan_results.json"):
        """Save scan results to a JSON file"""
        if not self.results:
            print("No results to save.")
            return
            
        report = {
            "target": self.target,
            "scan_time": {
                "start": self.scan_start_time.strftime("%Y-%m-%d %H:%M:%S"),
                "end": self.scan_end_time.strftime("%Y-%m-%d %H:%M:%S"),
                "duration": (self.scan_end_time - self.scan_start_time).total_seconds()
            },
            "ports": {
                "total_scanned": self.end_port - self.start_port + 1,
                "open": len(self.open_ports),
                "details": self.results
            }
        }
        
        with open(filename, 'w') as f:
            json.dump(report, f, indent=4)
        print(f"Report saved to {filename}")

def main():
    parser = argparse.ArgumentParser(description="Network Security Scanner")
    parser.add_argument("target", help="Target IP address or hostname")
    parser.add_argument("-p", "--ports", default="1-1000", help="Port range to scan (e.g. 1-100)")
    parser.add_argument("-t", "--threads", type=int, default=100, help="Number of threads to use")
    parser.add_argument("-o", "--output", help="Save results to file")
    parser.add_argument("-v", "--verbose", action="store_true", help="Verbose output")
    parser.add_argument("--timeout", type=float, default=1.0, help="Timeout for connections in seconds")
    
    args = parser.parse_args()
    
    start_port, end_port = map(int, args.ports.split("-"))
    
    print("=" * 60)
    print("NETWORK SECURITY SCANNER")
    print("=" * 60)
    
    scanner = NetworkScanner(
        args.target,
        start_port=start_port,
        end_port=end_port,
        threads=args.threads,
        timeout=args.timeout,
        verbose=args.verbose
    )
    
    results = scanner.scan()
    
    if args.output:
        scanner.save_results(args.output)

if __name__ == "__main__":
    main();
`;
