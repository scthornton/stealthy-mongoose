
# Red Team Toolkit

## Overview

A comprehensive security assessment toolkit for red teams, featuring:

- **Dashboard**: Visualize security metrics and scan statistics
- **Network Scanner**: Scan networks for open ports and potential vulnerabilities
- **Scan Profiles**: Create and reuse custom scan configurations
- **Scan History**: Review and analyze previous scans
- **Scheduled Scans**: Automate regular security checks
- **Python Implementation**: Download or view the underlying Python code

## Features

### Dashboard
- Summary metrics of security posture
- Charts and visualizations of scan data
- Vulnerability distribution analysis
- Port usage statistics

### Network Scanner
- Target IP/hostname scanning
- Customizable port ranges
- Service identification
- Basic vulnerability assessment

### Scan Profiles
- Save frequently used scan configurations
- Quick-start scans with predefined settings
- Manage multiple profiles for different use cases

### Scan History
- View detailed results of past scans
- Search and filter through scan history
- Download scan reports
- Analyze trends over time

### Scheduled Scans
- Set up automated recurring scans
- Choose from multiple frequency options
- Monitor critical infrastructure automatically
- Enable/disable schedules as needed

## Project Info

This toolkit provides cybersecurity professionals with tools for network reconnaissance, port scanning, service identification, and basic vulnerability assessment. It's designed for educational purposes and authorized security testing.

## How to Run This Project

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

## Technologies Used

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS
- Recharts (for data visualization)

## Deployment

You can deploy this project to any static hosting service like Netlify, Vercel, or GitHub Pages.

## Usage Notes

The scanning functionality is simulated in the web interface for demonstration and educational purposes. The downloadable Python script provides actual scanning capability when run locally.

## Disclaimer

This tool is for educational and authorized testing purposes only. Use responsibly and with proper authorization. Unauthorized scanning of networks may violate laws and regulations.
