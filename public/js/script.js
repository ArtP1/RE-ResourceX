document.querySelector("#check_rate").addEventListener("click", checkRate);
document.querySelector("#calc_affordability").addEventListener("click", calcAffordability);
document.querySelector("#check_equ_rates").addEventListener("click", checkEquityRates);
document.querySelector("#finance_rates").addEventListener("click", financeRates);


const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'f307036bd8msh5a1cef3c7032b1cp174b46jsnb6c3361f3014',
		'X-RapidAPI-Host': 'realty-in-us.p.rapidapi.com'
	}
};


// async function fetchRealtyData(url) {
//     let response = await fetch(url,options);
//     let data = await response.json();
  
//     return data;
// }

/*
URL = 'https://realty-in-us.p.rapidapi.com/mortgage/check-rates?creditScore=excellent&points=all&loanPurpose=purchase&loanTypes=ALL&loanPercent=85.2&propertyPrice=250000&zip=90230'
*/
async function checkRate() {
  console.log("Checking Rates....");
  let creditScore = document.querySelector("#creditScoreCR").value;
  let points = document.querySelector("#pointsCR").value;
  let loanPurpose = document.querySelector("#loanPurposeCR").value;
  let loanType = document.querySelector("#loanTypesCR").value;
  let loanPercent = document.querySelector("#loanPercentCR").value;
  let propertyPrice = document.querySelector("#propertyPriceCR").value;
  let zipcode = document.querySelector("#zipcodeCR").value;


  let url = `https://realty-in-us.p.rapidapi.com/mortgage/check-rates?creditScore=${creditScore}&points=${points}&loanPurpose=${loanPurpose}&loanTypes=${loanType}&loanPercent=${loanPercent}&propertyPrice=${propertyPrice}&zip=${zipcode}`;

  let data = await fetch(url,options);
  console.log(data);
  
  if(data.rates.length > 0) {
    document.querySelector("#check_rate_results").innerHTML = `<div>
                                                                <p>APR: ${data.rates[0].aprVal}%</p>
                                                              </div>
                                                              <div>
                                                                <p>Loan Type: ${data.rates[0].loanTypeDisplayName}</p>
                                                              </div>
                                                              <div>
                                                                <p>Monthly Payment: $${data.rates[0].loanPayment}</p>
                                                              </div>
                                                              <div>
                                                                <p>Rate: ${data.rates[0].rate}%</p>
                                                              </div>
                                                            `; 
  }
   
}






/*
URL = 'https://realty-in-us.p.rapidapi.com/mortgage/calculate-affordability?annual_income=250000&debt_to_income_ratio=0.43&down_payment=172000&homeowner_insurance_rate=0.012&interest_rate=0.03119&loan_term=30&monthly_debt=1500&tax_rate=0.01&hoa_fees=0&is_pmi_included=true'
*/
async function calcAffordability() {
  console.log("Calculating Affordability....");
  let annualIncome = document.querySelector("#annualIncomeCA").value;
  let debt_to_income_ratio = document.querySelector("#debtToIncomeRationCA").value;
  let down_payment = document.querySelector("#downPaymentCA").value;
  let homeowner_insurance_rate = document.querySelector("#homeInsuranceRateCA").value;
  let interest_rate = document.querySelector("#interestRateCA").value;
  let loan_term = document.querySelector("#loanTermCA").value;
  let monthly_debt = document.querySelector("#monthlyDebtCA").value;
  let tax_rate = document.querySelector("#taxRateCA").value;
  let hoa_fees = document.querySelector("#hoaFeesCA").value;
  let is_pmi_included = document.querySelector("#isPmiInlcudedCA").value;



  let url = `https://realty-in-us.p.rapidapi.com/mortgage/calculate-affordability?annual_income=${annualIncome}&debt_to_income_ratio=${debt_to_income_ratio}&down_payment=${down_payment}&homeowner_insurance_rate=${homeowner_insurance_rate}&interest_rate=${interest_rate}&loan_term=${loan_term}&monthly_debt=${monthly_debt}&tax_rate=${tax_rate}&hoa_fees=${hoa_fees}&is_pmi_included=${is_pmi_included}`;

  let data = await fetchRealtyData(url); 
  console.log(data);
}







/*
URL = 'https://realty-in-us.p.rapidapi.com/mortgage/check-equity-rates?creditScore=excellent&loanProduct=HELOAN_FIXED_20YEARS%2CHELOAN_FIXED_30YEARS&loanAmount=70000&propertyValue=300000&mortgageBalance=150000&zip=93505&state=CA'
*/
function checkEquityRates() {
  console.log("Checking Rates Affordability....");
  let creditScore = document.querySelector("#creditScoreCER").value;
  let loanProduct = document.querySelector("#loanProdCER").value;
  let loanAmount = document.querySelector("#loanAmountCER").value;
  let propertyValue = document.querySelector("#propertyValCER").value;
  let mortgageBalance = document.querySelector("#mortgageBalCER").value;
  let zipcode = document.querySelector("#zipcodeCER").value;


}








/*
URL = 'https://realty-in-us.p.rapidapi.com/mortgage/check-rates?creditScore=excellent&points=all&loanPurpose=purchase&loanTypes=ALL&loanPercent=85.2&propertyPrice=250000&zip=90230'
*/
function financeRates() {
  console.log("Checking Financing Rates....");
  let creditScore = document.querySelector("#annualIncomeCA").value;
  let points = document.querySelector("#debtToIncomeRationCA").value;
  let loanPurpose = document.querySelector("#downPaymentCA").value;
  let loanTypes = document.querySelector("#homeInsuranceRateCA").value;
  let loanPercent = document.querySelector("#interestRateCA").value;
  let propertyPrice = document.querySelector("#loanTermCA").value;
  let zipcode = document.querySelector("#monthlyDebtCA").value;


  console.log(creditScore + "\n" + points + "\n" + loanPurpose + "\n" + loanTypes + "\n" + loanPercent + "\n" + propertyPrice + "\n" + zipcode + "\n");
}