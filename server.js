const express = require('express');
const app = express();
const cricketRoutes = require("./routes/cricketRoutes"); 
const PORT = 3000;

app.use(express.json());


app.get("/", (req, res) => {
  res.json("Cricket Backend is running!");
});


app.use("/cricket1", cricketRoutes); 


app.listen(PORT, () => {
  console.log(` Server running on localhost:${PORT}`);
});

module.exports = app;
