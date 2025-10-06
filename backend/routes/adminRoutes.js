import express from 'express';
import multer from 'multer';
import {loginAdmin } from '../controllers/adminAuth/adminAuthControllers.js';
import { getAllUsers, getAllAdmin, addUser, 
  updateUser, 
  deleteUser, 
  toggleUserStatus} from '../controllers/adminAuth/adminAuthControllers.js';

import { getAllCategories,addCategory, updateCategory, 
  deleteCategory} from '../controllers/adminAuth/categoryControllers.js';
import { getAllSubcategories,addSubcategory,updateSubcategory, 
  deleteSubcategory } from '../controllers/adminAuth/subCategoryController.js';
import { getCountries, addCountry, updateCountry, deleteCountry } from '../controllers/adminAuth/countriesControllers.js';
const router = express.Router();

router.post('/login', loginAdmin);
router.get('/users/frontend', getAllUsers);  //fetching user list
router.get('/users/admin', getAllAdmin);     //fetching admin list
router.post('/users/admin', addUser);

// UPDATE: Modify an existing user by ID (PUT for complete replacement/update)
router.put(
    '/users/admin/:id', 
    updateUser
);

// PATCH: Toggle the user's status (Active/Suspended)
router.patch(
    '/users/admin/status/:id', 
    toggleUserStatus
);

// DELETE: Remove a user by ID
router.delete(
    '/users/admin/:id', 
    deleteUser
);

router.get('/categories', getAllCategories);     //fetching category list
router.post('/categories', addCategory);         //addcategories
router.put(
  '/categories/:id', 
  updateCategory 
);
router.delete(
  '/categories/:id', 
  deleteCategory
);
router.get('/subcategories', getAllSubcategories);//fetching sub category list
router.post('/subcategories', addSubcategory);//addsubcategories
router.put(
  '/subcategories/:id', 
  updateSubcategory // Controller needs to read req.params.id and req.body
);

// 🏆 NEW ROUTE: Delete a subcategory by ID
router.delete(
  '/subcategories/:id', 
  deleteSubcategory // Controller needs to read req.params.id
);

// Configure storage for files (e.g., store them in a 'uploads' folder)
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      // You must create this folder manually
      cb(null, 'uploads/country_files'); 
    },
    filename: (req, file, cb) => {
      // Save file with original name and timestamp to ensure uniqueness
      cb(null, Date.now() + '-' + file.originalname);
    },
  });
  
  // Create the multer instance
  const upload = multer({ storage: storage }); 
  router.get('/countries', getCountries);//fetching country list
  // Apply multer middleware before your controller function
  router.post('/countries',  upload.array('files', 10), addCountry);
  router.put('/countries/:id',upload.array('files', 10), updateCountry);
  router.delete('/countries/:id', deleteCountry); 

  
export default router;