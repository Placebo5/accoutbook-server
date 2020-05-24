import express, { Request, Response } from "express";
import { conn } from "../config/conn";

const router = express.Router();
const connection = conn().init();

// 카테고리 전체 초회
router.get("/", (req: Request, res: Response) => {
  const sql = "SELECT * FROM category";

  connection.query(sql, (error, results, fields) => {
    if (error) throw error;
    res.send(JSON.stringify(results));
  });
});

export = router;
