import {undefined} from "zod";

export function validateRequest(data: object): validationResult {
   const arrayedObject = Object.entries(data);
   const undefinedValues = arrayedObject.map((item) => {
      if (item[1] === undefined) {
         return item[0];
      } else {
         return null;
      }
   }).filter((items) => items) as string[];
   if (undefinedValues.length > 0) {
      return {
         valid: false,
         undefinedList: undefinedValues,
      };
   } else {
      return {valid: true};
   }
}

export type validationResult = { valid: true } | {
   valid: false,
   undefinedList: string[]
}
