import Alert from "./components/Alert.js";
import AddNode from "./components/AddNode.js";
import SomePosition from "./components/SomePosition.js";
import RemoveNode from "./components/RemoveNode.js";
import ChangeTheme from "./components/ChangeTheme.js";

export default class View {
  constructor() {
    this.model = null;
    this.list = document.getElementById("list");

    this.alert = new Alert();
    this.addNodeForm = new AddNode();
    this.insertNodeForm = new SomePosition("insert");
    this.setNodeForm = new SomePosition("set");
    this.removeNodeForm = new RemoveNode();
    this.nigthDayButton = new ChangeTheme("night-day");
    this.burgerButton = new ChangeTheme("burger");

    this.timeOfAdd = 300;
    this.timeOfTraverse = 300;
    this.timeOfSet = 300;
    this.timeOfRemove = 300;

    this.addNodeForm.onClick((value) => this.addNode(value));
    this.insertNodeForm.onClick((data, index) => this.insertNode(data, index));
    this.setNodeForm.onClick((data, index) => this.setNode(data, index));
    this.removeNodeForm.onClick((index) => this.removeNode(index));
    this.nigthDayButton.onClick((items) => this.nigthDayChange(items));
    this.burgerButton.onClick((items) => this.burgerChange(items));
  }

  setModel(model) {
    this.model = model;
  }

  render() {
    const nodes = this.model.getNodes();
    nodes.forEach((element) => {
      const [circle, arrow] = this.createNode({ ...element });
      this.insertTheNode(circle, arrow, null);
    });
  }

  async addNode(value) {
    const [node, message] = this.model.addNode(value);
    if (node === "danger") {
      this.alert.show(message, node);
      return;
    }
    this.toggleDisabledOfButton(true);
    const [circle, arrow] = this.createNode({ ...node });
    const size = this.model.getNodes().length;
    if (size !== 0) {
      await this.traverseNodes();
    }
    await this.insertTheNode(circle, arrow, null);
    this.alert.show("Node added successfully", "success");
    this.toggleDisabledOfButton(false);
  }

  async insertNode(data, index) {
    const [node, message] = this.model.insertNode(data, index);
    if (node === "danger") {
      this.alert.show(message, node);
      return;
    }
    this.toggleDisabledOfButton(true);
    const [circle, arrow] = this.createNode({ ...node });
    if (parseInt(index) === 0) {
      this.list.prepend(arrow);
      this.list.prepend(circle);
      await this.toggleClassWithTime(arrow, "pre", this.addNode / 2);
      await this.toggleClassWithTime(circle, "pre", this.addNode / 2);
      this.alert.show(`Node added in ${index} successfully`, "success");
      this.toggleDisabledOfButton(false);
      return;
    }
    await this.traverseNodes(index - 1);
    this.insertTheNode(circle, arrow, this.list.children[index * 2]);
    this.alert.show(`Node added in ${index} successfully`, "success");
    this.toggleDisabledOfButton(false);
  }

  async setNode(data, index) {
    const [id, message] = this.model.setNode(data, index);
    if (id === "danger") {
      this.alert.show(message, id);
      return;
    }
    const node = document.getElementById(id);
    this.toggleDisabledOfButton(true);
    if (parseInt(index) !== 0) {
      await this.traverseNodes(index - 1);
    }
    await this.toggleClassWithTime(node, "set", this.timeOfSet / 2);
    setTimeout(() => {
      node.innerText = data;
    }, this.thimeOfSet / 1.5);
    await this.toggleClassWithTime(node, "set", this.timeOfSet);
    this.toggleDisabledOfButton(false);
  }

  async removeNode(index) {
    const [id, message] = this.model.removeNode(index);
    if (id === "danger") {
      this.alert.show(message, id);
      return;
    }
    const node = document.getElementById(id);
    const arrow = node.nextElementSibling;
    this.toggleDisabledOfButton(true);
    if (parseInt(index) !== 0) {
      await this.traverseNodes(index - 1);
    }
    await this.toggleClassWithTime(node, "remove", this.timeOfRemove / 2);
    await this.toggleClassWithTime(arrow, "remove", this.timeOfRemove);
    node.remove();
    arrow.remove();
    this.toggleDisabledOfButton(false);
  }

  nigthDayChange(items) {
    if (items[0].classList.contains("fa-cloud-moon")) {
      items[0].classList.remove("fa-cloud-moon");
      items[0].classList.add("fa-cloud-sun");
    } else {
      items[0].classList.remove("fa-cloud-sun");
      items[0].classList.add("fa-cloud-moon");
    }
    items.forEach((item) => item.classList.toggle("night"));
  }

  burgerChange(items) {
    if (items[0].classList.contains("fa-bars")) {
      items[0].classList.remove("fa-bars");
      items[0].classList.add("fa-times");
    } else {
      items[0].classList.remove("fa-times");
      items[0].classList.add("fa-bars");
    }
    items[1].classList.toggle("deploy");
  }

  createNode(node) {
    const circle = document.createElement("div");
    const arrow = document.createElement("div");
    circle.classList.add("node", "pre");
    arrow.classList.add("arrow", "pre");
    circle.innerText = node.value;
    circle.setAttribute("id", node.id);
    arrow.setAttribute("id", ++node.id);
    return [circle, arrow];
  }

  async insertTheNode(node, arrow, where) {
    this.list.insertBefore(node, where);
    this.list.insertBefore(arrow, where);
    await this.toggleClassWithTime(node, "pre", this.timeOfAdd / 2);
    await this.toggleClassWithTime(arrow, "pre", this.timeOfAdd);
  }

  async traverseNodes(index) {
    const objetsOfList = this.list.children;
    let i = 0;
    for (const elemt of objetsOfList) {
      await this.toggleClassWithTime(elemt, "select", this.timeOfTraverse / 2);
      await this.toggleClassWithTime(elemt, "select", this.timeOfTraverse);
      if (i === index * 2 + 1) break;
      i++;
    }
  }

  toggleClassWithTime(item, clas, time) {
    return new Promise((resolve) => {
      setTimeout(() => {
        item.classList.toggle(clas);
        resolve();
      }, time);
    });
  }

  toggleDisabledOfButton(toggle) {
    if (toggle) {
      this.addNodeForm.btn.disabled = true;
      this.insertNodeForm.btn.disabled = true;
      this.setNodeForm.btn.disabled = true;
      return;
    }
    this.addNodeForm.btn.disabled = false;
    this.insertNodeForm.btn.disabled = false;
    this.setNodeForm.btn.disabled = false;
  }
}
