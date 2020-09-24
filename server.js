const express = require("express");
const app = express();
const sendToMe = require("./routes/sendToMe");
require("dotenv").config();
const path = require("path");
const cors = require("cors");

const morgan = require("morgan");
const PORT = 4200;

app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/client/index.html");
});

app.get("/rtAnalytics.js", (req, res) => {
    res.sendFile(path.join(__dirname + "/client/rtAnalytics.js"));
});

app.use("/sendToMe", sendToMe);

app.listen(PORT, () => {
    console.log("App is live");
});
