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

function handleChangesColor(changes, changeEl) {
  if (changes > 0) {
    changeEl.style.color = "lightgreen";
  } else {
    changeEl.style.color = "red";
  }
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
    handleChangesColor(changes, changeEl);
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
