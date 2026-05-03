# OSINT-Terminal 🕵️‍♂️

A fast, concurrent command-line reconnaissance tool built with Node.js. It allows you to search for a specific username across multiple platforms simultaneously to gather open-source intelligence (OSINT).

## Features
- **Asynchronous & Concurrent:** Fires all HTTP requests concurrently using `Promise.allSettled` for maximum speed and efficiency.
- **Bot-Protection Bypass:** Utilizes custom `User-Agent` headers to bypass basic bot-blocking mechanisms on target websites.
- **Dynamic Status Handling:** Accurately interprets various HTTP status codes (200, 404, 403) and custom JSON error responses (e.g., Reddit's API).
- **Clean CLI UI:** Color-coded terminal output using `chalk` for quick and readable visual reconnaissance.

## Prerequisites
- [Node.js](https://nodejs.org/) (v14.0.0 or higher recommended)

## Installation

1. Clone the repository:
   ```bash
   git clone [https://github.com/yourusername/osint-terminal.git](https://github.com/yourusername/osint-terminal.git)
   cd osint-terminal
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## Usage

Run the tool by providing a target username as an argument.
```bash
node osint.js <username>
```

**Example:**
```bash
node osint.js torvalds
```

## Supported Platforms
Currently, the tool scans the following platforms:
- GitHub
- Reddit
- Linktree
- Chess.com
- Steam
- Vimeo
- Dev.to
- Codecademy

## Tech Stack
- **Node.js:** Core runtime environment.
- **axios:** Promise-based HTTP client for Node.js.
- **chalk:** Terminal string styling.

## Disclaimer
This project is intended for educational purposes and ethical open-source intelligence gathering only. Do not use this tool to harass, scrape sensitive data, or spam servers.