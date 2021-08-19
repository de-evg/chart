const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
const port = 3000;

const data = {
  valueName1: [
    { value: 10, date: new Date("01.01.2001") },
    { value: 20, date: new Date("01.01.2002") },
    { value: 30, date: new Date("01.01.2003") },
    { value: 30, date: new Date("01.01.2004") },
    { value: 60, date: new Date("01.01.2005") },
    { value: 70, date: new Date("01.01.2006") },
    { value: 50, date: new Date("01.01.2007") },
    { value: 20, date: new Date("01.01.2008") },
    { value: 30, date: new Date("01.01.2009") },
  ],
  valueName2: [
    { value: 40, date: new Date("01.01.2001") },
    { value: 40, date: new Date("01.01.2002") },
    { value: 40, date: new Date("01.01.2003") },
  ],
  valueName3: [
    { value: 30, date: new Date("01.01.2001") },
    { value: 20, date: new Date("01.01.2002") },
    { value: 10, date: new Date("01.01.2003") },
  ],
  xxxx: [
    { value: 30, date: new Date("01.01.2001") },
    { value: 20, date: new Date("01.01.2002") },
    { value: 10, date: new Date("01.01.2003") },
  ],
};

app.get("/get-value-names", function (req, res) {
  res.json(Object.keys(data));
});

app.get("/get-data", function (req, res) {
  const valueName = req.query.name;

  res.json(data[valueName]);
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
