import express from "express";

import {
  createUser,
  
  getUserById,
  updateUser,
  deleteUser
} from "../controllers/userController.js";

/////end 

import protect from "../middleware/authMiddleware.js";
import isAdmin from "../middleware/roleMiddleware.js";



const router = express.Router();

router.use(protect, isAdmin);

router.post("/", createUser);
// router.get("/", getUsers);           // search ?keyword=
router.get("/:id", getUserById);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;