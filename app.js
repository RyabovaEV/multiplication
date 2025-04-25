class MultiplicationApp {
  constructor () {
    this.choiceNum = [];
    this.dataChoiceNumContainer = document.querySelector("[data-choice-num-container]");
    this.dataChoiceNumBtn = document.querySelector("[data-choice-num-btn]");
    this.dataMultiplicationQuestion = document.querySelector("[data-multiplication-question]");
    this.dataMultiplicationAnswer = document.querySelector("[data-multiplication-answer]");
    this.dataMultiplicationFinish = document.querySelector("[data-multiplication-finish]");
    this.dataResult = document.querySelector("[data-result]");
    this.bindEvents();
  }

  bindEvents() {
    this.dataChoiceNumContainer.addEventListener("click", (e) => {
      const el = e.target;

      //if el.hasAttribute()
    })
  }
}

new MultiplicationApp();