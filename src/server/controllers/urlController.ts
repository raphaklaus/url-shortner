import { Request, Response } from "express";
import AlphanumericStrategy from "../../core/alpha.strategy";
import URLShortnerService from "../../services/urlShortner.service";
import { repository } from "../../repository/repository";

export default class URLController {
  static async post(req: Request, res: Response) {
    const inputURL = req.body.url;
    const strategy = new AlphanumericStrategy();
    const urlService = new URLShortnerService(strategy, repository.shortURL);
    const url = await urlService.create(inputURL);

    return res.json({ url });
  }
}
