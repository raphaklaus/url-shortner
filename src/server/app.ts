import express from "express";
import { routes } from "./routes";
import bodyParser from "body-parser";
import { AppDataSource } from "../database/client";

import "reflect-metadata";
const app = express();
const port = 3000;

app.use(bodyParser.json());

routes(app);

AppDataSource.initialize()
  .then(() => {
    app.listen(port, () => {
      console.info(`Service is listening at http://localhost:${port}`);
    });
  })
  .catch((error) => console.log("Database error:", error));
