const API = "1d3357edfad99b6cfc8ae83f";
const exchangeFrom = document.querySelector(".select-app__from");
const exchangeTo = document.querySelector(".select-app__to");
const errorMessage = document.querySelector(".app__error");
const result = document.querySelector(".app__result");
const currencies = [
  "EUR",
  "USD",
  "GBP",
  "PLN",
  "CHF",
  "CZK",
  "DKK",
  "NOK",
  "SEK",
  "CAD",
  "AUD",
  "UAH",
  "HUF",
  "AED",
  "ILS",
  "JPY",
  "KRW",
  "SGD",
  "THB",
];
///
currencies.forEach((currency) => {
  const option = document.createElement("option");
  option.value = currency;
  option.text = currency;
  exchangeFrom.add(option);
});
///
currencies.forEach((currency) => {
  const option = document.createElement("option");
  option.value = currency;
  option.text = currency;
  exchangeTo.add(option);
});
///
exchangeFrom.value = "USD";
exchangeTo.value = "EUR";
///
const convertCurrency = () => {
  const amount = document.querySelector(".app__input").value;
  if (amount.length != 0) {
    errorMessage.textContent = "";
    const requestHeaders = new Headers();
    requestHeaders.append("apikey", API);
    const promise = new Promise((resolve, reject) => {
      fetch(`https://v6.exchangerate-api.com/v6/${API}/latest/USD`, {
        headers: requestHeaders,
        method: "Get",
      })
        .then((response) => {
          if (response.ok) resolve(response.json());
          else reject(response);
        })
        .catch((error) => reject(error));
    });
    promise.then(resolve, reject);
  } else {
    errorMessage.innerHTML = `<p>"Please enter the amount to exchange"</p>`;
  }
};
function reject(data) {
  errorMessage.innerHTML = `<p>We Have a Problem! Error ${data.status}</p>`;
}

function resolve(data) {
  const amount = document.querySelector(".app__input").value;
  const fromCurrency = exchangeFrom.value;
  const toCurrency = exchangeTo.value;
  const fromExchangeRate = data.conversion_rates[fromCurrency];
  const toExchangeRate = data.conversion_rates[toCurrency];
  const convertedAmount = (amount / fromExchangeRate) * toExchangeRate;
  result.innerHTML = `${amount} ${fromCurrency} = ${convertedAmount.toFixed(
    2
  )} ${toCurrency}`;
}
///
document
  .querySelector(".app__button")
  .addEventListener("click", convertCurrency);
window.addEventListener("load", convertCurrency);
