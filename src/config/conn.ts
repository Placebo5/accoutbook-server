import mysql from "mysql";
import { dbconfig } from "./mysql";

export const conn = () => {
  return {
    init: () => {
      return mysql.createConnection(dbconfig);
    },

    mysql_open: (con: any) => {
      con.connect((error: any) => {
        if (error) {
          console.log("mysql connection error : " + error);
        } else {
          console.log("mysql is connected successfully");
        }
      });
    },
  };
};
