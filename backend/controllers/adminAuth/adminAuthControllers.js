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

//Add user
export const addUser = async (req, res) => {
    const { username, fullName, email, phone, gender, address, password, status } = req.body;

    if (!username || !fullName || !email || !phone || !gender || !address || !password) {
        return res.status(400).json({ message: 'All required user fields must be provided.' });
    }
    
    // Default status to 'Active' if not provided
    const userStatus = status || 'Active';

    try {
        // Check if user already exists
        const checkSql = `SELECT id FROM users WHERE email = ?`;
        const existingUser = await query(checkSql, [email]);
        if (existingUser.length > 0) {
            return res.status(409).json({ message: 'User with this email already exists.' });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const insertSql = `
            INSERT INTO users (username, fullName, email, phone, gender, address, password, status)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `;
        const values = [username, fullName, email, phone, gender, address, hashedPassword, userStatus];

        const result = await query(insertSql, values);

        res.status(201).json({ 
            message: 'User added successfully!', 
            userId: result.insertId 
        });

    } catch (error) {
        console.error("Error adding user:", error);
        res.status(500).json({ message: 'Failed to add user.' });
    }
};

// ----------------------------------------------------
// 2. UPDATE: Modify Existing User Details
// ----------------------------------------------------
export const updateUser = async (req, res) => {
    const { id } = req.params;
    const { username, fullName, email, phone, gender, address, password, status } = req.body;

    if (!username || !fullName || !email || !phone || !gender || !address || !status) {
        return res.status(400).json({ message: 'All fields are required for a complete update.' });
    }

    try {
        let updateSql = `
            UPDATE users SET 
            username = ?, fullName = ?, email = ?, phone = ?, gender = ?, address = ?, status = ?
        `;
        let values = [username, fullName, email, phone, gender, address, status];

        // Handle optional password update
        if (password) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            updateSql += `, password = ?`;
            values.push(hashedPassword);
        }

        updateSql += ` WHERE id = ?`;
        values.push(id);

        const result = await query(updateSql, values);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'User not found or no changes were made.' });
        }

        res.status(200).json({ message: 'User updated successfully!' });

    } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).json({ message: 'Failed to update user.' });
    }
};

// ----------------------------------------------------
// 3. DELETE: Remove User
// ----------------------------------------------------
export const deleteUser = async (req, res) => {
    const { id } = req.params;

    try {
        const sql = `DELETE FROM users WHERE id = ?`;
        const result = await query(sql, [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'User not found.' });
        }

        res.status(200).json({ message: 'User deleted successfully!' });

    } catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).json({ message: 'Failed to delete user.' });
    }
};

// ----------------------------------------------------
// 4. PATCH: Toggle User Status
// ----------------------------------------------------
export const toggleUserStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body; // Expecting 'Active' or 'Suspended'

    if (!status || (status !== 'Active' && status !== 'Suspended')) {
        return res.status(400).json({ message: 'Invalid status provided.' });
    }

    try {
        const sql = `UPDATE users SET status = ? WHERE id = ?`;
        const result = await query(sql, [status, id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'User not found.' });
        }

        res.status(200).json({ message: `User status set to ${status} successfully.` });

    } catch (error) {
        console.error("Error toggling user status:", error);
        res.status(500).json({ message: 'Failed to update user status.' });
    }
};