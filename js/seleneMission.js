const text =
  "Aku Selene, teman Kael, seorang penyihir matahari. Tugasku adalah memberikan energi sinar matahari kepada pohon-pohon yang telah ditanam oleh Kael, agar pohon-pohon tersebut dapat melakukan fotosintesis, menghasilkan oksigen, dan makanan. Namun, ada masalah besar bagiku, yaitu untuk memberikan energi sinar matahari kepada pohon, aku membutuhkan mana yang sangat banyak, sekitar 250 mana. Aku harus mengumpulkan 250 mana terlebih dahulu agar bisa memberikan energi sinar matahari ke pohon-pohon tersebut";
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
