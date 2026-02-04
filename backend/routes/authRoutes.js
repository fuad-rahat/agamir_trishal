const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

// Bootstrap master credentials (simple one-step login)
const BOOTSTRAP_EMAIL = 'fuadrahat01@gmail.com';
const BOOTSTRAP_PASSWORD = 'rahat123trishal';

// Register Admin (only super_admin or no admins exist)
// Register Admin (ONLY allowed if requester proves super_admin credentials)
router.post('/register', async (req, res) => {
  try {
    const { email, password, fullName, role, superAdminEmail, superAdminPassword } = req.body;

    // Only allow creation when requester is authorized as super_admin.
    // Authorization methods (in order):
    // 1) Bearer token of an existing super_admin
    // 2) Provide superAdminEmail + superAdminPassword that matches an existing super_admin
    // 3) Provide the master bootstrap credentials (hardcoded)

    let authorized = false;

    // 1) Bearer token check - must be super_admin role
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.split(' ')[1];
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
        // Check if token holder is super_admin
        if (decoded.role === 'super_admin') {
          authorized = true;
        } else if (decoded.adminId) {
          const admin = await Admin.findById(decoded.adminId);
          if (admin && admin.role === 'super_admin') {
            authorized = true;
          }
        }
      } catch (err) {
        // ignore token errors - will try other auth methods
      }
    }

    // 2) superAdminEmail + superAdminPassword provided in body
    if (!authorized && superAdminEmail && superAdminPassword) {
      // 2a) master bootstrap credentials
      if (superAdminEmail === 'fuadrahat01@gmail.com' && superAdminPassword === 'rahat123trishal') {
        authorized = true;
      } else {
        // 2b) check against DB for a super_admin
        const superAdmin = await Admin.findOne({ email: superAdminEmail, role: 'super_admin' });
        if (superAdmin) {
          const isValid = await superAdmin.comparePassword(superAdminPassword);
          if (isValid) authorized = true;
        }
      }
    }

    if (!authorized) {
      return res.status(403).json({ message: 'অনুমতি নেই: শুধুমাত্র সুপার অ্যাডমিন নতুন অ্যাডমিন তৈরি করতে পারেন' });
    }

    // Prevent creating duplicate email
    const existing = await Admin.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: 'এই ইমেল ইতিমধ্যে নিবন্ধিত' });
    }

    // Determine role for new admin. Default to 'admin'. Only a super_admin- authorized request
    // may create another super_admin if they explicitly request it.
    const newRole = role === 'super_admin' ? 'super_admin' : 'admin';

    const newAdmin = new Admin({
      email,
      password,
      fullName,
      role: newRole,
      permissions: newRole === 'super_admin' ? ['all'] : ['add_union_info']
    });

    await newAdmin.save();
    res.status(201).json({ message: 'অ্যাডমিন সফলভাবে তৈরি হয়েছে', admin: { email, fullName, role: newRole } });
  } catch (error) {
    res.status(500).json({ message: 'অ্যাডমিন তৈরি বিফল', error: error.message });
  }
});

// Login Admin
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    // Authenticate against DB: only users stored in `admins` collection with role
    // 'admin' or 'super_admin' are allowed to login to the admin portal.
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(401).json({ message: 'অবৈধ ইমেল বা পাসওয়ার্ড' });
    }

    const isPasswordValid = await admin.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'অবৈধ ইমেল বা পাসওয়ার্ড' });
    }

    // Only allow roles 'admin' or 'super_admin' to login here
    if (admin.role !== 'admin' && admin.role !== 'super_admin') {
      return res.status(403).json({ message: 'অ্যাক্সেস নেই: আপনার রোল এই পোর্টালে লগইন করার অনুমতি দেয় না' });
    }

    const token = jwt.sign(
      {
        adminId: admin._id,
        email: admin.email,
        role: admin.role,
        permissions: admin.permissions
      },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '7d' }
    );

    res.json({
      message: 'লগইন সফল',
      token,
      admin: {
        id: admin._id,
        email: admin.email,
        fullName: admin.fullName,
        role: admin.role
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'লগইন বিফল', error: error.message });
  }
});

// Get all admins (super_admin only)
router.get('/admins', async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    console.log('GET /admins - Authorization header:', authHeader ? 'Present' : 'Missing');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'অনুমতি নেই: টোকেন প্রয়োজন' });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    
    console.log('Token decoded. Role:', decoded.role, 'Admin ID:', decoded.adminId);
    
    // Check if requester is super_admin
    const admin = await Admin.findById(decoded.adminId);
    if (!admin) {
      return res.status(401).json({ message: 'অ্যাডমিন খুঁজে পাওয়া যায়নি' });
    }

    if (admin.role !== 'super_admin') {
      return res.status(403).json({ message: 'শুধুমাত্র সুপার অ্যাডমিন অ্যাডমিন তালিকা দেখতে পারেন' });
    }

    console.log('Authorization successful. Fetching admins...');
    const admins = await Admin.find({}, 'email fullName role createdAt');
    console.log('Admins found:', admins.length);
    res.json(admins);
  } catch (error) {
    console.error('GET /admins error:', error.message);
    res.status(500).json({ message: 'অ্যাডমিন তালিকা ফেচ বিফল', error: error.message });
  }
});

// Delete admin (super_admin only)
router.delete('/admins/:id', async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'অনুমতি নেই' });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    
    // Check if requester is super_admin
    const requestingAdmin = await Admin.findById(decoded.adminId);
    if (!requestingAdmin || requestingAdmin.role !== 'super_admin') {
      return res.status(403).json({ message: 'শুধুমাত্র সুপার অ্যাডমিন অ্যাডমিন মুছতে পারেন' });
    }

    // Prevent super_admin from deleting themselves
    if (decoded.adminId === req.params.id) {
      return res.status(400).json({ message: 'আপনি নিজেকে মুছতে পারবেন না' });
    }

    const adminToDelete = await Admin.findByIdAndDelete(req.params.id);
    if (!adminToDelete) {
      return res.status(404).json({ message: 'অ্যাডমিন পাওয়া যায়নি' });
    }

    res.json({ message: 'অ্যাডমিন সফলভাবে মুছা হয়েছে', deletedAdmin: adminToDelete.email });
  } catch (error) {
    res.status(500).json({ message: 'অ্যাডমিন ডিলিট বিফল', error: error.message });
  }
});

module.exports = router;
