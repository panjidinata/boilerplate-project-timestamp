// index.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

app.get("/api/", function (req, res) {
  const currUnix = Date.now();
  const currUTC = new Date(currUnix).toUTCString();

  res.json({ unix: currUnix, utc: currUTC });
});

app.get("/api/:date", function (req, res) {
  const dateParam = req.params.date.toString();
  let utcTime;
  let unixTime;

  // kondisi pertama akan dijalankan jika nilai parameter adalah unix epoch.
  // kondisi kedua akan dijalankan jika nilai parameter adalah string dengan
  // format tanggal yang valid.

  if (!isNaN(new Date(Number(dateParam)))) {
    unixTime = new Date(Number(dateParam)).valueOf();
    utcTime = new Date(Number(dateParam)).toUTCString();
  } else if (!isNaN(Date.parse(dateParam))) {
    utcTime = new Date(dateParam).toUTCString();
    unixTime = new Date(dateParam).valueOf();
  } else {
    res.json({ error: "Invalid Date" });
  }

  res.json({ unix: unixTime, utc: utcTime });
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
