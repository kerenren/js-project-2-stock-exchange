class SearchResult {
  constructor(element) {
    this.element = element;
    this.resultsUl = document.createElement("ul");
    this.corpList;
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

  appendResult(companies, callback) {
    companies.map(
      async function (currentCompany) {
        const { name, symbol } = currentCompany;
        const profileJson = `https://financialmodelingprep.com/api/v3/profile/${symbol}?apikey=${SearchResult.apiKey}`;
        const response = await fetch(profileJson);
        const companiesProfileData = await response.json();
        const companyInfo = companiesProfileData[0];
        const { changes, image } = companyInfo; // Object Destructuring
        this.corpList = document.createElement("div");
        const corpName = document.createElement("a");
        const corpIcon = document.createElement("img");
        const changeEl = document.createElement("span");
        const corpLink = `./company.html?symbol=${symbol}`;
        corpIcon.src = image;
        corpIcon.width = "35";
        corpIcon.classList.add("border-0");
        corpName.classList.add("border-0", "mx-3");
        changeEl.classList.add("border-0", "my-0", "ml-2");
        this.corpList.classList.add(
          "list-group-item",
          "d-flex",
          "align-items-center"
        );
        corpName.innerText = `${name}`;
        corpName.href = corpLink;
        this.corpList.innerText = ` (${symbol})`;
        changeEl.innerText = `(${changes}%)`;
        this.handleNumberColor(changes, changeEl);
        this.corpList.append(changeEl);
        this.corpList.prepend(corpName);
        this.corpList.prepend(corpIcon);
        const resultFragment = new DocumentFragment();
        resultFragment.append(this.corpList);
        this.resultsUl.append(resultFragment);
        callback(this.resultsUl.innerText);
        // this.highlightResults(query, name, symbol);
      }.bind(this)
    );
    console.log("hi");
  }

  renderResults(companies) {
    this.addResultsEl();
    this.removeResultList();
    this.appendResult(companies);
    console.log(this.resultsUl);
  }
}
