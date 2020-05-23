import express, { Request, Response, NextFunction } from "express";

const router = express.Router();

router.get("/", (req: Request, res: Response, next: NextFunction) => {
  console.log("11");
  // throw new Error("dd");
  res.send("world");
});

export = router;
