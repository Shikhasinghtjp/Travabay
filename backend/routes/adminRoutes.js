import express from 'express';
import {loginAdmin } from '../controllers/adminAuth/adminAuthControllers.js';
import { getAllUsers } from '../controllers/adminAuth/adminAuthControllers.js';
import { getAllAdmin } from '../controllers/adminAuth/adminAuthControllers.js';
import { getAllCategories,addCategory} from '../controllers/adminAuth/categoryControllers.js';
import { getAllSubcategories,addSubcategory} from '../controllers/adminAuth/subCategoryController.js';
const router = express.Router();

router.post('/login', loginAdmin);
router.get('/users/frontend', getAllUsers);  //fetching user list
router.get('/users/admin', getAllAdmin);     //fetching admin list
router.get('/categories', getAllCategories);     //fetching category list
router.post('/categories', addCategory);         //addcategories
router.get('/subcategories', getAllSubcategories);//fetching sub category list
router.post('/subcategories', addSubcategory);//addsubcategories

// router.get('/packages', getAllPackages); fetching package list
  
export default router;