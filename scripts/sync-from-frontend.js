#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

/**
 * Sync script to extract individual protocol files from frontend's protocols.json
 *
 * Usage: node scripts/sync-from-frontend.js <path-to-frontend-protocols.json>
 */

function extractProtocols(frontendJsonPath) {
  // Read frontend protocols.json
  if (!fs.existsSync(frontendJsonPath)) {
    console.error(`❌ Frontend protocols.json not found at: ${frontendJsonPath}`);
    process.exit(1);
  }

  console.log(`📖 Reading protocols from: ${frontendJsonPath}\n`);

  const frontendData = JSON.parse(fs.readFileSync(frontendJsonPath, 'utf8'));
  const protocols = frontendData.protocols || [];

  if (protocols.length === 0) {
    console.log('⚠️  No protocols found in frontend file');
    process.exit(0);
  }

  console.log(`Found ${protocols.length} protocols to sync:\n`);

  const protocolsDir = path.join(__dirname, '..', 'protocols');

  // Ensure protocols directory exists
  if (!fs.existsSync(protocolsDir)) {
    fs.mkdirSync(protocolsDir, { recursive: true });
  }

  let created = 0;
  let updated = 0;
  let skipped = 0;

  // Extract each protocol to individual file
  for (const protocol of protocols) {
    const filename = `${protocol.id}.json`;
    const filepath = path.join(protocolsDir, filename);
    const exists = fs.existsSync(filepath);

    // Pretty print JSON
    const content = JSON.stringify(protocol, null, 2) + '\n';

    try {
      // Check if file exists and if content is different
      if (exists) {
        const existingContent = fs.readFileSync(filepath, 'utf8');
        if (existingContent === content) {
          console.log(`⏭️  ${filename} - No changes`);
          skipped++;
          continue;
        }
        console.log(`📝 ${filename} - Updated`);
        updated++;
      } else {
        console.log(`✨ ${filename} - Created`);
        created++;
      }

      fs.writeFileSync(filepath, content, 'utf8');
    } catch (error) {
      console.error(`❌ ${filename} - Error: ${error.message}`);
    }
  }

  console.log(`\n📊 Sync Summary:`);
  console.log(`   ✨ Created: ${created}`);
  console.log(`   📝 Updated: ${updated}`);
  console.log(`   ⏭️  Skipped: ${skipped}`);
  console.log(`   📄 Total: ${protocols.length}`);

  // List protocols in operators repo that are NOT in frontend
  console.log('\n🔍 Checking for protocols only in operators repo...');
  const frontendIds = new Set(protocols.map(p => p.id));
  const operatorsFiles = fs.readdirSync(protocolsDir)
    .filter(f => f.endsWith('.json'))
    .map(f => f.replace('.json', ''));

  const onlyInOperators = operatorsFiles.filter(id => !frontendIds.has(id));

  if (onlyInOperators.length > 0) {
    console.log(`\n⚠️  Found ${onlyInOperators.length} protocol(s) only in operators repo:`);
    onlyInOperators.forEach(id => console.log(`   - ${id}.json`));
    console.log('\n💡 These files were not modified. Delete manually if no longer needed.');
  } else {
    console.log('✅ All operators repo protocols are present in frontend');
  }

  console.log('\n✅ Sync complete!');
  console.log('\n📋 Next steps:');
  console.log('   1. Review changes: git diff protocols/');
  console.log('   2. Validate: node scripts/validate.js');
  console.log('   3. Compile: node scripts/compile.js');
  console.log('   4. Commit changes');
}

// Main
if (require.main === module) {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.log('Usage: node scripts/sync-from-frontend.js <path-to-frontend-protocols.json>');
    console.log('\nExample:');
    console.log('  node scripts/sync-from-frontend.js ../operators-frontend/data/operators/protocols.json');
    process.exit(1);
  }

  const frontendJsonPath = path.resolve(args[0]);
  extractProtocols(frontendJsonPath);
}

module.exports = { extractProtocols };
