import {Response} from "express";
import {createFavList} from "./Domain/create.favList";
import {getLogger} from "../../helpers/logger";

const logger = getLogger("FAV_LIST | CONTROLLER");

export async function createFavListControl(req: any, res: Response) {
   const {userId} = req.body;
   logger.log("Creating fav list by controller");
   if (!userId) {
      res.status(400)
         .json({
            message: "UserId is required",
         });
      return;
   }
   const creationResult = await createFavList(userId);
   if (creationResult.success) {
      res.status(201).json(creationResult.dbData);
   } else {
      res.status(500).json(creationResult.reason);
   }
}
