const express = require('express');
const app = express();

/* Serve to local IP address or Heroku Port */
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Listening at port ${ PORT }`);
});

/* Serve the main webpage */
app.use(express.static('public'));