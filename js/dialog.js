const dialogData = [
    { name: "Kael", text: "Akhirnya... Monster Enclipse berhasil kita kalahkan!\nSekarang saatnya kita membangun kembali desa.", leftActive: true },
    { name: "Elden", text: "Kael, perjuangan kalian luar biasa.\nAtas nama seluruh desa, aku mengucapkan terima kasih.", leftActive: false },
    { name: "Kael", text: "Tidak perlu berterima kasih, Elden.\nIni adalah tanggung jawab kami untuk melindungi desa ini.", leftActive: true },
    { name: "Elden", text: "Namun, pertarungan tadi menyebabkan banyak kerusakan.\nInfrastruktur desa hancur, dan tanah menjadi gersang.", leftActive: false },
    { name: "Kael", text: "Aku menyadarinya...\nJalanan rusak, jembatan hancur, dan ladang mengering.", leftActive: true },
    { name: "Elden", text: "Kael, aku ingin meminta satu hal lagi.\nTolong bantu kami memperbaiki infrastruktur dan menyuburkan tanah kembali agar desa ini bisa makmur lagi.", leftActive: false },
    { name: "Kael", text: "Tentu saja, Elden!\nAku dan yang lain akan membangun kembali jalan dan jembatan,\nserta menanam kembali tumbuhan agar desa ini kembali hijau!", leftActive: true },
    { name: "Elden", text: "Terima kasih, Kael.\nDengan bantuanmu, desa ini akan pulih dan berkembang lebih baik dari sebelumnya.", leftActive: false }
];

let index = 0;
let isTyping = false;
const dialogText = document.getElementById("dialogText");
const dialogBox = document.getElementById("dialogBox");
const charLeft = document.getElementById("charLeft");
const charRight = document.getElementById("charRight");

function showDialog() {
    dialogBox.style.opacity = "1";
    dialogText.innerHTML = "";
    updateDialogPointer();
    typeWriterEffect(dialogData[index].text);
}

function nextDialog() {
    if (isTyping) return;
    if (index < dialogData.length - 1) {
        index++;
        updateDialogPointer();
        typeWriterEffect(dialogData[index].text);

        charLeft.classList.toggle("active", dialogData[index].leftActive);
        charRight.classList.toggle("active", !dialogData[index].leftActive);
    } else {
        dialogBox.style.opacity = "0";
        setTimeout(() => {
            window.location.href = "chooseChar.html"; // Redirect setelah dialog selesai
        }, 1000);
    }
}

function updateDialogPointer() {
    const arrow = document.styleSheets[0].cssRules[document.styleSheets[0].cssRules.length - 1];
    if (dialogData[index].leftActive) {
        arrow.style.setProperty("left", "10%");
    } else {
        arrow.style.setProperty("left", "90%");
    }
}

function typeWriterEffect(text) {
    let i = 0;
    isTyping = true;
    dialogText.innerHTML = "";
    function type() {
        if (i < text.length) {
            if (text[i] === "\n") {
                dialogText.innerHTML += "<br>"; // Ganti "\n" dengan baris baru
            } else {
                dialogText.innerHTML += text[i];
            }
            i++;
            setTimeout(type, 30);
        } else {
            isTyping = false;
        }
    }
    type();
}

showDialog();