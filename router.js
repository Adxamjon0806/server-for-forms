import { Router } from "express";
import ProductController from "./controllers/ProductController.js";
import userController from "./controllers/user-controller.js";
import { body } from "express-validator";
const router = new Router();

router.get("/products", ProductController.getAll);
router.post(
  "/registration",
  body("email").isEmail(),
  body("password").isLength({ min: 3, max: 33 }),
  userController.registration
);
router.post("/login", userController.login);
router.post("/logout", userController.logout);
router.get("/activate/:link", userController.activate);
router.get("/refresh", userController.refresh);
router.get("/users", userController.getUsers);

export default router;
