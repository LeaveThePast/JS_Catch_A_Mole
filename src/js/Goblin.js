class Goblin {
  constructor() {
    this.elementID = 0;
    this.hitCount = 0;
    this.dodgeCount = 0;
  }

  getRandomInt(min, max, exclude) {
    let random;
    do {
      random = Math.floor(Math.random() * (max - min + 1)) + min;
    } while (random === exclude);
    return random;
  }

  getHit(gameBoardElements, exclude) {
    this.hitCount += 1;
    this.switchPosition(gameBoardElements, exclude);
    return this.hitCount;
  }

  getDodge() {
    this.dodgeCount += 1;
    return this.dodgeCount;
  }

  switchPosition(gameBoardElements, exclude) {
    const random = this.getRandomInt(0, gameBoardElements.length - 1, exclude);
    gameBoardElements[random].classList.add("mole");
  }
}

export default new Goblin();
