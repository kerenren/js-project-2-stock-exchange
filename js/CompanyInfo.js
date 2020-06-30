class CompanyInfo {
  constructor(element) {
    this.element = element;
    this.urlParama = new URLSearchParams(window.location.search);
    this.symbol = this.urlParama.get("symbol");
    this.apiKey = "ed93f3e229380c530b7a0e7663f86b99";
    this.profilURL = new URL(
      `https://financialmodelingprep.com/api/v3/profile/${this.symbol}`
    );
    this.icon = document.getElementById("icon");
    this.descriptionEl = document.getElementById("description");
    this.priceEl = document.getElementById("price");
    this.changeEl = document.getElementById("change");
    this.loader = document.querySelector(".loader");
    this.appendSearchParam(this.profilURL, "apikey", this.apiKey);
    this.profileJson = this.profilURL.href;
  }

  appendSearchParam(element, key, value) {
    return element.searchParams.append(key, value);
  }

  addLoader() {
    this.loader.classList.remove("d-none");
  }

  removeLoader() {
    this.loader.classList.add("d-none");
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
    this.element.innerText = companyName;
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
