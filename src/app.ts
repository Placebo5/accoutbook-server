import express, { Request, Response, NextFunction } from "express";
import fs from "fs";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";

dotenv.config();

class App {
  public app: express.Application;

  public static bootstrap(): App {
    return new App();
  }

  constructor() {
    this.app = express();
    this.app.use(cors());
    this.middlewares();
  }

  private middlewares = (): void => {
    // routes
    this.app.use(bodyParser.json());
    fs.readdirSync(`${__dirname}/routes`)
      .filter((file) => {
        return file.indexOf(".") !== 0 && file.slice(-3) === ".ts";
      })
      .forEach((file) => {
        const routeName = file.split(".")[0];
        const router = require(`./routes/${routeName}`);
        this.app.use(`/${routeName}`, router);
      });

    /**
     * 에러 핸들러
     */
    this.app.use((err: any, req: Request, res: Response, next: NextFunction) => {
      console.log(err);
      //  logger.error(err.message);
      res.status(err.status || 500).json({ ok: false, error: err.message });
    });
  };
}

export default App;
