var express = require("express");
var PORT = 4000;
const cors = require("cors");
const { json } = require("body-parser");

var app = express();

app.use(express.urlencoded({ extended: true }));
app.use(json());
app.use(cors());

app.post("/company_information", cors(), async (req, res) => {
  let { ...companyInformation } = req.body;
  let { ...companyStocks } = req.body;
  console.log(companyInformation);
  console.log(companyStocks);
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
