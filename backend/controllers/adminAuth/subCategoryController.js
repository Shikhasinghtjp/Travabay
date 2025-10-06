import { query } from '../../config/db.js';
import 'dotenv/config';

const JWT_SECRET = process.env.JWT_SECRET;

// ✅ Get all subcategories (joined with category names)
export const getAllSubcategories = async (req, res) => {
  try {
    const sql = `
      SELECT 
        s.id, 
        s.subcategory, 
        s.category_id, 
        s.status,
        c.category AS category_name
      FROM subcategories s
      JOIN categories c ON s.category_id = c.id
      ORDER BY s.id DESC
    `;
    const rows = await query(sql);
    res.status(200).json(rows);
  } catch (error) {
    console.error("Error fetching subcategories:", error);
    res.status(500).json({ message: "Failed to fetch subcategories." });
  }
};

// Add a new subcategory
export const addSubcategory = async (req, res) => {
  const { subcategory, category_id, status } = req.body;

  if (!subcategory || !category_id || !status) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    const sql = `
      INSERT INTO subcategories (subcategory, category_id, status)
      VALUES (?, ?, ?)
    `;
    const result = await query(sql, [subcategory, category_id, status]);

    res.status(201).json({
      message: "Subcategory added successfully!",
      subcategoryId: result.insertId,
    });
  } catch (error) {
    console.error("Error adding subcategory:", error);
    res.status(500).json({ message: "Failed to add subcategory." });
  }
};
//Update


export const updateSubcategory = async (req, res) => {
  const { id } = req.params;
  const { subcategory, category_id, status } = req.body;

  if (!subcategory || !category_id || !status) {
      return res.status(400).json({ message: "All fields are required for a complete update." });
  }

  try {
      const sql = `
          UPDATE subcategories
          SET subcategory = ?, category_id = ?, status = ?
          WHERE id = ?
      `;
      
      // 🏆 FIX: Use .trim() to remove leading/trailing whitespace and line breaks
      const trimmedSql = sql.trim(); 

      // Execute the query using the trimmed string
      const result = await query(trimmedSql, [subcategory, category_id, status, id]);

      if (result.affectedRows === 0) {
          return res.status(404).json({ message: "Subcategory not found." });
      }

      res.status(200).json({ message: "Subcategory updated successfully." });
  } catch (error) {
      console.error("Error updating subcategory:", error);
      res.status(500).json({ message: "Failed to update subcategory." });
  }
};
// Delete a subcategory

export const deleteSubcategory = async (req, res) => {
    const { id } = req.params;
    try {
      const sql = "DELETE FROM subcategories WHERE id = ?";
      const result = await query(sql, [id]);
  
      if (result.affectedRows === 0)
        return res.status(404).json({ message: "Subcategory not found." });
  
      res.status(200).json({ message: "Subcategory deleted successfully." });
    } catch (error) {
      console.error("Error deleting subcategory:", error);
      res.status(500).json({ message: "Failed to delete subcategory." });
    }
  };

