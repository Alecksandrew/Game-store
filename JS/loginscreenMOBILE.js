
const root = document.documentElement;
const cor01 = getComputedStyle(root).getPropertyValue("--PaletaCor01")
const cor02 = getComputedStyle(root). getPropertyValue("--PaletaCor02")


const images = [
    "../Images/Games/BannerRDR2.jpg",
    "../Images/Games/theLastOfUsPaisagem.jpg",
    "../Images/Games/theWitcherPaisagem.jpg",
]

let imageIndex = 0;

const gameImage = document.getElementById("game1")

let changeGameImages = function() {
    gameImage.src = images[imageIndex];
    imageIndex = (imageIndex + 1)%images.length;
    
};

const bolinhas = document.querySelectorAll(".bolinhas")
let indexBolinha = 0;

let changeBackgroundBolinhas = function() {

    bolinhas[indexBolinha].style['background-color'] = cor01;
    indexBolinha = (indexBolinha + 1)%bolinhas.length;

}

setInterval(() => { 
    changeGameImages(); 
    changeBackgroundBolinhas(); 
}, 3000);