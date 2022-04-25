const express = require('express');
const path = require('path');
const app = express();
const hbs = require('hbs');
const port = process.env.PORT || 3000;
const conn = require('./db/conn.js');

require('./db/conn');


const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
      extended: true
}));

// Setting the path
const staticPath = path.join(__dirname, "../public");
const templatespath = path.join(__dirname, "../templates/views");
const partialpath = path.join(__dirname, "../templates/partials");

// Middleware
app.use('/css', express.static(path.join(__dirname, '../node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, '../node_modules/bootstrap/dist/js')));
app.use('/jq', express.static(path.join(__dirname, '../node_modules/jquery/dist')));
app.use(express.urlencoded({
      extended: false
}));
app.use(express.static(staticPath));
app.set('view engine', 'hbs');
app.set('views', templatespath);
hbs.registerPartials(partialpath);

// Routing 

app.get('/', (req, res) => {
      res.render('index');
});
app.get('/index', (req, res) => {
      res.render('index');
});

app.get('/', (req, res) => {
      res.send('ok');
});

app.post('/contact', function (req, res) {
      var name = req.body.name;
      var email = req.body.email;
      var mno = req.body.mno;
      var message = req.body.message;
      conn.connect((error) => {
            if (error) throw error;
            var sql = "INSERT INTO students (name,email,mno,message) VALUES ('" + name + "','" + email + "','" + mno + "','" + message + "')";
            conn.query(sql, (error, data) => {
                  if (error) throw error;
                  res.send('Form Submitted successfully!');
            });
      });
});


// creating server
app.listen(port, () => {
      console.log(`Listening at port No. ${port}`);
});