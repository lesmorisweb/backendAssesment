import {readdirSync} from "fs";

import {getLogger} from "../../helpers/logger";
import {getFileName} from "../../utils/filePathTools";
// @ts-ignore
import {ModelCtor} from "sequelize-typescript";
import {User} from "./User";
import {Fav} from "./Fav";
import {FavList} from "./FavList";

const logger = getLogger("MODELS - INDEX");

export const models: tModelCheck[] = [
   {model: User, name: "User"},
   {model: Fav, name: "Fav"},
   {model: FavList, name: "FavList"},
];

type tModelCheck = {
   name: string
   model: ModelCtor
}

const PATH = `${ __dirname }`;

export function getAllModels(): ModelCtor[] {
   const innerModelsFiles: string[] = [];
   readdirSync(PATH).forEach((file) => {
      const currentFile = getFileName(file);
      if (currentFile && currentFile !== "index") {
         innerModelsFiles.push(currentFile);
      }
   });

   logger.log("Files present in models directory: " + innerModelsFiles);

   const modelsNames = models.map((model) => model.name.toLowerCase());
   let areAllModelsSaved = true;
   const missingModels: string[] = [];
   innerModelsFiles.forEach((modelName) => {
      const isFileSaved = modelsNames.some(
         (file) => file === modelName.toLowerCase());
      if (!isFileSaved) {
         areAllModelsSaved = false;
         missingModels.push(modelName);
         logger.error("Model " + modelName +
            " isn't in models list, please add them");
      }
   });
   if (areAllModelsSaved) {
      logger.log("All models are saved");
   } else {
      throw new Error("Models " + missingModels +
         " isn't in models list, please add them");
   }

   return models.map((model) => model.model);
}
