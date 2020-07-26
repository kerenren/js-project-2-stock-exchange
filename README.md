# js-project-2-stock-exchange-kerenren
js-project-2-stock-exchange-kerenren created by GitHub Classroom


Javascript Project 2 - Stock Exchange
______________________________________________________________________________________

Summary

In this project you will build a multipage stock exchange data website.
Push your code to a personal github repo using github classroom (a link will be provided)
Notify your mentor on each milestone you finished, and where this mentor can check this milestone for review.
This project is based on Financial Modeling Prep - FinancialModelingPrep, you can find all of the API endpoints here: Free Stock API and Financial Statements API - FMP API
You can move forward to the other milestones, but remember you need approval for each milestone, given by your mentor. 
Please use Live Server when developing in VSCode (it will make your life easier).
We will not provide a design through figma, instead we will add a screenshot for inspiration - but feel free to use your imagination. 
Milestones that have a decimal number are optional - do them only if you feel you have enough time. You can skip them, and return to them when you finish the mandatory milestones.

Notice
From 2020, Free Stock API requires you to send an api key on every request. Each of you should get their api key from the website: follow the instructions on the documentation, you will require to sign up. Important: choose the free plan! You do not need to provide any credit card, only signup and get a free api key.

Milestone 1

Features
Create a website that has a simple search input, with a search button
When the button is clicked, the website should present 10 search results from the company search in the Free Stock API, when searching in Nasdaq
The endpoint looks likes this: https://financialmodelingprep.com/api/v3/search?query=AA&limit=10&exchange=NASDAQ, where query=AA is where you put the input from the user
Present the result as a list to the user
Add loading indicator when making the search
Each item in the list should show the company name and symbol
Each item should link to /company.html?symbol=AAPL, where AAPL should be replaced with the company symbol you received from the API request.
Show loading indicator when searching.


Milestone 2

