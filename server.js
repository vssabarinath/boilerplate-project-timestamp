const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors({ optionsSuccessStatus: 200 }));
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/api/:date?', (req, res) => {
  let dateParam = req.params.date;

  let date;

  if (!dateParam) {
    date = new Date();
  } else if (!isNaN(dateParam)) {
    // If numeric, treat as Unix timestamp (in milliseconds)
    date = new Date(parseInt(dateParam));
  } else {
    // Otherwise, treat as date string
    date = new Date(dateParam);
  }

  if (date.toString() === "Invalid Date") {
    res.json({ error: "Invalid Date" });
  } else {
    res.json({
      unix: date.getTime(),
      utc: date.toUTCString()
    });
  }
});

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port);
});
