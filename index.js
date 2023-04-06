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
async function fetchRealtyData(url) {
    let response = await fetch(url,options);
    let data = await response.json();
  
    return data;
}

async function fetchStateData(url) {
  let response = await fetch(url);
  let data = await response.json();

  return data;
}

async function shuffleJSON(url, jsonType) {  // Used this function to make sure that everything that is being displayed neglect being 'labeled' by the user's eye, if that makes sense.
  let JSON = await fetchRealtyData(url)

  /*
    Credits to => The Fisher-Yates algorith
    
     for (let i = JSON.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [JSON[i], JSON[j]] = [JSON[j], JSON[i]];
        }
        
  */

  switch(jsonType) {
    case "sale":
      
        for (let i = JSON.properties.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          const temp = JSON.properties[i];
          JSON.properties[i] = JSON.properties[j];
          JSON.properties[j] = temp;
        }

      break;
    case "rent":
      
        for (let i = JSON.listings.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          const temp = JSON.listings[i];
          JSON.listings[i] = JSON.listings[j];
          JSON.listings[j] = temp;
        }

      break;
    case "agents":
      
        for (let i = JSON.agents.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          const temp = JSON.agents[i];
          JSON.agents[i] = JSON.agents[j];
          JSON.agents[j] = temp;
        }

      break;
    default:
      break;
  }
  

  return JSON;
}


// HOME ------------------------------------------------------------------
app.get('/', async (req, res) => {
  console.log("Inside 'Home' route");
  let ran = zipcodes.random();
  
  while(ran.country != "US") { // Reason for While: zipcodes npm package can either be zips from the US or Canada
    ran = zipcodes.random();
  }

  // let url = `https://realty-in-us.p.rapidapi.com/properties/list-for-sale?state_code=${ran.state}&city=${ran.city}&offset=0&limit=5&sort=photos`;

  // let locations = await fetchRealtyData(url);
  
  // while(locations.listings[0].photo === undefined || locations.listings === undefined) {
  //   let locations = await fetchRealtyData(url);
  // }

  
  // res.render('home',{"locationImg":locations.listings[0].photo});
  // res.render('home',{"locationImg":locations.listings[0].photo, "locCity": ran.city});
  res.render('home');
});



// RENT ------------------------------------------------------------------
app.get('/rent', (req, res) => {
  console.log("Inside 'Rent' route");
  res.render('rent',{"rent_listings": "", "length": ""});
});

app.get('/rent-search', async (req, res) => {
  let state = req.query.state;
  let city = req.query.city;
  
  console.log("State: " + state);
  console.log("City: " + city);

  let url;  
  if(zipcodes.lookupByName(city, state).length > 0) {
    if(state.length == 2) {
      url = `https://realty-in-us.p.rapidapi.com/properties/list-for-rent?state_code=${state}&city=${city}&limit=60&offset=0&sort=completeness&price_min=1750`;
    } else {
      url = `https://realty-in-us.p.rapidapi.com/properties/list-for-rent?state_code=${states.getStateCodeByStateName(state)}&city=${city}&limit=60&offset=0&sort=completeness&price_min=1750`;
    }
    
  let propertiesForRent = await shuffleJSON(url, "rent");
    
  if(propertiesForRent.listings.length > 0)
    res.render('rent',{"rent_listings": propertiesForRent.listings, "length": (propertiesForRent.listings / 2) + 5});
  } else {
    res.render('rent',{"rent_listings": "", "length": ""});
  }
});



// FOR SALE ------------------------------------------------------------------
app.get('/forsale', (req, res) => {
  console.log("Inside 'For Sale' route");
  
  res.render('forsale',{"for_sale_listings": "", "length": ""});
});

app.get('/forsale-search', async (req, res) => {
  let state = req.query.state;
  let city = req.query.city;
  
  console.log("State: " + state);
  console.log("City: " + city);
  
  let url;
  if(zipcodes.lookupByName(city, state).length > 0) {
    if(state.length == 2) {
      url = `https://realty-in-us.p.rapidapi.com/properties/v2/list-for-sale?city=${city}&state_code=${state}&offset=0&limit=60&sort=freshest&price_min=400000`;
    } else {
      url = `https://realty-in-us.p.rapidapi.com/properties/v2/list-for-sale?city=${city}&state_code=${states.getStateCodeByStateName(state)}&offset=0&limit=60&sort=freshest&price_min=400000`;
    }
      
  let propertiesForSale = await shuffleJSON(url, "sale");
  
  if(propertiesForSale.properties.length > 0)
    
    res.render('forsale',{"for_sale_listings": propertiesForSale.properties, "length": (propertiesForSale.properties / 2) + 5});
  } else {
    res.render('forsale',{"for_sale_listings": "", "length": ""});
  }
});

app.get('/local-properties', async (req, res) => {
  console.log("Inside 'local-properties' route");
  let city = "Monterey";
  let state = "California";
  let url = `https://realty-in-us.p.rapidapi.com/properties/v2/list-for-sale?city=${city}&state_code=${states.getStateCodeByStateName(state)}&offset=0&limit=60&sort=freshest&price_min=400000`;

  let localPropForSaleShuffled = await shuffleJSON(url, "sale");
  
  res.render('localProperties')
});

// FINANCE TOOLS  ------------------------------------------------------------------
app.get('/financetools', async (req, res) => {
  console.log("Inside 'Finance Tools' route");

  
  res.render('financetools');
});





// AGENTS  ------------------------------------------------------------------
app.get('/agents', async (req, res) => {
  console.log("Inside 'Agents' route");
  let randZipCode = zipcodes.random();
  
  while(randZipCode.country != "US") { 
    randZipCode = zipcodes.random();
  }
  
  // let url = `https://realty-in-us.p.rapidapi.com/agents/list?postal_code=${randZipCode.zip}&offset=0&limit=9&sort=recent_activity_high&types=agent`;
  // let data = await fetchRealtyData(url);
  // console.log(data);
  // res.render('agents', {"agentsList": data.agents, "agentCity": randZipCode.city});
    res.render('agents');

});


app.get('/agents-search', async (req, res) => {
  let zipcode = req.query.zipcode;

  let zipSearch = zipcodes.lookup(zipcode);

  let url;
  if(zipSearch === undefined) {
    url = `https://realty-in-us.p.rapidapi.com/agents/list?postal_code=${zipcode}&offset=0&limit=12&sort=recent_activity_high&types=agent`;  
  }
  let data = await shuffleJSON(url, "agents");

  if(data.agents.length > 0) {
     res.render('agents', {"agentsList": data.agents, "agentCity": randZipCode.city});
  } else {
     res.render('agents', {"agentsList": "", "agentCity": ""});
  }

})






// localhost::3000
app.listen(3000, () => {
  console.log("Server Started....");
});
