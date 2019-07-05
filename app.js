import express from "express";
import logger from "morgan";

import router from "./router";

const app = express();
app.use(express.static("static"));

app.use(express.static("views"));
app.set("view engine", "pug");
app.set("views", "./views");

app.use(logger("dev"));

app.use("", router);

app.listen(4000, () => {
  console.log("Server is on 4000");
});
