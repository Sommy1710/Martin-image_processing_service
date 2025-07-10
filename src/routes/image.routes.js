import {Router} from "express";
import multer from "multer";
import { uploadImage, transformImage, getImage, listImages } from "../app/controllers/image.controller.js";
import authMiddleware from './../app/middleware/auth.middleware.js';

const router = Router();
const upload = multer({dest: "uploads/"}); //You’re creating an upload handler using multer, which helps your app accept files from users (like images, documents, etc.) { dest: "uploads/" } tells multer: “When someone uploads a file, save it in the uploads/ folder.”

router.post("/images", authMiddleware, upload.single("image"), uploadImage);
router.post("/images/:id/transform", authMiddleware, transformImage);
router.get("/images/:id", authMiddleware, getImage);
router.get("/images", authMiddleware, listImages);

export const imageRoutes = router;