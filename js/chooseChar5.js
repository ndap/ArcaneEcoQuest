// Character Selection with specific routes
document.addEventListener("DOMContentLoaded", function () {
    const characters = document.querySelectorAll(".character-container");
    
    const characterRoutes = {
        kael: '../html/kaelMission.html',
        lyra: '../html/lyraMission.html',
        selene: '../html/seleneMission.html',
    };
    
    characters.forEach(character => {
        character.addEventListener("click", function () {
            const characterType = this.dataset.character;
            const route = characterRoutes[characterType];
            if (route) {
                window.location.href = route;
            }
        });
    });
});

// Initial Loading Animation
window.addEventListener('load', function() {
    const blackScreen = document.getElementById('black-screen');
    setTimeout(function() {
        blackScreen.style.opacity = 0;
        setTimeout(function() {
            blackScreen.style.display = 'none';
        }, 1000);
    }, 500);
});

// Music Control
let isPlaying = false;
const audio = document.getElementById("background-music");
const playButton = document.getElementById("play-button");
const pauseButton = document.getElementById("pause-button");

function toggleMusic() {
    if (isPlaying) {
        audio.pause();
        playButton.style.display = "inline-block";
        pauseButton.style.display = "none";
    } else {
        audio.play();
        playButton.style.display = "none";
        pauseButton.style.display = "inline-block";
    }
    isPlaying = !isPlaying;
}

// Auto-play music on load
window.addEventListener("load", function () {
    audio.play();
    isPlaying = true;
    playButton.style.display = "none";
    pauseButton.style.display = "inline-block";
});