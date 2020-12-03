class SearchResult {
  constructor(element) {
    this.element = element;
    this.resultsUl = document.createElement("ul");
    this.corpList;
    this.inputEl = document.getElementById("search-query");
    this.query;
    this.compareBtn;
    this.inputEl.addEventListener("input", () => {
      this.query = this.inputEl.value;
    });
  }

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
      //self note, without return the value, this function is "undefined" by default, thus info cannot be passed to other element innerHTML
    }
  }

  createCompareEL(company, appendElement) {
    this.compareBtn = document.createElement("button");
    this.compareBtn.innerText = "Compare";
    this.compareBtn.classList.add(
      "float-right",
      "btn",
      "btn-success",
      "compare"
    );
    this.compareBtn.setAttribute("justify-self", "end");
    appendElement.append(this.compareBtn);
    this.compareBtn.addEventListener("click", () => console.log(company));
  }

  createResultElement(company) {
    const { symbol } = company;
    const { companyName, changes, image } = company.profile; // Object Destructuring
    this.corpList = document.createElement("div");
    const corpName = document.createElement("a");
    const corpIcon = document.createElement("img");
    const changeEl = document.createElement("span");
    const corpContainer = document.createElement("div");
    const symbolEL = document.createElement("div");
    const corpLink = `./company.html?symbol=${symbol}`;
    corpIcon.src = image;
    corpIcon.width = "35";
    corpIcon.classList.add("border-0");
    corpName.classList.add("border-0", "mx-3", "d-flex");
    changeEl.classList.add("border-0", "my-0", "ml-2");
    corpContainer.classList.add("d-flex", "flex-grow-1");
    this.corpList.classList.add(
      "list-group-item",
      "d-flex",
      "align-items-center",
      "d-flex",
      "justify-content-between"
    );
    corpName.innerHTML = this.highlightSearch(this.query, `${companyName}`);
    corpName.href = corpLink;
    symbolEL.innerHTML = this.highlightSearch(this.query, ` (${symbol})`);
    changeEl.innerText = `(${changes}%)`;
    this.handleNumberColor(changes, changeEl);
    corpContainer.append(symbolEL);
    corpContainer.append(changeEl);
    corpContainer.prepend(corpName);
    this.corpList.prepend(corpIcon);
    this.corpList.append(corpContainer);
    this.createCompareEL(company, this.corpList);
    const resultFragment = new DocumentFragment();
    resultFragment.append(this.corpList);
    this.resultsUl.append(resultFragment);
  }

  async appendResult(companies) {
    companies.map(async (company) => {
      this.createResultElement(company);
    });
  }

  renderResults(companies) {
    this.addResultsEl();
    this.removeResultList();
    this.appendResult(companies);
  }
}

export default SearchResult;
