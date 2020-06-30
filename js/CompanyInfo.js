class CompanyInfo {
  constructor(element) {
    this.element = element;
    this.urlParama = new URLSearchParams(window.location.search);
    this.symbol = this.urlParama.get("symbol");
    this.apiKey = "ed93f3e229380c530b7a0e7663f86b99";
    this.profilURL = new URL(
      `https://financialmodelingprep.com/api/v3/profile/${this.symbol}`
    );
    this.appendSearchParam(this.profilURL, "apikey", this.apiKey);
    this.profileJson = this.profilURL.href;
    this.mainCard = document.createElement("div");
    this.mainCard.classList.add("main-card", "h-auto");
    this.infoContainer = document.createElement("div");
    this.infoContainer.classList.add("card", "mb-3", "h-100", "py-3");
    this.cardBody = document.createElement("div");
    this.cardBody.className = "card-body";
    this.loader;
    this.company;
    this.iconContainer;
    this.icon;
    this.descriptionEl;
    this.priceEl;
    this.changeEl;
    this.subEl;
    this.subSmall;
    this.chartEl = document.createElement("canvas");
    this.chartEl.id="myChart"
  }

  addSubEl() {
    this.subEl = document.createElement("p");
    this.subEl.className = "card-text";
    this.subSmall = document.createElement("small");
    this.subSmall.className = "text-muted";
    this.subSmall.innerText = "Last updated 3 mins ago";
    this.subEl.append(this.subSmall);
  }

  addDescriptionEl() {
    this.descriptionEL = document.createElement("p");
    this.descriptionEl.id = "description";
    this.descriptionEl.classList.add("card-text", "description");
  }

  addPriceEl() {
    this.priceEl = document.createElement("h6");
    this.priceEl.id = "price";
    this.priceEl.classList.add(
      "card-subtitle",
      "mb-2",
      "text-muted",
      "price",
      "d-inline-block"
    );
    // this.priceEl.innerText = "Card subtitle";
  }

  addChangeEL() {
    this.changeEl = document.createElement("h6");
    this.changeEl.id = "change";
    this.changeEl.classList.add(
      "card-subtitle",
      "mb-2",
      "change",
      "d-inline-block"
    );
    // this.changeEl.innerText = "Card subtitle";
  }

  addCompanyEl() {
    this.company = document.createElement("h5");
    this.company.id = "companyName";
    this.company.classList.add("card-title", "corp-name", "text-center");
  }

  addIconEL() {
    this.icon = document.createElement("img");
    this.icon.className = "mx-auto";
    this.icon.id = "icon";
    this.icon.alt = "Card image cap";
    this.infoContainer.prepend(this.icon);
  }

  addloaderEL() {
    this.loader = document.createElement("div");
    this.loader.classList.add("loader", "mx-auto", "position-fixed", "d-none");
    for (let i = 0; i < 4; i++) {
      const span = document.createElement("span");
      this.loader.append(span);
    }
    document.querySelector(".main-card").prepend(this.loader);
  }

  addLoader() {
    this.loader.classList.remove("d-none");
  }

  removeLoader() {
    this.loader.classList.add("d-none");
  }

  appendSearchParam(element, key, value) {
    return element.searchParams.append(key, value);
  }
  
  handleChangesColor(change) {
    if (change > 0) {
      this.changeEl.style.color = "lightgreen";
    } else {
      this.changeEl.style.color = "red";
    }
  }

  async getCorpInfo() {
    let response = await fetch(this.profileJson);
    let dataArray = await response.json();
    let { companyName, image, description, price, changes } = dataArray[0]; // Object Destructuring
    this.company.innerText = companyName;
    this.icon.setAttribute("src", image);
    this.descriptionEl.innerText = description;
    this.priceEl.innerText = `Stock Price $${price}`;
    this.changeEl.innerText = `(${changes}%)`;
    this.handleChangesColor(changes);
  }

  async getStockHistory() {
    let response = await fetch(
      `https://financialmodelingprep.com/api/v3/historical-price-full/${this.symbol}?serietype=line&apikey=${this.apiKey}`
    );
    let historyDataArray = await response.json();
    let historySortedArray = historyDataArray.historical.sort(function compare(
      a,
      b
    ) {
      if (a.date < b.date) {
        return -1;
      }
      if (a.date > b.date) {
        return 1;
      }
      return 0;
    });
    let historyDateArray = [];
    let historyCloseArray = [];
    //question: I have updated this lines but i am still not understand what's the points to merging it to one .map() function because by using one .map() function, i am creating 3 more lines.
    historySortedArray.map((corpObj) => {
      historyDateArray.push(corpObj.date);
      historyCloseArray.push(corpObj.close);
    });
    this.getChart(historyDateArray, historyCloseArray);
    this.removeLoader();
  }

  getChart(arrayParam1, arrayParam2) {
    var ctx = document.getElementById("myChart").getContext("2d");
    var chart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: arrayParam1,
        datasets: [
          {
            label: "Stock Price History",
            backgroundColor: "rgb(0,0,128,0.7)",
            hoverBackgroundColor: "rgba(0,0,255, 1)",
            borderColor: "rgb(0,0,128,0.7)",
            data: arrayParam2,
          },
        ],
      },
      options: {
        legend: {
          labels: {
            fontColor: "rgb(0,0,128)",
            fontFamily: "'Abril Fatface', cursive",
          },
        },
      },
    });
  }
  load() {
    this.addLoader();
    this.getStockHistory();
    this.getCorpInfo();
  }
}
