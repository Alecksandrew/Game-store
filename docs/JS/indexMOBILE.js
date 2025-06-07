"use strict";

const btn2 = document.getElementById("btn2");

btn2.addEventListener("click", () => {
  window.location.href = "HTML/loginscreen2.0.html";
});

//*LÓGICA ABRIR E FECHAR MENU HAMBURUGER
const menuHamburguer = document.getElementById("menuhamburguer");
const menuContainerOptions = document.getElementById("nav1");

menuHamburguer.addEventListener("click", () => {
  menuContainerOptions.style.transform = "translateX(0)";
});

const closeMenuDesign = document.querySelector(".closeMenuDesign");

closeMenuDesign.addEventListener("click", () => {
  menuContainerOptions.style.transform = "translateX(-120%)";
});

//*LOGICA MUDAR FORMATO DO MENU AO CHEGAR 768PX
let header = document.querySelector("header");
let loginOptions = document.querySelector("#nav2");

if (window.matchMedia("(min-width: 768px)").matches) {
  header.prepend(menuContainerOptions);
  header.classList.add("desktop-header");
  loginOptions.classList.add("nav2-desktop");
  menuContainerOptions.classList.add("desktop-menu");
  menuContainerOptions.style.transform = "translateX(0);";
  menuHamburguer.style.display = "none";
}

window.addEventListener("resize", () => {
  if (window.matchMedia("(min-width: 768px)").matches) {
    header.prepend(menuContainerOptions);
    header.classList.add("desktop-header");
    loginOptions.classList.add("nav2-desktop");
    menuContainerOptions.classList.add("desktop-menu");
    menuContainerOptions.style.transform = "translateX(0)";
    menuHamburguer.style.display = "none";
  } else {
    header.append(menuContainerOptions);
    header.classList.remove("desktop-header");
    loginOptions.classList.remove("nav2-desktop");
    menuContainerOptions.classList.remove("desktop-menu");
    menuContainerOptions.style.transform = "translateX(-120vw)";
    menuHamburguer.style.display = "block";
  }
});

//!--------------------HEADER--------------------

//*Change main content
//*Change main content
let mainTitle = document.getElementById("maintitle");
let mainParagraph = document.getElementById("mainparagraph");
let mainContentCounter = 0;
let allSecondaryImages = document.querySelectorAll(".imggames");
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
const urlGames = "https://api.rawg.io/api/games";

const root = document.documentElement,
  cor01 = getComputedStyle(root).getPropertyValue("--PaletaCor01"),
  cor02 = getComputedStyle(root).getPropertyValue("--PaletaCor02");
let bolinhas = document.querySelectorAll(".bolinhas"),
  noColorBolinha;

