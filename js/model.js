export default class Model {
  constructor() {
    this.view = null;
    this.nodes = JSON.parse(localStorage.getItem("nodes"));
    if (!this.nodes || this.nodes.length < 1) {
      this.nodes = [
        {
          id: 0,
          value: 1,
        },
      ];
      this.currentId = 2;
    } else {
      this.currentId = this.nodes[this.nodes.length - 1].id + 2;
    }
  }

  setView(view) {
    this.view = view;
  }

  getNodes() {
    return this.nodes.map((todo) => ({ ...todo }));
  }

  save() {
    localStorage.setItem("nodes", JSON.stringify(this.nodes));
  }

  addNode(value) {
    const [type, message] = this.checkData(value);
    if (type === "danger") return [type, message];
    const node = this.createNode(value);
    this.currentId += 2;
    this.nodes.push(node);
    this.save();
    return [{ ...node }, message];
  }

  insertNode(data, index) {
    const [type, message] = this.checkData(data);
    if (type === "danger") return [type, message];
    const [type1, message1] = this.checkData(index, "index");
    if (type1 === "danger") return [type1, message1];
    const node = this.createNode(data);
    this.currentId += 2;
    this.nodes.splice(index, 0, node);
    this.save();
    return [{ ...node }, message];
  }

  setNode(data, index) {
    const [type, message] = this.checkData(data);
    if (type === "danger") return [type, message];
    const [type1, message1] = this.checkData(index, "index2");
    if (type1 === "danger") return [type1, message1];
    this.nodes[index].value = data;
    this.save();
    return [this.nodes[index].id, message];
  }

  removeNode(index) {
    const [type, message] = this.checkData(index, "index2");
    if (type === "danger") return [type, message];
    const id = this.nodes[index].id;
    this.nodes.splice(index, 1);
    this.save();
    return [id, message];
  }

  createNode(value) {
    const node = {
      id: this.currentId,
      value,
    };
    return node;
  }

  checkData(datum, type) {
    const sizeList = this.nodes.length;
    if (!datum) return ["danger", `The ${type} is empty`];
    if (isNaN(datum)) return ["danger", `The ${type} is not number`];
    if (parseInt(datum) < 0) return ["danger", `The ${type} is negative`];
    if (type === "index" && parseInt(datum) > sizeList)
      return ["danger", `The ${datum} is out of range`];
    if (type === "index2" && parseInt(datum) >= sizeList)
      return ["danger", `The ${datum} is out of range`];
    return ["success", "continue"];
  }
}
