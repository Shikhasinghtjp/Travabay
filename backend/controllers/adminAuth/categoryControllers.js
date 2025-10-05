import { query } from '../../config/db.js';
import 'dotenv/config';

const JWT_SECRET = process.env.JWT_SECRET;

//fetch categories from category table
export const getAllCategories = async (req, res) => {
    try {
        const sql = 'SELECT id, category, status FROM categories';
        const rows = await query(sql);
        res.status(200).json(rows);
    } catch (error) {
        console.error('Error fetching categories:', error);
        res.status(500).json({ message: 'Failed to fetch categories from database.' });
    }
};
// Add a new category (POST)
export const addCategory = async (req, res) => {
    const { category, status } = req.body; // category here is the name field

    if (!category || !status) {
        return res.status(400).json({ message: 'Category name and status are required.' });
    }

    try {
        // SQL uses 'name' column for category name in the database
        const sql = 'INSERT INTO categories (category) VALUES (?)';
        const values = [category];

        const result = await query(sql, values);
        
        if (result.affectedRows === 0) {
             throw new Error('Database insertion failed.');
        }

        res.status(201).json({ 
            message: 'Category added successfully!',
            categoryId: result.insertId
        });

    } catch (error) {
        console.error('Error adding category:', error);
         if (error.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({ message: 'Category name already exists.' });
        }
        res.status(500).json({ message: 'Failed to add category to database.' });
    }
};


