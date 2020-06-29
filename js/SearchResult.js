class SearchResult {
  constructor(element) {
    this.element = element;
    this.resultsUl = document.createElement("ul");
    this.corpList;
    this.resultText = "hey";
    this.corpAllInfoArr;
    this.inputEl = document.getElementById("search-query");
    this.query;
    this.inputEl.addEventListener("input", () => {
      this.query = this.inputEl.value;
    });
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

  highlightSearch(query, targetString) {
    const regex = new RegExp(query, "gi");
    if (!query) {
      console.log("empty query");
      return;
    } else {
      return targetString.replace(regex, (match) => `<mark> ${match}</mark>`);
      //self note, without return the value, this function is "undefined" by defaul.
    }
  }

  createResultElement(company) {
    const { name, symbol } = company;
    const { changes, image } = company.companiesProfileData[0]; // Object Destructuring
    this.corpList = document.createElement("div");
    const corpName = document.createElement("a");
    const corpIcon = document.createElement("img");
    const changeEl = document.createElement("span");
    const corpLink = `./company.html?symbol=${symbol}`;
    corpIcon.src = image;
    corpIcon.width = "35";
    corpIcon.classList.add("border-0");
    corpName.classList.add("border-0", "mx-3", "d-flex");
    changeEl.classList.add("border-0", "my-0", "ml-2");
    this.corpList.classList.add(
      "list-group-item",
      "d-flex",
      "align-items-center"
    );
    corpName.innerHTML = this.highlightSearch(this.query, `${name}`);
    corpName.href = corpLink;
    this.corpList.innerHTML = this.highlightSearch(this.query, ` (${symbol})`);
    changeEl.innerText = `(${changes}%)`;
    this.handleNumberColor(changes, changeEl);
    this.corpList.append(changeEl);
    this.corpList.prepend(corpName);
    this.corpList.prepend(corpIcon);
    const resultFragment = new DocumentFragment();
    resultFragment.append(this.corpList);
    this.resultsUl.append(resultFragment);
  }

  async appendResult(companies) {
    this.corpAllInfoArr = await new Promise((resolve, reject) => {
      companies.map(async (company) => {
        const profileJson = `https://financialmodelingprep.com/api/v3/profile/${company.symbol}?apikey=${SearchResult.apiKey}`;
        const response = await fetch(profileJson);
        company.companiesProfileData = await response.json();
        this.createResultElement(company);
      });
      resolve(companies);
    });
    return this.corpAllInfoArr;
  }

  renderResults(companies) {
    this.addResultsEl();
    this.removeResultList();
    this.appendResult(companies);
  }
}
