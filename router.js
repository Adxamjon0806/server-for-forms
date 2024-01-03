import { Router } from "express";
import ProductController from "./ProductController.js";
const router = new Router();

router.get("/products", ProductController.getAll);

export default router;
