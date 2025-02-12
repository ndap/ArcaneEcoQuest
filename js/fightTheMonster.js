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
    question: "Apa yang dibutuhkan oleh tumbuhan untuk tumbuh dengan baik?",
    answers: [
      "Air dan udara",
      "Cahaya matahari dan tanah",
      "Air, udara, cahaya matahari, dan tanah",
      "Hanya air dan tanah",
    ],
    correct: 2,
  },
  {
    question: "Apa yang dimaksud dengan fotosintesis?",
    answers: [
      "Proses tumbuhan menghasilkan oksigen",
      "Proses tumbuhan menghasilkan makanan dengan bantuan cahaya matahari",
      "Proses tumbuhan menyerap air",
      "Proses tumbuhan mengeluarkan karbon dioksida",
    ],
    correct: 1,
  },
  {
    question: "Bagian tumbuhan yang berfungsi menyerap air adalah…",
    answers: ["Akar", "Batang", "Daun", "Bunga"],
    correct: 0,
  },
  {
    question: "Bagian tumbuhan yang menyimpan makanan adalah…",
    answers: ["Akar", "Batang", "Daun", "Bunga"],
    correct: 1,
  },
  {
    question: "Apa yang dihasilkan oleh tumbuhan saat fotosintesis?",
    answers: [
      "Karbon dioksida dan air",
      "Oksigen dan glukosa",
      "Oksigen dan nitrogen",
      "Karbohidrat dan air",
    ],
    correct: 1,
  },
  {
    question: "Daun tumbuhan berfungsi untuk…",
    answers: [
      "Menyerap air dari tanah",
      "Tempat tumbuh bunga",
      "Tempat terjadinya fotosintesis",
      "Menyimpan makanan",
    ],
    correct: 2,
  },
  {
    question: "Bunga tumbuhan berfungsi untuk…",
    answers: [
      "Menyimpan makanan",
      "Menghasilkan biji",
      "Menyerap air",
      "Menyebarkan oksigen",
    ],
    correct: 1,
  },
  {
    question: "Apa yang terjadi pada tumbuhan jika kekurangan air?",
    answers: [
      "Tumbuhan akan tumbuh lebih cepat",
      "Tumbuhan akan layu dan mati",
      "Tumbuhan akan menghasilkan lebih banyak bunga",
      "Tumbuhan akan berbuah lebih banyak",
    ],
    correct: 1,
  },
  {
    question:
      "Bagian tumbuhan yang berfungsi untuk memindahkan air dan mineral dari akar ke daun adalah…",
    answers: ["Xilem", "Floem", "Akar", "Batang"],
    correct: 0,
  },
  {
    question: "Pohon yang daunnya gugur pada musim tertentu disebut…",
    answers: [
      "Tumbuhan merambat",
      "Tumbuhan tahunan",
      "Tumbuhan gugur",
      "Tumbuhan hijau",
    ],
    correct: 2,
  },
  {
    question:
      "Bagian dari bunga yang berfungsi untuk menghasilkan serbuk sari adalah…",
    answers: ["Putik", "Benang sari", "Kelopak bunga", "Daun bunga"],
    correct: 1,
  },
  {
    question:
      "Apa yang dimaksud dengan proses tumbuhan mengeluarkan air melalui daun?",
    answers: ["Evaporasi", "Perkembangbiakan", "Transpirasi", "Fotosintesis"],
    correct: 2,
  },
  {
    question: "Tumbuhan yang hidup di air disebut…",
    answers: [
      "Tumbuhan darat",
      "Tumbuhan air",
      "Tumbuhan merambat",
      "Tumbuhan hutan",
    ],
    correct: 1,
  },
  {
    question:
      "Apa yang dimaksud dengan perkembangbiakan tumbuhan secara vegetatif?",
    answers: [
      "Perkembangbiakan dengan biji",
      "Perkembangbiakan dengan spora",
      "Perkembangbiakan dengan bagian tubuh tumbuhan",
      "Perkembangbiakan dengan serbuk sari",
    ],
    correct: 2,
  },
  {
    question: "Apa yang terjadi setelah biji tumbuhan berkecambah?",
    answers: [
      "Biji akan berubah menjadi bunga",
      "Akar dan batang tumbuh dari biji",
      "Biji akan mengering",
      "Daun tumbuh dari biji",
    ],
    correct: 1,
  },
  {
    question: "Tumbuhan yang hanya hidup di musim hujan disebut…",
    answers: [
      "Tumbuhan tahunan",
      "Tumbuhan musiman",
      "Tumbuhan hijau",
      "Tumbuhan berbiji",
    ],
    correct: 1,
  },
  {
    question: "Manakah dari tumbuhan berikut yang bisa tumbuh di tanah tandus?",
    answers: ["Kaktus", "Mangga", "Pohon kelapa", "Padi"],
    correct: 0,
  },
  {
    question: "Apa yang dimaksud dengan akar tunjang?",
    answers: [
      "Akar yang tumbuh di bawah tanah",
      "Akar yang tumbuh dari batang",
      "Akar yang bercabang-cabang",
      "Akar yang tumbuh di atas tanah",
    ],
    correct: 1,
  },
  {
    question:
      "Tumbuhan yang hidup di daerah yang sangat kering dan panas adalah…",
    answers: [
      "Tumbuhan tropis",
      "Tumbuhan padang rumput",
      "Tumbuhan gurun",
      "Tumbuhan rawa",
    ],
    correct: 2,
  },
  {
    question: "Bagaimana cara tumbuhan merambat tumbuh?",
    answers: [
      "Dengan akarnya",
      "Dengan batang yang lentur",
      "Dengan daunnya",
      "Dengan bijinya",
    ],
    correct: 1,
  },
  {
    question: "Tumbuhan yang daunnya berbentuk jarum atau lancip disebut…",
    answers: [
      "Tumbuhan berdaun lebar",
      "Tumbuhan berdaun kecil",
      "Tumbuhan berdaun jarum",
      "Tumbuhan berdaun besar",
    ],
    correct: 2,
  },
  {
    question: "Apa yang disebut dengan tanaman legum?",
    answers: [
      "Tanaman yang menghasilkan buah berbiji keras",
      "Tanaman yang memiliki daun besar",
      "Tanaman yang menghasilkan polong dan biji",
      "Tanaman yang hidup di air",
    ],
    correct: 2,
  },
  {
    question: "Manakah yang termasuk tumbuhan perkebunan?",
    answers: ["Pohon cemara", "Kaktus", "Pohon kelapa", "Rumput liar"],
    correct: 2,
  },
  {
    question:
      "Tumbuhan yang memiliki bunga berwarna cerah dan harum biasanya adalah…",
    answers: [
      "Tumbuhan yang tidak menghasilkan bunga",
      "Tumbuhan berbunga satu warna",
      "Tumbuhan yang diserbuki oleh angin atau air",
      "Tumbuhan yang diserbuki oleh serangga atau burung",
    ],
    correct: 3,
  },
  {
    question: "Proses dimana tumbuhan mengeluarkan oksigen ke udara adalah…",
    answers: ["Fotosintesis", "Evaporasi", "Transpirasi", "Respirasi"],
    correct: 0,
  },
  {
    question: "Tanaman yang memiliki buah berduri adalah…",
    answers: ["Durian", "Apel", "Mangga", "Pisang"],
    correct: 0,
  },
  {
    question: "Manakah dari tumbuhan berikut yang bisa hidup di tempat dingin?",
    answers: ["Kaktus", "Pinus", "Kelapa", "Padi"],
    correct: 1,
  },
  {
    question: "Apa yang dimaksud dengan spora pada tumbuhan?",
    answers: [
      "Benih kecil untuk perkembangbiakan",
      "Biji yang tumbuh dari bunga",
      "Bagian yang menghasilkan makanan",
      "Akar yang tumbuh dari batang",
    ],
    correct: 0,
  },
  {
    question: "Tumbuhan yang menghasilkan biji terbuka disebut…",
    answers: ["Gymnospermae", "Angiospermae", "Spora", "Lumut"],
    correct: 0,
  },
  {
    question: "Bagaimana cara tumbuhan beradaptasi dengan kekurangan air?",
    answers: [
      "Daun mengering dan menggugur",
      "Batang menjadi panjang",
      "Akar menyerap lebih banyak air",
      "Tumbuhan mengeluarkan oksigen lebih banyak",
    ],
    correct: 0,
  },
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
const monsterHitPoints = 1;

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