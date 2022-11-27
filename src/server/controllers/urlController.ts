import { Request, Response } from "express";
import AlphanumericStrategy from "../../core/alpha.strategy";
import URLShortnerService from "../../services/urlShortner.service";
import { AppDataSource } from "../../database/client";
import { ShortURL } from "../../database/models/url";

export default class URLController {
  static async post(req: Request, res: Response) {
    const inputURL = req.body.url;
    const strategy = new AlphanumericStrategy();
    const shortURLRepo = AppDataSource.getRepository(ShortURL);
    const urlService = new URLShortnerService(strategy, shortURLRepo);
    const shortURL = await urlService.create(inputURL);
    const url = urlService.getURL(shortURL);

    return res.json({ url });
  }
}
