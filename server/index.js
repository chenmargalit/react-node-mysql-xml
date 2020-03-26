const express = require('express');
const cors = require('cors');
const app = express();
const create = require('./routes/create');
const fetch = require('./routes/fetch');
const edit = require('./routes/edit');
const bodyParser = require('body-parser');

app.use(bodyParser.json());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// express cors middleware to allow communication between different origins (e.g localhost3000/5000)
app.use(cors());

app.get('/', (req, res) => {
  res.send('Home page working in server side');
});

app.use('/', create);
app.use('/', fetch);
app.use('/', edit);

app.listen(5000, () => {
  console.log('listening on 5000');
});
