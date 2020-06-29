class Marquee {
  constructor(element) {
    this.element = element;
    this.addClassToEl = element.classList.add("ticker-container");
    this.apiKey = "ed93f3e229380c530b7a0e7663f86b99";
    this.tickerItem = document.createElement("span");
    this.fragment = new DocumentFragment();
    this.symbolArrayGlobe = [];
  }

  addTickerItemEL() {
    this.tickerItem.id = "tickerItem";
    this.tickerItem.classList.add("ticker-item");
    this.element.append(this.tickerItem);
  }

  load() {
    this.addTickerItemEL();
    if (
      document.readyState === "complete" ||
      document.readyState === "loading"
    ) {
      this.getRealtimePrice();
    } else {
      this.getOneRealtimePrice();
    }
  }

  handleNumberColor(number, numberEL) {
    if (number > 0) {
      numberEL.style.color = "lightgreen";
    } else {
      numberEL.style.color = "red";
    }
  }

  async getSymbol() {
    const symbolListURL = `https://financialmodelingprep.com/api/v3/stock/list?apikey=${this.apiKey}`;
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
    for (let i = 0; i < 30; i++) {
      //question: how can we getting more than 500 results without waiting a long time in featching?
      let symbol = this.symbolArrayGlobe[i];
      const PriceResponse = await fetch(
        `https://financialmodelingprep.com/api/v3/quote-short/${symbol}?apikey=${this.apiKey}`
      );
      const realtimePriceArray = await PriceResponse.json();
      if (!realtimePriceArray.length) {
        i++;
      } else {
        let { price } = realtimePriceArray[0];
        this.createMarquee(price, symbol);
      }
    }
    this.tickerItem.classList.add("marquee");
    this.tickerItem.appendChild(this.fragment);
    return this;
  }

  getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  async getOneRealtimePrice() {
    await this.getSymbol();
    const randomSymbol = this.getRandomInt(300);
    const singlePriceResponse = await fetch(
      `https://financialmodelingprep.com/api/v3/quote-short/${this.symbolArrayGlobe[randomSymbol]}?apikey=${this.apiKey}`
    );
    const realtimePriceArray = await singlePriceResponse.json();
    let { price } = realtimePriceArray[0];
    this.createMarquee(price, this.symbolArrayGlobe[randomSymbol]);
    this.tickerItem.setAttribute("left", "100%");
    this.tickerItem.classList.add("marquee-short");
    this.tickerItem.appendChild(this.fragment);
    return this;
  }
}
