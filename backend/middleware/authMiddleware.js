const jwt = require('jsonwebtoken');

// Middleware to verify JWT token
const authMiddleware = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'অননুমোদিত: টোকেন প্রয়োজন' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    req.admin = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'অবৈধ বা মেয়াদোত্তীর্ণ টোকেন' });
  }
};

// Middleware to check if admin has required permission
const checkPermission = (requiredPermission) => {
  return (req, res, next) => {
    if (!req.admin) {
      return res.status(401).json({ message: 'অননুমোদিত' });
    }

    // Super admin has all permissions
    if (req.admin.role === 'super_admin' || req.admin.permissions.includes('all')) {
      return next();
    }

    if (!req.admin.permissions.includes(requiredPermission)) {
      return res.status(403).json({ message: 'এই কাজের অনুমতি নেই' });
    }

    next();
  };
};

// Middleware to check if super admin
const checkSuperAdmin = (req, res, next) => {
  if (!req.admin) {
    return res.status(401).json({ message: 'অননুমোদিত' });
  }

  if (req.admin.role !== 'super_admin') {
    return res.status(403).json({ message: 'শুধুমাত্র সুপার অ্যাডমিন এই কাজ করতে পারেন' });
  }

  next();
};

module.exports = {
  authMiddleware,
  checkPermission,
  checkSuperAdmin
};
