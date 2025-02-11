const text =
  "Hai, aku Kael, seorang penyihir tumbuhan yang dipercaya oleh para tetua desa Celestria untuk menanam pohon-pohon di SkyForest. Tugas utamaku adalah menanam sebanyak mungkin pohon di SkyForest.";
const typingSpeed = 30; // Kecepatan mengetik (ms per karakter)
let index = 0;

function typeText() {
    if (index < text.length) {
        document.getElementById("typing-text").innerHTML += text.charAt(index);
        index++;
        setTimeout(typeText, typingSpeed);
    } else {
        document.getElementById("next-button").style.display = "block"; // Munculkan tombol
    }
}

window.onload = () => {
    typeText();
};
