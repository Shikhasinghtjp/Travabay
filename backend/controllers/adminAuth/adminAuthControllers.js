import bcrypt from 'bcryptjs';
import { query } from '../../config/db.js';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

const JWT_SECRET = process.env.JWT_SECRET;

export const loginAdmin = async (req, res) => {
    const { email, password } = req.body;
    // 1. Basic Validation
    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required.' });
    }
    try {
        // 2. Look up admin by email in the 'admins' table
        const sql = `SELECT id, email, password FROM admin WHERE email = ?`;
        const admins = await query(sql, [email]); // 
        // Check if admin user exists
        if (admins.length === 0) {
          console.log('ERROR: User not found in DB with that email.');          return res.status(401).json({ msg: 'Invalid credentials' });
        }
        const admin = admins[0];
        console.log('2. Stored Hash from DB:', admin.password);
        // 3. Compare the provided password with the stored HASHED password
        const isMatch = await bcrypt.compare(password, admin.password);
        console.log('3. bcrypt.compare Result (isMatch):', isMatch); 
        if (!isMatch) {
          console.log('ERROR: Password Mismatch (bcrypt.compare returned false).');
            return res.status(401).json({ msg: 'Invalid credentials' });
        }
        // 4. Create a JSON Web Token (JWT)
        const payload = {
            id: admin.id, 
        };
        const token = jwt.sign(
            payload,
            JWT_SECRET,
            { expiresIn: '1h' }
        );
        // 5. Success Response: Send the token
        res.status(200).json({
            token,
            msg: 'Admin login successful',
        });
    } catch (error) {
        console.error("Admin Login failed:", error);
        res.status(500).json({ msg: 'Server error, please try again' });
    }
  };

  //fetch frontend users for admin dashboard
export const getAllUsers = async (req, res) => {    
    try {
        const sql = `
            SELECT id, username, fullname, gender, email, address, phone 
            FROM users
            ORDER BY id DESC
        `;
        
        const rows = await query(sql);
        res.status(200).json(rows);

    } catch (error) {
        console.error('Error fetching all users for admin dashboard:', error);
        res.status(500).json({ message: 'Failed to fetch user list from database.' });
    }
};

//fetch admin details for admin dashboard
export const getAllAdmin = async (req, res) => {
    try {
        const sql = `
            SELECT id, username, fullname, email, status
            FROM admin
            ORDER BY id DESC
        `;
        
        const rows = await query(sql);
        res.status(200).json(rows);

    } catch (error) {
        console.error('Error fetching all users for admin dashboard:', error);
        res.status(500).json({ message: 'Failed to fetch user list from database.' });
    }
}