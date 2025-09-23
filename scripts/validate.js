#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

function validateLogo(protocolId) {
  const logosDir = path.join(__dirname, '..', 'logos');
  const logoPath = path.join(logosDir, `${protocolId.toLowerCase()}.svg`);
  
  // Check if logo file exists
  if (!fs.existsSync(logoPath)) {
    console.error(`❌ ${protocolId} - Missing logo: ${protocolId.toLowerCase()}.svg`);
    return false;
  }
  
  try {
    // Read and validate SVG content
    const logoContent = fs.readFileSync(logoPath, 'utf8');
    
    // Basic SVG validation
    if (!logoContent.includes('<svg')) {
      console.error(`❌ ${protocolId} - Logo is not a valid SVG file`);
      return false;
    }
    
    // Check if file is not empty
    if (logoContent.trim().length === 0) {
      console.error(`❌ ${protocolId} - Logo file is empty`);
      return false;
    }
    
    // Check file size (warn if too large)
    const stats = fs.statSync(logoPath);
    const fileSizeKB = stats.size / 1024;
    if (fileSizeKB > 100) {
      console.warn(`⚠️  ${protocolId} - Logo file is large (${fileSizeKB.toFixed(1)}KB). Consider optimizing.`);
    }
    
    console.log(`✅ ${protocolId} - Logo valid (${fileSizeKB.toFixed(1)}KB)`);
    return true;
  } catch (error) {
    console.error(`❌ ${protocolId} - Logo validation error: ${error.message}`);
    return false;
  }
}

function validateUrl(url, fieldName, protocolId) {
  if (!url) return true; // Optional field
  
  try {
    new URL(url);
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      console.error(`❌ ${protocolId} - ${fieldName} must be a valid HTTP/HTTPS URL`);
      return false;
    }
    return true;
  } catch {
    console.error(`❌ ${protocolId} - ${fieldName} is not a valid URL: ${url}`);
    return false;
  }
}

function validateOpportunities(opportunities, protocolId) {
  if (!opportunities) return true; // Optional field
  
  if (!Array.isArray(opportunities)) {
    console.error(`❌ ${protocolId} - opportunities must be an array`);
    return false;
  }
  
  const validTypes = ['validator', 'prover', 'sequencer', 'relayer', 'full_node', 'light_client'];
  const validStatuses = ['testnet', 'mainnet', 'beta', 'devnet'];
  
  for (let i = 0; i < opportunities.length; i++) {
    const opp = opportunities[i];
    
    // Check required fields in opportunity
    if (!opp.id) {
      console.error(`❌ ${protocolId} - opportunity[${i}] missing required field: id`);
      return false;
    }
    
    // Validate type if present
    if (opp.type && !validTypes.includes(opp.type)) {
      console.warn(`⚠️  ${protocolId} - opportunity[${i}] has unknown type: ${opp.type}`);
    }
    
    // Validate status if present
    if (opp.status && !validStatuses.includes(opp.status)) {
      console.warn(`⚠️  ${protocolId} - opportunity[${i}] has unknown status: ${opp.status}`);
    }
    
    // Validate requirements if present
    if (opp.requirements && !validateRequirements(opp.requirements, protocolId, i)) {
      return false;
    }
  }
  
  return true;
}

