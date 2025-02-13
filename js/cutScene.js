// Memutar video dalam mode layar penuh saat halaman dimuat
document.addEventListener("DOMContentLoaded", () => {
// Ambil elemen video dan layar loading
const videoPlayer = document.getElementById("videoPlayer");
const loadingScreen = document.getElementById("loadingScreen");

// Fungsi untuk memicu mode layar penuh
function openFullscreen(element) {
  if (element.requestFullscreen) {
    element.requestFullscreen();
  } else if (element.webkitRequestFullscreen) { // Safari
    element.webkitRequestFullscreen();
  } else if (element.msRequestFullscreen) { // IE11
    element.msRequestFullscreen();
  }
}
  openFullscreen(videoPlayer);
  videoPlayer.play();


// Event listener saat video selesai diputar
videoPlayer.addEventListener("ended", () => {
  // Tampilkan layar loading
  loadingScreen.style.display = "flex";

  // Arahkan ke halaman berikutnya setelah 2 detik
  setTimeout(() => {
    window.location.href = "../html/evolutionLumorra.html"; // Ganti dengan URL tujuan
  }, 2000); // Durasi layar loading
});
});

      document
        .getElementById("playButton")
        .addEventListener("click", function () {
          var video = document.getElementById("videoPlayer");
          video.play();
          document.getElementById("skipButton").style.display = "block";
        });

      document
        .getElementById("skipButton")
        .addEventListener("click", function () {
          window.location.href = "../html/evolutionLumorra.html";
        });

      document
        .getElementById("videoPlayer")
        .addEventListener("play", function () {
          document.getElementById("playButton").style.display = "none";
        });