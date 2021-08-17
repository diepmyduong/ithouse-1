import { json, urlencoded } from "body-parser";
import compression from "compression";
import cors from "cors";
import express, { Request } from "express";
import morgan from "morgan";
import next from "next";
import config from "config";

import router from "./routers";
import logger from "./helpers/logger";

export default function startExpressApp() {
  const app = express();

  // Config CORS
  app.use(cors());
  // Compress Response
  app.use(compression());
  // Body Parser
  app.use(json({ limit: "10mb" }));
  app.use(urlencoded({ extended: true, limit: "10mb" }));
  // Request Log
  app.use(
    morgan("short", { skip: (req: Request) => /(_ah\/health)|graphql/.test(req.originalUrl) })
  );
  // Setup View Template
  app.set("view engine", "hbs");
  app.set("views", "public/views");
  // Setup Static file
  app.use("/public", express.static("public/static"));
  // Config RESAPI
  app.use("/", router);

  // Front End NextJS
  if (config.get("next.enable")) {
    logger.info("Starting Frontend By NextJs...");
    const nextApp = next({ dev: config.get("next.devMode"), dir: "./next" });
    const handle = nextApp.getRequestHandler();
    nextApp
      .prepare()
      .then(() => {
        logger.info("Next App Initialized!");
        app.get("*", (req, res) => handle(req, res));
      })
      .catch((err) => {
        logger.error("Start Frontend Error", err);
      });
  }
  return app;
}
