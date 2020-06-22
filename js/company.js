let urlParama = new URLSearchParams(window.location.search);
let symbol = urlParama.get("symbol");
let companyNameEl = document.getElementById("companyName");
console.log(symbol);
let apiKey = "ed93f3e229380c530b7a0e7663f86b99";
let profilURL = new URL(
  `https://financialmodelingprep.com/api/v3/profile/${symbol}`
);
let icon = document.getElementById("icon");
let descriptionEl = document.getElementById("description");
let priceEl = document.getElementById("price");
let changeEl = document.getElementById("change");
let loader = document.querySelector(".loader");

function appendSearchParam(element, key, value) {
  return element.searchParams.append(key, value);
}
appendSearchParam(profilURL, "apikey", apiKey);
let profileJson = profilURL.href;

function addLoader() {
  loader.classList.remove("d-none");
}

function removeLoader() {
  loader.classList.add("d-none");
}

function handleChangesColor(change) {
  if (change > 0) {
    changeEl.style.color = "lightgreen";
  } else {
    changeEl.style.color = "red";
  }
}

async function getCorpInfo() {
  let response = await fetch(profileJson);
  let dataArray = await response.json();
  companyNameEl.innerText = dataArray[0].companyName;
  icon.setAttribute("src", dataArray[0].image);
  descriptionEl.innerText = dataArray[0].description;
  priceEl.innerText = dataArray[0].price;
  changeEl.innerText = `(${dataArray[0].changes}%)`;
  handleChangesColor(dataArray[0].changes);
}

async function getStockHistory() {
  let response = await fetch(
    `https://financialmodelingprep.com/api/v3/historical-price-full/${symbol}?serietype=line&apikey=${apiKey}`
  );
  let historyDataArray = await response.json();
  let historyArray = historyDataArray.historical.sort(function compare(a, b) {
    if (a.date < b.date) {
      return -1;
    }
    if (a.date > b.date) {
      return 1;
    }
    return 0;
  });
  let historyDateArray = historyArray.map((corpObj) => corpObj.date);
  let historyCloseArray = historyArray.map((corpObj) => corpObj.close);
  getChart(historyDateArray, historyCloseArray);
  removeLoader();
}

function getChart(arrayParam1, arrayParam2) {
  var ctx = document.getElementById("myChart").getContext("2d");
  var chart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: arrayParam1,
      datasets: [
        {
          label: "Stock Price History",
          backgroundColor: "rgb(0,0,128,0.7)",
          hoverBackgroundColor: "rgba(0,0,255, 1)",
          borderColor: "rgb(0,0,128,0.7)",
          data: arrayParam2,
        },
      ],
    },
    options: {
      legend: {
        labels: {
          fontColor: "rgb(0,0,128)",
          fontFamily: "'Abril Fatface', cursive",
        },
      },
    },
  });
}

addLoader();
getStockHistory();
getCorpInfo();
