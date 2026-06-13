const jwt = require('jsonwebtoken');
const supabase = require('../config/supabase');

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  throw new Error('JWT_SECRET is required.');
}

async function authenticate(req, res, next) {
  const authorization = req.headers.authorization || req.headers.Authorization;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Authorization token required' });
  }

  const token = authorization.split(' ')[1];
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    const { data, error } = await supabase
      .from('users')
      .select('id,name,email,role,active')
      .eq('id', payload.id)
      .single();

    if (error || !data || data.active === false) {
      return res.status(401).json({ error: 'Unauthorized user' });
    }

    req.user = data;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
}

module.exports = { authenticate };
