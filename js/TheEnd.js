// Auto-play background music jika ada
window.onload = function() {
    // Opsional: tambahkan musik background
    const bgMusic = new Audio('../assets/sounds/RoyaltyFantasy.mp3'); // Sesuaikan path musik
    bgMusic.volume = 0.3;
    bgMusic.play();
}