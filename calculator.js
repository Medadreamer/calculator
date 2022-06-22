const operands = document.querySelectorAll('.operand');
const operators = document.querySelectorAll('.operator');
const displayScreen = document.querySelector('.display_screen');
const operationDisplay = document.querySelector('.operation_display');
const operatorDisplay = document.querySelector('.operator_display');
const resultDisplay = document.querySelector('.result')
const equals = document.querySelector('#equals');
const clearOperation = document.querySelector('#clear');
const deleteOperation = document.querySelector('#delete');
const dot = document.querySelector('#dot');

let equalCount = 0;
let dotCount = 0;
let niceTry = 1;
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
    const dec = 10 ** checkDecimal();
    const substraction = (a * dec) - (b * dec)
    return substraction / dec;
}

function devide(a, b) {
    const dec = 10 ** checkDecimal();
    const division = (a * dec) / (b * dec)
    return division;}

function toThePower(a, b) {
    return a ** b;
}

function storeOperand() {
    const bothOperands = operationDisplay.textContent.split(currentOperator);
    const currentOperand = operationDisplay.textContent;

    if(!operandA) {
        if(result || result === 0) {
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
    if(!result && result !== 0) {
        if(operationDisplay.textContent[0] === '0' && !checkOperator() && !checkOperand()) {
        operationDisplay.textContent = '';
        }
        operationDisplay.textContent += ` ${operand.textContent}`;

    }

    if(result || result === 0) {
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
    else if(currentOperator === '÷') {
        if(Number(operandB) === 0) {
            niceTry += 1;
        }
        else {
            result = devide(Number(operandA), Number(operandB));
        }
    }
}

function checkDecimal() {
    let arrayOperandA = operandA.split('.');
    let arrayOperandB = operandB.split('.');

    if(arrayOperandA.length === 2 && arrayOperandA.length === 2) {
        return Math.max(arrayOperandA[1].length, arrayOperandB[1].length);
    }
    else if(arrayOperandA.length === 2) {
        return arrayOperandA[1].length;
    }
    else if(arrayOperandB.length === 2) {
        return arrayOperandB[1].length;
    }

    return 0;
}


function displayResults() {
    if(niceTry === 1) {
        clear();
        resultDisplay.textContent += 'Nice Try!!';
    }
    else {
        resultDisplay.textContent = '';
        resultDisplay.textContent += `= ${result.toString().split('').join(' ')}`;

    }
}

function clean() {
    operationDisplay.textContent = '';
    resultDisplay.textContent = '';
    currentOperator = null;
    operandA = null;
    operandB = null;
}

function clear() {
    currentOperator = null;
    operandA = null;
    operandB = null;
    result = null;
    dotCount = 0;
    operationDisplay.textContent = '0';
    operatorDisplay.textContent = '';
    resultDisplay.textContent = '';
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

function checkOperand() {
    let lastChar = operationDisplay.textContent[operationDisplay.textContent.length - 1]

    if(lastChar === '.') {
        return true;
    }

    for (let i = 1; i < 10; i++) {
        if(i === Number(lastChar)) {
            return true;
        }
        
    }

    return false;
}



operands.forEach(operand => {
    operand.addEventListener('click', () => {
    equalCount = 0;
    niceTry = 0;


        if (result || result === 0) {
            clear();
        }

        displayOperand(operand.id);
        if(!currentOperator) {
            storeOperator();
        }


    })
})


operators.forEach(operator => {
    operator.addEventListener('click', () => {
        operatorDisplay.textContent = operator.textContent; 
        dotCount = 0;
        
        if(!checkOperator()){
            storeOperand();
        }

        if(!operandB) {
            displayOperator(operator.id);
        }

        if(operandB) {
            calculate();
            if(niceTry) {
                displayResults();

            }
            else {
            displayResults();
            clean();
            displayOperand();
            storeOperand();
            displayOperator(operator.id);    
            }

        }
        
    })
})


equals.addEventListener('click', () => {
    if(equalCount === 0) {
            if(currentOperator) {
                storeOperand();
            }

            if(operandB) {
                calculate();
                displayResults();
                equalCount += 1;
            }
    }

})

clearOperation.addEventListener('click', () => {
    clear();

})


deleteOperation.addEventListener('click', () =>{
    if(checkOperator()) {
        operatorDisplay.textContent = '';
        currentOperator = null;
        operandA = null;
    }
    operationDisplay.textContent = operationDisplay.textContent.slice(0, -1);

    if(result || result === 0){
        clear();

    }
})

dot.addEventListener('click', () => {
    if(result || result === 0){
        clear();

    }

    if(!checkOperator() && dotCount === 0) {
        operationDisplay.textContent += ' .';
        dotCount += 1;
    }

})