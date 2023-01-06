const app = require('express')();
const axios = require('axios');
const fs = require('fs');


app.get('/api/request', (req, res) => {
  let name = randomName();
  res.json({"name": name})
});

app.get('/api/locate/:name', async (req, res) => {
  const { name } = req.params;

  const response = await axios.get('https://ono.4b.rs/v1/jur', {
      params: {
          'key': process.env.API_KEY,
          'name': name,
          'type': 'surname'
      }
  });

    // Response is in the form of: 

    // "jurisdictions": [
    //   {
    //       "incidence": 797086,
    //       "percent": "1.534687955",
    //       "ratio": 65,
    //       "rank": 6,
    //       "jurisdiction": "Myanmar",
    //       "iso": "mm"
    //   }
    // ]

  console.log(response.status, response.statusText);

  if (response.status == 200) {
    console.log(response.data.jurisdictions[0]);
    res.json(response.data.jurisdictions[0]);
  } else {
    res.status(500).send({message: response.statusText});  
  }
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
  const fileContents = fs.readFileSync("names3.csv", 'utf8');
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

module.exports = app;
