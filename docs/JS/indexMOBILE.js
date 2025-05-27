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
let mainTitle = document.getElementById("maintitle"),
  mainParagraph = document.getElementById("mainparagraph"),
  mainContentCounter = 1,
  arrayMainContent = [
    {
      img: "url(../Images/Games/red_dead_redemption_2_wallpaper.jpg) center center / cover no-repeat",
      title: "Red Dead Redemption 2",
      paragraph:
        "Um fora da lei luta para sobreviver em um mundo em colapso, enfrentando traições e fugindo da justiça no fim do Velho Oeste",
    },
    {
      img: "url(../Images/Games/MinecraftRetrato.jpg) center center / cover no-repeat",
      title: "Minecraft",
      paragraph:
        "Explore, colete recursos e construa o que sua imaginação permitir em um mundo de blocos infinitos, onde cada descoberta e cada criação são únicas",
    },
    {
      img: "url(../Images/Games/TheLastOfUsRetratoNoText.png) 70% center / cover no-repeat",
      title: "The Last Of Us 2",
      paragraph:
        "Em um mundo pós-apocalíptico, Ellie parte em missão marcada pela bsca por justiça e enfrenta perigos e dilemas que testam sua coragem e humanidade.",
    },
    {
      img: "url(../Images/Games/GodOfWar.jpg) center center / cover no-repeat",
      title: "God of War Ragnarok",
      paragraph:
        "Mergulhe na mitologia nórdica ao lado de Kratos e Atreus, enfrentando deuses e monstros enquanto o fim dos mundos se aproxima e segredos antigos vêm à tona",
    },
  ];

const root = document.documentElement,
  cor01 = getComputedStyle(root).getPropertyValue("--PaletaCor01"),
  cor02 = getComputedStyle(root).getPropertyValue("--PaletaCor02");
let bolinhas = document.querySelectorAll(".bolinhas"),
  noColorBolinha;

function changingMainContent() {
  //Changing Main Images, Titles and Paragraphs...
  let { img, title, paragraph } = arrayMainContent[mainContentCounter];

  document.documentElement.style.setProperty("--main-game-image", img);
  mainTitle.textContent = title;
  mainParagraph.textContent = paragraph;

  //Changing little balls
  bolinhas[mainContentCounter].style["background-color"] = cor01;
  noColorBolinha =
    bolinhas[mainContentCounter - 1] || bolinhas[bolinhas.length - 1];
  noColorBolinha.style["background-color"] = cor02;

  //General counter
  mainContentCounter = (mainContentCounter + 1) % arrayMainContent.length;
}

setInterval(() => {
  changingMainContent();
}, 5000);


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
    }
    else if ( currentScroll <= 0) {
        containerSlides.style.scrollBehavior = "auto";
        containerSlides.scrollLeft = currentScroll + maxScrollWidth;
    }

    requestAnimationFrame(() => {
    isAdjusting = false;
  });
});

//!-----------------SECTION FOUR -------------------*/

//* BEST SELLERS GAMES WITH API
const url = "https://api.rawg.io/api/games";

function fixFormatDate(date) {
  const yyyy = String(date.getFullYear());
  const mm = String(date.getMonth() + 1).padStart(2,"0");
  const dd = String(date.getDate()).padStart(2, "0");

  return `${yyyy}-${mm}-${dd}`;
};

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
  .then((response) => response.json())
  .then(data => {
    
    //LÓGICA ATUALIZAR IMAGENS DOS BESTSELLERS
    let infoBestSellers = [];

    data.results.forEach((result) => {
      
      const gameInfo = {
        background_image: result.background_image,
        name: result.name,
        release_date: result.release_date,
        id: result.id
      }
      
      infoBestSellers.push(gameInfo);

    });
    
    let bestSellersTag = document.querySelectorAll("#sec4 .eachgame");
    
    bestSellersTag.forEach((bestSeller, index) => {
      const img = bestSeller.querySelector("img");
      const nameOfTheGame = bestSeller.querySelector(".nameOfTheGame");

      img.setAttribute("src", infoBestSellers[index].background_image)
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
lastTwoYears.setFullYear(lastTwoYears.getFullYear() - 2 );


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
  const popularGamesResponse = await fetch(`${url}?${popularGamesParams.toString()}`);
  const popularGamesData = await popularGamesResponse.json();

  let popularGamesImagesTag = document.querySelectorAll("#sec5 .eachgame .square-container img");
  let popularGamesTitleTag = document.querySelectorAll("#sec5 .nameOfTheGame");
  let eachGameContainerS5 = document.querySelectorAll("#sec5 .eachgame");

  //LINKING IMAGES AND TITLE TAGS WITH GAME DATA
  popularGamesData.results.forEach((result, index) => {
    popularGamesImagesTag[index].setAttribute("src", result.background_image);
    popularGamesImagesTag[index].setAttribute("alt", result.name);
    popularGamesTitleTag[index].textContent = result.name;
    eachGameContainerS5[index].addEventListener("click", () => {
      window.location.href = `HTML/detailsofthegame.html?id=${result.id}` 
    })
  });
};

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
  const mostAnticipatedResponse = await fetch(`${url}?${mostAnticipatedParams.toString()}`);
  const mostAnticipatedData = await mostAnticipatedResponse.json();
  console.log(mostAnticipatedData);

  let MostAnticipatedImagesTag = document.querySelectorAll("#sec6 .eachgame .square-container img");
  let MostAnticipatedTitleTag = document.querySelectorAll("#sec6 .nameOfTheGame");
  let eachGameContainerS6 = document.querySelectorAll("#sec6 .eachgame");

  mostAnticipatedData.results.forEach((result,index) => {
    MostAnticipatedImagesTag[index].setAttribute("src", result.background_image);
    MostAnticipatedImagesTag[index].setAttribute("alt", result.name);
    MostAnticipatedTitleTag[index].textContent = result.name;
    eachGameContainerS6[index].addEventListener("click", () => {
      window.location.href = `HTML/detailsofthegame.html?id=${result.id}`;
    });
  });
}

fetchMostAnticipated();
