import { Repository } from "typeorm";
import { Visit } from "../database/models/visit";

export default class VisitService {
  constructor(private readonly visit: Repository<Visit>) {
    this.visit = visit;
  }

  async getCount(id: number) {
    const visit = await this.visit.findOneBy({ id });
    return visit?.count || 0;
  }

  async incrementCount(
    short_url_id: number,
    currentCount: number
  ): Promise<number> {
    await this.visit.increment({ shortURL: { id: short_url_id } }, "count", 1);

    return currentCount + 1;
  }
}
