// const searchBtn = document.querySelector(".search");
// const searchQuery = document.getElementById("search-query");
// const searchResults = document.getElementById("search-results");
// const loader = document.querySelector(".loader");
// const apiKey = "ed93f3e229380c530b7a0e7663f86b99";

// function addLoader() {
//   loader.classList.remove("d-none");
// }
// function removeLoader() {
//   loader.classList.add("d-none");
// }

// function handleNumberColor(number, numberEL) {
//   if (number > 0) {
//     numberEL.style.color = "lightgreen";
//   } else {
//     numberEL.style.color = "red";
//   }
// }

// function appendResult(companyDataArray) {
//   companyDataArray.map(async function (currentCompany) {
//     const { name, symbol } = currentCompany;
//     const profileJson = `https://financialmodelingprep.com/api/v3/profile/${symbol}?apikey=${apiKey}`;
//     const response = await fetch(profileJson);
//     const companiesProfileData = await response.json();
//     const companies = companiesProfileData[0];
//     const { changes, image } = companies; // Object Destructuring
//     const corpList = document.createElement("div");
//     const corpName = document.createElement("a");
//     const corpIcon = document.createElement("img");
//     const changeEl = document.createElement("span");
//     const corpLink = `./company.html?symbol=${symbol}`;
//     corpIcon.src = image;
//     corpIcon.width = "35";
//     corpIcon.classList.add("border-0");
//     corpName.classList.add("border-0", "mx-3");
//     changeEl.classList.add("border-0", "my-0", "ml-2");
//     corpList.classList.add("list-group-item", "d-flex", "align-items-center");
//     corpName.innerText = `${name}`;
//     corpName.href = corpLink;
//     corpList.innerText = ` (${symbol})`;
//     changeEl.innerText = `(${changes}%)`;
//     handleNumberColor(changes, changeEl);
//     corpList.append(changeEl);
//     corpList.prepend(corpName);
//     corpList.prepend(corpIcon);
//     const resultFragment = new DocumentFragment();
//     resultFragment.append(corpList);
//     searchResults.append(resultFragment);
//   });
// }

// function removeResultList() {
//   let child = searchResults.lastElementChild;
//   while (child) {
//     searchResults.removeChild(child);
//     child = searchResults.lastElementChild;
//   }
// }

// async function searchStock() {
//   addLoader();
//   if (searchResults.childNodes.length) {
//     removeResultList();
//   }
//   const query = searchQuery.value;
//   const stockURL = `https://financialmodelingprep.com/api/v3/search?query=${query}&limit=10&exchange=NASDAQ&apikey=${apiKey}`;
//   const response = await fetch(stockURL);
//   const companyDataArray = await response.json();
//   appendResult(companyDataArray);
//   removeLoader();
// }

// addLoader();
// searchBtn.addEventListener("click", searchStock);
