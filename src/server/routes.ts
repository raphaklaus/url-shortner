import { Application } from "express";
import URLController from "./controllers/urlController";
import VisitController from "./controllers/visitController";

export const routes = (app: Application) => {
  app.post("/url", async (req, res) => URLController.post(req, res));
  app.get("/visit", async (req, res) => VisitController.get(req, res));
};
