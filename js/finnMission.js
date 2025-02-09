const text = "Finn memiliki misi untuk memperbaiki infrastruktur seperti jembatan, jalan, fasilitas umum, dan bangunan yang rusak. Ia bekerja keras setiap hari untuk memastikan segala infrastruktur tetap kokoh dan dapat digunakan dengan aman. Finn percaya bahwa dengan membangun dan merawat infrastruktur, ia dapat memberikan kontribusi besar bagi masyarakat dan menciptakan lingkungan yang lebih baik. Misi ini sangat penting bagi Finn, dan ia berharap dapat menginspirasi orang lain untuk turut serta dalam menjaga dan memperbaiki lingkungan sekitarnya.";
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
