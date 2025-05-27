"use strict";

const btn2 = document.getElementById("btn2");

btn2.addEventListener("click", () => {
  window.location.href = "HTML/loginscreen2.0.html";
});

const menuHamburguer = document.getElementById("menuhamburguer"),
  nav1 = document.getElementById("nav1");

menuHamburguer.addEventListener("click", () => {
  nav1.style.transform = "translateX(0)";
});

const closeMenuDesign = document.querySelector(".closeMenuDesign");

closeMenuDesign.addEventListener("click", () => {
  nav1.style.transform = "translateX(-120%)";
});

//!--------------------HEADER--------------------

//*Change main content
let mainTitle = document.getElementById("maintitle");
let mainParagraph = document.getElementById("mainparagraph");
let mainContentCounter = 0;
let mainContent = [
  {
    slug: "red-dead-redemption-2",
  },
  {
    slug: "minecraft",
  },
  {
    slug: "the-last-of-us-part-2",
  },
  {
    slug: "god-of-war-ragnarok",
  },
];
let allGameData = null;
let isMobile = window.matchMedia("(max-width: 360px)");
let isTablet = window.matchMedia("(min-width: 361px) and (max-width: 768px)");
let getItNowButton = document.querySelector("#btn3");
let currentGameId = null;

const key = "dc9051c56aeb476bb3131334856215f4";
const url = "https://api.rawg.io/api/games";

const root = document.documentElement,
  cor01 = getComputedStyle(root).getPropertyValue("--PaletaCor01"),
  cor02 = getComputedStyle(root).getPropertyValue("--PaletaCor02");
let bolinhas = document.querySelectorAll(".bolinhas"),
  noColorBolinha;

async function fetchAllMainGameData() {
  const gameDataPromises = mainContent.map(async (game) => {
    const mainFetchURL = `${url}/${game.slug}?key=${key}`;

    const fetchgameData = await fetch(mainFetchURL);
    const gameData = await fetchgameData.json();
    console.log(gameData);

    return {
      name: gameData.name,
      img: gameData.background_image,
      description: gameData.description_raw + "...",
      id: gameData.id,
    };
  });

  allGameData = await Promise.all(gameDataPromises);
  console.log(allGameData);

  changingMainContent();
  setInterval(() => {
    changingMainContent();
  }, 5000);
};

fetchAllMainGameData();

function fixLengthDescription() {
 
  if (isMobile.matches) {
    mainParagraph.textContent = allGameData[mainContentCounter].description.substr(0, 140) + "...";
  } else if (isTablet.matches) {
    mainParagraph.textContent = allGameData[mainContentCounter].description.substr(0, 270) + "...";
  } else {
    mainParagraph.textContent = allGameData[mainContentCounter].description.substr(0, 300) + "...";
  }
};

function changingMainContent() {
  //Changing Main Images, Titles and Paragraphs...
  document.documentElement.style.setProperty("--main-game-image", `url(${allGameData[mainContentCounter].img})`);
  mainTitle.textContent = allGameData[mainContentCounter].name;
  currentGameId = allGameData[mainContentCounter].id;
  fixLengthDescription();

  //Changing little balls
  bolinhas[mainContentCounter].style["background-color"] = cor01;
  noColorBolinha = bolinhas[mainContentCounter - 1] || bolinhas[bolinhas.length - 1];
  noColorBolinha.style["background-color"] = cor02;

  //General counter
  mainContentCounter = (mainContentCounter + 1) % allGameData.length;

}

  //Changing HREF get it now button
getItNowButton.addEventListener("click", () => {
    window.location.href = `HTML/detailsofthegame.html?id=${currentGameId}`;    
});

//GET IT NOW -> Redirecionando para a página de detalhes


//Changing wishlist star
const wishlistStarConteiner = document.querySelectorAll(".star-conteiner");
const wishlistStar = document.querySelectorAll(".starwishlist");

wishlistStarConteiner.forEach((starConteiner, c) => {
  starConteiner.addEventListener("click", () => {
    wishlistStar[c].classList.toggle("starfilled");
  });
});

//!----------------------SEC1-------------------------------*/

//!------------SEC2 ----------------------*/

/*
const url = "https://api.rawg.io/api/games";
let eachGame = document.getElementsByClassName("eachgame");
let nameOfTheGame;

eachGame.forEach((game) =>
  game.addEventListener("click", () => {
    nameOfTheGame = game.getElementsByClassName("nameOfTheGame");
    const response = fetch(url + myAPIkey + nameOfTheGame);
    const DataGame = response.json();
  })
);

*/

//!------------SEC3----------------------*/

//*SLIDER INFINITO
let containerSlides = document.querySelector(".all-slides");
let eachSlide = document.querySelectorAll(".slide");

//CLONAR SLIDES
eachSlide.forEach((slide) => {
  const clone = slide.cloneNode(true);
  containerSlides.appendChild(clone);
});

const containerScrollWidth = containerSlides.scrollWidth; // Original + clones width
const maxScrollWidth = containerScrollWidth / 2; // only original width
let isAdjusting = false;

// LOGICA DO DESLIZE INFINITO
containerSlides.addEventListener("scroll", () => {
  if (isAdjusting) return;

  isAdjusting = true;

  let currentScroll = containerSlides.scrollLeft;

  if (currentScroll >= maxScrollWidth) {
    containerSlides.style.scrollBehavior = "auto";
    containerSlides.scrollLeft = currentScroll - maxScrollWidth;
  } else if (currentScroll <= 0) {
    containerSlides.style.scrollBehavior = "auto";
    containerSlides.scrollLeft = currentScroll + maxScrollWidth;
  }

  requestAnimationFrame(() => {
    isAdjusting = false;
  });
});

//!-----------------SECTION FOUR -------------------*/

//* BEST SELLERS GAMES WITH API
function fixFormatDate(date) {
  const yyyy = String(date.getFullYear());
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");

  return `${yyyy}-${mm}-${dd}`;
}

let today = new Date();
let LastEightYears = new Date();

LastEightYears.setFullYear(today.getFullYear() - 8);

let dataInicio = fixFormatDate(LastEightYears);
let dataFim = fixFormatDate(today);

const bestSellersParams = new URLSearchParams({
  key: key,
  page: 1,
  page_size: 4,
  dates: `${dataInicio},${dataFim}`,
  ordering: "-added",
});

let bestSellersURL = fetch(url + "?" + bestSellersParams.toString())
  .then((response) => response.json())
  .then((data) => {
    //LÓGICA ATUALIZAR IMAGENS DOS BESTSELLERS
    let infoBestSellers = [];

    data.results.forEach((result) => {
      const gameInfo = {
        background_image: result.background_image,
        name: result.name,
        release_date: result.release_date,
        id: result.id,
      };

      infoBestSellers.push(gameInfo);
    });

    let bestSellersTag = document.querySelectorAll("#sec4 .eachgame");

    bestSellersTag.forEach((bestSeller, index) => {
      const img = bestSeller.querySelector("img");
      const nameOfTheGame = bestSeller.querySelector(".nameOfTheGame");

      img.setAttribute("src", infoBestSellers[index].background_image);
      img.setAttribute("alt", infoBestSellers[index].name);
      nameOfTheGame.textContent = infoBestSellers[index].name;

      bestSeller.addEventListener("click", () => {
        const gameID = infoBestSellers[index].id;
        window.location.href = `HTML/detailsofthegame.html?id=${gameID}`;
      });
    });
  }); //BEST SELLERS OF THE LAST EIGHT YEARS
