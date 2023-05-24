import {Response} from "express";
import {getLogger} from "../../helpers/logger";
import {bulkCreateFav, createFav} from "./Domain/post/create.fav";
import {FavAttributes} from "../../DB/models/Fav";
import {validateRequest} from "../../utilities/requestValidation";
import {BulkCreateFavRequest} from "./fav.types";


const logger = getLogger("FAV | CONTROLLER");

export async function createFavControl(req: any, res: Response) {
   const {
      title,
      description,
      link,
      favListId,
      userId,
   } = req.body as FavAttributes;
   logger.log("Creating fav list by controller");
   const validated = validateRequest({
      title, description, link, favListId,
   });
   if (!validated.valid) {
      logger.warn("Missing parameters");
      res.status(400).json({
         message: "There are non provided parameters",
         missing: validated.undefinedList,
      });
      return;
   }
   const creationResult = await createFav({
      title, description, link, favListId, userId,
   });
   if (creationResult.success) {
      res.status(201).json(creationResult.dbData);
   } else {
      res.status(500).json(creationResult.reason);
   }
}

export async function createBulkFav(req: any, res: Response) {
   logger.log("Creating bulk fav by controller");
   const {
      favs,
      favListId,
      favListName,
      userId,
   } = req.body as BulkCreateFavRequest;
   if (!favs || favs.length <= 0) {
      res.status(400).json({
         message: "Favs are empty and required",
      });
      return;
   }
   if (!favListId && !favListName && !userId) {
      res.status(400).json({
         message: "Required fields are not provided, " +
            "add favListId or (userId and favListName)",
      });
      return;
   }
   if (!favListId && (!favListName || !userId)) {
      res.status(400).json({
         message: "If favListId isn't provided, " +
            "favListName and userId are mandatory",
      });
      return;
   }
   const bulkCreated = await bulkCreateFav(req.body);
   if (!bulkCreated.success) {
      res.status(500).json({
         reason: bulkCreated.reason,
      });
      return;
   }
   res.status(201).json(bulkCreated.dbData);
}
