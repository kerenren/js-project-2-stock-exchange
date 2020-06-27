class SearchForm {
  constructor(element) {
    this.element = element;
    this.searchForm = document.getElementById("form");
    this.searchBtn = document.createElement("button");
    // this.loader = document.querySelector(".loader");
    this.loader = document.createElement("div");
    this.apiKey = "ed93f3e229380c530b7a0e7663f86b99";
    this.companyDataArray = [];
    this.companies = [];
    this.inpuntEl = document.createElement("input");
    this.butnDiv = document.createElement("div");
  }

  addInputField() {
    this.inpuntEl.type = "text";
    this.inpuntEl.placeholder = "Search stock by ticker or company name...";
    this.inpuntEl.id = "search-query";
    this.inpuntEl.classList.add("form-control");
    this.searchForm.classList.add("input-group", "mb-3");
    this.inpuntEl.setAttribute(
      "aria-label",
      "Search stock by ticker or company name"
    );
    this.inpuntEl.setAttribute("aria-describedby", "button-addon2");
    this.butnDiv.classList.add("input-group-append");
    this.searchBtn.classList.add("btn", "btn-outline-secondary", "search");
    this.searchBtn.type = "button";
    this.searchBtn.id = "button-addon2";
    this.searchBtn.value = "search";
    this.searchBtn.innerText = "Search";
    this.searchForm.prepend(this.inpuntEl);
    this.searchForm.append(this.butnDiv);
    this.searchForm.append(this.searchBtn);
  }

  addloaderEL() {
    this.loader.classList.add("loader", "mx-auto", "position-fixed", "d-none");
    for (let i = 0; i < 4; i++) {
      const span = document.createElement("span");
      this.loader.append(span);
    }
    document.querySelector(".main-card").prepend(this.loader);
  }

  showLoader() {
    this.loader.classList.remove("d-none");
    return this;
  }

  removeLoader() {
    this.loader.classList.add("d-none");
    return this;
  }

  async searchStock(callback) {
    this.showLoader();
    const query = this.inpuntEl.value;
    const stockURL = `https://financialmodelingprep.com/api/v3/search?query=${query}&limit=10&exchange=NASDAQ&apikey=${this.apiKey}`;
    const response = await fetch(stockURL);
    this.companyDataArray = await response.json();
    return callback(this.companyDataArray);
  }

  async onSearch(callback) {
    this.addloaderEL();
    this.addInputField();
    this.searchBtn.addEventListener("click", async () => {
      this.searchStock.bind(this);
      await this.searchStock(callback);
      this.removeLoader();
    });
  }
}