function validateRequirements(requirements, protocolId, oppIndex) {
  if (!Array.isArray(requirements)) {
    console.error(`❌ ${protocolId} - opportunity[${oppIndex}] requirements must be an array`);
    return false;
  }
  
  const validTiers = ['minimum', 'recommended', 'optimal'];
  const validEntries = ['permissionless', 'permissioned'];
  const validStorageMedia = ['SSD', 'NVME', 'HDD'];
  
  for (let i = 0; i < requirements.length; i++) {
    const req = requirements[i];
    
    // Validate tier if present
    if (req.tier && !validTiers.includes(req.tier)) {
      console.warn(`⚠️  ${protocolId} - requirement[${i}] has unknown tier: ${req.tier}`);
    }
    
    // Validate entry if present
    if (req.entry && !validEntries.includes(req.entry)) {
      console.warn(`⚠️  ${protocolId} - requirement[${i}] has unknown entry: ${req.entry}`);
    }
    
    // Validate hardware if present
    if (req.hardware) {
      const hw = req.hardware;
      
      // Check numeric fields
      if (hw.cpuCores && (!Number.isInteger(hw.cpuCores) || hw.cpuCores <= 0)) {
        console.error(`❌ ${protocolId} - requirement[${i}] cpuCores must be a positive integer`);
        return false;
      }
      
      if (hw.ramGb && (!Number.isInteger(hw.ramGb) || hw.ramGb <= 0)) {
        console.error(`❌ ${protocolId} - requirement[${i}] ramGb must be a positive integer`);
        return false;
      }
      
      if (hw.storageGb && (!Number.isInteger(hw.storageGb) || hw.storageGb <= 0)) {
        console.error(`❌ ${protocolId} - requirement[${i}] storageGb must be a positive integer`);
        return false;
      }
      
      // Validate storage media
      if (hw.storageMedia && !validStorageMedia.includes(hw.storageMedia)) {
        console.warn(`⚠️  ${protocolId} - requirement[${i}] has unknown storageMedia: ${hw.storageMedia}`);
      }
      
      // Check boolean fields
      if (hw.staticIpPreferred !== undefined && typeof hw.staticIpPreferred !== 'boolean') {
        console.error(`❌ ${protocolId} - requirement[${i}] staticIpPreferred must be boolean`);
        return false;
      }
      
      if (hw.upsRequired !== undefined && typeof hw.upsRequired !== 'boolean') {
        console.error(`❌ ${protocolId} - requirement[${i}] upsRequired must be boolean`);
        return false;
      }
    }
  }
  
  return true;
}

function validateProtocol(filePath) {
  const filename = path.basename(filePath);
  
  try {
    const content = fs.readFileSync(filePath, 'utf8');

    // Check JSON syntax
    let data;
    try {
      data = JSON.parse(content);
    } catch (error) {
      console.error(`❌ ${filename} - Invalid JSON: ${error.message}`);
      return false;
    }

    // Check required fields
    const required = ['id', 'name', 'description'];
    const missing = required.filter(field => !data[field] || (typeof data[field] === 'string' && data[field].trim() === ''));

    if (missing.length > 0) {
      console.error(`❌ ${filename} - Missing or empty required fields: ${missing.join(', ')}`);
      return false;
    }

    const protocolId = data.id;

    // Validate ID format
    if (!/^[a-z0-9_-]+$/.test(protocolId)) {
      console.error(`❌ ${filename} - ID should only contain lowercase letters, numbers, hyphens, and underscores`);
      return false;
    }

    // Check filename matches ID
    const expectedFilename = `${protocolId}.json`;
    if (filename !== expectedFilename) {
      console.error(`❌ ${filename} - Filename should match protocol ID: expected ${expectedFilename}`);
      return false;
    }

    // Validate optional URLs
    if (!validateUrl(data.website, 'website', protocolId)) return false;
    if (!validateUrl(data.documentation, 'documentation', protocolId)) return false;

    // Validate boolean fields
    if (data.isActive !== undefined && typeof data.isActive !== 'boolean') {
      console.error(`❌ ${protocolId} - isActive must be boolean`);
      return false;
    }

    // Validate arrays
    if (data.tags && !Array.isArray(data.tags)) {
      console.error(`❌ ${protocolId} - tags must be an array`);
      return false;
    }

    if (data.docsIntegration && !Array.isArray(data.docsIntegration)) {
      console.error(`❌ ${protocolId} - docsIntegration must be an array`);
      return false;
    }

    // Validate opportunities structure
    if (!validateOpportunities(data.opportunities, protocolId)) {
      return false;
    }

    // Validate protocol logo
    const logoValid = validateLogo(data.id);
    if (!logoValid) {
      return false;
    }

    console.log(`✅ ${filename} - Protocol data valid`);
    return true;
  } catch (error) {
    console.error(`❌ ${filename} - Error: ${error.message}`);
    return false;
  }
}

function main() {
  console.log('🔍 Validating protocol files and logos...\n');

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