"use strict";





/////// FAZER CARD SLIDER BY TOUCH TOMORROW!!!!!!!!!!!




//Changin main images of the main page

let gameImages = [
    "url(../Images/Games/red_dead_redemption_2_wallpaper.jpg) center center / cover no-repeat",
    "url(../Images/Games/MinecraftRetrato.jpg) center center / cover no-repeat",
    "url(../Images/Games/TheLastOfUsRetratoNoText.png) 70% center / cover no-repeat",
    "url(../Images/Games/GodOfWar.jpg) center center / cover no-repeat",
];

let imgCounter = 1;


function changeGameImages() {
    document.documentElement.style.setProperty("--main-game-image", gameImages[imgCounter]) ;
    imgCounter = (imgCounter + 1)%4;
};



//Changing main texts of main page

let mainTitle = document.getElementById("maintitle"); 
let mainParagraph = document.getElementById("mainparagraph");

let textCounter = 1;

let arrayMainTexts = [
    ["Red Dead Redemption 2", "Um fora da lei luta para sobreviver em um mundo em colapso, enfrentando traições e fugindo da justiça no fim do Velho Oeste"],
    ["Minecraft", "Explore, colete recursos e construa o que sua imaginação permitir em um mundo de blocos infinitos, onde cada descoberta e cada criação são únicas"],
    ["The Last Of Us 2", "Em um mundo pós-apocalíptico, Ellie parte em missão marcada pela bsca por justiça e enfrenta perigos e dilemas que testam sua coragem e humanidade."],
    ["God of war Ragnarok", "Mergulhe na mitologia nórdica ao lado de Kratos e Atreus, enfrentando deuses e monstros enquanto o fim dos mundos se aproxima e segredos antigos vêm à tona"],
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



setInterval( () => {
    changeGameImages()
    changeMainTexts()
    changeBackgroundBolinhas()
}, 5000);