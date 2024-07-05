function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  if (b === 0) return 0;
  return a / b;
}

function operate(a, b, operator) {
  switch(operator) {
    case '+':
      return add(a, b);
    case '-':
      return subtract(a, b);
    case '*':
      return multiply(a, b);
    case '/':
      return divide(a, b);
  }
}

function calculate(arr) {
  previousOperation();

  console.log(arr);
  let b = arr.pop();
  let op = arr.pop();
  let a = arr.pop();

  displayed = operate(+a, +b, op);
  displayed = Math.round(displayed * 1000) / 1000;
  displayed = "" + displayed;
  arr.push(displayed);
  display.textContent = displayed;
}

function previousOperation() {
  let prevArray = arr;
  prevArray = prevArray.join(' ');
  prev.textContent = prevArray;
}

function currentOperation() {
  let currentArray = arr;
  currentArray = currentArray.join(' ');
  display.textContent = currentArray;
}

function isInteger(a) {
  if (a === '+' || a === '-' || a === '*' || a === '/') {
    return false;
  }
  return true;
}

const prev = document.querySelector(".prev");

// to store and display the input of the user
const display = document.querySelector(".displayValue");
let displayed;

// array to store the operations before calculating
let arr = [];


// store input numbers from user inside the array
const numbers = document.querySelectorAll(".number");
numbers.forEach(number => {
  number.addEventListener("click", () => {
    if (isInteger(arr[arr.length - 1]) && arr.length !== 0 && displayed !== 0) {
      displayed = arr.pop() + number.textContent;
    }

    else {
      displayed = number.textContent;
    }

    arr.push(displayed);
    currentOperation();
  });
});

/* store input operators from the user in the array and initilize the calculate function 
when there is three elements inside the array*/
const operators = document.querySelectorAll(".operator");
operators.forEach(operator => {
  operator.addEventListener("click", () => {
    if (arr.length === 0 || !isInteger(arr[arr.length - 1])) alert("invalid format");

    else if (arr.length == 3) {
      calculate(arr);

      if (operator.textContent !== '=') {
        arr.push(operator.textContent);
        currentOperation();
      }
    }

    else {
      if (operator.textContent === '=') {
        alert("invalid format");
      }
      else {
        arr.push(operator.textContent);
        currentOperation();
      }
    }
  });
});

// add sign to the operands
const sign = document.querySelector(".sign");
sign.addEventListener("click", () => {
  if (arr.length !== 0 && displayed !== '0') {
    if (+displayed < 0) {
      displayed = displayed.slice(1);
      arr.pop();
      arr.push(displayed);
      currentOperation()
    }
    else {
      displayed = '-' + displayed;
      arr.pop();
      arr.push(displayed);
      currentOperation();
    }
  }
});

// add a decimal point to operands
const point = document.querySelector('.point');
point.addEventListener("click", () => {
  if (!displayed.includes('.')) {
    displayed = displayed + '.';
    arr.pop();
    arr.push(displayed);
    currentOperation();
  }
});

// add a precent operator
const precent = document.querySelector(".precent");
precent.addEventListener("click", () => {
  displayed = +displayed / 100 + "";
  arr.pop();
  arr.push(displayed);
  currentOperation();
});

// add a clear button
const clear = document.querySelector(".clear");
clear.addEventListener("click", () => {
  while (arr.length !== 0) {
    arr.pop();
  }
  displayed = 0;
  prev.textContent = "";
  currentOperation();
});

// add a hover effect
const buttons = document.querySelectorAll(".button");
buttons.forEach(button => {
  button.addEventListener("mouseenter", () => {
    if (!button.id) {
      button.classList.add("hover");
    }
    else {
      button.classList.add("hoverOnEqual");
    }
  });

  button.addEventListener("mouseleave", () => {
    if (!button.id) {
      button.classList.remove("hover");
    }
    else {
      button.classList.remove("hoverOnEqual");
    }
  })
});

// add a delete button
const deleteButton = document.querySelector(".delete");
deleteButton.addEventListener("click", () => {
  if (isInteger(arr[arr.length - 1])) {
    if (displayed.length === 1) {
      arr.pop();
      displayed = 0;
      currentOperation();
    }
    else {
      displayed = displayed.slice(0, displayed.length - 1);
      arr.pop();
      arr.push(displayed);
      currentOperation();
    }
  }

  else {
    arr.pop();
  }
})