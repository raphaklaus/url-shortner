import { Request, Response } from "express";
import AlphanumericStrategy from "../../core/alpha-strategy";
import URLService from "../../services/url-service";
import { AppDataSource } from "../../database/client";
import { ShortURL } from "../../database/models/url";
import URLShortner from "../../core/url-shortner";

export default class URLController {
  static async post(req: Request, res: Response) {
    const inputURL = req.body.url;

    const strategy = new AlphanumericStrategy();
    const urlShortner = new URLShortner(strategy);

    const shortURLRepo = AppDataSource.getRepository(ShortURL);

    const urlService = new URLService(shortURLRepo);

    const shortURL = await urlService.create(inputURL, urlShortner);

    const url = urlService.getURL(shortURL);

    return res.json({ url });
  }
}
