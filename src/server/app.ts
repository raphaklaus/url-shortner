import express from "express";
import { routes } from "./routes";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(bodyParser.json());

routes(app);

app.listen(port, () => {
  console.info(`Service is listening at http://localhost:${port}`);
});
