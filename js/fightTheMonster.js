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