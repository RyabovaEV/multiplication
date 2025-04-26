class MultiplicationApp {
  constructor() {
    this.choiceNum = [];
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
  }

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
