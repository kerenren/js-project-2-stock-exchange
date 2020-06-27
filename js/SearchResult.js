class SearchResult {
  constructor(element) {
    this.element = element;
    this.companies;
    this.resultsUl = document.createElement("ul");
  }

  static apiKey = "ed93f3e229380c530b7a0e7663f86b99";

  handleNumberColor(number, numberEL) {
    if (number > 0) {
      numberEL.style.color = "lightgreen";
    } else {
      numberEL.style.color = "red";
    }
  }

  removeResultList() {
    let child = this.resultsUl.lastElementChild;
    while (child) {
      this.resultsUl.removeChild(child);
      child = this.resultsUl.lastElementChild;
    }
  }

  addResultsEl() {
    this.resultsUl.id = "search-results";
    this.resultsUl.classList.add("list-group", "list-group-flush");
    this.element.append(this.resultsUl);
  }

  appendResult(companies) {
    companies.map(
      async function (currentCompany) {
        const { name, symbol } = currentCompany;
        const profileJson = `https://financialmodelingprep.com/api/v3/profile/${symbol}?apikey=${SearchResult.apiKey}`;
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
        corpList.classList.add(
          "list-group-item",
          "d-flex",
          "align-items-center"
        );
        corpName.innerText = `${name}`;
        corpName.href = corpLink;
        corpList.innerText = ` (${symbol})`;
        changeEl.innerText = `(${changes}%)`;
        this.handleNumberColor(changes, changeEl);
        corpList.append(changeEl);
        corpList.prepend(corpName);
        corpList.prepend(corpIcon);
        const resultFragment = new DocumentFragment();
        resultFragment.append(corpList);
        this.resultsUl.append(resultFragment);
      }.bind(this)
    );
  }

  renderResults(companies) {
    this.addResultsEl();
    this.removeResultList();
    this.appendResult(companies);
  }
}
