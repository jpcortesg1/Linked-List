export default class Alert {
  constructor() {
    this.alert = document.getElementById("alert");
    this.type = null;
  }

  show(message, type) {
    this.alert.classList.add("down");
    this.alert.classList.add(type);
    this.type = type;
    this.alert.innerText = message;
    setTimeout(() => {
      this.hide();
    }, 1500);
  }

  hide() {
    this.alert.classList.remove("down");
    this.alert.classList.remove(this.type);
    this.alert.innerText = "";
  }
}
