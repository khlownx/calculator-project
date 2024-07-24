document.addEventListener('DOMContentLoaded', () => {
    const calculatorScreen = document.querySelector('.calculator-screen');
    const calculatorKeys = document.querySelector('.calculator-keys');
    const equalButton = document.querySelector('.equal-sign');
    let currentInput = '';
    let previousInput = '';
    let operator = '';

    // Handle button clicks
    calculatorKeys.addEventListener('click', (event) => {
        const button = event.target;
        const value = button.value;

        if (!value) return; // Ignore empty values

        switch (value) {
            case 'all-clear':
                currentInput = '';
                previousInput = '';
                operator = '';
                calculatorScreen.value = '';
                break;

            case '←':
                currentInput = currentInput.slice(0, -1);
                calculatorScreen.value = currentInput;
                break;

            case '=':
                if (currentInput && previousInput && operator) {
                    try {
                        const result = eval(`${previousInput} ${operator} ${currentInput}`);
                        calculatorScreen.value = result;
                        currentInput = result;
                        previousInput = '';
                        operator = '';
                    } catch (error) {
                        calculatorScreen.value = 'Error';
                    }
                }
                break;

            case '+':
            case '-':
            case '*':
            case '/':
                if (currentInput) {
                    previousInput = currentInput;
                    operator = value;
                    currentInput = '';
                }
                break;

            default:
                currentInput += value;
                calculatorScreen.value = currentInput;
                break;
        }
    });

    // Handle keyboard input
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault(); // Prevent default behavior (e.g., form submission)
            equalButton.click(); // Simulate a click on the "=" button
        } else if (event.key === 'Backspace') {
            document.querySelector('button[value="←"]').click(); // Simulate a click on the "←" button
        } else if (['+', '-', '*', '/'].includes(event.key)) {
            document.querySelector(`button[value="${event.key}"]`).click(); // Simulate a click on the operator button
        } else if (!isNaN(event.key) || event.key === '.') {
            document.querySelector(`button[value="${event.key}"]`).click(); // Simulate a click on number or decimal button
        }
    });
});
