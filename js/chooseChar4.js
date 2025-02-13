document.addEventListener("DOMContentLoaded", function () {
    const characters = document.querySelectorAll(".img-character img");
    const lockedCharacters = ["kael", "lyra", "selene"];
    const videoOverlay = document.getElementById("video-overlay");
    const characterVideo = document.getElementById("character-video");
    
    // Tambahkan event listener untuk video ended
    characterVideo.addEventListener('ended', function() {
        window.location.href = "../html/TheEnd.html"; // Ganti dengan path halaman tujuan
    });
    
    characters.forEach(character => {
        const characterName = character.alt.toLowerCase();
        
        if (lockedCharacters.includes(characterName)) {
            character.style.opacity = "0.5";
            character.style.cursor = "not-allowed";
            character.addEventListener("click", function () {
                alert("Karakter ini terkunci!");
            });
        } else {
            character.style.cursor = "pointer";
            character.addEventListener("click", function () {
                if (characterName === "elden") {
                    videoOverlay.style.display = "block";
                    characterVideo.play();
                    // Pause background music while video is playing
                    audio.pause();
                    isPlaying = false;
                    playButton.style.display = "inline-block";
                    pauseButton.style.display = "none";
                }
            });
        }
    });
});

function closeVideo() {
    const videoOverlay = document.getElementById("video-overlay");
    const characterVideo = document.getElementById("character-video");
    videoOverlay.style.display = "none";
    characterVideo.pause();
    characterVideo.currentTime = 0;
}

window.addEventListener('load', function() {
    const blackScreen = document.getElementById('black-screen');
    
    setTimeout(function() {
        blackScreen.style.opacity = 0;
        setTimeout(function() {
            blackScreen.style.display = 'none';
        }, 1000);
    }, 500);
});

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

window.addEventListener("load", function () {
    audio.play();
    isPlaying = true;
    playButton.style.display = "none";
    pauseButton.style.display = "inline-block";
});

function skipVideo() {
    window.location.href = "TheEnd.html";
}