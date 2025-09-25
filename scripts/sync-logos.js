#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const https = require('https');

// GitHub raw URL base for operators repo
const GITHUB_RAW_BASE = 'https://raw.githubusercontent.com/vistawtf/operators/main/logos';

// Local directory to store SVGs
const LOCAL_LOGOS_DIR = path.join(process.cwd(), 'public', 'protocol-icons');

// Known protocols (update this list when new protocols are added)
const KNOWN_PROTOCOLS = ['aztec', 'lido', 'buildernet', 'eigenda'];

async function downloadFile(url, localPath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(localPath);

    https.get(url, (response) => {
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download ${url}: ${response.statusCode}`));
        return;
      }

      response.pipe(file);

      file.on('finish', () => {
        file.close();
        resolve();
      });

      file.on('error', (err) => {
        fs.unlink(localPath, () => {}); // Delete the file on error
        reject(err);
      });
    }).on('error', (err) => {
      reject(err);
    });
  });
}

async function syncLogos() {
  console.log('🔄 Syncing protocol logos from operators repository...');

  // Create local logos directory if it doesn't exist
  if (!fs.existsSync(LOCAL_LOGOS_DIR)) {
    fs.mkdirSync(LOCAL_LOGOS_DIR, { recursive: true });
    console.log(`📁 Created directory: ${LOCAL_LOGOS_DIR}`);
  }

  const results = {
    success: [],
    failed: []
  };

  // Download each protocol logo
  for (const protocol of KNOWN_PROTOCOLS) {
    const svgUrl = `${GITHUB_RAW_BASE}/${protocol}.svg`;
    const localPath = path.join(LOCAL_LOGOS_DIR, `${protocol}.svg`);

    try {
      await downloadFile(svgUrl, localPath);
      console.log(`✅ Downloaded: ${protocol}.svg`);
      results.success.push(protocol);
    } catch (error) {
      console.warn(`⚠️  Failed to download ${protocol}.svg:`, error.message);
      results.failed.push(protocol);
    }
  }

  // Summary
  console.log(`\n📊 Sync completed:`);
  console.log(`   ✅ Success: ${results.success.length} logos`);
  console.log(`   ⚠️  Failed: ${results.failed.length} logos`);

  if (results.failed.length > 0) {
    console.log(`   Failed logos: ${results.failed.join(', ')}`);
  }

  // Don't fail the build if some logos are missing - they'll use fallback icons
  console.log('\n🎉 Logo sync completed!');
}

// Run the sync
syncLogos().catch((error) => {
  console.error('❌ Logo sync failed:', error);
  process.exit(1);
});