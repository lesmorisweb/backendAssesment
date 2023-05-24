import "dotenv/config";
import express from "express";
import cors from "cors";
import {getLogger} from "./helpers/logger";
import {doDBConnection} from "./DB";
import routes from "./routes";
import {Environments} from "./DB/config/enums";
import {getEnvironment} from "./DB/config/dbConfig";


const logger = getLogger("INDEX");
const app = express();

app.use(cors());
// @ts-ignore
app.use(express.json());
// @ts-ignore
app.use(express.urlencoded({extended: true}));
app.use("/api", routes);

const port = Number(process.env.PORT);
const isReset = process.argv[2] === "--reset";

(async function() {
   if (isReset && getEnvironment() === Environments.development) {
      await doDBConnection(true);
      logger.log("Database connection reset.");
   } else {
      let successfulConnection = false;
      try {
         successfulConnection = await doDBConnection(isReset);
      } catch (e) {
         logger.error("Couldn't connect to DB'");
         logger.error(e);
      }
      if (successfulConnection) {
         app.listen(port, () => {
            logger.log("Listening on port " + port);
         });
      }
   }
})();
