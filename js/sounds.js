// Efectos de sonido para el juego
const sonidos = {
    win: new Audio('https://cdn.pixabay.com/audio/2022/07/26/audio_124bfae5b2.mp3'),
    lose: new Audio('https://cdn.pixabay.com/audio/2022/03/15/audio_115b9b7b7b.mp3'),
    draw: new Audio('https://cdn.pixabay.com/audio/2022/10/16/audio_12b7b7b7b7.mp3'),
    click: new Audio('https://cdn.pixabay.com/audio/2022/03/15/audio_115b9b7b7b.mp3')
};

function playSound(type) {
    if (sonidos[type]) {
        sonidos[type].currentTime = 0;
        sonidos[type].play();
    }
}
