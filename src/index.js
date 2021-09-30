import express from "express";
import _ from "lodash";
import userRrouter from "./route/users.js";
import boardRrouter from "./route/boards.js";

const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/users", userRrouter);
app.use("/boards", boardRrouter);
app.listen(3000);
