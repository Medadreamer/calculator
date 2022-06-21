const operands = document.querySelectorAll('.operand');
const operators = document.querySelectorAll('.operator');
const displayScreen = document.querySelector('.display_screen');
const operationDisplay = document.querySelector('.operation_display');
const operatorDisplay = document.querySelector('.operator_display');

let result;
let operandA;
let operandB;
let currentOperation;

function add(a, b) {
    return a + b;
}

function multiply(a, b) {
    return a * b;
}

function substract(a, b) {
    return a - b;
}

function devide(a, b) {
    return a / b;
}

operands.forEach(operand => {
    operand.addEventListener('click', () => {
        operationDisplay.textContent += operand.textContent;
    })
})

operators.forEach(operator => {
    operator.addEventListener('click', () => {
        operatorDisplay.textContent= operator.textContent; 
    })
})