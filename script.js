"use strict";

var favicon_images = [
    "Favicon/favicon1.ico",
    "Favicon/favicon2.ico",
    "Favicon/favicon3.ico",
    "Favicon/favicon4.ico",
    "Favicon/favicon5.ico",
    "Favicon/favicon6.ico",
    "Favicon/favicon7.ico",
    "Favicon/favicon8.ico",
    "Favicon/favicon9.ico",
  ],
  image_counter = 0; // To keep track of the current image

setInterval(function () {
  // remove current favicon
  if (document.querySelector("link[rel='icon']") !== null)
    document.querySelector("link[rel='icon']").remove();
  if (document.querySelector("link[rel='shortcut icon']") !== null)
    document.querySelector("link[rel='shortcut icon']").remove();

  // add new favicon image
  document
    .querySelector("head")
    .insertAdjacentHTML(
      "beforeend",
      '<link rel="icon" href="' +
        favicon_images[image_counter] +
        '" type="image/gif">'
    );

  // If last image then goto first image
  // Else go to next image
  if (image_counter == favicon_images.length - 1) image_counter = 0;
  else image_counter++;
}, 500);
// Displayed all flags in the browser, and print all countries names, regions, sub regions and populations
var request = new XMLHttpRequest();
request.open("GET", "https://restcountries.com/v3.1/all");
request.send();
// function to display images
function display_image(src, width, height, alt) {
  var a = document.createElement("img");
  a.src = src;
  a.width = width;
  a.height = height;
  a.alt = alt;
  document.body.appendChild(a);
}

request.onload = function () {
  var studentData = JSON.parse(this.responseText);
  // a. Get all the countries from Asia Continent/region using filter function
  const asia_countries = studentData.filter(asia_continent);
  function asia_continent(country) {
    return country.continents[0] === "Asia" || country.region === "Asia";
  }
  console.log(asia_countries);

  // b. get all the coutries woth a population of less than 2 lakhs using filter function
  const less_Populated_countries = studentData.filter(population_check);
  function population_check(country) {
    return country.population < 200000;
  }
  console.log(less_Populated_countries);

  // c. Print the following details name, capital, flag using forEach function
  studentData.forEach(details);
  function details(country) {
    if (country.capital)
      console.log(
        `${country.name.common}, ${country.capital[0]}, ${country.flags.png}`
      );
    display_image(country.flags.png, 276, 110, "JavaScriptImage");
  }

  // d. Print the total population using reduce function (showns flags in browser window)
  let whole_population = [];
  studentData.forEach(total_population);
  function total_population(country) {
    whole_population.push(country.population);
  }
  console.log(
    `Total population of all countries : ${whole_population.reduce(function (
      a,
      b
    ) {
      return a + b;
    })}`
  );

  //  e. Print the country which uses US dollars as currency
  let usd_countries = [];
  studentData.forEach(dollars);
  function dollars(country) {
    if (country?.currencies?.USD) usd_countries.push(country.name.common);
  }
  console.log(usd_countries);
};
