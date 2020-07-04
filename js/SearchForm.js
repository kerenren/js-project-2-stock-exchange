import { searchInInternalServal } from "../js/api.js";

class SearchForm {
  constructor(element) {
    this.element = element;
    this.searchForm = document.getElementById("form");
    this.searchBtn = document.createElement("button");
    this.loader = document.createElement("div");
    this.apiKey = "ed93f3e229380c530b7a0e7663f86b99";
    this.companyDataArray = [];
    this.companies = [];
    this.inputEl = document.createElement("input");
    this.butnDiv = document.createElement("div");
    this.addInputField();
    this.query;
    this.inputEl.addEventListener("input", () => {
      this.query = this.inputEl.value;
      this.handleEmptyQuery();
    });
  }

  addInputField() {
    this.inputEl.type = "text";
    this.inputEl.placeholder = "Search stock by ticker or company name...";
    this.inputEl.id = "search-query";
    this.inputEl.classList.add("form-control");
    this.searchForm.classList.add("input-group", "mb-3");
    this.inputEl.setAttribute(
      "aria-label",
      "Search stock by ticker or company name"
    );
    this.inputEl.setAttribute("aria-describedby", "button-addon2");
    this.butnDiv.classList.add("input-group-append");
    this.searchBtn.classList.add("btn", "btn-outline-secondary", "search");
    this.searchBtn.type = "button";
    this.searchBtn.id = "button-addon2";
    this.searchBtn.value = "search";
    this.searchBtn.innerHTML =
      '<i class="fas fa-search-dollar mr-2"></i>Search';
    this.searchForm.prepend(this.inputEl);
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
  }

  removeLoader() {
    this.loader.classList.add("d-none");
  }

  handleEmptyQuery() {
    if (!this.query) {
      this.searchBtn.disabled = true;
    } else {
      this.searchBtn.disabled = false;
    }
  }

  async searchStock(searchTerm) {
    this.showLoader();
    this.companyDataArray = await searchInInternalServal(searchTerm);
    this.onSearchDoneCallback(this.companyDataArray);
  }

  async onSearch(callback) {
    this.addloaderEL();
    this.searchBtn.addEventListener("click", async () => {
      this.searchStock.bind(this);
      await this.searchStock(this.query);
      this.removeLoader();
    });
    this.onSearchDoneCallback = callback;
  }
}

export default SearchForm;
