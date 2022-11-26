import { Request, Response } from "express";
import URLShortnerService from "../../services/urlShortner.service";
import { repository } from "../../repository/repository";
import VisitService from "../../services/visit.service";
import AlphanumericStrategy from "../../core/alpha.strategy";

export default class VisitController {
  static async get(req: Request, res: Response) {
    const url = req.query.url as string;
    // TODO: Decouple strategy from service
    const strategy = new AlphanumericStrategy();
    const urlService = new URLShortnerService(strategy, repository.shortURL);
    const shortURL = await urlService.get(url);
    const visitService = new VisitService(repository.visit);

    const visit = await visitService.incrementCount(shortURL.id);

    return res.json({ visit });
  }
}
