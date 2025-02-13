let currentStage = 0;
      let wrongAnswers = 0;
      let playerHealth = 100;
      let timerInterval;
      let timeLeft = 12;
      const maxWrongAnswers = 3;
      const questionCount = 10;
      const healthDecrement = 33.33;
      let usedQuestions = [];
      let currentQuestion = null;
      let isMoving = false;

      const backgroundMusic = document.getElementById("backgroundMusic");
      backgroundMusic.volume = 0.1;

      function initializeGame() {
        updateHealth();
        updatePlantStage();
        displayQuestion();
      }

      document.addEventListener("DOMContentLoaded", function () {
        setTimeout(() => {
          const overlay = document.getElementById("introOverlay");
          if (overlay) {
            overlay.classList.add("fade-out");
          }
        }, 2000);

        setTimeout(() => {
          initializeGame();
        }, 3500);
      });

      function toggleMusic() {
        if (backgroundMusic.paused) {
          backgroundMusic.play();
          document.getElementById("playMusicButton").textContent =
            "Pause Music";
        } else {
          backgroundMusic.pause();
          document.getElementById("playMusicButton").textContent = "Play Music";
        }
      }

      function handleTimeOut() {
        clearInterval(timerInterval);
        document.getElementById("wrongSound").play();
        wrongAnswers++;
        playerHealth -= healthDecrement;
        updateHealth();
        shakeButton();

        if (wrongAnswers >= maxWrongAnswers) {
          endGame(false);
          return;
        }

        displayQuestion();
      }

      function updateHealth() {
        const healthBar = document.getElementById("healthFill");
        healthBar.style.width = `${playerHealth}%`;
      }

      function shakeButton() {
        const button = document.getElementById("playMusicButton");
        button.classList.add("shake");
        setTimeout(() => button.classList.remove("shake"), 500);
      }

      function startTimer() {
        clearInterval(timerInterval);
        timeLeft = 12;
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

      function updateTimerDisplay() {
        const timerElement = document.getElementById("timer");
        if (timerElement) {
          timerElement.textContent = timeLeft;
          if (timeLeft <= 5) {
            timerElement.style.color = "#ff5555";
          } else {
            timerElement.style.color = "#fff";
          }
        }
      }

      async function moveCharacter() {
        if (isMoving) return;

        isMoving = true;
        const character = document.getElementById("character");
        character.classList.add("move-right");

        await new Promise((resolve) => setTimeout(resolve, 500));

        character.classList.remove("move-right");

        await new Promise((resolve) => setTimeout(resolve, 300));

        isMoving = false;
      }

      function updatePlantStage() {
        const plant = document.querySelector(".plant");
        const plantStageText = document.getElementById("plantStage");
        const progressBar = document.getElementById("progressBar");

        plant.style.backgroundImage = `url(${plantStages[currentStage].image})`;
        plantStageText.textContent = `Stage ${currentStage + 1}: ${
          plantStages[currentStage].name
        }`;
        progressBar.style.width = `${
          (currentStage / (questionCount - 1)) * 100
        }%`;
        plant.classList.add("plant-evolution");
        setTimeout(() => plant.classList.remove("plant-evolution"), 500);
      }

      function getRandomQuestion() {
        const availableQuestions = questions.filter(
          (q) => !usedQuestions.includes(q)
        );

        if (availableQuestions.length === 0) {
          usedQuestions = [];
          return questions[Math.floor(Math.random() * questions.length)];
        }

        const randomIndex = Math.floor(
          Math.random() * availableQuestions.length
        );
        const selectedQuestion = availableQuestions[randomIndex];

        usedQuestions.push(selectedQuestion);

        return selectedQuestion;
      }

      function displayQuestion() {
        currentQuestion = getRandomQuestion();

        document.getElementById(
          "question"
        ).innerHTML = `<div class="timer" id="timer">12</div>${currentQuestion.question}`;

        const answersContainer = document.getElementById("answers");
        answersContainer.innerHTML = "";

        currentQuestion.answers.forEach((answer, index) => {
          const button = document.createElement("button");
          button.className = "answer";
          button.textContent = answer;
          button.onclick = () => checkAnswer(index);
          answersContainer.appendChild(button);
        });

        startTimer();
      }

      async function checkAnswer(selectedIndex) {
        clearInterval(timerInterval);
        const correct = currentQuestion.correct === selectedIndex;

        if (correct) {
          document.getElementById("correctSound").play();
          await moveCharacter();

          currentStage++;

          if (currentStage === questionCount - 1) {
            updatePlantStage();
            endGame(true);
            return;
          }

          updatePlantStage();
        } else {
          document.getElementById("wrongSound").play();
          wrongAnswers++;
          playerHealth -= healthDecrement;
          updateHealth();
          shakeButton();

          if (wrongAnswers >= maxWrongAnswers) {
            endGame(false);
            return;
          }
        }

        displayQuestion();
      }

      function endGame(isVictory) {
        clearInterval(timerInterval);

        if (isVictory) {
          const victoryOverlay = document.getElementById("victoryOverlay");
          if (!victoryOverlay) {
            console.error("Victory overlay element not found!");
            return;
          }

          victoryOverlay.classList.add("active");

          setTimeout(() => {
            window.location.href = "../html/VictoryScene.html";
          }, 5000);
        } else {
          const gameOver = document.getElementById("gameOver");
          const gameOverText = document.getElementById("gameOverText");
          gameOver.style.display = "flex";
          gameOverText.textContent = "Game Over";
          document.getElementById("restartButton").style.display = "block";
        }
      }

      function restartGame() {
        clearInterval(timerInterval);
        currentStage = 0;
        wrongAnswers = 0;
        playerHealth = 100;
        usedQuestions = [];
        currentQuestion = null;
        timeLeft = 12;

        updateHealth();
        updatePlantStage();

        document.getElementById("gameOver").style.display = "none";
        document.getElementById("victoryOverlay").classList.remove("active");

        displayQuestion();
      }

      const plantStages = [
        { name: "Dormant", image: "../assets/sprite/lumorra1.png" },
        { name: "Sprouting", image: "../assets/sprite/lumorra2.png" },
        { name: "Young Growth", image: "../assets/sprite/lumorra3.png" },
        { name: "Developing", image: "../assets/sprite/lumorra4.png" },
        { name: "Growing", image: "../assets/sprite/lumorra5.png" },
        { name: "Maturing", image: "../assets/sprite/lumorra6.png" },
        { name: "Budding", image: "../assets/sprite/lumorra7.png" },
        { name: "Flowering", image: "../assets/sprite/lumorra8.png" },
        { name: "Blooming", image: "../assets/sprite/lumorra9.png" },
        { name: "Flourishing", image: "../assets/sprite/lumorra10.png" },
      ];

      const questions = [
        {
          question: "Apa yang dibutuhkan tumbuhan untuk tumbuh dengan baik?",
          answers: [
            "A. Udara, air, tanah, dan sinar matahari",
            "B. Hanya air dan tanah",
            "C. Hanya sinar matahari",
            "D. Hanya udara",
          ],
          correct: 0,
        },
        {
          question: "Bagaimana tumbuhan memperoleh makanan?",
          answers: [
            "A. Dengan makan makanan seperti manusia",
            "B. Melalui fotosintesis",
            "C. Dengan minum air",
            "D. Melalui akar",
          ],
          correct: 1,
        },
        {
          question: "Apa yang dimaksud dengan fotosintesis?",
          answers: [
            "A. Proses tumbuhan menghasilkan oksigen",
            "B. Proses tumbuhan membuat makanan dengan bantuan sinar matahari",
            "C. Proses tumbuhan menyerap air dari tanah",
            "D. Proses tumbuhan menghasilkan karbon dioksida",
          ],
          correct: 1,
        },
        {
          question: "Apa yang dilakukan akar pada tumbuhan?",
          answers: [
            "A. Menyerap air dan mineral dari tanah",
            "B. Menyerap cahaya matahari",
            "C. Membuat makanan",
            "D. Menghasilkan oksigen",
          ],
          correct: 0,
        },
        {
          question: "Bagaimana tumbuhan menghasilkan oksigen?",
          answers: [
            "A. Melalui daun",
            "B. Melalui akar",
            "C. Melalui bunga",
            "D. Melalui batang",
          ],
          correct: 0,
        },
        {
          question: "Apa yang disebut dengan bunga pada tumbuhan?",
          answers: [
            "A. Bagian yang menyerap air",
            "B. Bagian yang menghasilkan biji",
            "C. Bagian yang menghasilakan daun",
            "D. Bagian yang mengeluarkan karbon dioksida",
          ],
          correct: 1,
        },
        {
          question:
            "Apa yang terjadi jika tumbuhan tidak mendapatkan cukup air?",
          answers: [
            "A. Tumbuhan akan tumbuh lebih cepat",
            "B. Tumbuhan akan layu",
            "C. Tumbuhan akan menghasilkan lebih banyak bunga",
            "D. Tumbuhan akan tumbuh lebih besar",
          ],
          correct: 1,
        },
        {
          question: "Apa itu biji pada tumbuhan?",
          answers: [
            "A. Bagian yang tumbuh di atas tanah",
            "B. Bagian yang dapat berkembang menjadi tumbuhan baru",
            "C. Bagian yang menyerap sinar matahari",
            "D. Bagian yang mengatur fotosintesis",
          ],
          correct: 1,
        },
        {
          question: "Tumbuhan mana yang tidak memiliki bunga?",
          answers: ["A. Mawar", "B. Kelapa", "C. Pohon cemara", "D. Melati"],
          correct: 2,
        },
        {
          question: "Apa yang dimaksud dengan daun?",
          answers: [
            "A. Bagian yang menyerap sinar matahari dan menghasilkan makanan",
            "B. Bagian yang menyerap air",
            "C. Bagian yang mengikat tanah",
            "D. Bagian yang menghasilkan biji",
          ],
          correct: 0,
        },
        {
          question:
            "Apa yang terjadi pada tumbuhan yang tidak mendapatkan sinar matahari?",
          answers: [
            "A. Tumbuhan akan tumbuh dengan cepat",
            "B. Tumbuhan akan kekurangan makanan",
            "C. Tumbuhan akan menghasilkan bunga lebih banyak",
            "D. Tumbuhan akan bertambah besar",
          ],
          correct: 1,
        },
        {
          question: "Tumbuhan yang tumbuh di air disebut apa?",
          answers: [
            "A. Tumbuhan darat",
            "B. Tumbuhan air",
            "C. Tumbuhan hutan",
            "D. Tumbuhan gurun",
          ],
          correct: 1,
        },
        {
          question: "Apa itu fotosintesis pada tumbuhan?",
          answers: [
            "A. Proses tumbuhan mengubah air menjadi oksigen",
            "B. Proses tumbuhan mengubah cahaya matahari menjadi makanan",
            "C. Proses tumbuhan mengubah udara menjadi air",
            "D. Proses tumbuhan mengubah tanah menjadi makanan",
          ],
          correct: 1,
        },
        {
          question: "Tumbuhan apa yang memiliki akar tunggang?",
          answers: ["A. Pisang", "B. Durian", "C. Mangga", "D. Pohon kelapa"],
          correct: 2,
        },
        {
          question: "Apa yang dimaksud dengan batang pada tumbuhan?",
          answers: [
            "A. Bagian yang menyerap air dari tanah",
            "B. Bagian yang mengangkut air dan makanan ke seluruh tubuh tumbuhan",
            "C. Bagian yang menghasilkan biji",
            "D. Bagian yang menghasilkan bunga",
          ],
          correct: 1,
        },
        {
          question: "Tumbuhan apa yang sering dijadikan tanaman hias di rumah?",
          answers: ["A. Padi", "B. Kaktus", "C. Jagung", "D. Terong"],
          correct: 1,
        },
        {
          question: "Apa yang dimaksud dengan buah?",
          answers: [
            "A. Bagian yang mengandung biji dan tumbuh setelah bunga mekar",
            "B. Bagian yang mengandung air",
            "C. Bagian yang menyerap sinar matahari",
            "D. Bagian yang mengatur fotosintesis",
          ],
          correct: 0,
        },
        {
          question:
            "Bagaimana cara biji tumbuhan berkembang menjadi tumbuhan baru?",
          answers: [
            "A. Dengan mengeluarkan akar dan batang baru",
            "B. Dengan mengeluarkan bunga",
            "C. Dengan mengeluarkan daun",
            "D. Dengan menyerap sinar matahari",
          ],
          correct: 0,
        },
        {
          question: "Tumbuhan apa yang dapat hidup di daerah kering dan panas?",
          answers: ["A. Cendawan", "B. Kaktus", "C. Kelapa", "D. Padi"],
          correct: 1,
        },
        {
          question: "Apa yang terjadi jika tanaman kekurangan cahaya matahari?",
          answers: [
            "A. Tanaman tumbuh lebih besar",
            "B. Tanaman lebih cepat menghasilkan biji",
            "C. Tanaman tumbuh lebih cepat",
            "D. Tanaman menjadi kekurangan makanan dan layu",
          ],
          correct: 3,
        },
        {
          question:
            "Tanaman apa yang bisa dijadikan bahan untuk membuat kertas?",
          answers: [
            "A. Pohon kelapa",
            "B. Pohon jati",
            "C. Pohon bambu",
            "D. Pohon pinus",
          ],
          correct: 1,
        },
        {
          question: "Apa yang dimaksud dengan polinasi?",
          answers: [
            "A. Proses penyebaran biji ke tanah",
            "B. Proses penyebaran serbuk sari dari bunga jantan ke bunga betina",
            "C. Proses tumbuhan menyerap air",
            "D. Proses mengubah makanan menjadi oksigen",
          ],
          correct: 1,
        },
        {
          question: "Apa itu tanaman obat?",
          answers: [
            "A. Tanaman yang digunakan untuk membuat pakaian",
            "B. Tanaman yang digunakan untuk pengobatan",
            "C. Tanaman yang menghasilkan biji",
            "D. Tanaman yang hanya hidup di hutan",
          ],
          correct: 1,
        },
        {
          question: "Apa yang dimaksud dengan hutan tropis?",
          answers: [
            "A. Hutan yang tumbuh di daerah dingin",
            "B. Hutan yang tumbuh di daerah panas dan lembap",
            "C. Hutan yang memiliki sedikit tumbuhan",
            "D. Hutan yang tumbuh di dataran tinggi",
          ],
          correct: 1,
        },
        {
          question: "Apa itu tumbuhan merambat?",
          answers: [
            "A. Tumbuhan yang tumbuh di bawah tanah",
            "B. Tumbuhan yang tumbuh menjalar di tanah atau pada benda lain",
            "C. Tumbuhan yang tidak memerlukan air",
            "D. Tumbuhan yang tumbuh tinggi",
          ],
          correct: 1,
        },
        {
          question:
            "Tanaman mana yang bisa hidup di daerah yang kekurangan air?",
          answers: [
            "A. Pohon kelapa",
            "B. Kaktus",
            "C. Padi",
            "D. Pohon mangga",
          ],
          correct: 1,
        },
        {
          question: "Apa itu daun yang berfungsi untuk menyimpan air?",
          answers: [
            "A. Daun yang tipis",
            "B. Daun yang besar",
            "C. Daun yang berduri",
            "D. Daun yang tebal dan berdaging",
          ],
          correct: 3,
        },
      ];

      window.onload = function () {
        updateHealth();
        updatePlantStage();
        displayQuestion();
      };