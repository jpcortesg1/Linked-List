export default class ChangeTheme {
  constructor(type) {
    if (type === "night-day") {
      this.btn = document.getElementById("btnChangeTheme");
      this.body = document.getElementById("body");
      this.title = document.getElementById("title");
      this.menu = document.getElementById("menu");
      this.list = document.getElementById("list");
      this.items = [this.btn, this.body, this.title, this.menu, this.list];
    }
    if (type === "burger") {
      this.btn = document.getElementById("burger");
      this.menu = document.getElementById("menu");
      this.items = [this.btn, this.menu];
    }
  }

  onClick(callback) {
    this.btn.onclick = () => {
      callback(this.items);
    };
  }
}
