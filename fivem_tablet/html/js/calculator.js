function initializeCalculator() {
    const display = document.getElementById('display-value');
    const buttons = document.querySelectorAll('.button, .button-operator'); // Selecciona ambos tipos de botones
    let currentValue = '0';
    let previousValue = null;
    let operator = null;
    let shouldResetDisplay = false;

    buttons.forEach(button => {
        button.addEventListener('click', function() {
            const value = this.getAttribute('data-value');
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
            } else {
                if (shouldResetDisplay) {
                    currentValue = value;
                    shouldResetDisplay = false;
                } else {
                    currentValue = currentValue === '0' ? value : currentValue + value;
                }
            }

            display.textContent = currentValue;
        });
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
