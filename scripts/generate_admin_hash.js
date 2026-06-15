const bcrypt = require('bcryptjs');

const password = 'Iamtech@100';
const saltRounds = 10;

bcrypt.hash(password, saltRounds, (err, hash) => {
  if (err) {
    console.error('Error generating hash:', err);
    process.exit(1);
  }
  console.log('Password hash for admin user:');
  console.log(hash);
  console.log('\nSQL INSERT statement:');
  console.log(`INSERT INTO users (name, email, password, role, active) VALUES ('Admin User', 'burnatecsolutions@gmail.com', '${hash}', 'Super Admin', true);`);
});
