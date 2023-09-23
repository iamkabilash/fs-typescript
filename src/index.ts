import express from "express";
import "./db";
import noteRouter from "./routers/note.router";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/** instead of using express middleware, we can create our own.
app.use(
  // middleware - we can define multiple middleware fns.
  (req, res, next) => {
    req.on("data", (chunk) => {
      // console.log(JSON.parse(chunk));
      req.body = JSON.parse(chunk);
      next(); // moves to endpoint. If we dont call next(), then api req will hang.
    });
  }
);
**/

app.use("/note", noteRouter); // adds a prefix to "/" and noteRouter works only for "/note/ route"

app.listen(8000, () => {
  console.log("server running...");
});
