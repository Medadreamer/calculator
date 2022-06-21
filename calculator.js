const operands = document.querySelectorAll('.operand');
const operators = document.querySelectorAll('.operator');
const displayScreen = document.querySelector('.display_screen');
const operationDisplay = document.querySelector('.operation_display');
const operatorDisplay = document.querySelector('.operator_display');

let result;
let operandA;
let operandB;
let currentOperator;

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

function storeOperand() {
    let currentOperand = operationDisplay.textContent
    
    if(currentOperator) {
        operandA = currentOperand.slice(0, -1);
    }
    else {
        operandB = currentOperand.slice(0, -1);
    }


}



operands.forEach(operand => {
    operand.addEventListener('click', () => {
        if(operationDisplay.textContent[0] === '0'){
            operationDisplay.textContent = '';
        }
        operationDisplay.textContent += operand.textContent;
    })
})

operators.forEach(operator => {
    operator.addEventListener('click', () => {
        operatorDisplay.textContent = operator.textContent; 
        storeOperand();
        displayOperator(operator.id);
        currentOperator = operator.textContent;
        
    })
})