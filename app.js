const calculator = document.querySelector('.container')
const keys = calculator.querySelector('.keys')
const display = document.querySelector('.display')

const calculate = (n1, operator, n2) => {
    let result = ''
    if (operator === 'add') {
        result = parseFloat(n1) + parseFloat(n2)
    } else if (operator === 'subtract') {
        result = parseFloat(n1) - parseFloat(n2)
    } else if (operator === 'multiply') {
        result = parseFloat(n1) * parseFloat(n2)
    } else if (operator === 'divide') {
        result = n1 / n2
    }
    return result
}

keys.addEventListener('click', e => {
    if (e.target.matches('button')) {
        const key = e.target
        const action = key.dataset.action
        const keyContent = key.textContent
        const displayedNum = display.textContent
        const previousKeyType = calculator.dataset.previousKeyType

        if (action === 'add' ||
            action === 'subtract' ||
            action === 'multiply' ||
            action === 'divide') {

            const firstValue = calculator.dataset.firstValue
            const operator = calculator.dataset.operator
            const secondValue = displayedNum

            if (firstValue && operator && previousKeyType !== 'operator'
                && previousKeyType !== 'calculate') {
                const calcValue = calculate(firstValue, operator, secondValue)
                display.textContent = calcValue
                calculator.dataset.firstValue = calcValue
            } else {
                calculator.dataset.firstValue = displayedNum
            }
            calculator.dataset.previousKeyType = 'operator'
            calculator.dataset.operator = action

        }

        if (!action) {
            if (displayedNum === '0' || previousKeyType === 'operator' ||
                previousKeyType === 'calculate') {
                display.textContent = keyContent
            } else {
                display.textContent = displayedNum + keyContent
            }
            calculator.dataset.previousKeyType = 'number'
        }

        if (action === 'decimal') {
            if (!displayedNum.includes('.')) {
                display.textContent = displayedNum + '.'

            } else if (previousKeyType === 'operator' ||
                previousKeyType === 'calculate') {
                display.textContent = '0.'
            }
            calculator.dataset.previousKeyType = 'decimal'
        }

        if (action === 'clear') {
            if (display.textContent !== 0) {
                display.textContent = display.textContent.slice(0, -1)
            }

            calculator.dataset.previousKeyType = 'clear'
        }

        if (action === 'reset') {
            calculator.dataset.firstValue = ''
            calculator.dataset.modValue = ''
            calculator.dataset.operator = ''
            calculator.dataset.previousKeyType = ''
            display.textContent = 0
        }

        if (action === 'calculate') {
            let firstValue = calculator.dataset.firstValue
            const operator = calculator.dataset.operator
            let secondValue = displayedNum

            if (firstValue) {
                if (previousKeyType === 'calculate') {
                    firstValue = displayedNum
                    secondValue = calculator.dataset.modValue
                }
                display.textContent = calculate(firstValue, operator, secondValue)
            }
            calculator.dataset.modValue = secondValue
            calculator.dataset.previousKeyType = 'calculate'
        }
    }
})

let togglePosition = 0;
let toggleArea = document.getElementsByClassName("toggle-grid");
console.log(toggleArea);

toggleArea[0].addEventListener("click", toggleClick => {
    console.log("click");
    if (togglePosition === 0) {
        togglePosition = 1;
        document.querySelector(".red-dot").style.setProperty("transform", "translateX(4em)");
        document.querySelector("body").className = "theme2";
    } else if (togglePosition === 1) {
        togglePosition = 2;
        document.querySelector(".red-dot").style.setProperty("transform", "translateX(7.5em)");
        document.querySelector("body").className = "theme3";
    } else {
        togglePosition = 0;
        document.querySelector(".red-dot").style.setProperty("transform", "translateX(0em)");
        document.querySelector("body").className = "theme1";
    }
})