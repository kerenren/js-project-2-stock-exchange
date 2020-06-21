let searchBtn = document.querySelector(".search");
let searchQuery = document.getElementById("search-query");
let searchResults = document.getElementById("search-results");
let loader = document.querySelector(".loader");

function addLoader() {
  loader.classList.remove("d-none");
}
function removeLoader() {
  loader.classList.add("d-none");
}

function addleResultList(array, stockURL) {
  for (let i = 0; i < array.length; i++) {
    let currentCompany = array[i];
    let corpItem = document.createElement("a");
    let corpLink = `${stockURL}/company.html?symbol=${currentCompany.symbol}`;
    corpItem.innerText = `${currentCompany.name} (${currentCompany.symbol})`;
    corpItem.classList.add("list-group-item");
    corpItem.setAttribute("href", corpLink);
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
  let stockURL = `https://financialmodelingprep.com/api/v3/search?query=${query}&limit=10&exchange=NASDAQ&apikey=70a0b958dcbabe9587b455cc9752f8e5`;
  let response = await fetch(stockURL);
  let companyDataArray = await response.json();
  addleResultList(companyDataArray, stockURL);
  removeLoader();
}

searchBtn.addEventListener("click", searchStock);
