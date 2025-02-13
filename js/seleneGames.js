window.addEventListener("load", function () {
    const fadeElement = document.getElementById("fade");

    fadeElement.addEventListener("animationend", function () {
      fadeElement.style.display = "none";
    });
  });


  function createFlashEffect() {
    const flash = document.createElement("div");
    flash.className = "flash-effect";
    document.body.appendChild(flash);

    // Remove the flash element after animation
    flash.addEventListener("animationend", () => {
      flash.remove();
    });
  }

  function shakeScreen() {
    const gameContainer = document.getElementById("gameContainer");
    gameContainer.classList.add("shake");

    // Remove shake class after animation
    gameContainer.addEventListener(
      "animationend",
      () => {
        gameContainer.classList.remove("shake");
      },
      { once: true }
    );
  }

  const gameState = {
    score: 0,
    lives: 3,
    fallSpeed: 2,
    playerSpeed: 100,
    sprintSpeed: 200,
    gameLoop: null,
    objects: [],
    keysPressed: {},
    playerPosition: window.innerWidth / 2,
    isGameActive: false,
    lastDirection: "right",
  };

  let audioContext;

  function initAudio() {
    if (!audioContext) {
      audioContext = new (window.AudioContext ||
        window.webkitAudioContext)();
    }
  }

  function playSound(type) {
    if (!audioContext) return;

    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    if (type === "catch") {
      oscillator.frequency.setValueAtTime(440, audioContext.currentTime);
      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(
        0.01,
        audioContext.currentTime + 0.2
      );
    } else {
      oscillator.frequency.setValueAtTime(220, audioContext.currentTime);
      gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(
        0.01,
        audioContext.currentTime + 0.3
      );
    }

    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.3);
  }

  function startGame() {
    initAudio();
    document.getElementById("popupInstructions").style.display = "none";
    document.querySelector(".game-background").style.display = "none";
    document.getElementById("gameContainer").style.visibility = "visible";
    gameState.isGameActive = true;

    // Start background music when game starts
    backgroundMusic = document.getElementById("backgroundMusic");
    backgroundMusic.play();
    isMusicPlaying = true;

    initGame();
  }

  let backgroundMusic;
  let isMusicPlaying = false;

  function initGame() {
    updateLives();
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);
    gameState.gameLoop = setInterval(gameLoop, 16);
    spawnObject();

    // Initialize background music
    backgroundMusic = document.getElementById("backgroundMusic");
    backgroundMusic.volume = 0.5; // Set initial volume
  }

  function toggleMusic() {
    const musicBtn = document.getElementById("toggleMusic");
    if (isMusicPlaying) {
      backgroundMusic.pause();
      musicBtn.textContent = "🔈";
    } else {
      backgroundMusic.play();
      musicBtn.textContent = "🔊";
    }
    isMusicPlaying = !isMusicPlaying;
  }

  function handleKeyDown(e) {
    if (!gameState.isGameActive || gameState.keysPressed[e.key]) return;
    gameState.keysPressed[e.key] = true;

    const player = document.getElementById("player");
    let distance = gameState.playerSpeed;

    if (e.shiftKey) {
      distance = gameState.sprintSpeed;
      player.classList.add("sprinting");
    }

    if (e.key.toLowerCase() === "a") {
      movePlayer(-distance);
      if (gameState.lastDirection !== "left") {
        player.classList.add("player-left");
        gameState.lastDirection = "left";
      }
    } else if (e.key.toLowerCase() === "d") {
      movePlayer(distance);
      if (gameState.lastDirection !== "right") {
        player.classList.remove("player-left");
        gameState.lastDirection = "right";
      }
    }
  }

  function handleKeyUp(e) {
    gameState.keysPressed[e.key] = false;
    if (e.key === "Shift") {
      document.getElementById("player").classList.remove("sprinting");
    }
  }

  function movePlayer(distance) {
    const player = document.getElementById("player");
    const currentLeft =
      parseFloat(player.style.left) || window.innerWidth / 2;
    let newLeft = currentLeft + distance;
    newLeft = Math.max(30, Math.min(window.innerWidth - 30, newLeft));
    player.style.left = `${newLeft}px`;
    gameState.playerPosition = newLeft;
  }

  function updateLives() {
    const livesContainer = document.getElementById("lives");
    livesContainer.innerHTML = "❤".repeat(gameState.lives);
  }

  function spawnObject() {
    if (!gameState.isGameActive) return;

    const types = [
      { class: "sun", chance: 0.7 },
      { class: "dark-sun", chance: 0.3 },
    ];

    const rand = Math.random();
    let cumulative = 0;
    let selectedType;

    for (const type of types) {
      cumulative += type.chance;
      if (rand < cumulative) {
        selectedType = type.class;
        break;
      }
    }

    // Generate random movement pattern
    const movementPatterns = ["straight", "arc", "random"];
    const pattern =
      movementPatterns[Math.floor(Math.random() * movementPatterns.length)];

    const object = document.createElement("div");
    object.className = `falling-object ${selectedType}`;
    object.style.left = Math.random() * (window.innerWidth - 40) + "px";
    object.style.top = "-40px";
    object.innerHTML = selectedType === "sun" ? "☀" : "☁";

    document.getElementById("gameContainer").appendChild(object);

    // Add movement-specific properties
    let movementProps = {
      pattern: pattern,
      initialX: parseFloat(object.style.left),
      time: 0,
    };

    // For arc movement
    if (pattern === "arc") {
      movementProps.amplitude = Math.random() * 200 - 100; // Random amplitude between -100 and 100
      movementProps.frequency = Math.random() * 0.02 + 0.01; // Random frequency
    }

    // For random movement
    if (pattern === "random") {
      movementProps.nextDirectionChange = 50;
      movementProps.horizontalSpeed = 0;
      movementProps.maxHorizontalSpeed = 2;
    }

    gameState.objects.push({
      element: object,
      type: selectedType,
      speed: gameState.fallSpeed,
      movement: movementProps,
    });

    setTimeout(spawnObject, Math.random() * 2000 + 1000);
  }

  function gameLoop() {
    if (!gameState.isGameActive) return;

    const player = document.getElementById("player");
    const playerRect = player.getBoundingClientRect();

    for (let i = gameState.objects.length - 1; i >= 0; i--) {
      const obj = gameState.objects[i];
      const element = obj.element;
      const rect = element.getBoundingClientRect();

      // Update position based on movement pattern
      switch (obj.movement.pattern) {
        case "straight":
          // Simple straight down movement
          let newTop = rect.top + obj.speed;
          element.style.top = newTop + "px";
          break;

        case "arc":
          // Arc movement using sine wave
          obj.movement.time += 1;
          let newArcTop = rect.top + obj.speed;
          let newArcLeft =
            obj.movement.initialX +
            Math.sin(obj.movement.time * obj.movement.frequency) *
              obj.movement.amplitude;

          // Keep within screen bounds
          newArcLeft = Math.max(
            0,
            Math.min(window.innerWidth - rect.width, newArcLeft)
          );

          element.style.top = newArcTop + "px";
          element.style.left = newArcLeft + "px";
          break;

        case "random":
          // Random movement
          obj.movement.time += 1;

          // Change direction randomly
          if (obj.movement.time >= obj.movement.nextDirectionChange) {
            obj.movement.horizontalSpeed =
              (Math.random() - 0.5) * obj.movement.maxHorizontalSpeed * 2;
            obj.movement.nextDirectionChange =
              obj.movement.time + Math.random() * 50 + 25;
          }

          let newRandomTop = rect.top + obj.speed;
          let newRandomLeft = rect.left + obj.movement.horizontalSpeed;

          // Keep within screen bounds
          newRandomLeft = Math.max(
            0,
            Math.min(window.innerWidth - rect.width, newRandomLeft)
          );

          element.style.top = newRandomTop + "px";
          element.style.left = newRandomLeft + "px";
          break;
      }

      // Check collisions
      if (
        rect.bottom >= playerRect.top &&
        rect.top <= playerRect.bottom &&
        rect.right >= playerRect.left &&
        rect.left <= playerRect.right
      ) {
        handleCollision(obj);
        element.remove();
        gameState.objects.splice(i, 1);
      } else if (rect.top > window.innerHeight) {
        if (obj.type === "sun") {
          gameState.lives--;
          updateLives();
          if (gameState.lives <= 0) {
            gameOver();
          }
        }
        element.remove();
        gameState.objects.splice(i, 1);
      }
    }

    gameState.fallSpeed += 0.002;
  }

  // Generate random movement pattern
  const movementPatterns = ["straight", "arc", "random"];
  const pattern =
    movementPatterns[Math.floor(Math.random() * movementPatterns.length)];

  const object = document.createElement("div");
  object.className = `falling-object ${selectedType}`;
  object.style.left = Math.random() * (window.innerWidth - 40) + "px";
  object.style.top = "-40px";
  object.innerHTML = selectedType === "sun" ? "☀" : "☁";

  document.getElementById("gameContainer").appendChild(object);

  // Add movement-specific properties
  let movementProps = {
    pattern: pattern,
    initialX: parseFloat(object.style.left),
    time: 0,
  };

  // For arc movement
  if (pattern === "arc") {
    movementProps.amplitude = Math.random() * 200 - 100; // Random amplitude between -100 and 100
    movementProps.frequency = Math.random() * 0.02 + 0.01; // Random frequency
  }

  // For random movement
  if (pattern === "random") {
    movementProps.nextDirectionChange = 50;
    movementProps.horizontalSpeed = 0;
    movementProps.maxHorizontalSpeed = 2;
  }

  gameState.objects.push({
    element: object,
    type: selectedType,
    speed: gameState.fallSpeed,
    movement: movementProps,
  });

  setTimeout(spawnObject, Math.random() * 2000 + 1000);

  function handleCollision(obj) {
    switch (obj.type) {
      case "sun":
        playSound("catch");
        createFlashEffect(); // Add flash effect
        gameState.score += 10;
        document.getElementById(
          "score"
        ).textContent = `Score: ${gameState.score}`;
        if (gameState.score >= 250) {
          victory();
        }
        break;
      case "dark-sun":
        playSound("dark");
        shakeScreen(); // Add shake effect
        const smoke = document.createElement("div");
        smoke.className = "smoke";
        obj.element.appendChild(smoke);
        gameState.lives--;
        updateLives();
        if (gameState.lives <= 0) {
          gameOver();
        }
        break;
    }
  }

  function playEndingSequence() {
    const videoContainer = document.getElementById("videoContainer");
    const video = document.getElementById("endVideo");

    // Hide victory popup and show video
    document.getElementById("victory").style.display = "none";
    videoContainer.style.display = "block";

    // Play video and handle ending
    video.play();
    video.addEventListener("ended", function () {
      window.location.href = "../html/chooseChar4.html"; // Replace with target URL
    });
  }

  function gameOver() {
    gameState.isGameActive = false;
    clearInterval(gameState.gameLoop);
    document.removeEventListener("keydown", handleKeyDown);
    document.removeEventListener("keyup", handleKeyUp);
    document.getElementById("finalScore").textContent = gameState.score;
    document.getElementById("gameOver").style.display = "block";
    document.querySelector(".game-background").style.display = "block";

    // Fade out music
    if (backgroundMusic && isMusicPlaying) {
      const fadeOut = setInterval(() => {
        if (backgroundMusic.volume > 0.1) {
          backgroundMusic.volume -= 0.1;
        } else {
          clearInterval(fadeOut);
          backgroundMusic.pause();
          backgroundMusic.volume = 0.5;
          isMusicPlaying = false;
          document.getElementById("toggleMusic").textContent = "🔈";
        }
      }, 100);
    }
  }

  function victory() {
    gameState.isGameActive = false;
    clearInterval(gameState.gameLoop);
    document.removeEventListener("keydown", handleKeyDown);
    document.removeEventListener("keyup", handleKeyUp);
    document.getElementById("victoryScore").textContent = gameState.score;
    document.getElementById("victory").style.display = "block";
    document.querySelector(".game-background").style.display = "block";

    // Fade out music
    if (backgroundMusic && isMusicPlaying) {
      const fadeOut = setInterval(() => {
        if (backgroundMusic.volume > 0.1) {
          backgroundMusic.volume -= 0.1;
        } else {
          clearInterval(fadeOut);
          backgroundMusic.pause();
          backgroundMusic.volume = 0.5;
          isMusicPlaying = false;
          document.getElementById("toggleMusic").textContent = "🔈";
        }
      }, 100);
    }
  }

  function restartGame() {
    gameState.score = 0;
    gameState.lives = 3;
    gameState.fallSpeed = 2;
    gameState.objects.forEach((obj) => obj.element.remove());
    gameState.objects = [];
    gameState.playerPosition = window.innerWidth / 2;
    gameState.isGameActive = true;
    gameState.lastDirection = "right";

    const player = document.getElementById("player");
    player.classList.remove("player-left");
    player.style.left = "50%";
    player.classList.remove("sprinting");

    document.getElementById("score").textContent = "Score: 0";
    document.getElementById("gameOver").style.display = "none";
    document.getElementById("victory").style.display = "none";
    document.querySelector(".game-background").style.display = "none";
    document.getElementById("videoContainer").style.display = "none";

    initGame();

    if (backgroundMusic) {
      backgroundMusic.currentTime = 0;
      backgroundMusic.volume = 0.5;
      backgroundMusic.play();
      isMusicPlaying = true;
      document.getElementById("toggleMusic").textContent = "🔊";
    }
  }