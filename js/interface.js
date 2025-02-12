 // Alert untuk pengalaman layar penuh
 alert("Please press F11 to full screen for more experience");
 // Elemen audio dan slider
 const audio = document.getElementById("background-music");
 const volumeSlider = document.querySelector(".volume-slider");
 const playMusicButton = document.getElementById("play-music");
 const toggleMusicButton = document.getElementById("toggle-music");
 const volumeModal = document.getElementById("volume-modal");
 const closeModal = document.getElementById("close-modal");
 const musicIcon = toggleMusicButton?.querySelector("i");
 const volumeIcon = document.getElementById("volume-icon");
 const startButton = document.querySelector(".start-btn");
 const buttonClickSound = document.getElementById("button-click-sound");
 const fadeOutOverlay = document.getElementById("fade-out-overlay");
 
 // Set volume awal
 audio.volume = volumeSlider.value;
 
 // Event listener untuk tombol volume (tidak memutar musik, hanya membuka modal)
 playMusicButton.addEventListener("click", () => {
   volumeModal.style.display = "block"; // Hanya membuka modal
 });
 
 startButton.addEventListener("click", () => {
     audio.pause(); // Menghentikan musik latar
     buttonClickSound.play(); // Memutar suara klik tombol
   
     fadeOutOverlay.classList.remove("hidden"); // Menampilkan overlay
     fadeOutOverlay.classList.add("fade-out"); // Memicu animasi fade out
   
     setTimeout(() => {
       window.location.href = "./html/cutscene.html"; // Ganti dengan URL halaman tujuan
     }, 3000); // 3000 ms = 3 detik
   });
   
 // Update volume saat slider digeser
 volumeSlider.addEventListener("input", (e) => {
   audio.volume = e.target.value;
 
   // Update ikon volume berdasarkan nilai volume
   updateVolumeIcon(audio.volume);
 });
 
 // Tutup modal jika tombol close ditekan
 closeModal.addEventListener("click", () => {
   volumeModal.style.display = "none";
 });
 
 // Tutup modal jika klik di luar area modal
 window.addEventListener("click", (event) => {
   if (event.target === volumeModal) {
     volumeModal.style.display = "none";
   }
 });
 
 // Logika pause/play audio
 toggleMusicButton.addEventListener("click", () => {
   if (audio.paused) {
     audio.play();
     musicIcon.classList.remove("fa-play");
     musicIcon.classList.add("fa-pause");
   } else {
     audio.pause();
     musicIcon.classList.remove("fa-pause");
     musicIcon.classList.add("fa-play");
   }
 });
 
 // Update ikon volume berdasarkan nilai volume
 function updateVolumeIcon(volume) {
   if (volume === 0) {
     volumeIcon.textContent = "🔇"; // Ikon volume mute
   } else if (volume <= 0.5) {
     volumeIcon.textContent = "🔉"; // Ikon volume rendah
   } else {
     volumeIcon.textContent = "🔊"; // Ikon volume tinggi
   }
 }
 
 // Pastikan tombol play aktif saat halaman di-load
 window.addEventListener("DOMContentLoaded", () => {
   if (!audio.paused) {
     musicIcon?.classList.add("fa-pause");
   } else {
     musicIcon?.classList.add("fa-play");
   }
 
   // Set ikon volume awal berdasarkan volume saat halaman dimuat
   updateVolumeIcon(audio.volume);
 });
 
 document.addEventListener("DOMContentLoaded", () => {
     const quitButton = document.getElementById("quit-button");
     const quitModal = document.getElementById("quit-modal");
     const closeQuitModal = document.getElementById("close-quit-modal");
     const confirmQuit = document.getElementById("confirm-quit");
     const cancelQuit = document.getElementById("cancel-quit");
 
     // Saat tombol Quit diklik, tampilkan modal
     quitButton.addEventListener("click", () => {
         quitModal.classList.remove("hidden");
     });
 
     // Tutup modal saat klik tombol close atau batal
     closeQuitModal.addEventListener("click", () => {
         quitModal.classList.add("hidden");
     });
 
     cancelQuit.addEventListener("click", () => {
         quitModal.classList.add("hidden");
     });
 
     // Aksi jika pengguna benar-benar ingin keluar
     confirmQuit.addEventListener("click", () => {
         window.close(); // Mencoba menutup tab (mungkin tidak berfungsi di semua browser)
     });
 });

  // Tambahkan JavaScript ini
        const instruksiBtn = document.querySelector('.instruksi-btn');
        const instructionModal = document.getElementById('instruction-modal');
        const closeInstructionBtn = instructionModal.querySelector('.close-btn');
        const closeInstructionButton = document.getElementById('close-instruction');

        // Tampilkan modal instruksi saat tombol diklik
        instruksiBtn.addEventListener('click', () => {
            buttonClickSound.play();
            instructionModal.style.display = 'flex';
        });

        // Tutup modal dengan tombol close
        closeInstructionBtn.addEventListener('click', () => {
            buttonClickSound.play();
            instructionModal.style.display = 'none';
        });

        // Tutup modal dengan tombol OK
        closeInstructionButton.addEventListener('click', () => {
            buttonClickSound.play();
            instructionModal.style.display = 'none';
        });

        // Tutup modal jika mengklik di luar modal
        window.addEventListener('click', (event) => {
            if (event.target === instructionModal) {
                instructionModal.style.display = 'none';
            }
        });
        // Tambahkan JavaScript ini ke bagian script yang sudah ada
        const quitBtn = document.querySelector('.quit-btn');
        const quitModal = document.getElementById('quit-modal');
        const closeQuitBtn = quitModal.querySelector('.close-btn');
        const confirmQuitBtn = document.getElementById('confirm-quit');
        const cancelQuitBtn = document.getElementById('cancel-quit');
        
        // Tampilkan modal saat tombol quit diklik
        quitBtn.addEventListener('click', () => {
            buttonClickSound.play();
            quitModal.style.display = 'block';
        });
        
        // Tutup modal saat tombol close diklik
        closeQuitBtn.addEventListener('click', () => {
            buttonClickSound.play();
            quitModal.style.display = 'none';
        });
        
        // Konfirmasi quit
        confirmQuitBtn.addEventListener('click', () => {
            buttonClickSound.play();
            window.close();
            // Fallback jika window.close() tidak berhasil
            window.location.href = "about:blank";
        });
        
        // Batal quit
        cancelQuitBtn.addEventListener('click', () => {
            buttonClickSound.play();
            quitModal.style.display = 'none';
        });
        
        // Tutup modal jika mengklik di luar modal
        window.addEventListener('click', (event) => {
            if (event.target === quitModal) {
                quitModal.style.display = 'none';
            }
        });
 
 
 