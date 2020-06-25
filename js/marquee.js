class Marquee {
  constructor(element) {
    this.element = element;
    this.addClassToEl = element.classList.add("ticker-container");
    this.addIDToEl = TikerContainer.id = "ticker-container";
    this.loader = document.querySelector(".loader");
    this.apiKey = "ed93f3e229380c530b7a0e7663f86b99";
    this.tikerItem = document.getElementById("tiker-item");
    this.fragment = new DocumentFragment();
    this.symbolArrayGlobe = [];
  }

  load() {
    if (
      document.readyState === "complete" ||
      document.readyState === "loading"
    ) {
      this.getRealtimePrice();
    } else {
      this.getOneRealtimePrice();
    }
  }

  addLoader() {
    this.loader.classList.remove("d-none");
    return this;
  }

  removeLoader() {
    this.loader.classList.add("d-none");
    return this;
  }

  handleNumberColor(number, numberEL) {
    if (number > 0) {
      numberEL.style.color = "lightgreen";
    } else {
      numberEL.style.color = "red";
    }
  }

  async getSymbol() {
    const symbolListURL = `https://financialmodelingprep.com/api/v3/stock/list?apikey=${apiKey}`;
    const symbolResponse = await fetch(symbolListURL);
    const symbolistArray = await symbolResponse.json();
    const symbolArray = symbolistArray.map(function (currentCompany) {
      return currentCompany.symbol;
    });
    this.symbolArrayGlobe = symbolArray.slice(0, 300);
    return this;
  }

  createMarquee(price, symbol) {
    const priceEl = document.createElement("span");
    const symbolEl = document.createElement("span");
    priceEl.classList.add("ticker-price");
    symbolEl.classList.add("ticker-symbol");
    priceEl.innerText = ` $${price}`;
    symbolEl.innerText = ` ${symbol}`;
    this.handleNumberColor(price, priceEl);
    this.fragment.append(symbolEl);
    this.fragment.append(priceEl);
    return this;
  }

  async getRealtimePrice() {
    await this.getSymbol();
    for (let i = 0; i < 50; i++) { //question: how can we getting more than 500 results without waiting a long time in featching? 
      let symbol = this.symbolArrayGlobe[i];
      const PriceResponse = await fetch(
        `https://financialmodelingprep.com/api/v3/quote-short/${symbol}?apikey=${apiKey}`
      );
      const realtimePriceArray = await PriceResponse.json();
      if (!realtimePriceArray.length) {
        i++;
      } else {
        let { price } = realtimePriceArray[0];
        this.createMarquee(price, symbol);
      }
    }
    this.tikerItem.classList.add("marquee");
    this.tikerItem.appendChild(this.fragment);
    this.removeLoader();
    return this;
  }

  getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  async getOneRealtimePrice() {
    await this.getSymbol();
    const randomSymbol = this.getRandomInt(300);
    const singlePriceResponse = await fetch(
      `https://financialmodelingprep.com/api/v3/quote-short/${this.symbolArrayGlobe[randomSymbol]}?apikey=${apiKey}`
    );
    const realtimePriceArray = await singlePriceResponse.json();
    let { price } = realtimePriceArray[0];
    this.createMarquee(price, this.symbolArrayGlobe[randomSymbol]);
    this.tikerItem.setAttribute("left", "100%");
    this.tikerItem.classList.add("marquee-short");
    this.tikerItem.appendChild(this.fragment);
    this.removeLoader();
    return this;
  }
}
