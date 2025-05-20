import { Trenier } from "./trainer.js";

class MultiplicationApp {
  constructor() {
    this.choiceNum = [];
    this.treiner = null;
    this.firstNumber = null;
    this.secondNumber = null;

    this.dataChoiceNumContainer = document.querySelector(
      "[data-choice-num-container]"
    );
    this.dataChoiceNumBtn = document.querySelector("[data-choice-num-btn]");
    this.dataMultiplicationQuestion = document.querySelector(
      "[data-multiplication-question]"
    );
    this.dataMultiplicationAnswer = document.querySelector(
      "[data-multiplication-answer]"
    );
    this.dataMultiplicationFinish = document.querySelector(
      "[data-multiplication-finish]"
    );
    this.dataCheckBtn = document.querySelector("[data-check-answer]");
    this.dataNextBtn = document.querySelector("[data-next-question]");
    this.dataResult = document.querySelector("[data-result]");
    this.bindEvents();
  }

  bindEvents() {
    this.dataChoiceNumContainer.addEventListener("click", (e) => {
      const el = e.target;

      if (el.classList.contains("choice-num__item")) {
        const wasPressed = el.getAttribute("aria-pressed") === "true";
        const nowPressed = !wasPressed;

        el.setAttribute("aria-pressed", nowPressed);
        this.getChoiceNumArr(nowPressed, +el.textContent);

        this.dataChoiceNumBtn.disabled = this.choiceNum.length === 0;
      }
    });

    this.dataChoiceNumBtn.addEventListener("click", () => {
      this.createTrenier();
    });

    // this.dataMultiplicationAnswer.addEventListener("keyup", (e) => {
    //   if (e.key === "Enter") {
    //     const answer = +this.dataMultiplicationAnswer.value;
    //     const isCorrectly = this.treiner.checkAnswer(
    //       this.firstNumber,
    //       this.secondNumber,
    //       answer
    //     );
    //     isCorrectly
    //       ? this.dataMultiplicationAnswer.classList.add("correct")
    //       : this.dataMultiplicationAnswer.classList.add("incorrect");
    //     this.createTrenier();
    //   }
    // });

    this.dataCheckBtn.addEventListener("click", () => {
      const answer = +this.dataMultiplicationAnswer.value;
      const isCorrectly = this.treiner.checkAnswer(this.firstNumber, this.secondNumber, answer);
  
      this.dataMultiplicationAnswer.classList.add(
        isCorrectly ? "correct" : "incorrect"
      );
  
      // Блокируем ввод, активируем кнопку "Далее"
      this.dataMultiplicationAnswer.disabled = true;
      this.dataCheckBtn.disabled = true;
      this.dataNextBtn.disabled = false;
    });
  
    this.dataNextBtn.addEventListener("click", () => {
      this.createTrenier();
    });
  
    this.dataMultiplicationAnswer.addEventListener("input", () => {
      this.dataCheckBtn.disabled = this.dataMultiplicationAnswer.value.trim() === "";
    });
  }

  createTrenier() {
    this.dataMultiplicationAnswer.classList.remove("correct", "incorrect");
    this.dataMultiplicationAnswer.value = "";
    this.dataMultiplicationAnswer.disabled = false;
    this.dataCheckBtn.disabled = true;
    this.dataNextBtn.disabled = true;
  
    this.treiner = new Trenier(this.choiceNum);
    [this.firstNumber, this.secondNumber] = this.treiner.generateQuestion();
    this.dataMultiplicationQuestion.textContent = `${this.firstNumber} * ${this.secondNumber}`;
    this.dataMultiplicationAnswer.focus();}

  getChoiceNumArr(isPressed, choiceNum) {
    if (isPressed) {
      this.choiceNum.push(choiceNum);
    } else {
      if (this.choiceNum) {
        this.choiceNum = this.choiceNum.filter((num) => num !== choiceNum);
      }
    }
  }
}

new MultiplicationApp();
