let elements = ["+", 7, 8, 9, "-", 4, 5, 6, "*", 1, 2, 3, "/", 0, ".", "=", "C", "ans"];
let p = document.getElementById("p");
elements.forEach((element) => {
  let newElement = document.createElement("button");
  newElement.textContent = element;
  newElement.id = element;
  if (element === "." || element === "=" || typeof element == "number") {
    newElement.className = "key";
  } else {
    newElement.className = "functionKey";
  }
  document.getElementById("keys").appendChild(newElement);
});

function getNumber(id) {
  let element = document.getElementById(id).textContent;
  return parseInt(element);
}

let countDot = 0;
let lastInput = "";
let ans;
let countNumber = 0;
let operationQueue = [];
let MAX_DIGITS = 15;

for (let i = 0; i < 10; i++) {
  document.getElementById(i).onclick = () => {
    if (countNumber < MAX_DIGITS) {
      p.textContent += getNumber(i);
      lastInput = "number";
      countNumber++;
    }
  };
}

document.getElementById("C").onclick = () => {
  p.textContent = "";
  countDot = 0;
  countNumber = 0;
  lastInput = "";
  operationQueue = [];
};

let countAns = 0;
document.getElementById("ans").onclick = () => {
  if (ans !== undefined && countAns === 0) {
    p.textContent += ans;
    lastInput = "number";
    countAns++;
  }
};

function safeEval(expression) {
  try {
    return Function(`'use strict'; return (${expression})`)();
  } catch (error) {
    return "Error";
  }
}

document.getElementById("=").onclick = () => {
  if (p.textContent) {
    operationQueue.push(p.textContent);
    let result = safeEval(operationQueue.join(" "));
    if (result !== "Error") {
      p.textContent = result;
      ans = result;
      lastInput = "number";
      countDot = 0;
      countAns = 0;
      countNumber = result.toString().replace(".", "").length;
      operationQueue = [];
    } else {
      p.textContent = "Error";
    }
  }
};

document.getElementById(".").onclick = () => {
  if (countDot === 0 && lastInput === "number") {
    p.textContent += ".";
    countDot++;
    lastInput = "dot";
  }
};

let operators = ["+", "-", "*", "/"];
operators.forEach((operator) => {
  document.getElementById(operator).onclick = () => {
    if (lastInput === "number") {
      operationQueue.push(p.textContent);
      operationQueue.push(operator);
      p.textContent = "";
      lastInput = "operator";
      countDot = 0;
      countNumber = 0;
    }
  };
});

document.getElementById("delete").onclick = () => {
  if (p.textContent.length > 0) {
    let lastChar = p.textContent.slice(-1);
    p.textContent = p.textContent.slice(0, -1);
    if (!isNaN(lastChar)) {
      countNumber--;
    } else if (lastChar === ".") {
      countDot = 0;
    } else if (["+", "-", "*", "/"].includes(lastChar)) {
      countDot = 0;
      countNumber = 0;
    }
  }
};
