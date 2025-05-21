export class Trenier {
  constructor(numbersForTrain) {
    this.numbersForTrain = numbersForTrain;
    this.usedPairs = new Set();
  }

  generateQuestion() {
    if (this.usedPairs.size >= this.numbersForTrain.length * 10) {
      throw new Error("Все возможные варианты использованы.");
    }

    let first, second, pair;
    do {
      const index = Math.floor(Math.random() * this.numbersForTrain.length);
      first = this.numbersForTrain[index];
      second = Math.ceil(Math.random() * 10);
      pair = `${first}-${second}`;
    } while (this.usedPairs.has(pair));

    this.usedPairs.add(pair);
    return [first, second];
  }

  checkAnswer(first, second, answer) {
    return first * second === answer;
  }
}