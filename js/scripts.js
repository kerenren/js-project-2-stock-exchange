let searchBtn = document.querySelector(".search");
let searchQuery = document.getElementById("search-query");
let searchResults = document.getElementById("search-results");
let loader = document.querySelector(".loader");
let apiKey = "ed93f3e229380c530b7a0e7663f86b99";
let tikerItem = document.getElementById("tiker-item");
let symbolArrayGlobe = [];

function addLoader() {
  loader.classList.remove("d-none");
}
function removeLoader() {
  loader.classList.add("d-none");
}

function handleNumberColor(number, numberEL) {
  if (number > 0) {
    numberEL.style.color = "lightgreen";
  } else {
    numberEL.style.color = "red";
  }
}

async function getSymbol() {
  let symbolListURL = `https://financialmodelingprep.com/api/v3/stock/list?apikey=${apiKey}`;
  let response = await fetch(symbolListURL);
  let symbolistArray = await response.json();
  symbolArray = symbolistArray.map(function (currentCompany) {
    return currentCompany.symbol;
  });
  return (symbolArrayGlobe = symbolArray);
}

function createMarquee(price, symbol) {
  let priceEl = document.createElement("span");
  let symbolEl = document.createElement("span");
  priceEl.classList.add("ticker-price");
  symbolEl.classList.add("ticker-symbol");
  priceEl.innerText = ` $${price}`;
  symbolEl.innerText = ` ${symbolArrayGlobe[symbol]}`;
  handleNumberColor(price, priceEl);
  tikerItem.append(symbolEl);
  tikerItem.append(priceEl);
}

async function getRealtimePrice() {
  await getSymbol();
  for (symbol in symbolArrayGlobe) {
    let response = await fetch(
      `https://financialmodelingprep.com/api/v3/quote-short/${symbolArrayGlobe[symbol]}?apikey=${apiKey}`
    );
    let realtimePriceArray = await response.json();
    realtimePriceArray.forEach(async function (realtimePriceobj) {
      let { price } = realtimePriceobj;
      createMarquee(price, symbol);
    });
  }
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

async function getOneRealtimePrice() {
  await getSymbol();
  let randomSymbol = getRandomInt(500);
  let response = await fetch(
    `https://financialmodelingprep.com/api/v3/quote-short/${symbolArrayGlobe[randomSymbol]}?apikey=${apiKey}`
  );
  let realtimePriceArray = await response.json();
  let { price } = realtimePriceArray[0];
  createMarquee(price, randomSymbol);
}

function appendResult(companyDataArray) {
  companyDataArray.map(async function (currentCompany) {
    let { name, symbol } = currentCompany;
    let profileJson = `https://financialmodelingprep.com/api/v3/profile/${symbol}?apikey=${apiKey}`;
    let response = await fetch(profileJson);
    let companiesProfileData = await response.json();
    let companies = companiesProfileData[0];
    let { changes, image } = companies; // Object Destructuring
    let corpList = document.createElement("div");
    let corpName = document.createElement("a");
    let corpIcon = document.createElement("img");
    let changeEl = document.createElement("span");
    let corpLink = `./company.html?symbol=${symbol}`;
    corpIcon.src = image;
    corpIcon.width = "35";
    corpIcon.classList.add("border-0");
    corpName.classList.add("border-0", "mx-3");
    changeEl.classList.add("border-0", "my-0", "ml-2");
    corpList.classList.add("list-group-item", "d-flex", "align-items-center");
    corpName.innerText = `${name}`;
    corpName.href = corpLink;
    corpList.innerText = ` (${symbol})`;
    changeEl.innerText = `(${changes}%)`;
    handleNumberColor(changes, changeEl);
    corpList.append(changeEl);
    corpList.prepend(corpName);
    corpList.prepend(corpIcon);
    searchResults.append(corpList);
  });
}

function removeResultList() {
  let child = searchResults.lastElementChild;
  while (child) {
    searchResults.removeChild(child);
    child = searchResults.lastElementChild;
  }
}

async function searchStock() {
  addLoader();
  if (searchResults.childNodes.length) {
    removeResultList();
  }
  let query = searchQuery.value;
  let stockURL = `https://financialmodelingprep.com/api/v3/search?query=${query}&limit=10&exchange=NASDAQ&apikey=${apiKey}`;
  let response = await fetch(stockURL);
  let companyDataArray = await response.json();
  appendResult(companyDataArray);
  removeLoader();
}

searchBtn.addEventListener("click", searchStock);
window.addEventListener("load", getRealtimePrice);
window.addEventListener("error", getOneRealtimePrice);
