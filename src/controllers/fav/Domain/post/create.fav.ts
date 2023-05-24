import {DBFailure, tDBResult} from "../../../../types/domain/domain.types";
import {Fav, FavAttributes} from "../../../../DB/models/Fav";
import {getLogger} from "../../../../helpers/logger";
import {BulkCreateFavRequest, BulkCreateFavRequirements} from "../../fav.types";
import {FavListType, getFavListType, validateBulkCreate} from "./utils";
import {getFavListById} from "../../../favList/Domain/get/get.favList";
import {createFavList} from "../../../favList/Domain/create.favList";


const logger = getLogger("FAV | DOMAIN | CREATE");

export async function createFav(data: FavAttributes): Promise<tDBResult<Fav>> {
   logger.log("Creating new Fav");
   try {
      const createdFav = await Fav.create(data);
      logger.success("Fav created successfully");
      return {
         success: true,
         dbData: createdFav,
      };
   } catch (e) {
      logger.error(e);
      return {
         success: false,
         reason: e,
      };
   }
}

export async function bulkCreateFav(data: BulkCreateFavRequest)
   : Promise<tDBResult<Fav[]>> {
   logger.log("Bulk creating fav");
   try {
      const validated = validateBulkCreate(data);
      if (!validated.success) {
         return validated;
      }
      const favListType = getFavListType(data.favListId);
      const bulkCreateReq: any = {
         favs: data.favs,
         favListReq: {
            favListId: data.favListId,
            userId: data.userId,
            favListName: data.favListName,
         },
      };
      const favListId = await getOrCreateFavList(bulkCreateReq, favListType);
      if (!favListId.success) {
         return favListId;
      }
      const toBulkCreate: FavAttributes[] = data.favs.map((fav) => ({
         title: fav.title,
         link: fav.link,
         description: fav.description,
         favListId: favListId.ids.favId,
         userId: favListId.ids.userId,
      }));
      const createdFavs = await Fav.bulkCreate(toBulkCreate);
      logger.success("Bulk favs created successfully");
      return {
         success: true,
         dbData: createdFavs,
      };
   } catch (e) {
      logger.error(e);
      return {
         success: false,
         reason: e,
      };
   }
}

async function getOrCreateFavList(
   data: BulkCreateFavRequirements,
   favListType: FavListType,
): Promise<
   { success: true, ids: { favId: number, userId: number } } | DBFailure> {
   let favId: number;
   switch (favListType) {
   case FavListType.EXISTING:
      const foundFavList = await getFavListById(data.favListReq.favListId!);
      if (!foundFavList.success) {
         return foundFavList;
      }
      favId = foundFavList.dbData.id;
      const favUserId = foundFavList.dbData.userId;
      return {
         success: true,
         ids: {userId: favUserId, favId: favId},
      };
   case FavListType.NEW:
      if ("favListName" in data.favListReq) {
         const createdFavList = await createFavList({
            name: data.favListReq.favListName,
            userId: data.favListReq.userId,
         });
         if (!createdFavList.success) {
            return createdFavList;
         }
         favId = createdFavList.dbData.id;
         return {
            success: true,
            ids: {
               favId: createdFavList.dbData.id,
               userId: createdFavList.dbData.dataValues.userId,
            },
         };
      }
      break;
   default:
      return {
         success: false,
         reason: "Invalid favListType",
      };
   }
   return {
      success: false,
      reason: "no clue",
   };
}
