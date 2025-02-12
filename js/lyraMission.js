const text =
  "Hai, aku Lyra, teman Kael dan penyihir air. Tugas utamaku adalah memberikan air pada tanaman yang ditanam Kael dengan cara mengubah air menjadi hujan. Namun, sungai di desa Celestria sangat kotor, sehingga aku tidak bisa melakukannya. Aku harus membersihkan sungai ini terlebih dahulu.";
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
