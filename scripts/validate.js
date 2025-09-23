#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

function validateProtocol(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');

    // Check JSON syntax
    let data;
    try {
      data = JSON.parse(content);
    } catch (error) {
      console.error(`❌ ${path.basename(filePath)} - Invalid JSON`);
      return false;
    }

    // Check only essential fields
    const required = ['id', 'name', 'description'];
    const missing = required.filter(field => !data[field]);

    if (missing.length > 0) {
      console.error(`❌ ${path.basename(filePath)} - Missing: ${missing.join(', ')}`);
      return false;
    }

    console.log(`✅ ${path.basename(filePath)} - Valid`);
    return true;
  } catch (error) {
    console.error(`❌ ${path.basename(filePath)} - Error: ${error.message}`);
    return false;
  }
}

function main() {
  console.log('🔍 Validating protocol files...\n');

  const protocolsDir = path.join(__dirname, '..', 'protocols');

  if (!fs.existsSync(protocolsDir)) {
    console.error('❌ Protocols directory not found');
    process.exit(1);
  }

  const files = fs.readdirSync(protocolsDir)
    .filter(file => file.endsWith('.json'))
    .map(file => path.join(protocolsDir, file));

  if (files.length === 0) {
    console.log('⚠️  No JSON files found');
    process.exit(0);
  }

  let allValid = true;
  for (const file of files) {
    if (!validateProtocol(file)) {
      allValid = false;
    }
  }

  console.log(`\n📊 ${files.length} files processed`);

  if (allValid) {
    console.log('✅ All files valid!');
    process.exit(0);
  } else {
    console.log('❌ Some files have issues');
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}