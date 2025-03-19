document.addEventListener('DOMContentLoaded', function () {
    const display = document.getElementById('result');
    const buttons = document.querySelectorAll('.btn');
  
    let currentInput = '';
    let operator = null;
    let previousInput = '';
    let shouldResetDisplay = false;
  
    buttons.forEach(button => {
      button.addEventListener('click', () => {
        const value = button.getAttribute('data-value');
  
        if (value === 'C') {
          clearCalculator();
          return;
        }
  
        if (value === '±') {
          toggleSign();
          return;
        }
  
        if (['+', '-', '*', '/', '%'].includes(value)) {
          handleOperator(value);
          return;
        }
  
        if (value === '=') {
          calculateResult();
          return;
        }
  
        if (!isNaN(value) || value === '.') {
          appendToDisplay(value);
          return;
        }
      });
    });
  
    function clearCalculator() {
      currentInput = '';
      previousInput = '';
      operator = null;
      display.value = '0';
    }
  
    function toggleSign() {
      if (currentInput !== '') {
        currentInput = (parseFloat(currentInput) * -1).toString();
        updateDisplay();
      }
    }
  
    function handleOperator(op) {
      if (currentInput === '') return;
  
      if (previousInput !== '') {
        calculateResult();
      }
  
      operator = op;
      previousInput = currentInput;
      currentInput = '';
      updateDisplay();
    }
  
    function calculateResult() {
      if (operator === null || currentInput === '') return;
  
      let result;
      const prev = parseFloat(previousInput);
      const current = parseFloat(currentInput);
  
      switch (operator) {
        case '+':
          result = prev + current;
          break;
        case '-':
          result = prev - current;
          break;
        case '*':
          result = prev * current;
          break;
        case '/':
          result = prev / current;
          break;
        case '%':                                                      
            result = prev / current * 100;                                   
            break;                                                     
        default:
          return;
      }
  
      currentInput = result.toString();
      operator = null;
      previousInput = '';
      updateDisplay();
      shouldResetDisplay = true;
    }
  
    function appendToDisplay(value) {
      if (shouldResetDisplay) {
        currentInput = '';
        shouldResetDisplay = false;
      }
  
      if (value === '.' && currentInput.includes('.')) return;
  
      currentInput += value;
      updateDisplay();
    }
  
    function updateDisplay() {
      if (operator) {
        display.value = `${previousInput} ${operator} ${currentInput}`;
      } else {
        display.value = currentInput || '0';
      }
    }
  });