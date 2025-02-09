const text = "Selene mempunyai misi untuk menyuburkan tanaman dengan cahaya matahari, membantu proses fotosintesis, dan memastikan tanaman tumbuh dengan baik dan subur. Dengan kemampuannya, ia berusaha menjaga keseimbangan alam dan menginspirasi orang lain untuk peduli terhadap lingkungan.";
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
