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

//!=======================MAIN=======================

const myKey = "dc9051c56aeb476bb3131334856215f4"
const gameParams = new URLSearchParams(window.location.search);
const gameSlug = gameParams.get("slug");
const mainEndpointParams = new URLSearchParams ({
  key: myKey,
  search: gameSlug,
  page: 1,
  page_size:1,
})

const mainEndpoint = `https://api.rawg.io/api/games?${mainEndpointParams.toString()}`;
const specificEndpoint = "https://api.rawg.io/api/games" + `/${gameSlug}`  +  `?${myKey}`;

async function fetchGameDetails() {
  
  //BUSCANDO INFORMAÇÕES SOBRE O GAME [PART 1]
  const response = await fetch(mainEndpoint);
  const gameInfoJSON = await response.json();
  console.log(gameInfoJSON);
  //COLCOANDO NOME DO GAME CLICADO
  let gameNameHTML = document.querySelector("#nameOfTheGame");
  gameNameHTML.textContent = gameInfoJSON.name;

  //MUDANDO A IMAGEM PRINCIPAL DO GAME CLICADO
  let mainImage = document.querySelector("#mainImage");
  mainImage.setAttribute("src", gameInfoJSON.results[0].background_image);

  //MUDANDO AS IMAGENS SECUNDARIAS DO GAME CLICADO
  let secondaryImages = document.querySelectorAll(".secondary-images");
  let secondaryImagesFromAPI = [];
  gameInfoJSON.results[0].short_screenshots.forEach((obj) => {
    secondaryImagesFromAPI.push(obj.image);
  });

  secondaryImages.forEach((secondaryImage, index) => {
    secondaryImage.setAttribute("src", secondaryImagesFromAPI[index]);
  });

  //PEGANDO A DATA DE LANÇAMENTO DO GAME
  let releaseDate = gameInfoJSON.results[0].released;
  function fixingDate(date) {
    const year = date.slice(0,5);
    const day = date.slice(date.length-3, date.length);
    let fixedDate = day + date + year;
    return fixedDate;
  };

  let releaseDateHTML = document.querySelector("#release-date");
  releaseDateHTML.textContent = fixingDate(releaseDate);


  //NAME, RATING, BACKGROUND IMAGES (MAIN IMAGE), SHORT+SCREENSHOTS ( SECONDARY IMAGES ), RELEASED (RELEASE DATE), DEVELOPER
}

fetchGameDetails();
