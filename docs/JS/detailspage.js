"use strict";

/*
const url = "https://api.rawg.io/api/games";

function fixFormatDate(date) {
  const yyyy = String(date.getFullYear());
  const mm = String(date.getMonth() + 1).padStart(2,"0");
  const dd = String(date.getDate()).padStart(2, "0");

  return `${yyyy}-${mm}-${dd}`;
}

let today = new Date();
let LastEightYears = new Date();

LastEightYears.setFullYear(today.getFullYear() - 8);

let dataInicio = fixFormatDate(LastEightYears);
let dataFim = fixFormatDate(today);

const bestSellersParams = new URLSearchParams({
  key: "dc9051c56aeb476bb3131334856215f4",
  page: 1,
  page_size: 4,
  dates: `${dataInicio},${dataFim}`,
  ordering: "-added",
});

let bestSellersURL = fetch(url + "?" + bestSellersParams.toString())
  .then((response) => response.json()) //BEST SELLERS OF THE LAST EIGHT YEARS

  */

const gameParams = new URLSearchParams(window.location.search);

const gameName = gameParams.get("name");

