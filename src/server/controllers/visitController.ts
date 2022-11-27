import { Request, Response } from "express";
import URLShortnerService from "../../services/urlShortner.service";
import VisitService from "../../services/visit.service";
import AlphanumericStrategy from "../../core/alpha.strategy";
import { AppDataSource } from "../../database/client";
import { ShortURL } from "../../database/models/url";
import { Visit } from "../../database/models/visit";

export default class VisitController {
  static async get(req: Request, res: Response) {
    const url = req.query.url as string;
    // TODO: Decouple strategy from service
    const strategy = new AlphanumericStrategy();
    const shortURLRepo = AppDataSource.getRepository(ShortURL);
    const visitRepo = AppDataSource.getRepository(Visit);
    const urlService = new URLShortnerService(strategy, shortURLRepo);
    const visitService = new VisitService(visitRepo);
    const shortURL = await urlService.get(url);

    if (shortURL) {
      await visitService.incrementCount(shortURL.id);

      return res.json({ visit: shortURL.visit.count + 1 });
    }

    return res.status(404).json({ message: "Short URL not found" });
  }
}