async function fetchAllMainGameData() {
  const gameDataPromises = mainContent.map(async (game) => {
    const mainFetchURL = `${urlGames}/${game.slug}?key=${key}`;

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

  //CHANGING SIDE IMAGES
  document.documentElement.style.setProperty(
    "--first-game-image",
    `url(${allGameData[mainContentCounter].img})`
  );
  document.documentElement.style.setProperty(
    "--second-game-image",
    `url(${allGameData[mainContentCounter + 1].img})`
  );
  document.documentElement.style.setProperty(
    "--third-game-image",
    `url(${allGameData[mainContentCounter + 2].img})`
  );
  document.documentElement.style.setProperty(
    "--fourth-game-image",
    `url(${allGameData[mainContentCounter + 3].img})`
  );

  changingMainContent();
  setInterval(() => {
    changingMainContent();
  }, 5000);

  initWishlistFeature();
}

fetchAllMainGameData();

function fixLengthDescription() {
  if (isMobile.matches) {
    mainParagraph.textContent =
      allGameData[mainContentCounter].description.substr(0, 140) + "...";
  } else if (isTablet.matches) {
    mainParagraph.textContent =
      allGameData[mainContentCounter].description.substr(0, 270) + "...";
  } else {
    mainParagraph.textContent =
      allGameData[mainContentCounter].description.substr(0, 300) + "...";
  }
}

//LOGICA PARA AO CLICAR NO JOGO, ELE FICAR EM FOCO E APARECER COMO IMAGEM PRINCIPAL
function updateSecondaryImagesAppearance(choosenIndex) {
  allSecondaryImages.forEach((secondaryImage) => {
    if (secondaryImage === allSecondaryImages[choosenIndex]) {
      secondaryImage.classList.add("overlay-hidden");
    } else {
      secondaryImage.classList.remove("overlay-hidden");
    }
  });
}

function updateMainImageInfos(choosenGame) {
  mainTitle.textContent = choosenGame.name;
  currentGameId = choosenGame.id;
}

function handleSecondaryImagesSelection(selectedIndex) {
  //ATUALIZAR CONTADOR
  mainContentCounter = selectedIndex;

  const selectedGame = allGameData[selectedIndex];

  //UPDATE MAIN IMAGE
  document.documentElement.style.setProperty(
    "--main-game-image",
    `url(${selectedGame.img})`
  );

  updateSecondaryImagesAppearance(selectedIndex);
  updateMainImageInfos(selectedGame);
  fixLengthDescription();
  updateBolinhasAppearance();
  updateStarAppearance();
}

allSecondaryImages.forEach((img, index) => {
  img.addEventListener("click", () => {
    handleSecondaryImagesSelection(index);
  });
});

function updateBolinhasAppearance() {
  bolinhas.forEach((bolinha, index) => {
    if (index === mainContentCounter) {
      bolinha.style.backgroundColor = cor01;
    } else {
      bolinha.style.backgroundColor = cor02;
    }
  });
}

function changingMainContent() {
  //Changing Main Images, focused image, Titles and Paragraphs...
  document.documentElement.style.setProperty(
    "--main-game-image",
    `url(${allGameData[mainContentCounter].img})`
  );
  allSecondaryImages.forEach((img) => {
    img.classList.remove("overlay-hidden");
  });
  allSecondaryImages[mainContentCounter].classList.add("overlay-hidden");
  mainTitle.textContent = allGameData[mainContentCounter].name;
  currentGameId = allGameData[mainContentCounter].id;
  fixLengthDescription();

  //Changing little balls
  updateBolinhasAppearance();

  //General counter
  mainContentCounter = (mainContentCounter + 1) % allGameData.length;

  updateStarAppearance();
}

//Changing HREF get it now button
getItNowButton.addEventListener("click", () => {
  window.location.href = `HTML/detailsofthegame.html?id=${currentGameId}`;
});

//GET IT NOW -> Redirecionando para a página de detalhes

//Changing wishlist star
const wishlistStarConteiner = document.querySelector(".star-conteiner");
const wishlistStar = document.querySelector(".starwishlist");

function getParsedFromLocalStorage(propertyName) {
  return JSON.parse(localStorage.getItem(propertyName)) || [];
}

function sendToLocalStorage(propertyName, dataToSend) {
  return localStorage.setItem(propertyName, JSON.stringify(dataToSend));
}

function isWishlisted(id) {
  let wishlistLocalStorage = getParsedFromLocalStorage("WishlistedGamesInfos");
  return wishlistLocalStorage.some((gameInfo) => gameInfo.id === id);
}

function updateStarAppearance() {
  if (isWishlisted(currentGameId)) {
    wishlistStar.classList.add("starfilled");
  } else {
    wishlistStar.classList.remove("starfilled");
  }
}

function toggleWishlist() {
  let gameDataLocalStorageParsed = getParsedFromLocalStorage(
    "WishlistedGamesInfos"
  );

  if (isWishlisted(currentGameId)) {
    wishlistStar.classList.remove("starfilled");
    gameDataLocalStorageParsed = gameDataLocalStorageParsed.filter(
      (gameData) => gameData.id !== currentGameId
    );
  } else {
    wishlistStar.classList.add("starfilled");
    const currentMainGame = allGameData.find(
      (gameDataObj) => gameDataObj.id === currentGameId
    );
    gameDataLocalStorageParsed.push(currentMainGame);
  }

  sendToLocalStorage("WishlistedGamesInfos", gameDataLocalStorageParsed);
}

function initWishlistFeature() {
  updateStarAppearance();

  wishlistStarConteiner.addEventListener("click", toggleWishlist);
}

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

//*GÊNEROS DE JOGOS SINCRONIZADOS COM A API

let urlGenres = "https://api.rawg.io/api/genres";

const gamesGenresParams = new URLSearchParams({
  key: key,
  page_size: 10,
  ordering: "-games_count",
});

let allGameGenreNameHTML = document.querySelectorAll("#sec3 .textahead");

async function fetchGamesGenres() {
  const response = await fetch(`${urlGenres}?${gamesGenresParams.toString()}`);
  const gamesGenresData = await response.json();
  console.log(gamesGenresData);

  allGameGenreNameHTML.forEach((genreName, index) => {
    genreName.textContent = gamesGenresData.results[index].name;
    document.documentElement.style.setProperty(
      `--game-genre-${index + 1}`,
      `url(${gamesGenresData.results[index].image_background}`
    );
  });
}

fetchGamesGenres().then(() => {
  //SÓ POSSO CARREGAR O SLIDER INFINITO E O CLONE DEPOIS QUE O NOME DOS GENEROS FOREM ATRIBUIDOS
  //*SLIDER INFINITO
  let containerSlides = document.querySelector(".all-slides");
  let eachSlide = document.querySelectorAll(".slide");

  //CLONAR SLIDES
  eachSlide.forEach((slide, index) => {
    slide.dataset.index = index;
    
    const prependedClone = slide.cloneNode(true);
    const appendedClone = slide.cloneNode(true);
    containerSlides.append(appendedClone);
    containerSlides.prepend(prependedClone);
  });

  const containerScrollWidth = containerSlides.scrollWidth; // Original + clones width
  const maxScrollWidth = containerScrollWidth / 3; // only original width -> LARGURA DE DO CONJUNTO ORIGINAL DE SLIDES
  let isAdjusting = false;
  containerSlides.scrollLeft = maxScrollWidth;

  // LOGICA DO DESLIZE INFINITO BY TOUCH

  containerSlides.addEventListener("scroll", () => {
    if (isAdjusting) return;

    isAdjusting = true;

    let currentScroll = containerSlides.scrollLeft;
    const tolerance = 10;
    let maximumRightScroll =
      containerSlides.scrollWidth - containerSlides.clientWidth;

    if (currentScroll >= maximumRightScroll - tolerance) {
      containerSlides.style.scrollBehavior = "auto";
      containerSlides.scrollLeft = currentScroll - maxScrollWidth;
    } else if (currentScroll <= tolerance) {
      containerSlides.style.scrollBehavior = "auto";
      containerSlides.scrollLeft = currentScroll + maxScrollWidth;
    }

    requestAnimationFrame(() => {
      containerSlides.style.scrollBehavior = "smooth";
      isAdjusting = false;
    });
  });

  // LOGICA DO DESLIZE INFINITO BY MOUSE
  let isMouseDown, isDragging = false;
  let mouseStartX, initialScrollLeft;
  let mouseDownTime = 0;

  let lastMouseX;
  let velocity = 0;
  let inertiaFrameID;
  let isInertiaActive = false;

  containerSlides.addEventListener("mousedown", (e) => {
    isMouseDown = true;
    isDragging = false;
    mouseDownTime = Date.now();

    cancelAnimationFrame(inertiaFrameID);
    initialScrollLeft = containerSlides.scrollLeft;
    mouseStartX = e.pageX;
    lastMouseX = e.pageX;
    velocity = 0;
    isInertiaActive = false;
  });

  window.addEventListener("mousemove", (e) => {
    if (!isMouseDown) return;

    let mouseCurrentX = e.pageX;

    let dislocationX = mouseCurrentX - mouseStartX;

    if (dislocationX > 5) {
      isDragging = true;
    }

    let movementX = mouseCurrentX - lastMouseX;

    containerSlides.scrollLeft = initialScrollLeft - dislocationX;
    containerSlides.style.scrollBehavior = "auto";

    velocity = -movementX;
    lastMouseX = mouseCurrentX;
  });

  window.addEventListener("mouseup", (e) => {
    if (!isMouseDown) return;
    isMouseDown = false;

    if (Math.abs(velocity) > 0.5) {
      isInertiaActive = true;
      runInertiaStep();
    } else {
      isDragging = false;
      containerSlides.style.scrollBehavior = "smooth";
    }
  });

  function runInertiaStep() {
    if (isMouseDown || Math.abs(velocity) < 0.5) {
      velocity = 0; //
      containerSlides.style.scrollBehavior = "smooth";
      isInertiaActive = false;
      isDragging = false;
      return;
    }

    containerSlides.style.scrollBehavior = "auto";
    containerSlides.scrollLeft += velocity;
    velocity *= 0.98; // DESACELERAÇÃO

    inertiaFrameID = requestAnimationFrame(runInertiaStep);
  }

  //*AO CLICAR, ENVIA PARA A PAGINA DE CATEGORIA
    containerSlides.addEventListener("click", (e) => {
      const slide = e.target.closest('.slide');
      const isLongPress = Date.now() - mouseDownTime > 200;
      
      if (isDragging || !slide || isLongPress || isInertiaActive) return;

      const index = slide.dataset.index;

      const genreElementHTML = allGameGenreNameHTML[index];
      const genreName = genreElementHTML.textContent;
      const encodedGenreName = encodeURIComponent(genreName);

      window.open(`HTML/genre.html?genre=${encodedGenreName}`, "_blank");
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
  key: "dc9051c56aeb476bb3131334856215f4",
  page: 1,
  page_size: 4,
  dates: `${dataInicio},${dataFim}`,
  ordering: "-added",
});

let bestSellersURL = fetch(urlGames + "?" + bestSellersParams.toString())
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

//!----------------- SECTION FIVE -------------------*/
//*MOST POPULAR GAMES OF THE LAST TWO YEARS

let lastTwoYears = new Date();
lastTwoYears.setFullYear(lastTwoYears.getFullYear() - 2);

let dataInicioPopularGames = fixFormatDate(today);
let dataFimPopularGames = fixFormatDate(lastTwoYears);

const popularGamesParams = new URLSearchParams({
  key: key,
  page: 1,
  page_size: 14,
  dates: `${dataFimPopularGames},${dataInicioPopularGames}`,
  ordering: "-added",
});

async function fetchPopularGames() {
  //FETCHING DATA
  const popularGamesResponse = await fetch(
    `${urlGames}?${popularGamesParams.toString()}`
  );
  const popularGamesData = await popularGamesResponse.json();

  let popularGamesImagesTag = document.querySelectorAll(
    "#sec5 .eachgame .square-container img"
  );
  let popularGamesTitleTag = document.querySelectorAll("#sec5 .nameOfTheGame");
  let eachGameContainerS5 = document.querySelectorAll("#sec5 .eachgame");

  //LINKING IMAGES AND TITLE TAGS WITH GAME DATA
  popularGamesData.results.forEach((result, index) => {
    popularGamesImagesTag[index].setAttribute("src", result.background_image);
    popularGamesImagesTag[index].setAttribute("alt", result.name);
    popularGamesTitleTag[index].textContent = result.name;
    eachGameContainerS5[index].addEventListener("click", () => {
      window.location.href = `HTML/detailsofthegame.html?id=${result.id}`;
    });
  });
}

fetchPopularGames();

//!----------------- SECTION SIX -------------------*/

let nextTwoYears = new Date();
nextTwoYears.setFullYear(nextTwoYears.getFullYear() + 2);

let dataIncioMaisAguardados = fixFormatDate(today);
let dataFimMaisAguardados = fixFormatDate(nextTwoYears);

const mostAnticipatedParams = new URLSearchParams({
  key: key,
  page_size: 4,
  dates: `${dataIncioMaisAguardados},${dataFimMaisAguardados}`,
  ordering: "-added",
});

async function fetchMostAnticipated() {
  const mostAnticipatedResponse = await fetch(
    `${urlGames}?${mostAnticipatedParams.toString()}`
  );
  const mostAnticipatedData = await mostAnticipatedResponse.json();
  console.log(mostAnticipatedData);

  let MostAnticipatedImagesTag = document.querySelectorAll(
    "#sec6 .eachgame .square-container img"
  );
  let MostAnticipatedTitleTag = document.querySelectorAll(
    "#sec6 .nameOfTheGame"
  );
  let eachGameContainerS6 = document.querySelectorAll("#sec6 .eachgame");

  mostAnticipatedData.results.forEach((result, index) => {
    MostAnticipatedImagesTag[index].setAttribute(
      "src",
      result.background_image
    );
    MostAnticipatedImagesTag[index].setAttribute("alt", result.name);
    MostAnticipatedTitleTag[index].textContent = result.name;
    eachGameContainerS6[index].addEventListener("click", () => {
      window.location.href = `HTML/detailsofthegame.html?id=${result.id}`;
    });
  });
}

fetchMostAnticipated();
