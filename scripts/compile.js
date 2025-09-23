#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

function loadProtocols() {
  const protocolsDir = path.join(__dirname, '..', 'protocols');

  if (!fs.existsSync(protocolsDir)) {
    console.error('❌ Protocols directory not found');
    process.exit(1);
  }

  const files = fs.readdirSync(protocolsDir)
    .filter(file => file.endsWith('.json'))
    .sort(); // Ensure consistent ordering

  if (files.length === 0) {
    console.log('⚠️  No JSON files found in protocols directory');
    return [];
  }

  const protocols = [];

  for (const file of files) {
    try {
      const filePath = path.join(protocolsDir, file);
      const content = fs.readFileSync(filePath, 'utf8');
      const protocol = JSON.parse(content);

      protocols.push(protocol);
      console.log(`✅ Loaded ${file}`);
    } catch (error) {
      console.error(`❌ Failed to load ${file}:`, error.message);
      process.exit(1);
    }
  }

  return protocols;
}

function compileProtocols(protocols) {
  const compiledData = {
    protocols: protocols,
    lastUpdated: new Date().toISOString()
  };

  return JSON.stringify(compiledData, null, 2);
}

function writeCompiledFile(content) {
  const outputPath = path.join(__dirname, '..', 'protocols.json');

  try {
    fs.writeFileSync(outputPath, content, 'utf8');
    console.log(`✅ Compiled protocols written to ${path.basename(outputPath)}`);
    return true;
  } catch (error) {
    console.error('❌ Failed to write compiled file:', error.message);
    return false;
  }
}

function validateOutput(outputPath, expectedProtocolCount) {
  try {
    const content = fs.readFileSync(outputPath, 'utf8');
    const data = JSON.parse(content);

    if (!data.protocols || !Array.isArray(data.protocols)) {
      console.error('❌ Compiled file missing protocols array');
      return false;
    }

    if (data.protocols.length !== expectedProtocolCount) {
      console.error(`❌ Expected ${expectedProtocolCount} protocols, got ${data.protocols.length}`);
      return false;
    }

    if (!data.lastUpdated) {
      console.error('❌ Compiled file missing lastUpdated timestamp');
      return false;
    }

    console.log(`✅ Validation passed: ${data.protocols.length} protocols compiled`);
    return true;
  } catch (error) {
    console.error('❌ Failed to validate compiled file:', error.message);
    return false;
  }
}

function main() {
  console.log('🔨 Compiling protocol files...\n');

  // Load all protocol files
  const protocols = loadProtocols();

  if (protocols.length === 0) {
    console.log('📝 Creating empty protocols.json file');
  }

  // Compile into single file
  const compiledContent = compileProtocols(protocols);

  // Write compiled file
  if (!writeCompiledFile(compiledContent)) {
    process.exit(1);
  }

  // Validate output
  const outputPath = path.join(__dirname, '..', 'protocols.json');
  if (!validateOutput(outputPath, protocols.length)) {
    process.exit(1);
  }

  console.log(`\n📊 Compilation complete!`);
  console.log(`   📄 ${protocols.length} protocols compiled`);
  console.log(`   📍 Output: protocols.json`);
  console.log(`   🕒 Timestamp: ${new Date().toISOString()}`);
}

if (require.main === module) {
  main();
}