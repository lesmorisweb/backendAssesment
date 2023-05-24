import {getLogger} from "../../../../helpers/logger";
import {BulkCreateFavRequest} from "../../fav.types";
import {DBFailure} from "../../../../types/domain/domain.types";


const logger = getLogger("FAV | DOMAIN | CREATE | UTILS");

export function validateBulkCreate(data: BulkCreateFavRequest)
   : tValidationResult {
   const {favs, favListName, userId, favListId} = data;
   if (!favs || favs.length <= 0) {
      logger.warn("Favs parameter was empty");
      return {
         success: false,
         reason: "Favs parameter was empty",
      };
   }
   // @ts-ignore
   if (!favListName && !favListId && !userId) {
      logger.warn("FavListName and FavListId parameter were empty");
      return {
         success: false,
         reason: "FavListName and FavListId parameter were empty",
      };
   }
   logger.log("Bulk post Fav data is valid");
   return {
      success: true,
   };
}

export function getFavListType(favListId: number | undefined)
   : FavListType {
   logger.log("Getting fav list type");
   if (!favListId) {
      logger.log("Is new favList");
      return FavListType.NEW;
   } else {
      return FavListType.EXISTING;
   }
}

export type tValidationResult = DBFailure | { success: true }

export enum FavListType {
   // eslint-disable-next-line no-unused-vars
   EXISTING, NEW
}
