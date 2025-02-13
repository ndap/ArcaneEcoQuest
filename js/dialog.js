window.onload = () => {
    const overlay = document.querySelector(".overlay");
    setTimeout(() => {
      overlay.classList.add("hidden");
    }, 500); // Animasi berlangsung selama 0.5 detik sebelum menghilang

    // Menghapus overlay setelah animasi selesai
    overlay.addEventListener("transitionend", () => {
      overlay.remove(); // Menghapus overlay dari DOM
    });
  };

  const dialogData = [
    {
      name: "Kael",
      text: "Akhirnya... Pohon Lumorra bangkit kembali!\nSekarang saatnya kita membangun kembali desa.",
      leftActive: true,
    },
    {
      name: "Elden",
      text: "Kael, perjuangan kalian luar biasa.\nAtas nama seluruh desa, aku mengucapkan terima kasih.",
      leftActive: false,
    },
    {
      name: "Kael",
      text: "Tidak masalah, Elden.\nIni adalah tanggung jawab kami untuk melindungi desa ini.",
      leftActive: true,
    },
    {
      name: "Elden",
      text: "Namun, keguguran pohon Lumorra tadi menyebabkan banyak kerusakan.\nSungai kotor, ForestSky yang gundul dan lain lain",
      leftActive: false,
    },
    {
      name: "Kael",
      text: "Iya.. Aku menyadarinya...",
      leftActive: true,
    },
    {
      name: "Elden",
      text: "Kael, aku ingin meminta satu hal lagi.\nTolong bantu kami memperbaiki ForestSky yang gundul dan membersihkan sampai di sungai agar desa ini bisa makmur lagi.",
      leftActive: false,
    },
    {
      name: "Kael",
      text: "Tentu saja, Elden!\nAku dan yang lain akan membantu desa ini agar tetap sejahtera,\nserta menanam kembali di ForestSky tumbuhan agar desa ini kembali hijau!",
      leftActive: true,
    },
    {
      name: "Elden",
      text: "Terima kasih, Kael.\nDengan bantuanmu, desa ini akan pulih dan berkembang lebih baik dari sebelumnya.",
      leftActive: false,
    },
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

    // Mainkan suara klik saat tombol "Next" diklik
    const clickSound = document.getElementById("clickSound");
    clickSound.play(); // Memainkan suara klik

    if (index < dialogData.length - 1) {
      index++;
      updateDialogPointer();
      typeWriterEffect(dialogData[index].text);

      charLeft.classList.toggle("active", dialogData[index].leftActive);
      charRight.classList.toggle("active", !dialogData[index].leftActive);
    } else {
      // Trigger fade-out animation
      dialogBox.style.opacity = "0";
      const fadeOutOverlay = document.createElement("div");
      fadeOutOverlay.classList.add("overlay");
      document.body.appendChild(fadeOutOverlay);

      // Menunggu sebelum menambahkan class hidden untuk memulai fade-out
      setTimeout(() => {
        fadeOutOverlay.classList.add("hidden"); // Menambahkan class hidden setelah 0.5 detik
      }, 500);

      // After fade-out, redirect
      setTimeout(() => {
        window.location.href = "chooseChar.html"; // Redirect setelah dialog selesai
      }, 1000);
    }
  }

  function updateDialogPointer() {
    const arrow =
      document.styleSheets[0].cssRules[
        document.styleSheets[0].cssRules.length - 1
      ];
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