import {Router} from "express";
import {logInControl} from "../controllers/auth/auth.controller";


const router = Router();

router.post("/login", logInControl);
export default router;
