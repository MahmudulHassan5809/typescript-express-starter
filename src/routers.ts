import { Router } from "express";
import { usersRouter } from "./modules/users/routes";
import { authRouter } from "./modules/auth/routes";

const router = Router();

router.use("/users", usersRouter);
router.use("/auth", authRouter);

export { router };
