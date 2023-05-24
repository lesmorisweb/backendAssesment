import {Router} from "express";
import {createFavListControl} from "../controllers/favList/favList.controller";


const router = Router();

router.post("/", createFavListControl);

export default router;
