const app = require('express')();
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const port = process.env.PORT || 8080;

app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello World!')
})

// let corsOptions = {
//   origin : ['*'],
// }


app.get('/api/request', (req, res) => {
  let name = randomName();
  res.json({"name": name})
});

app.get('/api/locate/:name', (req, res) => {
  const { name } = req.params;

  console.log(process.env.API_KEY);
  
  axios.get('https://ono.4b.rs/v1/jur', {
      params: {
          'key': process.env.API_KEY,
          'name': name,
          'type': 'surname'
      }
  })
    .then(resp => {
      console.log(resp.status);
      console.log(resp.statusText);
      console.log(resp.data);
      res.json({
        jurisdictionData: resp.data.jurisdictions[0],
        remainingCredits: resp.data.remainingCredits
      });
    })
    .catch(error => console.error(error));

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


});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
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
  const file = path.join(process.cwd(), 'names3.csv');

  const fileContents = fs.readFileSync(file, 'utf8');
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
