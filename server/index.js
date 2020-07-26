const express = require("express");
const fetch = require("node-fetch"); //selfnote: fetch is only declared in the file scope
const cors = require("cors");

const app = express();
const port = 3000;
const rounter = express.Router();

app.use(cors());

const apiKey = "ed93f3e229380c530b7a0e7663f86b99";
const baseUrl = "https://financialmodelingprep.com/api/v3";

async function searchNasdaq(searchTerm) {
  const response = await fetch(
    `${baseUrl}/search?query=${searchTerm}&limit=10&exchange=NASDAQ&apikey=${apiKey}`
  );
  const data = await response.json();
  return data;
}

async function fetchCompanyProfile(symbol) {
  const response = await fetch(
    `${baseUrl}/company/profile/${symbol}?apikey=${apiKey}`
  );
  const data = await response.json();
  return data;
}

async function searchNasdaqWithProfile(searchTerm) {
  const companies = await searchNasdaq(searchTerm);
  const fetchCompaniesProfiles = companies.map((company) => {
    return fetchCompanyProfile(company.symbol);
  });
  const companiesWithProfiles = await Promise.all(fetchCompaniesProfiles);
  return companiesWithProfiles;
}

app.get("/api/search", (req, res) => {
  const searchQuery = req.query.query;
  //Self note: do fetch to stock api, and send the data to the response
  searchNasdaqWithProfile(searchQuery).then((companiesWithProfiles) => {
    res.send(companiesWithProfiles);
  });
});

app.listen(port, () =>
  console.log(`Local Server App is listening at http://localhost:${port}`)
);

module.exports = rounter;
