import { Request, Response } from "express";
import URLService from "../../services/urlShortner.service";
import VisitService from "../../services/visit.service";
import { AppDataSource } from "../../database/client";
import { ShortURL } from "../../database/models/url";
import { Visit } from "../../database/models/visit";

export default class VisitController {
  static async get(req: Request, res: Response) {
    const url = req.query.url as string;

    const shortURLRepo = AppDataSource.getRepository(ShortURL);
    const visitRepo = AppDataSource.getRepository(Visit);

    const urlService = new URLService(shortURLRepo);
    const visitService = new VisitService(visitRepo);

    const shortURL = await urlService.get(url);

    if (shortURL) {
      const count = await visitService.incrementCount(
        shortURL.id,
        shortURL.visit.count
      );

      return res.json({ visits: count });
    }

    return res.status(404).json({ message: "Short URL not found" });
  }
}
