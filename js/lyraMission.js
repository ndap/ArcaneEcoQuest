const text = "Lyra memiliki misi untuk menyuburkan tanah dengan air dan menumbuhkan tanaman menggunakan kekuatan airnya. Ia dengan tekun menyiram tumbuhan dan merawatnya agar tetap segar dan subur. Lyra percaya bahwa dengan kekuatannya, ia dapat menjaga keseimbangan alam dan menginspirasi orang lain untuk peduli terhadap lingkungan.";
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
