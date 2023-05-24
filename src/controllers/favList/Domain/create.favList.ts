import {tDBResult} from "../../../types/domain/domain.types";
import {getLogger} from "../../../helpers/logger";
import {FavList, FavListAttributes} from "../../../DB/models/FavList";


const logger = getLogger("FAV_LIST | DOMAIN | CREATE");

export async function createFavList(data: FavListAttributes)
   : Promise<tDBResult<FavList>> {
   logger.log("Creating new favList");
   try {
      const createdFavList = await FavList.create(data);
      return {
         success: true,
         dbData: createdFavList,
      };
   } catch (e) {
      logger.error(e);
      return {
         success: false,
         reason: e,
      };
   }
}
