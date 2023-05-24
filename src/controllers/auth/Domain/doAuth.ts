import {getUserByUserName} from "../../user/Domain/get.user";
import {compareHash} from "../../user/Domain/encryption";
import jwt from "jsonwebtoken";
import {NextFunction, Response} from "express";

export const users: any = {};

export async function doLogin(user: string, password: string)
   : Promise<false | string> {
   const foundUser = await getUserByUserName(user);
   if (!foundUser.success) {
      return false;
   }
   if (await compareHash(password, foundUser.dbData.password)) {
      return jwt.sign(foundUser.dbData.name, process.env.JWT_KEY!);
   } else {
      return false;
   }
}

export async function authenticate(
   req: any, res: Response, next: NextFunction) {
   const authHeader = req.headers["authorization"];
   const token = authHeader && authHeader.split(" ")[1];
   if (!token) {
      res.status(401);
      res.end();
      return;
   }
   jwt.verify(token, process.env.JWT_ACCESS_KEY!, (err: any) => {
      if (err) return res.sendStatus(403);
      return next();
   });
}
