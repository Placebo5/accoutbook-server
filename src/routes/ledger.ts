import express, { Request, Response, NextFunction } from "express";
import { conn } from "../config/conn";

const router = express.Router();
const connection = conn().init();

// 월별 전체 조회
router.get("/:searchDate", (req: Request, res: Response) => {
  const { searchDate } = req.params;
  const memberId = 1;
  const sql =
    "SELECT l.amountDate, SUM(if(c.code = ?,amount,0)) incomeSUM, SUM(if(c.code = ?,amount,0)) spendingSUM" +
    " FROM ledger l left join category c ON (l.categoryId = c.id)" +
    " WHERE  l.memberId = ?" +
    " and  l.amountDate like ? " +
    // AND l.amountDate between ? and ?" +
    " GROUP BY l.amountDate" +
    " ORDER BY l.amountDate";
  //  const params = ["spending", "income", "2019-02-01", "2019-02-28"];
  const params = ["income", "spending", memberId, `${searchDate}%`];

  connection.query(sql, params, (error, results, fields) => {
    if (error) throw error;
    res.send(JSON.stringify(results));
  });
});

// 일자별 상세 조회
router.get("/day/:amountDate", (req: Request, res: Response) => {
  // const sql = "SELECT * FROM ledger WHERE id = ?";
  // const params = [req.params.id];
  // connection.query(sql, params, (error, results, fields) => {
  //   if (error) throw error;
  //   res.send(JSON.stringify(results[0]));
  // });
  const sql =
    "SELECT  l.*, c.classiflcation, c.code" +
    " FROM ledger l LEFT JOIN category c ON (l.categoryId = c.id)" +
    " WHERE l.memberId= ? AND l.amountDate = ?" +
    " ORDER BY l.amountDate";

  const params = [1, req.params.amountDate];
  connection.query(sql, params, (error, results, fields) => {
    if (error) throw error;
    console.log(JSON.stringify(results));
    res.send(JSON.stringify(results));
  });
});

/** 등록 */
router.post("/", (req: Request, res: Response) => {
  const { amountDate, amount, categoryId, memo } = req.body;
  const memberId = 1;
  const sql = "INSERT INTO ledger(memberId, amountDate, amount, categoryId, memo)" + " VALUES(?,?,?,?,?)";
  const params = [memberId, amountDate, amount, categoryId, memo];

  connection.query(sql, params, (error, results, fields) => {
    if (error) throw error;
    console.log(results.insertId);
    res.send("성공");
  });
});

/** 수정 */
router.put("/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  const { amountDate, amount, categoryId, memo } = req.body;
  // const aa = req.body.amountDate
  console.log(req.body);
  const sql = "UPDATE ledger SET amountDate=?, amount=?, categoryId=?, memo=? WHERE id = ?";
  const params = [amountDate, amount, categoryId, memo, id];

  connection.query(sql, params, (error, results, fields) => {
    if (error) throw error;
    console.log(results.insertId);
    res.send("성공");
  });
});

/** 삭제 */
router.delete("/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  const sql = "DELETE FROM ledger WHERE id = ?";
  connection.query(sql, id, (error, results, fields) => {
    if (error) throw error;
    res.send("성공");
  });
});

export = router;
