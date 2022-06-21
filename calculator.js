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
    let currentOperand = operationDisplay.textContent;
    
    if(!currentOperator) {
        operandA = currentOperand;
    }
    else {
        operandB = currentOperand;
    }


}

function displayOperand(operandId) {
    const operand = document.querySelector(`#${operandId}`);
    
    if(operationDisplay.textContent[0] === '0') {
        operationDisplay.textContent = '';
    }
    operationDisplay.textContent += ` ${operand.textContent}`;
    
}

function storeOperator() {
    currentOperator = operatorDisplay.textContent;
}

function displayOperator(operatorId) {
    let op = ['+', '-', '×', '÷',];
    let lastChar = operationDisplay.textContent[operationDisplay.textContent.length - 1]
    let operator= document.querySelector(`#${operatorId}`);
    let operatorFound = false;
    
    if(operandA) {
        for(let i = 0; i < 4; i++){
            if(op[i] === lastChar){
                operationDisplay.textContent = operationDisplay.textContent.slice(0, -1);
                operationDisplay.textContent += operator.textContent;
                operatorFound = true;
                break;
            }
        }

        if(!operatorFound) {
            operationDisplay.textContent += ` ${operator.textContent}`;
        }
    }
    else {
        operationDisplay.textContent += ` ${operator.textContent}`;
    }
}

operands.forEach(operand => {
    operand.addEventListener('click', () => {
       displayOperand(operand.id);
       if(!currentOperator) {
        storeOperator();
       }

    })
})

operators.forEach(operator => {
    operator.addEventListener('click', () => {
        operatorDisplay.textContent = operator.textContent; 
        storeOperand();
        if(!operandB) {
            displayOperator(operator.id);
        }
        
    })
})