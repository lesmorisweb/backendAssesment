import {Router} from "express";
import {createBulkFav} from "../controllers/fav/fav.controller";


const router = Router();

router.post("/bulk", createBulkFav);


export default router;
