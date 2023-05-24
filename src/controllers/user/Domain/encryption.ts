import bcrypt from "bcrypt";
import "dotenv/config";

const salt = process.env.ENCRYPT_SALT!;

export async function getEncrypted(password: string): Promise<string> {
   console.log(salt);
   return await bcrypt.hash(password, Number(salt));
}

export async function compareHash(givenPassword: string, userPassword: string)
   : Promise<boolean> {
   return await bcrypt.compare(givenPassword, userPassword);
}
