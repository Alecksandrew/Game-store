"use strict";


const root = document.documentElement;
const cor01 = getComputedStyle(root).getPropertyValue("--PaletaCor01");
const cor02 = getComputedStyle(root). getPropertyValue("--PaletaCor02");


const images = [
    "../Images/Games/BannerRDR2.jpg",
    "../Images/Games/theLastOfUsPaisagem.jpg",
    "../Images/Games/theWitcherPaisagem.jpg",
];

let imageIndex = 1;

const gameImage = document.getElementById("game1");

let changeGameImages = function() {
    gameImage.src = images[imageIndex];
    imageIndex = (imageIndex + 1)%images.length;
    
};

const bolinhas = document.querySelectorAll(".bolinhas");
let indexBolinha = 1;
let noColorBolinha = null;

let changeBackgroundBolinhas = function() {

    bolinhas[indexBolinha].style['background-color'] = cor01;
    noColorBolinha = bolinhas[indexBolinha - 1] || bolinhas[bolinhas.length - 1];
    noColorBolinha.style['background-color'] = cor02;
    indexBolinha = (indexBolinha + 1)%3 

};


setInterval(() => { 
    changeGameImages(); 
    changeBackgroundBolinhas(); 
}, 4000);


