export class Trenier {

  constructor(numbersForTrain) {
    this.numbersForTrain = numbersForTrain;
  }

  generateQuestion() {
    const randomIndex = Math.floor(Math.random() * this.numbersForTrain.length);
    const firstNumber = this.numbersForTrain[randomIndex];
    const secondNumber = Math.ceil(Math.random() * 10);
    return [firstNumber,  secondNumber];
  }

  checkAnswer(firstNumber, secondNumber, answer) {
    const correctAnswer = firstNumber * secondNumber;
    return correctAnswer === answer;
  }
}