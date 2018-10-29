const path = require('path'),
      express = require('express'),

      app = express(),
      publicPath = path.join(__dirname, '../public'),
      port = process.env.PORT || 3000;

app.use('', express.static(publicPath));


app.listen(port, () => console.log(`Server is up on port ${port}`));