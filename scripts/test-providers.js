const path = require('path');

// Mock the import system to load JSON files
const providersDir = path.join(__dirname, '../data/providers');
const fs = require('fs');

console.log('🔍 Testing provider data loading...\n');

const providerFiles = [
  'hosting.json',
  'database.json',
  'cdn.json',
  'email.json',
  'monitoring.json',
  'security.json',
  'serverless.json',
  'storage.json'
];

let totalProviders = 0;
const errors = [];

providerFiles.forEach(file => {
  const filePath = path.join(providersDir, file);
  console.log(`📁 Checking ${file}...`);
  
  try {
    if (!fs.existsSync(filePath)) {
      errors.push(`❌ File not found: ${file}`);
      console.log(`   ❌ File not found`);
      return;
    }
    
    const content = fs.readFileSync(filePath, 'utf8');
    const data = JSON.parse(content);
    
    if (!data.providers || !Array.isArray(data.providers)) {
      errors.push(`❌ Invalid structure in ${file}: missing providers array`);
      console.log(`   ❌ Invalid structure: missing providers array`);
      return;
    }
    
    const count = data.providers.length;
    totalProviders += count;
    console.log(`   ✅ Found ${count} providers`);
    
    // Check each provider has required fields
    data.providers.forEach((provider, index) => {
      if (!provider.id || !provider.name || !provider.category) {
        errors.push(`❌ Provider ${index} in ${file} missing required fields`);
      }
    });
    
  } catch (error) {
    errors.push(`❌ Error reading ${file}: ${error.message}`);
    console.log(`   ❌ Error: ${error.message}`);
  }
});

console.log('\n📊 Summary:');
console.log(`   Total providers found: ${totalProviders}`);
console.log(`   Errors found: ${errors.length}`);

if (errors.length > 0) {
  console.log('\n⚠️  Errors:');
  errors.forEach(error => console.log(`   ${error}`));
} else {
  console.log('\n✅ All provider data loaded successfully!');
}

// Test provider ID uniqueness
console.log('\n🔍 Checking for duplicate provider IDs...');
const allIds = [];
providerFiles.forEach(file => {
  const filePath = path.join(providersDir, file);
  if (fs.existsSync(filePath)) {
    try {
      const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      if (data.providers) {
        data.providers.forEach(p => {
          if (p.id) allIds.push(p.id);
        });
      }
    } catch (e) {}
  }
});

const duplicates = allIds.filter((id, index) => allIds.indexOf(id) !== index);
if (duplicates.length > 0) {
  console.log(`   ❌ Found duplicate IDs: ${duplicates.join(', ')}`);
} else {
  console.log(`   ✅ All provider IDs are unique`);
}