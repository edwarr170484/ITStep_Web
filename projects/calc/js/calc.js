class Calculator {
  constructor() {
    this.parameter1 = null;
    this.parameter2 = null;
    this.index = 1;
    this.act = null;
    this.actionCounter = 0;

    this.operations = {
      plus: "+",
      minus: "-",
      mul: "*",
      div: ":",
    };

    this.calculated = false;

    this.resultView = null;
    this.labelView = null;
  }

  initViews() {
    this.resultView = document.getElementById("calc-result");
    this.labelView = document.getElementById("calc-action-label");
  }

  addToView(parameter) {
    this.resultView.innerText =
      this.resultView.innerText === 0 || this.actionCounter == 0
        ? parameter
        : (this.resultView.innerText += parameter);

    this.addToLabel(parameter);

    this.setParameter();
    this.actionCounter++;
  }

  addToLabel(parameter) {
    if (this.calculated) {
      this.labelView.innerHTML = "";
      this.calculated = !this.calculated;
    }

    this.labelView.innerHTML += parameter;
  }

  setParameter() {
    this[`parameter${this.index}`] = parseFloat(this.resultView.innerText);
  }

  reset() {
    this.parameter1 = null;
    this.parameter2 = null;
    this.index = 1;
    this.act = null;
    this.actionCounter = 0;
    this.calculated = false;
    this.resultView.innerText = "0";
    this.labelView.innerText = "";
  }

  plus() {
    return (
      this.parameter1 + (this.parameter2 ? this.parameter2 : this.parameter1)
    );
  }

  minus() {
    return (
      this.parameter1 - (this.parameter2 ? this.parameter2 : this.parameter1)
    );
  }

  mul() {
    return (
      this.parameter1 * (this.parameter2 ? this.parameter2 : this.parameter1)
    );
  }

  div() {
    return (
      this.parameter1 / (this.parameter2 ? this.parameter2 : this.parameter1)
    );
  }

  setOperation(operationName) {
    if (this.parameter1) {
      this.calculated = false;
      this.index = 2;
      this.act = this[operationName];
      this.actionCounter = 0;
      this.addToLabel(this.operations[operationName]);
    }
  }

  calculate() {
    if (this.act) {
      this.calculated = true;
      this.parameter1 = this.act();
      this.resultView.innerText = this.parameter1;
      this.actionCounter = 0;
    }
  }
}

const calc = new Calculator();

document.addEventListener("DOMContentLoaded", () => {
  calc.initViews();
});
