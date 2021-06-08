const express = require("express");
const Cors = require("cors");

const userRouter = require("./routers/user");
const paperRouter = require("./routers/paper");
const questionsRouter = require("./routers/questions");
const chaptersRouter = require("./routers/chapters");

const connection_url = require("./helpers/initDB");

const responseHeaderConfig = require("./configurations/responseHeaderConfig");

connection_url();
const app = express();
const port = process.env.PORT || 8001;

responseHeaderConfig(app);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(Cors({ origin: "http://localhost:3000", credentials: true }));

app.use(paperRouter);
app.use(userRouter);
app.use(questionsRouter);
app.use(chaptersRouter);

app.get("/", (req, res) => res.status(200).send("Quick Paper"));

app.listen(port, () => console.log(`listening on localhost: ${port}`));
