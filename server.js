const express = require('express')
const cors = require('cors')
const port = 8000
const bp = require("body-parser");
const dbname = "foods"
const cookieParser = require("cookie-parser")
const path = require('path')




const app = express()
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use(bp.json({ limit: '16mb' }));
app.use(cookieParser())
app.use(express.json());
app.use(express.static('./public'));




require("./server/config/mongoose.config")(dbname)
require('./server/routes/user.routes')(app)

//Serve static assets
if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

app.listen(port, () => console.log(`Server has connected successfully ++++++++++++++ on port: ${port}`));

  // "scripts": {
  //   "start": "node server.js",
  //   "server": "nodemon server.js",
  //   "client": "npm start --prefix client",
  //   "clientinstall": "npm install --prefix client",
  //   "dev": "concurrently \"npm run server\" \"npm run client\"",
  //   "heroku-postbuild": "NPM_CONFIG_PRODUCTION=false npm install --prefix client && npm run build --prefix client"
  // },