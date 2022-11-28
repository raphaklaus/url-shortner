import "reflect-metadata";
import { DataSource } from "typeorm";
import models from "./models/models";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || "5432"),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  entities: models,
  synchronize: false,
  logging: false,
  migrations: ["dist/database/migration/*.js"],
});
