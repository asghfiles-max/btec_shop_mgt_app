const jwt = require('jsonwebtoken');
const supabase = require('../config/supabase');

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  console.error('ERROR: JWT_SECRET is required.');
  console.error('Please set JWT_SECRET in Vercel or your .env file.');
}

async function authenticate(req, res, next) {
  const authorization = req.headers.authorization || req.headers.Authorization;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Authorization token required' });
  }

  const token = authorization.split(' ')[1];
  
  if (!JWT_SECRET) {
    return res.status(500).json({ error: 'Server configuration error' });
  }

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    
    if (!supabase) {
      return res.status(500).json({ error: 'Database service not configured' });
    }
    
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
