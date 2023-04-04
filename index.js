const express = require('express');
var zipcodes = require('zipcodes');
var states = require('us-state-codes');
const fetch = require('node-fetch');

const app = express();
var statesUrl = `https://csumb.space/api/allStatesAPI.php`;

const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': 'bc7708f264msh880c9c36ec2445cp1e462ejsn03031156db1c',
    'X-RapidAPI-Host': 'realty-in-us.p.rapidapi.com'
  }
}; 

app.set("view engine", "ejs");
app.use(express.static("public"));

// ------------------------------------ OTHER FUNCTIONS ------------------------------------
async function fetchRealityData(url) {
    let response = await fetch(url,options);
    let data = await response.json();
  
    return data;
}

async function fetchStateData(url) {
  let response = await fetch(url);
  let data = await response.json();

  return data;
}



// HOME ------------------------------------------------------------------
app.get('/', async (req, res) => {
  let ran = zipcodes.random();
  
  while(ran.country != "US") { // Reason for While: zipcodes npm package can either be zips from the US or Canada
    ran = zipcodes.random();
  }

  // let url = `https://realty-in-us.p.rapidapi.com/properties/list-for-sale?state_code=${ran.state}&city=${ran.city}&offset=0&limit=5&sort=photos`;

  // let locations = await fetchRealityData(url);
  // console.log(ran.city);
  
  // res.render('home',{"locationImg":locations.listings[0].photo, "locCity": ran.city});
  res.render('home');
});



// RENT ------------------------------------------------------------------
app.get('/rent', (req, res) => {

  res.render('rent',{"rent_listings": ""});
});

app.get('/rent-search', async (req, res) => {
  let state = req.query.state;
  let city = req.query.city;
  
  console.log("State: " + state);
  console.log("City: " + city);

  let url;
  let data;
  
  if(zipcodes.lookupByName(city, state).length > 0) {
    if(state.length == 2) {
      url = `https://realty-in-us.p.rapidapi.com/properties/list-for-rent?state_code=${state}&city=${city}&limit=9&offset=0&sort=freshest&price_min=1750`;
    } else {
      url = `https://realty-in-us.p.rapidapi.com/properties/list-for-rent?state_code=${states.getStateCodeByStateName(state)}&city=${city}&limit=9&offset=0&sort=freshest&price_min=1750`;
    }
    
    data = await fetchRealityData(url);
    
  if(data.listings.length > 0)
    res.render('rent',{"rent_listings": data.listings});
  } else {
    res.render('rent',{"rent_listings": ""});
  }
});



// FOR SALE ------------------------------------------------------------------
app.get('/forsale', (req, res) => {

  
  res.render('forsale', {"for_sale_listings": ""});
});

app.get('/forsale-search', async (req, res) => {
  let state = req.query.state;
  let city = req.query.city;
  
  console.log("State: " + state);
  console.log("City: " + city);
  
  let url;
  let data;
  
  if(zipcodes.lookupByName(city, state).length > 0) {
    if(state.length == 2) {
      url = `https://realty-in-us.p.rapidapi.com/properties/list-for-sale?state_code=${state}&city=${city}&offset=0&limit=9&sort=freshest&price_min=1750`;
    } else {
      url = `https://realty-in-us.p.rapidapi.com/properties/list-for-sale?state_code=${states.getStateCodeByStateName(state)}&city=${city}&offset=0&limit=9&sort=freshest&price_min=1750`;
    }
      
    data = await fetchRealityData(url);
    
  if(data.listings.length > 0)
    res.render('forsale',{"for_sale_listings": data.listings});
  } else {
    res.render('forsale',{"for_sale_listings": ""});
  }
});



// FINANCE TOOLS  ------------------------------------------------------------------
app.get('/financetools', async (req, res) => {

  res.render('financetools');
});





// AGENTS  ------------------------------------------------------------------
app.get('/agents', async (req, res) => {
  let randZipCode = zipcodes.random();
  
  while(randZipCode.country != "US") { 
    randZipCode = zipcodes.random();
  }
  
  // let url = `https://realty-in-us.p.rapidapi.com/agents/list?postal_code=${randZipCode.zip}&offset=0&limit=9&sort=recent_activity_high&types=agent`;
  // let data = await fetchRealityData(url);
  // console.log(data);
  // res.render('agents', {"agentsList": data.agents, "agentCity": randZipCode.city});
    res.render('agents');

});


app.get('/agents-search', (req, res) => {
  let zipcode = req.query.zipcode;

  let zipSearch = zipcodes.lookup(zipcode);

  let url;
  let data;
  if(zipSearch === undefined) {
    let url = `https://realty-in-us.p.rapidapi.com/agents/list?postal_code=${zipcode}&offset=0&limit=9&sort=recent_activity_high&types=agent`;  

    data = await fetchRealityData(url);

     res.render('agents', {"agentsList": data.agents, "agentCity": randZipCode.city});
  } else {
     res.render('agents', {"agentsList": "", "agentCity": ""});
  }

  res.render('agents');
})













// localhost::3000
app.listen(3000, () => {
  console.log("Server Started....");
});
