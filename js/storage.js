export class ResultsStorage {
  static STORAGE_KEY = "multiplicationResults";

  static saveResult(resultData) {
    const prevResults =
      JSON.parse(localStorage.getItem(this.STORAGE_KEY)) || [];
    prevResults.push(resultData);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(prevResults));
  }

  static getResults(limit = 5) {
    const results = JSON.parse(localStorage.getItem(this.STORAGE_KEY)) || [];
    return results.slice(-limit).reverse();
  }

  static clearResults() {
    localStorage.removeItem(this.STORAGE_KEY);
  }


  static clearResults() {
    localStorage.removeItem(this.STORAGE_KEY);
  }
}
