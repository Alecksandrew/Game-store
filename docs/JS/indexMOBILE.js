"use strict";




/*
/////// FAZER CARD SLIDER BY TOUCH TOMORROW!!!!!!!!!!! TALVEZ JUNTAR OS 3 ARRAYS????




//Changin main images of the main page

let gameImages = [
    "url(../Images/Games/red_dead_redemption_2_wallpaper.jpg) center center / cover no-repeat",
    "url(../Images/Games/MinecraftRetrato.jpg) center center / cover no-repeat",
    "url(../Images/Games/TheLastOfUsRetratoNoText.png) 70% center / cover no-repeat",
    "url(../Images/Games/GodOfWar.jpg) center center / cover no-repeat",
];
let imgCounter = 1;


function ChangingMainContent() {

    //Changing Main Images...
    document.documentElement.style.setProperty("--main-game-image", gameImages[imgCounter]) ;
    imgCounter = (imgCounter + 1)%4;


    //Changing Main Texts
}


function changeGameImages() {
    document.documentElement.style.setProperty("--main-game-image", gameImages[imgCounter]) ;
    imgCounter = (imgCounter + 1)%4;
};


//Changing main texts of main page

let mainTitle = document.getElementById("maintitle"); 
let mainParagraph = document.getElementById("mainparagraph");

let textCounter = 1;

let arrayMainContent = [
    ["url(../Images/Games/red_dead_redemption_2_wallpaper.jpg) center center / cover no-repeat", "Red Dead Redemption 2", "Um fora da lei luta para sobreviver em um mundo em colapso, enfrentando traições e fugindo da justiça no fim do Velho Oeste"],
    ["url(../Images/Games/MinecraftRetrato.jpg) center center / cover no-repeat", "Minecraft", "Explore, colete recursos e construa o que sua imaginação permitir em um mundo de blocos infinitos, onde cada descoberta e cada criação são únicas"],
    ["url(../Images/Games/TheLastOfUsRetratoNoText.png) 70% center / cover no-repeat", "The Last Of Us 2", "Em um mundo pós-apocalíptico, Ellie parte em missão marcada pela bsca por justiça e enfrenta perigos e dilemas que testam sua coragem e humanidade."],
    ["url(../Images/Games/GodOfWar.jpg) center center / cover no-repeat", "God of war Ragnarok", "Mergulhe na mitologia nórdica ao lado de Kratos e Atreus, enfrentando deuses e monstros enquanto o fim dos mundos se aproxima e segredos antigos vêm à tona"],
];


function changeMainTexts() {
    let [title, paragraph] = arrayMainTexts[textCounter];
    mainTitle.textContent = title;
    mainParagraph.textContent = paragraph;
    
    textCounter = (textCounter + 1)%4;
};


//Changing little balls

const root = document.documentElement;
const cor01 = getComputedStyle(root).getPropertyValue("--PaletaCor01");
const cor02 = getComputedStyle(root). getPropertyValue("--PaletaCor02");

const bolinhas = document.querySelectorAll(".bolinhas");
let indexBolinha = 1;
let noColorBolinha = null;

let changeBackgroundBolinhas = function() {

    bolinhas[indexBolinha].style['background-color'] = cor01;
    noColorBolinha = bolinhas[indexBolinha - 1] || bolinhas[bolinhas.length - 1];
    noColorBolinha.style['background-color'] = cor02;
    indexBolinha = (indexBolinha + 1)%bolinhas.length 

};

//APRENDER ASYNC/AWAIT PARA MELHORAR FUNÇÃO DAS BOLINHAS!



setInterval( () => {
    changeGameImages()
    changeMainTexts()
    changeBackgroundBolinhas()
}, 5000);

*/

//MENU HAMBURGUER
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















/*--------------------HEADER--------------------*/


