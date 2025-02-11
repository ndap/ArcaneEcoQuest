document.addEventListener("DOMContentLoaded", function () {
    const characters = document.querySelectorAll(".img-character img");
    const lockedCharacters = ["kael", "selene", "finn"]; // Karakter yang terkunci
    
    characters.forEach(character => {
        const characterName = character.alt.toLowerCase();
        
        if (lockedCharacters.includes(characterName)) {
            character.style.opacity = "0.5"; // Menandai karakter terkunci
            character.style.cursor = "not-allowed";
            character.addEventListener("click", function () {
                alert("Karakter ini terkunci!");
            });
        } else {
            character.style.cursor = "pointer";
            character.addEventListener("click", function () {
                window.location.href = `../html/lyraMission.html?character=${characterName}`;
            });
        }
    });
});

// chooseChar.js
window.addEventListener('load', function() {
    // Tunggu sampai semua elemen halaman selesai dimuat
    const blackScreen = document.getElementById('black-screen');
    
    // Setelah 2 detik, fade out dan hapus layar hitam
    setTimeout(function() {
        blackScreen.style.opacity = 0;
        // Setelah animasi selesai, hapus elemen dari DOM
        setTimeout(function() {
            blackScreen.style.display = 'none';
        }, 1000); // Durasi fade-out 1 detik
    }, 500); // Tunggu 0.5 detik sebelum fade-out dimulai
});

let isPlaying = false;
const audio = document.getElementById("background-music");
const playButton = document.getElementById("play-button");
const pauseButton = document.getElementById("pause-button");

function toggleMusic() {
  if (isPlaying) {
    // Jika musik sedang diputar, pause musik
    audio.pause();
    playButton.style.display = "inline-block";
    pauseButton.style.display = "none";
  } else {
    // Jika musik sedang dijeda, play musik
    audio.play();
    playButton.style.display = "none";
    pauseButton.style.display = "inline-block";
  }
  isPlaying = !isPlaying;
}

// Memulai musik otomatis saat halaman dimuat
window.addEventListener("load", function () {
  audio.play();
  isPlaying = true;
  playButton.style.display = "none";
  pauseButton.style.display = "inline-block";
});

