const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = (module.exports = express());
const port = process.env.PORT || 4000;

app.use(bodyParser.json());
app.use(cors());

app.get('/dateValues/:dateVal', (req, res, next) => {
  const dateRequested = req.params.dateVal;
  res.json(formatDate(dateRequested));
});

function formatDate(dateToFormat) {
  const options = {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  };
  if (isNaN(dateToFormat)) {
    return {
      formatted: new Date(dateToFormat).toLocaleDateString('en-us', options),
      unix: new Date(dateToFormat).getTime() / 1000,
    };
  }
  return {
    formatted: new Date(dateToFormat * 1000).toLocaleDateString('en-us', options),
    unix: dateToFormat,
  };
}

app.listen(port, () => {
  console.log('running');
});
