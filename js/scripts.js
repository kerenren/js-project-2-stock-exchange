const searchBtn = document.querySelector(".search");
const searchQuery = document.getElementById("search-query");
const searchResults = document.getElementById("search-results");
const loader = document.querySelector(".loader");
const apiKey = "ed93f3e229380c530b7a0e7663f86b99";
const tikerItem = document.getElementById("tiker-item");
const fragment = new DocumentFragment();
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
  const symbolListURL = `https://financialmodelingprep.com/api/v3/stock/list?apikey=${apiKey}`;
  const response = await fetch(symbolListURL);
  const symbolistArray = await response.json();
  symbolArray = symbolistArray.map(function (currentCompany) {
    return currentCompany.symbol;
  });
  return (symbolArrayGlobe = symbolArray);
}

function createMarquee(price, symbol) {
  const priceEl = document.createElement("span");
  const symbolEl = document.createElement("span");
  priceEl.classList.add("ticker-price");
  symbolEl.classList.add("ticker-symbol");
  priceEl.innerText = ` $${price}`;
  symbolEl.innerText = ` ${symbol}`;
  handleNumberColor(price, priceEl);
  fragment.append(symbolEl);
  fragment.append(priceEl);
}

async function getRealtimePrice() {
  await getSymbol();
  for (let i = 0; i < 30; i++) {
    symbol = symbolArrayGlobe[i];
    const response = await fetch(
      `https://financialmodelingprep.com/api/v3/quote-short/${symbol}?apikey=${apiKey}`
    );
    const realtimePriceArray = await response.json();
    if (!realtimePriceArray.length) {
      i++;
    } else {
      let { price } = realtimePriceArray[0];
      createMarquee(price, symbol);
    }
  }
  tikerItem.classList.add("marquee");
  tikerItem.appendChild(fragment);
  removeLoader();
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

async function getOneRealtimePrice() {
  await getSymbol();
  const randomSymbol = getRandomInt(300);
  const response = await fetch(
    `https://financialmodelingprep.com/api/v3/quote-short/${symbolArrayGlobe[randomSymbol]}?apikey=${apiKey}`
  );
  const realtimePriceArray = await response.json();
  let { price } = realtimePriceArray[0];
  createMarquee(price, symbolArrayGlobe[randomSymbol]);
  tikerItem.setAttribute("left", "100%");
  tikerItem.classList.add("marquee-short");
  tikerItem.appendChild(fragment);
  removeLoader();
}

function appendResult(companyDataArray) {
  companyDataArray.map(async function (currentCompany) {
    const { name, symbol } = currentCompany;
    const profileJson = `https://financialmodelingprep.com/api/v3/profile/${symbol}?apikey=${apiKey}`;
    const response = await fetch(profileJson);
    const companiesProfileData = await response.json();
    const companies = companiesProfileData[0];
    const { changes, image } = companies; // Object Destructuring
    const corpList = document.createElement("div");
    const corpName = document.createElement("a");
    const corpIcon = document.createElement("img");
    const changeEl = document.createElement("span");
    const corpLink = `./company.html?symbol=${symbol}`;
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
    const resultFragment = new DocumentFragment();
    resultFragment.append(corpList);
    searchResults.append(resultFragment);
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
  const query = searchQuery.value;
  const stockURL = `https://financialmodelingprep.com/api/v3/search?query=${query}&limit=10&exchange=NASDAQ&apikey=${apiKey}`;
  const response = await fetch(stockURL);
  const companyDataArray = await response.json();
  appendResult(companyDataArray);
  removeLoader();
}

addLoader();
searchBtn.addEventListener("click", searchStock);
window.addEventListener("load", getRealtimePrice);
window.addEventListener("error", getOneRealtimePrice);
