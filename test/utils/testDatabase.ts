import { DataSource } from "typeorm";
import models from "../../src/database/models/models";

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: ":memory:",
  dropSchema: true,
  entities: models,
  synchronize: true,
  logging: false,
});

export async function startDatabase() {
  try {
    await AppDataSource.initialize();
    return AppDataSource;
  } catch (error) {
    console.log("Problem initializing database", error);
  }
}

startDatabase();
