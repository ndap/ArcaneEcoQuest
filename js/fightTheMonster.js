// Function to shuffle an array
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

const questions = [
    {
        question: "Apa yang dibutuhkan tanaman untuk tumbuh?",
        answers: [
            "Air dan cahaya matahari",
            "Hanya air",
            "Hanya tanah",
            "Hanya udara",
        ],
        correct: 0,
    },
    {
        question: "Tanaman berfotosintesis untuk menghasilkan:",
        answers: [
            "Oksigen dan air",
            "Oksigen dan makanan",
            "Karbon dioksida dan tanah",
            "Tanah dan air",
        ],
        correct: 1,
    },

    {
        question: "Tumbuhan yang hidup di air disebut:",
        answers: [
          "Tanaman darat",
          "Tanaman hidrofit",
          "Tanaman xerofit",
          "Tanaman epifit",
        ],
        correct: 1,
      },
      {
        question: "Apa yang dimaksud dengan ekosistem?",
        answers: [
          "Hanya tanaman yang hidup di dalam tanah",
          "Tempat tinggal bagi hewan dan tumbuhan",
          "Interaksi antara makhluk hidup dan lingkungan",
          "Semua tumbuhan di dunia",
        ],
        correct: 2,
      },
      {
        question: "Bagian tanaman yang menyerap air adalah:",
        answers: ["Bunga", "Daun", "Akar", "Batang"],
        correct: 2,
      },
      {
        question: "Hewan yang memakan tanaman disebut:",
        answers: ["Karnivora", "Herbivora", "Omnivora", "Dekomposer"],
        correct: 1,
      },
      {
        question:
          "Proses yang terjadi pada daun tanaman untuk menghasilkan makanan adalah:",
        answers: ["Evaporasi", "Fotosintesis", "Transpirasi", "Respirasi"],
        correct: 1,
      },
      {
        question: "Contoh tumbuhan yang hidup di tempat kering dan panas adalah:",
        answers: ["Kaktus", "Teratai", "Padi", "Anggrek"],
        correct: 0,
      },
      {
        question: "Tanaman yang hidup di hutan tropis biasanya memiliki:",
        answers: [
          "Daun yang tebal dan lebar",
          "Daun yang kecil",
          "Batang yang keras",
          "Akar yang panjang",
        ],
        correct: 0,
      },
      {
        question: "Hewan yang memakan hewan lain disebut:",
        answers: ["Herbivora", "Karnivora", "Omnivora", "Dekomposer"],
        correct: 1,
      },
      {
        question: "Bakteri dan jamur membantu dalam ekosistem dengan cara:",
        answers: [
          "Membantu tanaman tumbuh",
          "Menguraikan bahan mati menjadi unsur hara",
          "Membuat makanan untuk hewan",
          "Menyebarkan benih",
        ],
        correct: 1,
      },
      {
        question:
          "Bagian tanaman yang biasanya berwarna hijau dan berfungsi untuk fotosintesis adalah:",
        answers: ["Bunga", "Akar", "Batang", "Daun"],
        correct: 3,
      },
      {
        question: "Hewan yang makan tanaman dan juga daging disebut:",
        answers: ["Karnivora", "Omnivora", "Herbivora", "Dekomposer"],
        correct: 1,
      },
      {
        question: "Proses penguapan air dari tanaman disebut:",
        answers: ["Evaporasi", "Fotosintesis", "Transpirasi", "Kondensasi"],
        correct: 2,
      },
      {
        question: "Tanaman yang hidup di tempat basah seperti rawa disebut:",
        answers: [
          "Tumbuhan terestrial",
          "Tumbuhan akuatik",
          "Tumbuhan xerofit",
          "Tumbuhan epifit",
        ],
        correct: 1,
      },
      {
        question: "Tanaman yang memerlukan banyak air disebut:",
        answers: [
          "Tanaman xerofit",
          "Tanaman mesofit",
          "Tanaman hidrofit",
          "Tanaman epifit",
        ],
        correct: 2,
      },
      {
        question: "Hewan yang hidup dengan memakan tumbuhan disebut:",
        answers: ["Karnivora", "Herbivora", "Omnivora", "Dekomposer"],
        correct: 1,
      },
      {
        question: "Siklus air dalam alam dimulai dengan:",
        answers: [
          "Fotosintesis",
          "Penguapan",
          "Penyerapan oleh tanaman",
          "Pembentukan awan",
        ],
        correct: 1,
      },
      {
        question:
          "Tanaman yang hidup dengan mengambil makanan dari tanaman lain disebut:",
        answers: [
          "Tanaman autotrof",
          "Tanaman karnivora",
          "Tanaman parasit",
          "Tanaman epifit",
        ],
        correct: 2,
      },
      {
        question: "Hewan yang menguraikan bahan organik yang mati disebut:",
        answers: ["Dekomposer", "Karnivora", "Herbivora", "Omnivora"],
        correct: 0,
      },
      {
        question: "Proses alami yang menghasilkan hujan adalah:",
        answers: [
          "Fotosintesis",
          "Penguapan dan kondensasi",
          "Transpirasi",
          "Pernafasan",
        ],
        correct: 1,
      },
      {
        question: "Tumbuhan yang hidup di atas pohon lain disebut:",
        answers: [
          "Tanaman parasit",
          "Tanaman epifit",
          "Tanaman terestrial",
          "Tanaman hidrofit",
        ],
        correct: 1,
      },
      {
        question: "Apakah yang dimaksud dengan rantai makanan?",
        answers: [
          "Urutan makanan yang dimakan oleh makhluk hidup",
          "Proses fotosintesis pada tumbuhan",
          "Proses tumbuhnya tanaman",
          "Semua makhluk hidup yang ada di hutan",
        ],
        correct: 0,
      },
      {
        question: "Hewan yang menjadi mangsa disebut:",
        answers: ["Predator", "Konsumen", "Mangsa", "Herbivora"],
        correct: 2,
      },
      {
        question: "Apa yang dimaksud dengan konsumen dalam ekosistem?",
        answers: [
          "Organisme yang memproduksi makanan",
          "Organisme yang memakan produsen atau organisme lain",
          "Organisme yang menguraikan bahan organik",
          "Organisme yang hidup di dalam tanah",
        ],
        correct: 1,
      },
      {
        question: "Tumbuhan yang dapat hidup dengan sedikit air disebut:",
        answers: [
          "Tanaman mesofit",
          "Tanaman xerofit",
          "Tanaman hidrofit",
          "Tanaman epifit",
        ],
        correct: 1,
      },
      {
        question: "Bagian tanaman yang menghubungkan akar dengan daun adalah:",
        answers: ["Bunga", "Batang", "Daun", "Akar"],
        correct: 1,
      },
      {
        question: "Sumber energi utama bagi tanaman adalah:",
        answers: ["Tanah", "Air", "Cahaya matahari", "Udara"],
        correct: 2,
      },
      {
        question: "Pohon yang biasanya ditemukan di daerah tropis adalah:",
        answers: ["Pohon pinus", "Pohon kelapa", "Pohon maple", "Pohon ek"],
        correct: 1,
      },
      {
        question: "Tanaman yang dapat hidup dengan sedikit air disebut:",
        answers: [
          "Tanaman mesofit",
          "Tanaman xerofit",
          "Tanaman hidrofit",
          "Tanaman epifit",
        ],
        correct: 1,
      },
  
    // ... (other questions)
];

