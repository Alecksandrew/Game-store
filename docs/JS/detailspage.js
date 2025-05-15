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

const myKey = "dc9051c56aeb476bb3131334856215f4";
const gameParams = new URLSearchParams(window.location.search);
const gameID = gameParams.get("id");
const mainEndpointParams = new URLSearchParams({
  key: myKey,
  ids: gameID,
  page: 1,
  page_size: 1,
});

const mainEndpoint = `https://api.rawg.io/api/games?${mainEndpointParams.toString()}`;
const specificEndpoint =
  "https://api.rawg.io/api/games" + `/${gameID}` + `?key=${myKey}`;

async function fetchGameDetails() {
  //!GENERAL ENDPOINT
  //BUSCANDO INFORMAÇÕES SOBRE O GAME [PART 1]
  const response1 = await fetch(mainEndpoint);
  const gameInfoJSON = await response1.json();
  console.log(gameInfoJSON);

  //COLCANDO NOME DO GAME CLICADO
  let gameNameHTML = document.querySelector("#nameOfTheGame");
  gameNameHTML.textContent = gameInfoJSON.results[0].name;

  //MUDANDO AS ESTRELAS BASEADO NO RATING
  let gameRating = gameInfoJSON.results[0].rating;
  
  for (let c = 1; gameRating > 0; c++) {
    
    if(gameRating >= 1) {
      let startGradient = document.querySelector(`#linear-gradient-star${c} .color-star`);
      startGradient.setAttribute("offset", "100%");
      gameRating--
  }
    else {
      let startGradient = document.querySelector(`#linear-gradient-star${c} .color-star`);
      startGradient.setAttribute("offset", `${gameRating*100}%`);
      gameRating--
  }
    
  }
  

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

  //*MUDANDO INFORMAÇÕES ADICIONAIS

  //PEGANDO A DATA DE LANÇAMENTO DO GAME
  let releaseDate = gameInfoJSON.results[0].released;

  function fixingDate(date) {
    const [year, month, day] = date.split("-");

    return `${day}/${month}/${year}`;
  }

  let releaseDateHTML = document.querySelector("#release-date");
  releaseDateHTML.textContent = fixingDate(releaseDate);

  //PEGANDO CATEGORIA DO GAME
  let gameCategoryHTML = document.querySelector("#game-category");
  let gameCategory = gameInfoJSON.results[0].genres;
  if (gameCategory.length > 1) {
    gameCategoryHTML.textContent =
      gameCategory[0].name + " & " + gameCategory[1].name;
  } else {
    gameCategoryHTML.textContent = gameCategory[0].name;
  }

  //PEGANDO NOTA METACRITIC
  let metacriticHTML = document.querySelector("#nota-metacritic");
  let metacritic = gameInfoJSON.results[0].metacritic;

  metacriticHTML.textContent = metacritic;
  if (metacritic < 50) {
    metacriticHTML.classList.add("bad");
  } else if (metacritic >= 50 && metacritic < 75) {
    metacriticHTML.classList.add("medium");
  } else {
    metacriticHTML.classList.add("good");
  }

  //PEGANDO PLATAFORMAS DISPONÍVEIS
  let platforms = gameInfoJSON.results[0].platforms;
  let computer = document.querySelector(".bi.bi-laptop");
  let xbox = document.querySelector(".bi.bi-xbox");
  let playstation = document.querySelector(".bi.bi-playstation");

  platforms.forEach((each) => {
    if (each.platform.slug === "pc") {
      computer.style.display = "inline";
    }
    if (each.platform.slug.includes("playstation")) {
      playstation.style.display = "inline";
    }
    if (each.platform.slug.includes("xbox")) {
      xbox.style.display = "inline";
    }
  });

  //PEGANDO TAGS CATEGORIAS DO GAME
  let gameTags = gameInfoJSON.results[0].tags;
  let gameTagsHTML = document.querySelector("#game-tags");
  let tagsToShow = [];

  gameTags.forEach((tag) => {
    if (tagsToShow.length >= 4) return;
    if (tag.language === "eng" && tag.name.length <= 12 && tag.id <= 10000) {
      tagsToShow.push(tag.name);
    }
  });

  let firstTwoTags = tagsToShow.slice(0, 2).join(" / ");
  let lastTwoTags = tagsToShow.slice(2).join(" / ");

  gameTagsHTML.innerHTML = `${firstTwoTags}<br>${lastTwoTags}`;

  //! SPECIFIC ENDPOINT
  const response2 = await fetch(specificEndpoint);
  const specificGameInfoJSON = await response2.json();
  console.log(specificGameInfoJSON);

  //MUDANDO A DESCRIÇÃO
  let gameDescriptionHTML = document.querySelector("#DescriptionOfTheGame");
  let fullGameDescription = specificGameInfoJSON.description_raw;
  let shortGameDescription;
  let maxLenght = 350;
  let verMais = document.querySelector(".ver-mais");

  if (fullGameDescription.length > maxLenght) {
    shortGameDescription = fullGameDescription.slice(0, maxLenght) + "...";
    gameDescriptionHTML.textContent = shortGameDescription;
  } else {
    gameDescriptionHTML.textContent = fullGameDescription;
  }

  //LOGICA DO VER MAIS VER MENOS
  verMais.addEventListener("click", () => {
    if (gameDescriptionHTML.textContent === fullGameDescription) {
      gameDescriptionHTML.textContent = shortGameDescription;
      verMais.textContent = "Ver mais";
    } else if (gameDescriptionHTML.textContent === shortGameDescription) {
      gameDescriptionHTML.textContent = fullGameDescription;
      verMais.textContent = "Ver menos";
    }
  });
}

fetchGameDetails();
