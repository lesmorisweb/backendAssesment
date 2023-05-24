import {Router} from "express";
import {createUserControl} from "../controllers/user/user.controller";


const router = Router();

router.post("/", createUserControl);
export default router;
