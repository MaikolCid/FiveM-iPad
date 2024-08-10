function initializeCalculator() {
    const display = document.getElementById('display-value');
    const buttons = document.querySelectorAll('.button, .button-operator');
    let currentValue = '0';
    let previousValue = null;
    let operator = null;
    let shouldResetDisplay = false;

    function handleInput(value) {
        if (value === 'C') {
            currentValue = '0';
            previousValue = null;
            operator = null;
            shouldResetDisplay = false;
        } else if (value === '+/-') {
            currentValue = String(parseFloat(currentValue) * -1);
        } else if (value === '%') {
            currentValue = String(parseFloat(currentValue) / 100);
        } else if (value === '=') {
            if (operator && previousValue !== null) {
                currentValue = String(operate(previousValue, currentValue, operator));
                operator = null;
                previousValue = null;
                shouldResetDisplay = true;
            }
        } else if (['+', '-', '*', '/'].includes(value)) {
            if (operator && previousValue !== null && !shouldResetDisplay) {
                currentValue = String(operate(previousValue, currentValue, operator));
            }
            operator = value;
            previousValue = currentValue;
            shouldResetDisplay = true;
        } else if (!isNaN(value) || value === '.') { // Check if it's a number or a decimal point
            if (shouldResetDisplay) {
                currentValue = value;
                shouldResetDisplay = false;
            } else {
                currentValue = currentValue === '0' && value !== '.' ? value : currentValue + value;
            }
        }

        display.textContent = currentValue;
    }

    // Event listener for button clicks
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            const value = this.getAttribute('data-value');
            handleInput(value);
        });
    });

    // Event listener for keyboard input
    document.addEventListener('keydown', function(event) {
        const key = event.key;

        if (key === 'Escape') { // 'C' button functionality
            handleInput('C');
        } else if (key === 'Enter' || key === '=') { // Equals button functionality
            handleInput('=');
        } else if (['+', '-', '*', '/'].includes(key)) { // Operator buttons
            handleInput(key);
        } else if (!isNaN(key) || key === '.') { // Number buttons and decimal point
            handleInput(key);
        } else if (key === 'Backspace') { // Handle backspace (optional)
            currentValue = currentValue.slice(0, -1) || '0';
            display.textContent = currentValue;
        }
    });

    function operate(a, b, operator) {
        a = parseFloat(a);
        b = parseFloat(b);

        switch (operator) {
            case '+':
                return a + b;
            case '-':
                return a - b;
            case '*':
                return a * b;
            case '/':
                return a / b;
            default:
                return b;
        }
    }
}