import { DataSource } from "typeorm";
import models from "../../src/database/models/models";

export async function createDatabase() {
  const AppDataSource = new DataSource({
    type: "sqlite",
    database: ":memory:",
    dropSchema: true,
    entities: models,
    synchronize: true,
    logging: false,
  });

  return await AppDataSource.initialize();
}
