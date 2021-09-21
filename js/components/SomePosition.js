export default class InsertNode {
  constructor(type) {
    this.type = type;
    if (type === "insert") {
      this.btn = document.getElementById("insertBtn");
      this.data = document.getElementById("dataInput");
      this.index = document.getElementById("indexInput");
    }
    if (type === "set") {
      this.btn = document.getElementById("setBtn");
      this.data = document.getElementById("setData");
      this.index = document.getElementById("setIndex");
    }
  }

  onClick(callback) {
    this.btn.onclick = (e) => {
      e.preventDefault();
      const dataIn = this.data.value;
      const indexIn = this.index.value;
      this.data.value = "";
      this.index.value = "";
      callback(dataIn, indexIn);
    };
  }
}
