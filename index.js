import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.json({
    message: "hi",
  });
});

app.listen(5555, () => {
  console.log(`Server is working.`);
});
