import { Trenier } from "./trainer.js";
import { ResultsStorage } from "./storage.js";

class MultiplicationApp {
  constructor() {
    this.choiceNum = [5]; // Авто-выбор числа 5
    // this.choiceNum = [];
    this.trainer = null;
    this.examples = [];

    this.dataChoiceNumContainer = document.querySelector(
      "[data-choice-num-container]"
    );
    this.dataChoiceNumBtn = document.querySelector("[data-choice-num-btn]");
    this.dataMultiplicationBlock = document.querySelector(
      "[data-multiplication-block]"
    );
    this.dataResult = document.querySelector("[data-result]");

    this.dataFinishBtn = document.querySelector("[data-multiplication-finish]");

    this.bindEvents();

    const choice5btn = this.dataChoiceNumContainer.querySelector(
      ".choice-num__item:nth-child(5)"
    );
    if (choice5btn) {
      choice5btn.setAttribute("aria-pressed", "true");
      this.dataChoiceNumBtn.disabled = this.choiceNum.length === 0;
    }

    this.createExamples();

    this.renderResults();
  }

  bindEvents() {
    this.dataChoiceNumContainer.addEventListener("click", (e) => {
      const el = e.target;
      if (el.classList.contains("choice-num__item")) {
        const nowPressed = el.getAttribute("aria-pressed") !== "true";
        el.setAttribute("aria-pressed", nowPressed);
        this.updateChoiceNum(nowPressed, +el.textContent);
        this.dataChoiceNumBtn.disabled = this.choiceNum.length === 0;
      }
    });

    this.dataChoiceNumBtn.addEventListener("click", () => {
      this.createExamples();
    });

    this.dataFinishBtn.addEventListener("click", () => {
      this.finishSession();
    });
  }

  updateChoiceNum(isPressed, num) {
    if (isPressed) {
      this.choiceNum.push(num);
    } else {
      this.choiceNum = this.choiceNum.filter((n) => n !== num);
    }
  }

  createExamples() {
    this.treiner = new Trenier(this.choiceNum);
    this.examples = [];

    this.dataMultiplicationBlock.innerHTML = ""; // очищаем блок с примерами

    for (let i = 0; i < 10; i++) {
      const [first, second] = this.treiner.generateQuestion();

      const exampleEl = document.createElement("div");
      exampleEl.classList.add("multiplication__example");

      exampleEl.innerHTML = `
      <span data-multiplication-question>${first} * ${second} =</span>
      <div class="multiplication__input-wrapper">
        <input class="multiplication__answer" data-multiplication-answer type="text" inputmode="numeric" />
        <div class="multiplication__tooltip" data-multiplication-tooltip>Введите только цифры</div>
      </div>
      <span class="multiplication__wrong" data-multiplication-wrong></span>
    `;

      const inputEl = exampleEl.querySelector("[data-multiplication-answer]");
      const tooltip = exampleEl.querySelector("[data-multiplication-tooltip]");
      const wrongEl = exampleEl.querySelector("[data-multiplication-wrong]");

      const checkAnswer = () => {
        if (inputEl.disabled || inputEl.value === "") return;

        const userAnswer = +inputEl.value;
        const correct = this.treiner.checkAnswer(first, second, userAnswer);

        if (correct) {
          inputEl.classList.add("correct");
        } else {
          inputEl.classList.add("incorrect");
          wrongEl.textContent = `${first * second}`;
        }

        inputEl.disabled = true;
      };

      inputEl.addEventListener("keydown", (e) => {
        const allowed =
          (e.key >= "0" && e.key <= "9") ||
          [
            "Backspace",
            "Delete",
            "ArrowLeft",
            "ArrowRight",
            "Tab",
            "Enter",
          ].includes(e.key);

        if (!allowed) {
          e.preventDefault();
          tooltip?.classList.add("visible");
          clearTimeout(inputEl.tooltipTimeout);
          inputEl.tooltipTimeout = setTimeout(() => {
            tooltip?.classList.remove("visible");
          }, 1500);
        }
      });

      inputEl.addEventListener("input", (e) => {
        e.target.value = e.target.value.replace(/\D/g, "");
      });

      inputEl.addEventListener("keyup", (e) => {
        if (e.key === "Enter") {
          checkAnswer();
        }
      });

      inputEl.addEventListener("blur", () => {
        checkAnswer();
      });

      this.examples.push({ inputEl, wrongEl, first, second });
      this.dataMultiplicationBlock.appendChild(exampleEl);
    }
  }

  saveResultsToLocalStorage() {
    const total = this.examples.length;
    const correct = this.examples.filter(({ inputEl, first, second }) =>
      this.treiner.checkAnswer(first, second, +inputEl.value)
    ).length;

    const resultData = {
      date: new Date().toLocaleString(),
      choiceNum: [...this.choiceNum],
      total,
      correct,
    };

    ResultsStorage.saveResult(resultData);
    this.renderResults();
  }

  renderResults() {
    const resultContainer = document.querySelector("[data-result]");
    const results = ResultsStorage.getResults();

    if (results.length === 0) {
      resultContainer.innerHTML = `
      <p>Результатов пока нет.</p>
      <button class="result__clear-btn" data-clear-results-btn>Очистить историю</button>
    `;
      this.bindClearHistoryButton(); // обработчик кнопки
      return;
    }

    resultContainer.innerHTML =
      results
        .map(
          (res) => `
        <div class="result__item">
          <strong>${res.date}</strong><br/>
          Выбранные числа: ${res.choiceNum.join(", ")}<br/>
          Верно: ${res.correct} из ${res.total}
        </div>
      `
        )
        .join("<hr/>") +
      `<button class="result__clear-btn" data-clear-results-btn>Очистить историю</button>`;

    this.bindClearHistoryButton(); // обработчик кнопки
  }

  bindClearHistoryButton() {
    const clearBtn = document.querySelector("[data-clear-results-btn]");
    if (!clearBtn) return;

    clearBtn.addEventListener("click", () => {
      ResultsStorage.clearResults();
      this.renderResults();
    });
  }

  finishSession() {
    let correctCount = 0;

    this.examples.forEach(({ inputEl, wrongEl, first, second }) => {
      const userAnswer = +inputEl.value;
      const correct = this.treiner.checkAnswer(first, second, userAnswer);

      if (correct) {
        inputEl.classList.add("correct");
      } else {
        inputEl.classList.add("incorrect");
        wrongEl.textContent = `${first * second}`;
      }

      inputEl.disabled = true;
      if (correct) correctCount++;
    });

    const resultData = {
      date: new Date().toLocaleString(),
      choiceNum: [...this.choiceNum],
      total: this.examples.length,
      correct: correctCount,
    };

    ResultsStorage.saveResult(resultData);
    this.renderResults();
  }
}

new MultiplicationApp();
