// JavaScript untuk mengatur animasi dan menampilkan konten
window.addEventListener('load', () => {
    // Menunggu 2 detik agar animasi fade-out selesai
    setTimeout(() => {
      // Mengubah opacity menjadi 0 untuk menghilangkan fade-out
      document.getElementById('fade-out').style.opacity = 0;
  
      // Menunggu sampai animasi selesai, lalu sembunyikan fade-out
      setTimeout(() => {
        document.getElementById('fade-out').style.display = 'none';
        // Menampilkan konten halaman setelah fade-out
        document.getElementById('content').style.display = 'block';
      }, 2000); // Durasi animasi fade-out 2 detik
    }, 1000); // Tunggu 1 detik sebelum mulai fade-out
  });
  
        // Function to create falling leaves with random properties
        function createFallingLeaves() {
          const leafContainer = document.getElementById("leaf-overlay");
  
          setInterval(() => {
            // Create new leaf element
            const leaf = document.createElement("div");
            leaf.classList.add("leaf");
  
            // Set random position and animation properties
            const randomX = Math.random() * window.innerWidth;
            const randomDelay = Math.random() * 5; // Delay for randomness in falling speed
            const randomSize = 0.5 + Math.random(); // Randomize size of leaf
  
            leaf.style.left = `${randomX}px`;
            leaf.style.animationDelay = `${randomDelay}s`;
            leaf.style.transform = `scale(${randomSize})`;
  
            // Add the leaf to the container
            leafContainer.appendChild(leaf);
  
            // Remove the leaf after it falls out of view
            setTimeout(() => {
              leaf.remove();
            }, 10000); // Time matching the fall duration
          }, 500); // Create a leaf every 500ms
        }
  
        // Call the function to start generating leaves
        createFallingLeaves();
  
        // Menambahkan event listener untuk tombol start game
        document
          .getElementById("start-game-btn")
          .addEventListener("click", () => {
            // Menyembunyikan popup informasi
            document.getElementById("info-popup").style.display = "none";
            backgroundMusic.play();
            isMusicPlaying = true;
          });
  
        const container = document.getElementById("game-container");
        const TILE_SIZE = 32;
  
        // Logic untuk tombol Play Sound
        const playSoundBtn = document.getElementById("play-sound-btn");
        const backgroundMusic = document.getElementById("background-music");
  
        let isMusicPlaying = false;
  
        backgroundMusic.volume = 0.2;
  
        playSoundBtn.addEventListener("click", () => {
          if (isMusicPlaying) {
            backgroundMusic.pause();
            isMusicPlaying = false;
            playSoundBtn.textContent = "🎶"; // Ubah ikon tombol
          } else {
            backgroundMusic.play();
            isMusicPlaying = true;
            playSoundBtn.textContent = "🔊"; // Ubah ikon tombol
          }
        });
  
        const islands = [
          // Pulau utama di tengah
          {
            shape: [
              "                          ",
              "          ############    ",
              "        ##############    ",
              "       ################   ",
              "      #################   ",
              "     ##################   ",
              "     ##################   ",
              "    ###################   ",
              "    ###################   ",
              "    ###################   ",
              "     ##################   ",
              "     ##################   ",
              "      #################   ",
              "       ################   ",
              "        ##############    ",
              "          ############    ",
            ],
            offsetX: 0,
            offsetY: 0,
          },
          // Pulau kecil di kanan
          {
            shape: [
              "     ####     ",
              "    ######    ",
              "   ########   ",
              "    ######    ",
              "     ####     ",
            ],
            offsetX: 15, // Dikurangi
            offsetY: -2, // Dikurangi
          },
          // Pulau menengah di kiri
          {
            shape: [
              "    ########    ",
              "   ##########   ",
              "  ############  ",
              "   ##########   ",
              "    ########    ",
            ],
            offsetX: -15, // Dikurangi
            offsetY: 5,
          },
          // Pulau kecil di atas
          {
            shape: ["   ####   ", "  ######  ", "   ####   "],
            offsetX: -5, // Dikurangi
            offsetY: -10, // Dikurangi
          },
          // Pulau besar di kanan bawah
          {
            shape: [
              "      ##########      ",
              "    ##############    ",
              "   ################   ",
              "  ##################  ",
              "   ################   ",
              "    ##############    ",
              "      ##########      ",
            ],
            offsetX: 20, // Dikurangi
            offsetY: 10, // Dikurangi
          },
          // Pulau kecil di kiri atas
          {
            shape: [
              "  ####    ",
              " ######   ",
              "  ####    ",
              "     ###  ",
              "    ####  ",
              "     ###  ",
            ],
            offsetX: -20, // Dikurangi
            offsetY: -15, // Dikurangi
          },
          // Pulau kecil tersebar di kanan
          {
            shape: [
              " ###  ",
              "####  ",
              " ###  ",
              "      ",
              "  ### ",
              " #### ",
              "  ### ",
            ],
            offsetX: 25, // Dikurangi
            offsetY: -8, // Dikurangi
          },
          // Pulau panjang di kiri bawah
          {
            shape: [
              "   #####    ",
              "  #######   ",
              " #########  ",
              "  #######   ",
              "   #####    ",
            ],
            offsetX: -10, // Dikurangi
            offsetY: 15, // Dikurangi
          },
          // Pulau melingkar di kanan atas
          {
            shape: [
              "   ####   ",
              "  ######  ",
              " ######## ",
              "##########",
              " ######## ",
              "  ######  ",
              "   ####   ",
            ],
            offsetX: 20, // Dikurangi
            offsetY: -20, // Dikurangi
          },
        ];
  
        const plantableLocations = new Set();
        let treeCount = 0;
        const MAX_TREES = 50;
  
        function createPlantIndicator(x, y) {
          const indicator = document.createElement("div");
          indicator.className = "plant-indicator";
          indicator.style.left = `${x}px`;
          indicator.style.top = `${y - TILE_SIZE}px`;
          container.appendChild(indicator);
        }
  
        function plantTree(x, y) {
          if (treeCount >= MAX_TREES) return;
  
          const key = `${x},${y}`;
          if (!plantableLocations.has(key)) return;
  
          plantableLocations.delete(key);
  
          // Memutar suara saat klik tanam benih
          const plantSeedSound = document.getElementById("plant-seed-sound");
          plantSeedSound.play();
  
          // Hapus indikator tanam
          const indicators = document.querySelectorAll(".plant-indicator");
          indicators.forEach((indicator) => {
            if (
              indicator.style.left === `${x}px` &&
              indicator.style.top === `${y - TILE_SIZE}px`
            ) {
              indicator.remove();
            }
          });
  
          const treeContainer = document.createElement("div");
          treeContainer.className = "tree-container";
          treeContainer.style.left = `${x}px`;
          treeContainer.style.top = `${y}px`;
  
          // Buat elemen pohon
          const tree = document.createElement("div");
          tree.className = "tree";
          tree.style.backgroundImage = 'url("../assets/sprite/pohon.png")';
  
          // Buat elemen timer pertumbuhan
          const timerElement = document.createElement("div");
          timerElement.className = "growth-timer";
  
          // Tambahkan elemen ke container
          treeContainer.appendChild(timerElement);
          treeContainer.appendChild(tree);
          container.appendChild(treeContainer);
  
          // Mulai timer dan durasi total
          const startTime = Date.now();
          const totalDuration = 20000; // 20 detik total
  
          // Fungsi pembaruan timer
          function updateTimer() {
            const currentTime = Date.now();
            const elapsedTime = currentTime - startTime;
            const remainingTime = Math.max(0, totalDuration - elapsedTime);
  
            if (remainingTime > 0) {
              const seconds = Math.ceil(remainingTime / 1000);
              timerElement.textContent = `Growing: ${seconds}s`;
              requestAnimationFrame(updateTimer);
            } else {
              treeContainer.removeChild(timerElement);
            }
          }
  
          // Mulai timer
          updateTimer();
  
          // Tahapan pertumbuhan pohon
          setTimeout(() => {
            tree.style.backgroundImage = 'url("../assets/sprite/pohon2.png")';
          }, 5000); // 5 detik
  
          setTimeout(() => {
            tree.style.backgroundImage = 'url("../assets/sprite/pohon3.png")';
          }, 10000); // 10 detik
  
          setTimeout(() => {
            tree.style.backgroundImage = 'url("../assets/sprite/pohon4.png")';
            tree.style.width = "90px"; // Jadi makin besar
            tree.style.height = "90px";
          }, 15000); // 15 detik
  
          setTimeout(() => {
            tree.style.backgroundImage = 'url("../assets/sprite/pohon5.png")';
            tree.style.width = "120px"; // Final form jadi paling besar
            tree.style.height = "120px";
            treeCount++;
            updateTreeCounter();
            checkCompletion();
          }, 20000); // 20 detik
        }
  
        function updateTreeCounter() {
          document.getElementById(
            "tree-counter"
          ).textContent = `Trees Planted: ${treeCount}/${MAX_TREES}`;
        }
  
        function checkCompletion() {
      if (treeCount === MAX_TREES) {
          const popup = document.createElement("div");
          popup.className = "popup";
          popup.style.position = "fixed";
          popup.style.top = "50%";
          popup.style.left = "50%";
          popup.style.transform = "translate(-50%, -50%)";
          popup.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
          popup.style.color = "white";
          popup.style.padding = "20px";
          popup.style.borderRadius = "10px";
          popup.style.textAlign = "center";
          popup.style.zIndex = "10000";
          popup.style.display = "flex";
          popup.style.flexDirection = "column";  // Stack items vertically
          popup.style.justifyContent = "center"; // Center vertically within the popup
  
          popup.innerHTML = `
      <h2>You have completed Kael's mission!</h2>
      <p style="margin-bottom: 2px;">Thank you for planting ${MAX_TREES} trees!</p>
      <p style="margin-bottom: 2px;">Air memiliki peran yang sangat penting bagi pohon dan tanaman secara umum</p>
      <p style="margin-bottom: 2px;">Ayo selesaikan misi Lyra untuk menghasilkan hujan dengan proses penguapan air dari sungai!</p>
      <a href="../html/afterPlanting.html">
        <br>
          <button>Continue</button>
      </a>
  `
  
  
          document.body.appendChild(popup);
      }
  }
  
  
        function proceedToNextMission() {
          console.log("Proceeding to next mission...");
        }
  
        function createIsland() {
          const baseStartX = Math.floor(window.innerWidth / (2 * TILE_SIZE));
          const baseStartY = Math.floor(window.innerHeight / (2 * TILE_SIZE));
          const allPlantableSpots = [];
  
          islands.forEach((island) => {
            const startX =
              baseStartX -
              Math.floor(island.shape[0].length / 2) +
              island.offsetX;
            const startY =
              baseStartY - Math.floor(island.shape.length / 2) + island.offsetY;
  
            for (let y = 0; y < island.shape.length; y++) {
              for (let x = 0; x < island.shape[y].length; x++) {
                if (island.shape[y][x] === "#") {
                  const tile = document.createElement("div");
                  tile.className = "tile";
  
                  const posX = (startX + x) * TILE_SIZE;
                  const posY = (startY + y) * TILE_SIZE;
                  tile.style.left = `${posX}px`;
                  tile.style.top = `${posY}px`;
  
                  if (
                    y === 0 ||
                    (island.shape[y - 1] && island.shape[y - 1][x] === " ")
                  ) {
                    tile.classList.add("grass-top");
                  } else if (x === 0 || island.shape[y][x - 1] === " ") {
                    tile.classList.add("grass-left");
                  } else if (
                    x === island.shape[y].length - 1 ||
                    island.shape[y][x + 1] === " "
                  ) {
                    tile.classList.add("grass-right");
                  } else if (
                    y === island.shape.length - 1 ||
                    (island.shape[y + 1] && island.shape[y + 1][x] === " ")
                  ) {
                    tile.classList.add("grass-bottom");
                  } else {
                    tile.classList.add("dirt");
                    allPlantableSpots.push({ x: posX, y: posY });
                  }
  
                  container.appendChild(tile);
                }
              }
            }
          });
  
          // Randomly select 23 spots for planting
          const selectedSpots = new Set();
          while (selectedSpots.size < MAX_TREES && allPlantableSpots.length > 0) {
            const randomIndex = Math.floor(
              Math.random() * allPlantableSpots.length
            );
            const spot = allPlantableSpots[randomIndex];
            selectedSpots.add(`${spot.x},${spot.y}`);
            plantableLocations.add(`${spot.x},${spot.y}`);
            createPlantIndicator(spot.x, spot.y);
            allPlantableSpots.splice(randomIndex, 1);
          }
        }
  
        function createClouds() {
          for (let i = 0; i < 5; i++) {
            const cloud = document.createElement("div");
            cloud.className = "cloud";
            const width = Math.random() * 200 + 100;
            const height = Math.random() * 60 + 30;
            cloud.style.width = `${width}px`;
            cloud.style.height = `${height}px`;
            cloud.style.top = `${Math.random() * (window.innerHeight / 2)}px`;
            const duration = Math.random() * 15 + 15;
            cloud.style.animationDuration = `${duration}s`;
            container.appendChild(cloud);
          }
        }
        const LIMIT_X_MIN = -800; // Batas minimum horizontal
        const LIMIT_X_MAX = 800; // Batas maksimum horizontal
        const LIMIT_Y_MIN = -600; // Batas minimum vertikal
        const LIMIT_Y_MAX = 600; // Batas maksimum vertikal
  
        let scale = 1;
        let offsetX = 0;
        let offsetY = 0;
        let isDragging = false;
        let isMiddleMouseDown = false;
        let isGrabbing = false;
        let startX, startY;
  
        container.addEventListener("mousedown", (e) => {
          isGrabbing = true;
          startX = e.clientX;
          startY = e.clientY;
          container.classList.add("grabbing"); // Menambahkan kelas CSS
        });
  
        document.addEventListener("mousemove", (e) => {
          if (!isGrabbing) return;
  
          let deltaX = e.clientX - startX;
          let deltaY = e.clientY - startY;
  
          // Tentukan posisi baru berdasarkan pergerakan mouse
          let newX = container.offsetLeft + deltaX;
          let newY = container.offsetTop + deltaY;
  
          // Pembatasan untuk X dan Y
          newX = Math.max(LIMIT_X_MIN, Math.min(newX, LIMIT_X_MAX));
          newY = Math.max(LIMIT_Y_MIN, Math.min(newY, LIMIT_Y_MAX));
  
          container.style.left = `${newX}px`;
          container.style.top = `${newY}px`;
  
          // Perbarui posisi awal untuk pergerakan berikutnya
          startX = e.clientX;
          startY = e.clientY;
        });
  
        document.addEventListener("mouseup", () => {
          isGrabbing = false;
          container.classList.remove("grabbing"); // Menghapus kelas CSS
        });
  
        // Prevent unwanted text selection during drag
        container.addEventListener("selectstart", (e) => {
          e.preventDefault();
        });
  
        function updateTransform() {
          container.style.transform = `translate(${offsetX}px, ${offsetY}px) scale(${scale})`;
  
          // Gerakkan background juga saat drag
          document.body.style.backgroundPosition = `${offsetX * 0.5}px ${
            offsetY * 0.5
          }px`;
        }
  
        // Handling click for tree planting
        container.addEventListener("click", (e) => {
          if (e.button === 0 && !isDragging) {
            // Only plant if left-click and not dragging
            const rect = container.getBoundingClientRect();
  
            // Get the click position relative to the container
            const clickX = e.clientX - rect.left;
            const clickY = e.clientY - rect.top;
  
            // Calculate grid positions, ignoring zoom/drag offset
            const gridX = Math.floor(clickX / TILE_SIZE) * TILE_SIZE;
            const gridY = Math.floor(clickY / TILE_SIZE) * TILE_SIZE;
  
            // Make sure the click falls within the plantable locations
            if (plantableLocations.has(`${gridX},${gridY}`)) {
              plantTree(gridX, gridY);
            }
          }
          // Reset dragging flag on click
          isDragging = false;
        });
  
        // Add event listener to handle resizing of the window
        window.addEventListener("resize", () => {
          container.innerHTML = "";
          scale = 1;
          offsetX = 0;
          offsetY = 0;
          updateTransform();
          createIsland();
          createClouds();
        });
  
        // Initialize the island and clouds
        createIsland();
        createClouds();