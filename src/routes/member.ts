import express, { Request, Response, NextFunction } from "express";
import { conn } from "../config/conn";
import mysql from "mysql";

const router = express.Router();
const connection = conn().init();

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  console.log("??? member");

  const aa = connection.query(
    "SELECT * from test",
    (error, results, fields) => {
      if (error) throw error;
      console.log(JSON.stringify(results));
      res.send(JSON.stringify(results));
      // console.log("The solution is: ", results[0].solution);
    }
  );
  console.log(aa.sql);
  // throw new Error("dd");
});

router.get("/aa", async (req: Request, res: Response, next: NextFunction) => {
  const sql = "select * from test";
  // const sql_values =
});

export = router;