// Shuffle the questions array
const shuffledQuestions = shuffle(questions);

const attackSound = new Audio(
    "https://cdn.freesound.org/previews/367/367612_6687669-lq.mp3"
);
const hitSound = new Audio(
    "https://cdn.freesound.org/previews/563/563247_12517458-lq.mp3"
);

let currentQuestion = 0;
let playerHP = 100;
let monsterHP = 100;
let wrongAnswers = 0;
let timerInterval;
let timeLeft = 12;
const maxWrongAnswers = 3;
const monsterHitPoints = 7;

function startTimer() {
    clearInterval(timerInterval);
    timeLeft = 10;
    updateTimerDisplay();

    timerInterval = setInterval(() => {
        timeLeft--;
        updateTimerDisplay();

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            handleTimeOut();
        }
    }, 1000);
}

// Update the timer display
function updateTimerDisplay() {
    document.getElementById("timer").textContent = timeLeft;
}

// Play sound when an answer is selected
function playButtonClickSound() {
    const sound = document.getElementById("buttonClickSound");
    sound.play().catch((e) => console.log("Audio play failed:", e));
}

// Handle the answer button click
function handleAnswerButtonClick(selectedIndex) {
    playButtonClickSound();
    checkAnswer(selectedIndex);
}

// Display question and answers
function displayQuestion() {
    const question = shuffledQuestions[currentQuestion];
    document.getElementById("question").innerHTML = 
        `<div class="timer" id="timer">12</div>${question.question}`;

    const answersContainer = document.getElementById("answers");
    answersContainer.innerHTML = "";

    question.answers.forEach((answer, index) => {
        const button = document.createElement("button");
        button.className = "answer";
        button.textContent = answer;
        button.setAttribute("data-index", index);

        // Adding event listener directly when the button is created
        button.addEventListener("click", function () {
            const selectedIndex = parseInt(this.getAttribute("data-index"));
            handleAnswerButtonClick(selectedIndex);
        });

        answersContainer.appendChild(button);
    });

    startTimer();
}

