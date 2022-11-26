import IRepository from "../repository/repository.interface";
import { extractCode } from "./utils/url";

export default class VisitService {
  private readonly visit: IRepository;
  constructor(visit: IRepository) {
    this.visit = visit;
  }

  async getCount(short_url_id: number) {
    const visit = await this.visit.findUnique({ where: { short_url_id } });
    return visit.count;
  }

  incrementCount(short_url_id: number): Promise<any> {
    return this.visit.update({
      data: {
        count: {
          increment: 1,
        },
      },
      where: {
        short_url_id,
      },
    });
  }
}
