let searchBtn = document.querySelector(".search");
let searchQuery = document.getElementById("search-query");
let searchResults = document.getElementById("search-results");
let loader = document.querySelector(".loader");
let apiKey = "ed93f3e229380c530b7a0e7663f86b99";

function addLoader() {
  loader.classList.remove("d-none");
}
function removeLoader() {
  loader.classList.add("d-none");
}

function appendResult(companyDataArray) {
  for (let i = 0; i < companyDataArray.length; i++) {
    let currentCompany = companyDataArray[i];
    let { name, symbol } = currentCompany;
    let corpItem = document.createElement("a");
    let corpLink = `./company.html?symbol=${symbol}`;
    corpItem.innerText = `${name} (${symbol})`; // Object Destructuring
    corpItem.classList.add("list-group-item");
    corpItem.href = corpLink;
    searchResults.append(corpItem);
  }
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
