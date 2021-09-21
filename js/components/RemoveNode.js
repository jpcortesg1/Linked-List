export default class RemoveNode {
  constructor() {
    this.btn = document.getElementById("btnRemove");
    this.removeInput = document.getElementById("removeInput");
  }

  onClick(callback) {
    this.btn.onclick = (e) => {
      e.preventDefault();
      const index = this.removeInput.value;
      this.removeInput.value = "";
      callback(index);
    };
  }
}
