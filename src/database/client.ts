import "reflect-metadata";
import { DataSource } from "typeorm";
import models from "./models/models";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "postgres",
  database: "url_shortner",
  entities: models,
  synchronize: true,
  logging: false,
});
