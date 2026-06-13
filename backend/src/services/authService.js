const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const supabase = require('../config/supabase');

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '24h';

async function login(email, password) {
  const { data: user, error } = await supabase
    .from('users')
    .select('id,name,email,password,role,active')
    .eq('email', email)
    .single();

  if (error || !user || !user.active) {
    throw new Error('Invalid credentials');
  }

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) throw new Error('Invalid credentials');

  const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
  return {
    token,
    user: { id: user.id, name: user.name, email: user.email, role: user.role }
  };
}

async function resetPassword(email) {
  const { data: user, error } = await supabase
    .from('users')
    .select('id,email')
    .eq('email', email)
    .single();

  if (error || !user) {
    throw new Error('Email not found');
  }

  return true;
}

module.exports = { login, resetPassword };
