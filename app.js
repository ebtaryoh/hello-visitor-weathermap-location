const express = require("express");
const app = express();
const PORT = 3000;

const helloVisitorRouter = require("./helloVisitorRouter");

app.use("/api/", helloVisitorRouter);

const start = app.listen(PORT, () => {
  console.log(`Server is listening on  http://localhost:${PORT}`);
});
