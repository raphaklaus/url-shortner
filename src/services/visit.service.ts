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

  incrementCount(short_url_id: number): Promise<any> {
    return this.visit.increment({ shortURL: { id: short_url_id } }, "count", 1);
  }
}