//Change main content
let mainTitle = document.getElementById("maintitle"),
    mainParagraph = document.getElementById("mainparagraph"),
    mainContentCounter = 1,
    arrayMainContent = [
    {
      img: "url(../Images/Games/red_dead_redemption_2_wallpaper.jpg) center center / cover no-repeat",
      title: "Red Dead Redemption 2",
      paragraph: "Um fora da lei luta para sobreviver em um mundo em colapso, enfrentando traições e fugindo da justiça no fim do Velho Oeste"
    },
    {
      img: "url(../Images/Games/MinecraftRetrato.jpg) center center / cover no-repeat",
      title: "Minecraft",
      paragraph: "Explore, colete recursos e construa o que sua imaginação permitir em um mundo de blocos infinitos, onde cada descoberta e cada criação são únicas"
    },
    {
      img: "url(../Images/Games/TheLastOfUsRetratoNoText.png) 70% center / cover no-repeat",
      title: "The Last Of Us 2",
      paragraph: "Em um mundo pós-apocalíptico, Ellie parte em missão marcada pela bsca por justiça e enfrenta perigos e dilemas que testam sua coragem e humanidade."
    },
    {
      img: "url(../Images/Games/GodOfWar.jpg) center center / cover no-repeat",
      title: "God of War Ragnarok",
      paragraph: "Mergulhe na mitologia nórdica ao lado de Kratos e Atreus, enfrentando deuses e monstros enquanto o fim dos mundos se aproxima e segredos antigos vêm à tona"
    }
  ];
 
  
const root = document.documentElement,
      cor01 = getComputedStyle(root).getPropertyValue("--PaletaCor01"),
      cor02 = getComputedStyle(root). getPropertyValue("--PaletaCor02");
let bolinhas = document.querySelectorAll(".bolinhas"),
    noColorBolinha;




function changingMainContent() {

    //Changing Main Images, Titles and Paragraphs...
    let {img, title, paragraph} = arrayMainContent[mainContentCounter];
    
    document.documentElement.style.setProperty("--main-game-image", img);
    mainTitle.textContent = title;
    mainParagraph.textContent = paragraph;
    

    //Changing little balls
    bolinhas[mainContentCounter].style['background-color'] = cor01;
    noColorBolinha = bolinhas[mainContentCounter - 1] || bolinhas[bolinhas.length - 1];
    noColorBolinha.style['background-color'] = cor02;


    //General counter
    mainContentCounter = (mainContentCounter + 1)%arrayMainContent.length;
};


setInterval( () => {
    changingMainContent()
}, 5000);


//Changing wishlist star

const wishlistStarConteiner = document.querySelectorAll(".star-conteiner");
const wishlistStar = document.querySelectorAll(".starwishlist");

wishlistStarConteiner.forEach( (starConteiner, c) => {
    starConteiner.addEventListener("click", () => {
        wishlistStar[c].classList.toggle("starfilled");
    } );

});

/*----------------------SEC1-------------------------------*/


const allSlides = document.querySelector("#sec3 .all-slides"),
      slides = document.querySelectorAll("#sec3 .all-slides .slide"),    
      slideWidth = slides[0].offsetWidth;

let isDragging = false,
    startX,
    currentX,      
    currentOffset = -slideWidth,     
    prevOffset = 0;

allSlides.style.transform = `translateX(${currentOffset}px)`;

allSlides.addEventListener("touchStart", (e) => {
    isDragging = true;
    startX = e.touches[0].clientX;
});

allSlides.addEventListener("touchmove", (e) => {
    if (!isDragging) return;
    currentX = e.touches[0].clientX;
    const deltaX = currentX - startX;
    allSlides.style.transform = `translateX(${deltaX}px)`
});

allSlides.addEventListener("touchEnd", (e) => {
    isDragging = false;
})


/*------------SEC2 ( TERMINAR DE FAZER COM CALMA DEPOIS, ESTUDAR MAIS SOBRE DOM ) ----------------------*/



const myAPIkey = "?key=dc9051c56aeb476bb3131334856215f4";
const url = "https://api.rawg.io/api/games";
let eachGame = document.getElementsByClassName("eachgame");
let nameOfTheGame;


eachGame.forEach((game) =>

    game.addEventListener("click", () => {
        nameOfTheGame = game.getElementsByClassName("nameOfTheGame");
        const response = fetch(url + myAPIkey + nameOfTheGame);
        const DataGame = response.json();
        
        
    }
   )

    )


/*------------SEC4----------------------*/
