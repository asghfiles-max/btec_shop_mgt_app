const fs = require('fs');
const path = require('path');

// Combine all SQL files into one migration file
const schemaFiles = fs.readdirSync(path.join(__dirname, '../database/schema')).sort();
const functionFiles = fs.readdirSync(path.join(__dirname, '../database/functions')).sort();
const triggerFiles = fs.readdirSync(path.join(__dirname, '../database/triggers')).sort();
const viewFiles = fs.readdirSync(path.join(__dirname, '../database/views')).sort();

let combinedSQL = '-- Database Migration for Printing Shop Management System\n';
combinedSQL += '-- Generated automatically\n\n';

// Add schema files
combinedSQL += '-- ==================== SCHEMA ====================\n';
schemaFiles.forEach(file => {
  const content = fs.readFileSync(path.join(__dirname, '../database/schema', file), 'utf8');
  combinedSQL += `-- File: ${file}\n`;
  combinedSQL += content;
  combinedSQL += '\n\n';
});

// Add function files
combinedSQL += '-- ==================== FUNCTIONS ====================\n';
functionFiles.forEach(file => {
  const content = fs.readFileSync(path.join(__dirname, '../database/functions', file), 'utf8');
  combinedSQL += `-- File: ${file}\n`;
  combinedSQL += content;
  combinedSQL += '\n\n';
});

// Add trigger files
combinedSQL += '-- ==================== TRIGGERS ====================\n';
triggerFiles.forEach(file => {
  const content = fs.readFileSync(path.join(__dirname, '../database/triggers', file), 'utf8');
  combinedSQL += `-- File: ${file}\n`;
  combinedSQL += content;
  combinedSQL += '\n\n';
});

// Add view files
combinedSQL += '-- ==================== VIEWS ====================\n';
viewFiles.forEach(file => {
  const content = fs.readFileSync(path.join(__dirname, '../database/views', file), 'utf8');
  combinedSQL += `-- File: ${file}\n`;
  combinedSQL += content;
  combinedSQL += '\n\n';
});

// Write combined SQL file
const outputPath = path.join(__dirname, '../database/migration_combined.sql');
fs.writeFileSync(outputPath, combinedSQL);

console.log('Combined migration file created: database/migration_combined.sql');
console.log('\nTo apply the migration:');
console.log('1. Open your Supabase project dashboard (https://app.supabase.com)');
console.log('2. Go to SQL Editor');
console.log('3. Create a new query');
console.log('4. Copy and paste the contents of database/migration_combined.sql');
console.log('5. Run the query');
console.log('\nAlternatively, run individual files from the database/ subdirectories.');
