

const imagesDesktop = [
    "../Images/Games/rdr2portrait.jpg",
    "../Images/Games/theLastOfUsRetrato.jpg",
    "../Images/Games/theWitcherRetrato.jpeg",
];

const gameImageDesktop = document.getElementById("game2");

let imageIndexDesktop = 1;

let changeGameImagesDesktop = function() {
    gameImageDesktop.src = imagesDesktop[imageIndexDesktop];
    imageIndexDesktop = (imageIndexDesktop + 1)%imagesDesktop.length;
    
};

setInterval(() => { 
    changeGameImagesDesktop(); 
}, 4000)