import Alert from "./Alert.js";

export default class AddTodo {
  constructor() {
    this.btn = document.getElementById("addBtn");
    this.input = document.getElementById("addInput");
    this.alert = new Alert();
  }

  async onClick(callback) {
    this.btn.onclick = (e) => {
      e.preventDefault();
      const value = this.input.value;
      this.input.value = "";
      callback(value);
    };
  }
}
