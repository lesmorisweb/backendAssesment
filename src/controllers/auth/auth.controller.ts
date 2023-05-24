import {doLogin} from "./Domain/doAuth";
import {Response} from "express";

export async function logInControl(req: any, res: Response) {
   const {user, password} = req.body;
   if (!user || !password) {
      res.status(400).json({
         message: "No username or password provided",
      });
      return;
   }
   await doLogin(user, password);
}
