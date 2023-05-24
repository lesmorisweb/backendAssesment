import {tDBResult} from "../../../../types/domain/domain.types";
import {getLogger} from "../../../../helpers/logger";
import {FavList} from "../../../../DB/models/FavList";
import {User} from "../../../../DB/models/User";


const logger = getLogger("FAV_LIST | DOMAIN | GET");

export async function getFavListById(id: number): Promise<tDBResult<FavList>> {
   logger.log(`Getting FAV list by id ${ id }`);
   try {
      const favList = await FavList.findOne({
         where: {
            id,
         },
         include: [{model: User}],
      });
      if (favList) {
         logger.success(`FavList ${ id } found successfully`);
         return {
            success: true,
            dbData: favList,
         };
      } else {
         logger.warn(`FavList ${ id } not found`);
         return {
            success: false,
            reason: `FavList ${ id } not found`,
         };
      }
   } catch (e) {
      logger.error(e);
      return {
         success: false,
         reason: e,
      };
   }
}