Features
In the project folder, create a new file called company.html - this where your browser will look for when you click a company link from the main page (index.html)
In this page, you should extract the symbol string from the url (for example, if the user clicked a link for /company.html?symbol=GOOG, you should have a variable in your JS code with “GOOG” as a string.
The information after the question mark in your url is called “query string” (sometimes it is called “query params” or “search”, but it means the same). To access it in your JavaScript you can follow this guide: Get Query String Parameters with JavaScript
  Then, get the company profile with the following endpoint: https://financialmodelingprep.com/api/v3/company/profile/${symbol} where symbol is the company symbol extracted from the query params
Present the company information in the screen (no design provided, go wild), with the company image, name, description and link
Also, present the company stock price, and changes in percentages - if the change is negative, the changes in percentages should be in light green, else in red.
After that, you should fetch the history of stock price of the company, using the following endpoint: https://financialmodelingprep.com/api/v3/historical-price-full/${symbol}?serietype=line
Use Chart.js | Open source HTML5 Charts for your website to present this data in a chart (read the documentation, understand how to use it, and how to pass the data from the stock price history endpoint)
Show loading indicator, when loading company data and stock price history.




Milestone 2.1 - Geekout

Features
Add auto search option to the main page
A search should be made and displayed when the user types
You should use a debounce function, to prevent sending a request on each type, and only after a few milliseconds of continues typing (we recommend you search about debouncing and what it means, before implementing it) 





Milestone 2.2 - Ninja

Features
Save the search text in a query string params (what comes after the question mark in the url), every time there is a search. For example, if the user searched for “goo”, the url should look like this: http://localhost:8080/index.html?query=goo, and if the user search for “goog”, the url should look like this: http://localhost:8080/index.html?query=goog
The browser shouldn’t reload every time you change the query string params
You should also check if there is a query string with a search value when the page loads, and if there is, set the input with the value and call the search function
This behaviour is needed for sharing links with other users when you want to share a search result page  













Milestone 3

Features
Add extra information to search results - image and stock change (percentage)
Use array.map (if didn’t do it already) when creating the li elements













Milestone 3.1 - Geekout

Features
The endpoint for getting company’s profile, can receive more than one symbol (separated by comma), but it has a limitation on how many symbols you can pass (find out what is the limitation)
Instead of making 10 requests (or less) for each search, optimize your code to make the minimum number of requests (depends on the limitation), and try to make them all at once
How to run multiple promises at once: Promise.all() - JavaScript

Milestone 4

Features
Create a marquee at the top of the main page showing current stock information
Search in the API docs (link in the summary), for the endpoint you need to use to get a list of companies and their current stock price
Animate the the marquee, to look like in a stock market (example below)
We recommend you will use keyframes and animation property in CSS, you can learn about it here animation
Also, add favicon to the website (you can look for icons online)
You can present only a subset of the items if the browser stuck when trying to present too many items





Milestone 5

Features
Convert your all marquee functionality to a JavaScript class
This class should accept an element in the constructor argument, and render all of the other elements in it’s methods
This class should be implement in a separate file called Marquee.js (which should be imported in the main page html file)
In your main html file, you should only have an empty html element, which you pass to your Marquee instance constructor, and call this instance method to load and render everything to this div
If you want, you can use a function contractor instead of a class (does the same)

Milestone 6

Features
Extract your search form and search result functionality and elements to an external javascript class, in a different files
Each file should include a class definition, and all the functionalities and html rendering in them
The website functionality should be the same, also you do not need to change the location of your css
You main html file should look like this:


Milestone 7

Features
In the result list, present the searched part in the result in a highlighted background (both the company name, and company symbol, because this are is what is searched in the API)



















Milestone 8

Features
Add a compare button to the end of each search result
Your search result should have a callback that is called whenever the button is clicked, with the company object as an argument
To check if it works, you should log to console the company object data that was clicked from the main page
















Milestone 9

Features
In your company profile page, extract your code to a class (functionality and html)
Your company.html file should look like this (the functionality of the page should be the same):























Milestone 10

Features
Add a new element before the main title, that holds all the companies that you clicked for comparing
It should present a list of buttons with the company symbol, and a x next to the symbol, indicating that when the button is clicked, the company is removed from the comparison list.
At the right end of the element you should have a compare button, sending the user to a new page that present the selected companies for comparison
Make this comparison list a JavaScript class, that has methods for adding new companies to the list, removing etc.



Milestone 11

Features
After the user selects companies for comparison, the user can click the Compare button which will send them to compare.html?symbols=....
After the symbols query string, there should be the symbols choose for comparing separated by comma
The compare.html page should present the companies chosen side by side
If you want, you can limit the number of companies to choose and compare to no more than 3 (make sure the user can’t choose more)
It should look like this:
 


NodeJS Project 1

to start:
navigate to server file and run node index.js or nodemon index.js
______________________________________________________________________________________

Summary

This project is based on JS Project 2
This project is a self-learning project, meaning you will have to learn the material by yourself, and then implement the features in the milestone.

You can use whatever resource you want for learning. We also provide you with a curated list of videos and links:
Node.js Tutorial for Beginners: Learn Node in 1 Hour | Mosh
Node.js rial - Intro to Node.js (Level 1)
Express.js Tutorial: Build RESTful APIs with Node and Express | Mosh
MongoDB in Tuto18 Minutes - Intro to MongoDB
MongoDB Node.js Driver Documentation

All of the videos are provided to you in charcha.xyz, you can ask there questions on top of the youtube videos. You can send the link to your teacher or classmates, to get them to answer your question.

Install Mongodb Locally: Install MongoDB
Explore Mongodb through a UI: Compass

Milestone 1

Features

Create a server in Express.JS, that has an endpoint /search?query=some_query
This endpoint should get the query input from the user, and return the list of companies and their data from the stock market api
Your website should send one request to this server, instead of multiple requests to the stock market api
You should perform a request from your server, meaning you will need to use a request client in your nodejs server. You can look for that online, or use one of those two libraries: https://www.npmjs.com/package/isomorphic-fetch or https://github.com/axios/axios

Milestone 2

Features
Create a mongodb connection in your server
in the search endpoint, you should save the searched query, and it’s results, with the time that search was performed, to a mongodb collection called ‘search’

Milestone 3

Features
Create an endpoint in your server, that is called /search-history that returns all the items in the ‘search’ collection, sorted by a descending order, by the date they were searched
Create a new page in your website called ‘search-history.html’, that loads those items and presents the in a list with their dates
each item should be a link to your main page with the search term as a query string (so the main page will perform a search request on load)

Milestone 4

Features
Create a new endpoint /search-history/:id with a delete method that deletes the item from the collection
In your ‘search-history.html’ page, add a delete button next to each item, that calls this endpoint, and deletes the search history item from the database, and then presents a new updated list







