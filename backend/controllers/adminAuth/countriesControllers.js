import { query } from '../../config/db.js';
import 'dotenv/config';

// GET all countries/packages
export const getCountries = async (req, res) => {
  try {
    const sql = 'SELECT * FROM countries';
    const rows = await query(sql);
    res.status(200).json(rows);
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
    } = req.body;

    // 1. Get uploaded file array from Multer
    const uploadedFiles = req.files || [];

    if (!package_name || !category_id || !subcategory_id)
      return res.status(400).json({ message: "Required fields missing" });
    
    // 2. Map files to DB structure, including the full public path
    const filesToDb = uploadedFiles.map(file => ({
      name: file.originalname,
      type: file.mimetype,
      size: file.size,
      // 🏆 CORRECTED PATH: Construct the full path matching Express static serving
      path: `uploads/country_files/${file.filename}`,
  }));
  const filesJson = JSON.stringify(filesToDb); 
    // 🏆 FIX: Removed array destructuring ([result])
    const result = await query( 
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
        filesJson, 
      ]
    );

    res.status(201).json({ message: "Package added successfully", id: result.insertId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to add package" });
  }
};

export const updateCountry = async (req, res) => {
  try {
      const { id } = req.params; 
      const {
          package_name,
          category_id,
          subcategory_id,
          location,
          price,
          date,
          duration,
          about,
          // 🏆 NEW: Get existing file metadata submitted from frontend
          existing_files_data, 
      } = req.body;

      const uploadedFiles = req.files || []; // New files uploaded by Multer

      // 1. Start with the existing file metadata sent from the frontend
      let filesToSave = [];
      if (existing_files_data) {
          try {
              // existing_files_data is a JSON string of files the user wants to keep
              filesToSave = JSON.parse(existing_files_data);
          } catch (e) {
              console.error("Error parsing existing_files_data:", e);
              // If parsing fails, reset to empty array to avoid corrupting data
              filesToSave = [];
          }
      }
      
      // 2. Map new files and append them to the list of files to save
      const newFilesMetadata = uploadedFiles.map(file => ({
          name: file.originalname,
          type: file.mimetype,
          size: file.size,
          path: `uploads/country_files/${file.filename}`,
      }));

      // Combine existing files (sent from client) and new files (from Multer)
      filesToSave = [...filesToSave, ...newFilesMetadata];
      const filesJson = JSON.stringify(filesToSave);

      // 3. Construct the SQL update query (remains mostly the same)
      const updateFields = {
          package_name, category_id, subcategory_id, location, price, date, 
          duration, about, 
          files: filesJson, // Save the combined list
      };

      const setClauses = Object.keys(updateFields)
          .filter(key => updateFields[key] !== undefined)
          .map(key => `${key} = ?`)
          .join(', ');
          
      const values = Object.keys(updateFields)
          .filter(key => updateFields[key] !== undefined)
          .map(key => updateFields[key]);

      if (setClauses.length === 0) {
          return res.status(400).json({ message: "No data provided for update" });
      }

      const sql = `UPDATE countries SET ${setClauses} WHERE id = ?`;
      values.push(id); 

      // 4. Execute the update
      const result = await query(sql, values);

      if (result.affectedRows === 0) {
          return res.status(404).json({ message: `Package with ID ${id} not found` });
      }

      res.status(200).json({ message: "Package updated successfully", id: id });

  } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Failed to update package" });
  }
};
// DELETE country/package
export const deleteCountry = async (req, res) => {
  try {
    const { id } = req.params;
    // 🏆 FIX: Removed array destructuring
    await query(`DELETE FROM countries WHERE id = ?`, [id]);
    res.json({ message: "Package deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to delete package" });
  }
};