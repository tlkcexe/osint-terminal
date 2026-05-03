const axios = require('axios');
const chalk = require('chalk');

// Parse command line arguments
const [, , username] = process.argv;

if (!username) {
    console.log(chalk.cyan('\n=== OSINT-TERMINAL ==='));
    console.log(chalk.yellow('Usage: node osint.js <username>'));
    console.log(chalk.gray('Example: node osint.js john_doe\n'));
    process.exit(1);
}

console.log(chalk.cyan(`\n[*] Starting OSINT scan for target: ${chalk.bold(username)}`));
console.log(chalk.gray('==================================================\n'));

// Dictionary of target websites
const sites = {
    'GitHub': `https://github.com/${username}`,
    'Reddit': `https://www.reddit.com/user/${username}/about.json`,
    'Linktree': `https://linktr.ee/${username}`,
    'Chess.com': `https://www.chess.com/member/${username}`,
    'Steam (Custom URL)': `https://steamcommunity.com/id/${username}`,
    'Vimeo': `https://vimeo.com/${username}`,
    'Dev.to': `https://dev.to/${username}`,
    'Codecademy': `https://www.codecademy.com/profiles/${username}`
};

// Request configuration to bypass basic bot protection
const axiosConfig = {
    timeout: 5000,
    headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36'
    },
    validateStatus: function (status) {
        return status < 500; // Resolve only if the status code is less than 500 (handle 404 manually)
    }
};

async function scanSites() {
    // Fire all requests concurrently for maximum speed
    const promises = Object.entries(sites).map(async ([siteName, url]) => {
        try {
            const response = await axios.get(url, axiosConfig);
            
            // If the status is 200 OK, the profile likely exists
            if (response.status === 200) {
                // Specific edge-case handling (e.g., Reddit returning 200 with an error object)
                if (siteName === 'Reddit' && response.data.error) {
                    return { siteName, url, found: false };
                }
                return { siteName, url, found: true };
            }
            
            // If it's a 404, user doesn't exist
            return { siteName, url, found: false };
        } catch (error) {
            // Handle timeouts or aggressive bot blocking (e.g., Cloudflare 403)
            return { siteName, url, found: false, error: true };
        }
    });

    // Wait for all requests to finish
    const results = await Promise.allSettled(promises);
    
    let foundCount = 0;

    // Process and print results
    results.forEach(result => {
        if (result.status === 'fulfilled') {
            const data = result.value;
            if (data.found) {
                console.log(chalk.green(`[+] ${data.siteName}: `) + chalk.white(data.url));
                foundCount++;
            } else if (!data.error) {
                console.log(chalk.red(`[-] ${data.siteName}: `) + chalk.gray('Not Found'));
            } else {
                console.log(chalk.yellow(`[!] ${data.siteName}: `) + chalk.gray('Connection Error / Blocked'));
            }
        }
    });

    console.log(chalk.gray('\n=================================================='));
    console.log(chalk.cyan(`[*] Scan completed. Found matches on ${chalk.bold(foundCount)} platform(s).\n`));
}

scanSites();