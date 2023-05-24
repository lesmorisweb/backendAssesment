import {getLogger} from "../../../helpers/logger";
import {User} from "../../../DB/models/User";
import {tDBResult} from "../../../types/domain/domain.types";


const logger = getLogger("USER | DOMAIN | GET");

export async function getUser(userId: number): Promise<tDBResult<User>> {
   logger.log(`Verifying if user ${ userId } exists`);
   try {
      const retrievedUser = await User.findOne({
         where: {
            id: userId,
         },
      });
      if (retrievedUser) {
         return {
            success: true,
            dbData: retrievedUser.id,
         };
      } else {
         return {
            success: false,
            reason: "User not found",
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

export async function getUserByUserName(userName: string)
   : Promise<tDBResult<User>> {
   logger.log("Getting user by username)");
   try {
      const foundUser = await User.findOne({
         where: {
            name: userName,
         },
      });
      if (!foundUser) {
         logger.warn("User not found");
         return {
            success: false,
            reason: "User not found",
         };
      }
      foundUser.password = "***********";
      logger.log("User found");
      return {
         success: true,
         dbData: foundUser,
      };
   } catch (e) {
      logger.error(e);
      return {
         success: false,
         reason: e,
      };
   }
}
