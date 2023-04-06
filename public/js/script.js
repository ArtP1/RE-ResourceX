document.querySelector("#check_rate").addEventListener("click", checkRate);
document.querySelector("#calc_affordability").addEventListener("click", calcAffordability);
document.querySelector("#check_equ_rates").addEventListener("click", checkEquityRates);
document.querySelector("#finance_rates").addEventListener("click", financeRates);







/*
URL = 'https://realty-in-us.p.rapidapi.com/mortgage/check-rates?creditScore=excellent&points=all&loanPurpose=purchase&loanTypes=ALL&loanPercent=85.2&propertyPrice=250000&zip=90230'
*/
function checkRate() {
  let creditScore = document.querySelector("#creditScoreCR").value;
  let points = document.querySelector("#pointsCR").value;
  let loanPurpose = document.querySelector("#loanPurposeCR").value;
  let loanTypes = document.querySelector("#loanTypesCR").value;
  let loanPercent = document.querySelector("#loanPercentCR").value;
  let propertyPrice = document.querySelector("#propertyPriceCR").value;
  let zipcode = document.querySelector("#zipcodeCR").value;

  console.log(creditScore + "\n" + points + "\n" + loanPurpose + "\n" + loanTypes + "\n" + loanPercent + "\n" + propertyPrice + "\n" + zipcode + "\n");
}






/*
URL = 'https://realty-in-us.p.rapidapi.com/mortgage/calculate-affordability?annual_income=250000&debt_to_income_ratio=0.43&down_payment=172000&homeowner_insurance_rate=0.012&interest_rate=0.03119&loan_term=30&monthly_debt=1500&tax_rate=0.01&hoa_fees=0&is_pmi_included=true'
*/
function calcAffordability() {
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

  console.log(annualIncome + "\n" + debt_to_income_ratio + "\n" + down_payment + "\n" + homeowner_insurance_rate + "\n" + interest_rate + "\n" + loan_term + "\n" + monthly_debt + "\n" + tax_rate + "\n" + hoa_fees + "\n" + is_pmi_included + "\n");
}







/*
URL = 'https://realty-in-us.p.rapidapi.com/mortgage/check-equity-rates?creditScore=excellent&loanProduct=HELOAN_FIXED_20YEARS%2CHELOAN_FIXED_30YEARS&loanAmount=70000&propertyValue=300000&mortgageBalance=150000&zip=93505&state=CA'
*/
function checkEquityRates() {
  let creditScore = document.querySelector("#creditScoreCER").value;
  let loanProduct = document.querySelector("#loanProdCER").value;
  let loanAmount = document.querySelector("#loanAmountCER").value;
  let propertyValue = document.querySelector("#propertyValCER").value;
  let mortgageBalance = document.querySelector("#mortgageBalCER").value;
  let zipcode = document.querySelector("#zipcodeCER").value;


  console.log(creditScore + "\n" + loanProduct + "\n" + loanAmount + "\n" + propertyValue + "\n" + mortgageBalance + "\n" + zipcode + "\n");
}








/*
URL = 'https://realty-in-us.p.rapidapi.com/mortgage/check-rates?creditScore=excellent&points=all&loanPurpose=purchase&loanTypes=ALL&loanPercent=85.2&propertyPrice=250000&zip=90230'
*/
function financeRates() {
  let creditScore = document.querySelector("#annualIncomeCA").value;
  let points = document.querySelector("#debtToIncomeRationCA").value;
  let loanPurpose = document.querySelector("#downPaymentCA").value;
  let loanTypes = document.querySelector("#homeInsuranceRateCA").value;
  let loanPercent = document.querySelector("#interestRateCA").value;
  let propertyPrice = document.querySelector("#loanTermCA").value;
  let zipcode = document.querySelector("#monthlyDebtCA").value;


  console.log(creditScore + "\n" + points + "\n" + loanPurpose + "\n" + loanTypes + "\n" + loanPercent + "\n" + propertyPrice + "\n" + zipcode + "\n");
}