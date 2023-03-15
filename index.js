const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/public'));

app.listen(port, (err) => {
  err
    ? console.error(err)
    : console.log(`CMU Rocket app listening on port ${port}`);
});
