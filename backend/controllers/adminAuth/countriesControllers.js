import { query } from '../../config/db.js';
import 'dotenv/config';

// GET all countries/packages
export const getCountries = async (req, res) => {
  try {
    const [rows] = await db.query(
      `SELECT * FROM countries ORDER BY id DESC`
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch countries" });
  }
};

// POST add new country/package
export const addCountry = async (req, res) => {
  try {
    const {
      package_name,
      category_id,
      subcategory_id,
      location,
      price,
      date,
      duration,
      about,
      files, // array of uploaded files with name, type, size
    } = req.body;

    if (!package_name || !category_id || !subcategory_id)
      return res.status(400).json({ message: "Required fields missing" });

    const [result] = await db.query(
      `INSERT INTO countries 
      (package_name, category_id, subcategory_id, location, price, date, duration, about, files) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        package_name,
        category_id,
        subcategory_id,
        location,
        price,
        date,
        duration,
        about,
        JSON.stringify(files || []),
      ]
    );

    res.status(201).json({ message: "Package added successfully", id: (result as any).insertId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to add package" });
  }
};

// DELETE country/package
export const deleteCountry = async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await db.query(`DELETE FROM countries WHERE id = ?`, [id]);
    res.json({ message: "Package deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to delete package" });
  }
};
