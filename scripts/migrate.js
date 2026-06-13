const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const files = [
  ...fs.readdirSync(path.join(__dirname, '../database/schema')).map(f => path.join('database/schema', f)),
  ...fs.readdirSync(path.join(__dirname, '../database/functions')).map(f => path.join('database/functions', f)),
  ...fs.readdirSync(path.join(__dirname, '../database/triggers')).map(f => path.join('database/triggers', f)),
  ...fs.readdirSync(path.join(__dirname, '../database/views')).map(f => path.join('database/views', f))
];

console.log('Database migration files:');
files.forEach(f => console.log(`- ${f}`));
console.log('Run migrations via Supabase CLI or SQL editor.');
