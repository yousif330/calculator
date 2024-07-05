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
  console.log(arr);
  let b = arr.pop();
  let op = arr.pop();
  let a = arr.pop();

  displayed = operate(+a, +b, op);
  displayed = Math.round(displayed * 1000) / 1000;
  arr.push("" + displayed);
  display.textContent = displayed;
}

function isInteger(a) {
  if (a === '+' || a === '-' || a === '*' || a === '/') {
    return false;
  }
  return true;
}

// to store and display the input of the user
const display = document.querySelector(".display");
let displayed;

// array to store the operations before calculating
let arr = [];


// store input numbers from user inside the array
const numbers = document.querySelectorAll(".number");
numbers.forEach(number => {
  number.addEventListener("click", () => {
    if (isInteger(arr[arr.length - 1]) && arr.length !== 0) {
      displayed = arr.pop() + number.textContent;
    }

    else {
      displayed = number.textContent;
    }

    arr.push(displayed);
    display.textContent = displayed;
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
      }
    }

    else {
      if (operator.textContent === '=') {
        alert("invalid format");
      }
      else arr.push(operator.textContent);
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
      display.textContent = displayed;
    }
    else {
      displayed = '-' + displayed;
      arr.pop();
      arr.push(displayed);
      display.textContent = displayed;
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
    display.textContent = displayed;
  }
});

// add a precent operator
const precent = document.querySelector(".precent");
precent.addEventListener("click", () => {
  displayed = +displayed / 100 + "";
  arr.pop();
  arr.push(displayed);
  display.textContent = displayed;
});

// add a clear button
const clear = document.querySelector(".clear");
clear.addEventListener("click", () => {
  while (arr.length !== 0) {
    arr.pop();
  }
  displayed = 0;
  display.textContent = displayed;
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