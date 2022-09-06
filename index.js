const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const userRouter = require("./routes/user");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/user", userRouter);

app.listen(3001, (err) => {
  if (err) console.log(err);
  else console.log("3001 calling");
});
