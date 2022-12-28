var express = require('express');
var router = express.Router();

const fs = require('fs');
const filePath = "../name_scraping/names3.csv";
const axios = require('axios');
const https = require('https');

require('dotenv').config();

/* GET home page. */
router.get('/request', function(req, res, next) {
  let name = randomName();
  res.json({"name": name})
});

router.get('/locate', function(req, res) {
  let name = req.params.name
  console.log("Locating ", name)

  //TODO:
  //Having trouble with CORS
});

 
function randomName() {
  // Pick a column from names.csv
  let col = Math.floor(Math.random() * 26);
  //Make sure it's an even numbered column
  if (col % 2 == 1) {
    col -= 1
  }

  //Pick from the first 30 rows of the column.
  const row = Math.floor(Math.random() * 30) + 1;

  // Load CSV:

  // Read the file contents into a string
  const fileContents = fs.readFileSync(filePath, 'utf8');
  // Split the string by newlines to get an array of rows
  const rows = fileContents.split('\n');
  // Map the rows array to a 2D array, splitting each row by commas to get the values
  const data = rows.map(row => row.split(','));

  let name = data[row][col]
  
  console.log(row, col)
  console.log(data[row])
  console.log(name)
  
  return name;
}

module.exports = router;
