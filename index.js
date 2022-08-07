var express = require("express");
var PORT = 4000;
const cors = require("cors");
const { json } = require("body-parser");

var app = express();

app.use(express.urlencoded({ extended: true }));
app.use(json());
app.use(cors());

app.get("/", cors(), async (req, res) => {
  res.send("This is working");
});

app.post("/company_information", cors(), async (req, res) => {
  let { ...companyInformation } = req.body;
  let { ...companyStocks } = req.body;
  console.log(companyInformation);
  console.log(companyStocks);
});

app.get("/home", cors(), async (req, res) => {
  res.setDefaultEncoding("this is the data for home");
});
app.listen(PORT, () => {
  console.log(`server running at http://localhost:${PORT}`);
});
