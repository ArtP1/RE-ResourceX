const express = require('express');
var zipcodes = require('zipcodes');
var states = require('us-state-codes');
const fetch = require('node-fetch');
const app = express();

const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': 'bd2b5a2586msh6687a14cd306d7ep1a744fjsn22255b88e536',
    'X-RapidAPI-Host': 'realty-in-us.p.rapidapi.com'
  }
};

app.use(express.static("public"));
app.set("view engine", "ejs");

// ------------------------------------ OTHER FUNCTIONS ------------------------------------
async function fetchRealtyData(url) {
    let response = await fetch(url,options);
    let data = await response.json();
  
    return data;
}




// HOME ------------------------------------------------------------------
app.get('/', (req, res) => {

  
  console.log("Inside 'Home' route");

  res.render('home')
});



// RENT ------------------------------------------------------------------
app.get('/rent', (req, res) => {
  console.log("Inside 'Rent' route");
  res.render('rent',{"rent_listings": ""})
});

app.get('/rent-search', async (req, res) => {
  let state = req.query.state;
  let city = req.query.city;
  
  let url;  
  if(zipcodes.lookupByName(city, state).length > 0) {
    if(state.length == 2) {
      url = `https://realty-in-us.p.rapidapi.com/properties/list-for-rent?state_code=${state}&city=${city}&limit=30&offset=0&sort=completeness&price_min=1750`;
    } else {
      url = `https://realty-in-us.p.rapidapi.com/properties/list-for-rent?state_code=${states.getStateCodeByStateName(state)}&city=${city}&limit=30&offset=0&sort=completeness&price_min=1750`;
    }
    
  let propertiesForRent = await fetchRealtyData(url);
  console.log(propertiesForRent);
  if(propertiesForRent.listings.length > 0)
    res.render('rent', {"rent_listings": propertiesForRent.listings})
    console.log("SUCCESS");
  } else {
    res.render('rent', {"rent_listings": ""})
    console.log("FAILED");
  }
});



// FOR SALE ------------------------------------------------------------------
app.get('/forsale', (req, res) => {
  console.log("Inside 'For Sale' route");
  
  res.render('forsale',{"for_sale_listings": ""})
});

app.get('/forsale-search', async (req, res) => {
  let state = req.query.state;
  let city = req.query.city;
  
  
  let url;
  if(zipcodes.lookupByName(city, state).length > 0) {
    if(state.length == 2) {
      url = `https://realty-in-us.p.rapidapi.com/properties/v2/list-for-sale?city=${city}&state_code=${state}&offset=0&limit=30&sort=freshest&price_min=400000`;
    } else {
      url = `https://realty-in-us.p.rapidapi.com/properties/v2/list-for-sale?city=${city}&state_code=${states.getStateCodeByStateName(state)}&offset=0&limit=30&sort=freshest&price_min=400000`;
    }
      
  let propertiesForSale = await fetchRealtyData(url);
  
  if(propertiesForSale.properties.length > 0)
    res.render('forsale',{"for_sale_listings": propertiesForSale.properties})
    console.log("SUCCESS");
  } else {
    res.render('forsale',{"for_sale_listings": ""})
    console.log("FAILED");
  }
});

app.get('/local-properties', async (req, res) => {
  console.log("Inside 'local-properties' route");
  let city = "Monterey";
  let state = "California";
  let url = `https://realty-in-us.p.rapidapi.com/properties/v2/list-for-sale?city=${city}&state_code=${states.getStateCodeByStateName(state)}&offset=0&limit=30&sort=freshest&price_min=400000`;

  let localPropForSale = await fetchRealtyData(url);
  
  res.render('localProperties', {"local_properties": localPropForSale.properties})
});

// FINANCE TOOLS  ------------------------------------------------------------------
app.get('/financetools', async (req, res) => {
  console.log("Inside 'Finance Tools' route");

  
  res.render('financetools')
});





// AGENTS  ------------------------------------------------------------------
app.get('/agents',  (req, res) => {
  console.log("Inside 'Agents' route");

  
  res.render('agents', {"agentsList": "", "agentCity": ""})

});


app.get('/agents-search', async (req, res) => {
  let zipcode = req.query.zipcode;

  let zipSearch = zipcodes.lookup(zipcode);
  
  let url;
  if(zipSearch === undefined) {
    res.render('agents', {"agentsList": "", "agentCity": ""})
    console.log("FAILED");
  } else {
    url = `https://realty-in-us.p.rapidapi.com/agents/list?postal_code=${zipSearch.zip}&offset=0&limit=40&sort=recent_activity_high&types=agent`; 
  }
  let data = await fetchRealtyData(url);

  if(data.agents.length > 0) {
     res.render('agents', {"agentsList": data.agents, "agentCity": ""})
     console.log("SUCCESS");
  } else {
    res.render('agents', {"agentsList": "", "agentCity": ""})
    console.log("FAILED");
  }

});






// localhost::3000
app.listen(3000, () => {
  console.log("Server Started....");
});
