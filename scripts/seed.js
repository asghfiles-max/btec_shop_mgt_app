const fs = require('fs');
const path = require('path');

const seedFile = path.join(__dirname, '../database/seed/sample_data.sql');

console.log(`Seed data file: ${seedFile}`);
console.log('Run seed scripts via Supabase SQL editor or CLI.');
