import Goblin from "./Goblin";

class Game {
  constructor() {
    this.exclude = -1;
    this.init();
    this.restartGoblinSpawnInterval();
  }

  init() {
    const BodyElement = document.body;
    const gameElement = document.querySelector(".game");
    const gameBoard = document.querySelector(".game-board");
    const pointsElement = document.querySelector(".points");
    const missesElement = document.querySelector(".misses");

    const gameBoardElements = Array.from({ length: 16 }, () => {
      const gameBoardElement = document.createElement("div");
      gameBoardElement.classList.add("game-board_element");
      gameBoard.appendChild(gameBoardElement);
      return gameBoardElement;
    });

    let hitCount = 0;
    let goblinSpawnInterval;

    gameBoardElements.forEach((element) => {
      element.addEventListener("click", () => {
        if (element.classList.contains("mole")) {
          hitCount = Goblin.getHit(gameBoardElements, this.exclude);
          element.classList.remove("mole");
          this.restartGoblinSpawnInterval();
          pointsElement.textContent = `Количество попаданий: ${hitCount}`;
        } else {
          const missCount = Goblin.getDodge();
          missesElement.textContent = `Количество промахов: ${missCount}`;
          if (missCount === 5) {
            clearInterval(goblinSpawnInterval);
            gameElement.style.display = "none";
            const gameOver = document.createElement("div");
            gameOver.textContent = `Вы проиграли. Набранное количество очков: ${hitCount}`;
            BodyElement.appendChild(gameOver);
          }
        }
      });

      this.restartGoblinSpawnInterval = () => {
        clearInterval(goblinSpawnInterval);
        goblinSpawnInterval = setInterval(() => {
          gameBoardElements.forEach((element, index) => {
            if (element.classList.contains("mole")) {
              this.exclude = index;
            }
            element.classList.remove("mole");
          });
          Goblin.switchPosition(gameBoardElements, this.exclude);
        }, 1000);
      };
    });
  }
}

export default Game;
