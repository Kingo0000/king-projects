const currencyEl_one = document.getElementById('currency-one');
const currencyEl_two = document.getElementById('currency-two');
const amountEl_one = document.getElementById('amount-one');
const amountEl_two = document.getElementById('amount-two');
const rateEl = document.getElementById('rate');
const swap = document.getElementById('swap');

function calculate() {
  const currency_one = currencyEl_one.value;
  const currency_two = currencyEl_two.value;

  // Fetching the API
  fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${currency_one}&vs_currencies=${currency_two}`)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      console.log(data);

      const rate = data[currency_one][currency_two];
      rateEl.innerText = `1 ${currency_one} = ${rate.toLocaleString()} ${currency_two}`;
      const calculatedValue = amountEl_one.value * rate;
      amountEl_two.value = calculatedValue.toFixed(5);
    });
}

currencyEl_one.addEventListener('change', calculate);
amountEl_one.addEventListener('input', calculate);
currencyEl_two.addEventListener('change', calculate);
amountEl_two.addEventListener('input', calculate);

swap.addEventListener('click', function() {
  const temp = currencyEl_one.value;
  currencyEl_one.value = currencyEl_two.value;
  currencyEl_two.value = temp;
  calculate();
});

calculate();
