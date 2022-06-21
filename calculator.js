const operands = document.querySelectorAll('.operand');
const operators = document.querySelectorAll('.operator');
const displayScreen = document.querySelector('.display_screen');
const operationDisplay = document.querySelector('.operation_display');
const operatorDisplay = document.querySelector('.operator_display');
const resultDisplay = document.querySelector('.result')
const equals = document.querySelector('#equals');
const clearOperation = document.querySelector('#clear');
const deleteOperation = document.querySelector('#delete');

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
    const bothOperands = operationDisplay.textContent.split(currentOperator);
    const currentOperand = operationDisplay.textContent;

    if(!operandA) {
        if(result) {
            operandA = result.toString()
            result = null;
        }
        else {
            operandA = currentOperand.split(' ').join('');
        }
    }
    else {
        
        operandB = bothOperands[1].split(' ').join('');
    }


}

function displayOperand(operandId= 'default') {
    const operand = document.querySelector(`#${operandId}`);
    if(!result) {
        if(operationDisplay.textContent[0] === '0') {
        operationDisplay.textContent = '';
        }
        operationDisplay.textContent += ` ${operand.textContent}`;

    }

    if(result) {
        operationDisplay.textContent += `${result.toString().split('').join(' ')}`
        
    }
        
}

function storeOperator() {
    currentOperator = operatorDisplay.textContent;
}

function displayOperator(operatorId) {
    let operator = document.querySelector(`#${operatorId}`);
    
    if(operandA) {
        if (checkOperator()){
                operationDisplay.textContent = operationDisplay.textContent.slice(0, -1);
                operationDisplay.textContent += operator.textContent;
        }
        else {
            operationDisplay.textContent += ` ${operator.textContent}`;
        }
    }
    else {
        operationDisplay.textContent += ` ${operator.textContent}`;
    }
}

function calculate() {
    if(currentOperator === '×') {
        result = multiply(Number(operandA), Number(operandB));
    }
    else if(currentOperator === '+') {
        result = add(Number(operandA), Number(operandB));
    }
    else if(currentOperator === '-') {
        result = substract(Number(operandA), Number(operandB));
    }
    else {
        result = devide(Number(operandA), Number(operandB));
    }
}

function displayResults() {
    resultDisplay.textContent += `= ${result.toString().split('').join(' ')}`;
}

function clear() {
    operationDisplay.textContent = '';
    resultDisplay.textContent = '';
    currentOperator = null;
    operandA = null;
    operandB = null;
}

function checkOperator() {
    let op = ['+', '-', '×', '÷',];
    let lastChar = operationDisplay.textContent[operationDisplay.textContent.length - 1]
    
    for(let i = 0; i < 4; i++){
        if(op[i] === lastChar){
            return true;
        }
    }

    return false;
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
        console.log(operandB);
        if(!checkOperator()){
            storeOperand();
        }
        if(!operandB) {
            displayOperator(operator.id);
        }

        if(operandB) {
            calculate();
            displayResults();
            clear();
            displayOperand();
            storeOperand();
            displayOperator(operator.id);
        }
        
    })
})


equals.addEventListener('click', () => {
    storeOperand()
    if(operandB) {
        calculate();
        displayResults();
    }
})

clearOperation.addEventListener('click', () => {
    clear();
})