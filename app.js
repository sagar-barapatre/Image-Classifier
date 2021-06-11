const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");

var app = express();

const mongoDB =
  "mongodb+srv://sagar:sagar2019.@cluster0.nxqpo.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
mongoose.connect(mongoDB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api", indexRouter);
app.use("/api/users", usersRouter);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
} else {
  app.use(
    express.static(path.join(__dirname, "client", "public", "index.html"))
  );
}

app.get("/read", (req, res) => {
  res.send("Hello !!");
});

app.listen(process.env.PORT, () => {
  console.log("You are connected !");
});
