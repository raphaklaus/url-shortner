import { Application, ErrorRequestHandler } from "express";
import URLController from "./controllers/url-controller";
import VisitController from "./controllers/visit-controller";
import { requestHandler } from "./utils/request-handler";

export const routes = (app: Application) => {
  app.post(
    "/url",
    requestHandler(async (req, res) => URLController.post(req, res))
  );
  app.get(
    "/visit",
    requestHandler(async (req, res) => VisitController.get(req, res))
  );

  // Catch-all clause, need to be in the end of this function
  const errorHandler: ErrorRequestHandler = (err, _req, res) => {
    console.error(err.stack);
    res.status(500).json({ message: "Internal server error" });
  };

  app.use(errorHandler);
};
