import {Response} from "express";
import {createUser} from "./Domain/create.users";
import {getLogger} from "../../helpers/logger";

const logger = getLogger("USER | CONTROLLER");

export async function createUserControl(req: any, res: Response) {
   const {name, email, password} = req.body as {
      name: string,
      email: string,
      password: string
   };
   if (!name) {
      res.status(400).json({
         message: "id not provided",
      });
      return;
   }
   const isEmailWrong = email.match(/.*@[a-z]*\.[a-z]+/gm) === null;
   if (isEmailWrong) {
      logger.warn("Bad request - bad email");
      res.status(400).json({
         message: "Email is not valid",
      });
      return;
   }
   if (!email) {
      res.status(400).json({
         message: "Email not provided",
      });
      return;
   }
   if (!password) {
      res.status(400).json({
         message: "Passwords not provided",
      });
      return;
   }
   const createdUser = await createUser({
      name, email, password,
   });
   if (createdUser.success) {
      res.status(201).json({
         message: "user created",
         data: createdUser.dbData,
      });
   } else {
      res.status(500).json({
         message: createdUser.message,
         reason: createdUser.reason,
      });
   }
}
