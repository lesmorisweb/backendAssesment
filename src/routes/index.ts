import {Response, Router} from "express";
import userRoutes from "./user.routes";
import favListRoutes from "./favList.routes";
import favRoutes from "./fav.routes";
import {authenticate} from "../controllers/auth/Domain/doAuth";
import authRoutes from "./auth.routes";

const router = Router();

router.use("/user", userRoutes);
router.use("/fav-list", authenticate, favListRoutes);
router.use("/fav", authenticate, favRoutes);
router.use("/auth", authRoutes);
router.use("/", (req: any, res: Response) => {
   res.status(200).json("ok");
});

export default router;