// Update the health bars
function updateHealth() {
    const monsterHealthPercentage = (monsterHP / 100) * 100;
    document.getElementById("playerHealth").style.width = `${playerHP}%`;
    document.getElementById("monsterHealth").style.width = `${monsterHealthPercentage}%`;
    document.getElementById("monsterHealthSmall").style.width = `${monsterHealthPercentage}%`;
}

// Handle time out when the timer runs out
async function handleTimeOut() {
    clearInterval(timerInterval);
    await checkAnswer(-1); // Pass invalid index to trigger wrong answer
}

// Play attack sound
function playAttackSound() {
    attackSound.currentTime = 0;
    attackSound.play().catch((e) => console.log("Audio play failed:", e));
}

// Play hit sound
function playHitSound() {
    hitSound.currentTime = 0;
    hitSound.play().catch((e) => console.log("Audio play failed:", e));
}

// Character attack animation
async function characterAttack() {
    const character = document.querySelector(".character");
    const monster = document.querySelector(".monster");

    playAttackSound();
    character.classList.add("character-attack");

    await new Promise((resolve) => setTimeout(resolve, 300));

    playHitSound();
    monster.classList.add("blink-effect");

    await new Promise((resolve) => setTimeout(resolve, 300));

    character.classList.remove("character-attack");

    await new Promise((resolve) => setTimeout(resolve, 300));

    monster.classList.remove("blink-effect");
}

// Monster attack animation
async function monsterAttack() {
    const character = document.querySelector(".character");
    const monster = document.querySelector(".monster");

    playAttackSound();
    monster.classList.add("monster-attack");

    await new Promise((resolve) => setTimeout(resolve, 300));

    playHitSound();
    character.classList.add("blink-effect");

    await new Promise((resolve) => setTimeout(resolve, 300));

    monster.classList.remove("monster-attack");

    await new Promise((resolve) => setTimeout(resolve, 300));

    character.classList.remove("blink-effect");
}

// Check if the selected answer is correct
async function checkAnswer(selectedIndex) {
    clearInterval(timerInterval);
    const correct = shuffledQuestions[currentQuestion].correct === selectedIndex;

    if (correct) {
        await characterAttack();
        monsterHP -= 100 / monsterHitPoints;
    } else {
        await monsterAttack();
        wrongAnswers++;
        playerHP = 100 - wrongAnswers * (100 / maxWrongAnswers);
    }

    updateHealth();

    if (wrongAnswers >= maxWrongAnswers || monsterHP <= 0) {
        const gameOver = document.getElementById("gameOver");
        const gameOverText = document.getElementById("gameOverText");
        gameOver.style.display = "flex";

        // Hide both buttons initially
        document.getElementById("restartButton").style.display = "none";
        document.getElementById("winButton").style.display = "none";

        if (wrongAnswers >= maxWrongAnswers) {
            gameOverText.textContent = "Game Over";
            document.getElementById("restartButton").style.display = "block"; // Show Restart button
        } else {
            // Victory sequence
            const monster = document.querySelector(".monster");
            const victoryOverlay = document.getElementById("victoryOverlay");
            const victoryMessage = document.getElementById("victoryMessage");
            const AudioBackSound = document.getElementById("fightBackgroundSound");
            const SwordBS = document.getElementById("swordbacksound");

            // Play background sound
            AudioBackSound.pause();
            SwordBS.play();

            // Fade out victory message
            victoryMessage.classList.add("fade-out");

            // Wait for message fade out
            await new Promise((resolve) => setTimeout(resolve, 1000));

            // Fade out monster
            monster.classList.add("defeat");

            // Wait for monster fade out
            await new Promise((resolve) => setTimeout(resolve, 1000));

            // Fade in white overlay
            victoryOverlay.classList.add("active");

            // Wait for white overlay
            await new Promise((resolve) => setTimeout(resolve, 1000));

            // Show victory message
            victoryMessage.classList.add("active");

            // Wait for message display (10 seconds)
            await new Promise((resolve) => setTimeout(resolve, 1000));

            // Show loading screen before moving on
            const loadingScreen = document.getElementById("loadingScreen");
            loadingScreen.style.display = "flex";

            // Wait for loading screen to appear
            await new Promise((resolve) => setTimeout(resolve, 2000));

            // Redirect to next page
            window.location.href = "../html/VictoryScene.html";
        }
        return;
    }

    currentQuestion = (currentQuestion + 1) % shuffledQuestions.length;
    displayQuestion();
}

// Restart the game
function restartGame() {
    window.location.reload();
}

// Start the game
displayQuestion();