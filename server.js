'use strict';
const fs = require('fs');
const companyData = fs.readFileSync('./symbollist.json').toString();
const cors = require('cors');

const express = require('express');
const app = express();

app.use(cors());

app.use(express.static(__dirname + '/build'));

app.get('/stocks', (req, res) => {
  res.json(companyData);
});

app.listen(3000, () => console.log('server up on 3000'));
