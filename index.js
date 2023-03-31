const express = require('express');
const app = express();
const fetch = require('node-fetch');
const statesUrl = `https://csumb.space/api/allStatesAPI.php`;

const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': 'bc7708f264msh880c9c36ec2445cp1e462ejsn03031156db1c',
    'X-RapidAPI-Host': 'realty-in-us.p.rapidapi.com'
  }
}; 


app.set("view engine", "ejs");
app.use(express.static("public"));

// Fetch Function
async function fetchData(url) {
    let response = await fetch(url,options);
    let data = await response.json();
  
    return data;
}


app.get('/', async (req, res) => {
  let states = await fetchData(statesUrl);
  console.log(states);
  let randomIndex = Math.floor(Math.random() * states.length);
  let state = states[randomIndex].state;
  let state_code = states[randomIndex].usps;
  console.log(state + " " + state_code);
  // let url = `https://realty-in-us.p.rapidapi.com/locations/v2/auto-complete?input=${randomState}&limit=5`;

  // let data = await fetchData(url);
  // console.log(data);
  res.render('home');
});

app.get('/rent', (req, res) => {
  
  res.render('rent');
});
app.get('/forsale', (req, res) => {
  res.render('forsale');
});
app.get('/financetools', (req, res) => {
  res.render('financetools');
});
app.get('/agents', (req, res) => {
  res.render('agents');
});














// localhost::3000
app.listen(3000, () => {
  console.log("Server Started....");
});
