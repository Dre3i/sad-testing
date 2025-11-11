// Wait for the DOM to be fully loaded before running the script
document.addEventListener('DOMContentLoaded', () => {

    // --- Part 1: Show/Hide Logic ---

    // Get the button that shows the calculator
    const showBtn = document.getElementById('showBmiBtn');
    // Get the calculator container
    const calculator = document.getElementById('bmiCalculator');

    // Add a click event listener to the "Show" button
    showBtn.addEventListener('click', () => {
        // Toggle the 'visible' class on the calculator
        calculator.classList.toggle('visible');

        // Update the button text based on visibility
        if (calculator.classList.contains('visible')) {
            showBtn.textContent = 'Close';
        } else {
            showBtn.textContent = 'BMI';
        }
    });
     
    closeButton.addEventListener("click", function () {
    chatbotContainer.classList.add("hidden");
    chatbotIcon.style.display = "flex";
  });

    // --- Part 2: BMI Calculation Logic ---

    // Get elements for the calculation
    const calculateBtn = document.getElementById('calculateBtn');
    const weightInput = document.getElementById('weight');
    const heightInput = document.getElementById('height');
    const resultDiv = document.getElementById('result');

    // Add a click event listener to the "Calculate" button
    calculateBtn.addEventListener('click', () => {
        // Get values and convert them to numbers
        const weight = parseFloat(weightInput.value);
        const height = parseFloat(heightInput.value);

        // Validate the inputs
        if (isNaN(weight) || isNaN(height) || weight <= 0 || height <= 0) {
            resultDiv.textContent = 'Please enter valid weight and height.';
            resultDiv.style.color = 'red';
            return; // Stop the function
        }

        // Calculate BMI (height in cm needs to be converted to meters)
        const heightInMeters = height / 100;
        const bmi = weight / (heightInMeters * heightInMeters);

        // Determine the BMI category
        let category = '';
        if (bmi < 18.5) {
            category = 'Underweight';
            resultDiv.style.color = 'blue';
        } else if (bmi < 24.9) {
            category = 'Normal weight';
            resultDiv.style.color = 'green';
        } else if (bmi < 29.9) {
            category = 'Overweight';
            resultDiv.style.color = 'orange';
        } else {
            category = 'Obese';
            resultDiv.style.color = 'red';
        }

        // Display the result, rounded to two decimal places
        resultDiv.textContent = `Your BMI is ${bmi.toFixed(2)} (${category})`;
    });

});