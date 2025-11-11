// Configuration
const COMMON_SYMPTOMS = ['Headache', 'Fever', 'Cough', 'Fatigue', 'Nausea'];
const API_KEY = "AIzaSyDUe3IG3UogjcNMIkg4o0fHSPMZRs1KvJ0";
const MODEL_NAME = "gemini-2.5-flash";

// DOM Elements - Search View
const searchView = document.getElementById('search-view');
const resultView = document.getElementById('result-view');
const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const buttonText = document.getElementById('button-text');
const spinner = document.getElementById('spinner');
const errorMessage = document.getElementById('error-message');
const commonSymptomsContainer = document.getElementById('common-symptoms-container');
const resultQuery = document.getElementById('result-query');
const resultContent = document.getElementById('result-content');
const resetButton = document.getElementById('reset-button');

// ==============================================
// API Functions
// ==============================================

/**
 * Fetches symptom information from Google's Gemini API
 */
const getSymptomInfo = async (symptoms) => {
  if (!API_KEY) {
    const errorMsg = "API key is not available. Please ensure it is configured correctly in your environment.";
    console.error(errorMsg);
    throw new Error(errorMsg);
  }

  const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL_NAME}:generateContent?key=${API_KEY}`;
  
  const requestBody = {
    contents: [
      {
        role: "user",
        parts: [{ 
          text: "You are a concise, friendly, and easy-to-understand Medical Assistant. Your only function is to provide information related to **medical conditions, diseases, health, and anatomy**. For any topic outside of this domain, you **MUST** respond with the exact phrase: 'This system only provide information that disease or medical related.'" 
        }]
      },
      {
        role: "user",
        parts: [{ 
          text: "You are a concise, friendly, and easy-to-understand assistant. Explain complex topics using simple language, short sentences, and where appropriate, use bullet points or numbered lists for readability. Keep your response to a maximum of 100 words." 
        }]
      },
      {
        role: "user",
        parts: [{ text: "Use a bullet point, One bullet point one line" }]
      },
      {
        role: "user",
        parts: [{ text: "make it presentable" }]
      },
      {
        parts: [{ text: symptoms }]
      }
    ],
    generationConfig: {
      maxOutputTokens: 10000
    }
  };

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`API returned status ${response.status}: ${errorData.error?.message || response.statusText}`);
    }

    const data = await response.json();
    const candidate = data.candidates?.[0];
    const botMessage = candidate?.content?.parts?.[0]?.text; 
    const finishReason = candidate?.finishReason; 
    
    if (botMessage) {
      return botMessage;
    } 
    
    if (finishReason === 'SAFETY') {
      throw new Error("Sorry, your last request was blocked by the safety filter. Please rephrase your query.");
    } 
    
    if (finishReason) {
      throw new Error(`The AI did not complete the response (Reason: ${finishReason}). Please try again.`);
    } 
    
    throw new Error("The AI generated an empty or incomplete response.");

  } catch (error) {
    console.error("Error fetching bot response:", error);
    throw new Error(error.message || 'Sorry, something went wrong. Please try again.');
  }
};

// ==============================================
// Utility Functions
// ==============================================

/**
 * Formats AI response text into HTML
 */
const formatResult = (text) => {
  let html = text.replace(/\*\*(.*?)\*\*/g, '<strong class="result-strong">$1</strong>');
  
  const lines = html.split('\n');

  html = lines.map(line => {
    line = line.trim();
    if (line === '') {
      return '';
    }
    if (line.match(/^\d+\./) || line.startsWith('-') || line.startsWith('*')) {
      return `<p class="result-list-item">${line}</p>`;
    }
    return `<p class="result-paragraph">${line}</p>`;
  }).join('');

  return html;
};

/**
 * Toggles loading state for search button
 */
const toggleLoading = (isLoading) => {
  if (isLoading) {
    spinner.classList.remove('hidden');
    buttonText.classList.add('hidden');
    searchButton.disabled = true;
    searchInput.disabled = true;
    document.querySelectorAll('.symptom-chip').forEach(chip => chip.disabled = true);
  } else {
    spinner.classList.add('hidden');
    buttonText.classList.remove('hidden');
    searchButton.disabled = !searchInput.value.trim();
    searchInput.disabled = false;
    document.querySelectorAll('.symptom-chip').forEach(chip => chip.disabled = false);
  }
};

/**
 * Shows error message
 */
function showError(message) {
  errorMessage.textContent = message;
  errorMessage.classList.remove('hidden');
}

/**
 * Hides error message
 */
function hideError() {
  errorMessage.classList.add('hidden');
}

// ==============================================
// Main Search Functions
// ==============================================

/**
 * Handles symptom search
 */
const handleSearch = async (symptoms) => {
  const trimmedSymptoms = symptoms.trim();
  if (!trimmedSymptoms) return;

  toggleLoading(true);
  hideError();
  
  try {
    const responseText = await getSymptomInfo(trimmedSymptoms);
    resultQuery.textContent = trimmedSymptoms;
    resultContent.innerHTML = formatResult(responseText);
    searchView.classList.add('hidden');
    resultView.classList.remove('hidden');
  } catch (e) {
    showError(e.message || 'An error occurred. Please try again.');
  } finally {
    toggleLoading(false);
  }
};

/**
 * Resets to search view
 */
const handleReset = () => {
  resultView.classList.add('hidden');
  searchView.classList.remove('hidden');
  searchInput.value = '';
  hideError();
  searchButton.disabled = true;
};

/**
 * Populates common symptoms chips
 */
const populateCommonSymptoms = () => {
  COMMON_SYMPTOMS.forEach(symptom => {
    const button = document.createElement('button');
    button.textContent = symptom;
    button.className = "symptom-chip";
    button.addEventListener('click', () => {
      searchInput.value = symptom;
      searchButton.disabled = false;
      handleSearch(symptom);
    });
    commonSymptomsContainer.appendChild(button);
  });
};

// ==============================================
// Event Listeners - Search
// ==============================================

searchForm.addEventListener('submit', (e) => {
  e.preventDefault();
  handleSearch(searchInput.value);
});

searchInput.addEventListener('input', () => {
  searchButton.disabled = !searchInput.value.trim();
});

resetButton.addEventListener('click', handleReset);

// ==============================================
// Chatbot Functionality
// ==============================================

document.addEventListener("DOMContentLoaded", function () {
  const chatbotContainer = document.getElementById("chatbot-container");
  const closeBtn = document.getElementById("close-btn");
  const sendBtn = document.getElementById("send-btn");
  const chatbotInput = document.getElementById("chatbot-input");
  const chatbotMessages = document.getElementById("chatbot-messages");
  const chatbotIcon = document.getElementById("chatbot-icon");
  const closeButton = document.getElementById("close-btn");

  // Toggle chatbot visibility
  chatbotIcon.addEventListener("click", function () {
    chatbotContainer.classList.remove("hidden");
    chatbotIcon.style.display = "none";
  });

  closeButton.addEventListener("click", function () {
    chatbotContainer.classList.add("hidden");
    chatbotIcon.style.display = "flex";
  });

  // Send message on button click or Enter key
  sendBtn.addEventListener("click", sendMessage);
  chatbotInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      sendMessage();
    }
  });

  /**
   * Sends user message and gets bot response
   */
  function sendMessage() {
    const userMessage = chatbotInput.value.trim();
    if (userMessage) {
      appendMessage("user", userMessage);
      chatbotInput.value = "";
      getBotResponse(userMessage);
    }
  }

  /**
   * Appends message to chat
   */
  function appendMessage(sender, message) {
    const messageElement = document.createElement("div");
    messageElement.classList.add("message", sender);
    messageElement.textContent = message;
    chatbotMessages.appendChild(messageElement);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
  }

  /**
   * Fetches bot response from API
   */
  async function getBotResponse(userMessage) {
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL_NAME}:generateContent?key=${API_KEY}`;

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              role: "user", 
              parts: [
                {  
                  text: "You are a concise, friendly, and easy-to-understand Medical Assistant. Your only function is to provide information related to **medical conditions, diseases, health, and anatomy**. For any topic outside of this domain, you **MUST** respond with the exact phrase: 'This system only provide information that disease or medical realted.'" 
                } 
              ]
            },
            {
              role: "user", 
              parts: [
                { 
                  text: "You are a concise, friendly, and easy-to-understand assistant. Explain complex topics using simple language, short sentences, and where appropriate, use bullet points or numbered lists for readability. Keep your response to a maximum of 100 words." 
                } 
              ]
            },
            {
              parts: [
                { text: userMessage }
              ]
            }
          ],
          generationConfig: {
            maxOutputTokens: 10000
          }
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`API returned status ${response.status}: ${errorData.error?.message || response.statusText}`);
      }

      const data = await response.json();
      const candidate = data.candidates?.[0];
      const botMessage = candidate?.content?.parts?.[0]?.text; 
      const finishReason = candidate?.finishReason; 
      
      if (botMessage) {
        appendMessage("bot", botMessage);
      } else if (finishReason === 'SAFETY') {
        appendMessage("bot", "Sorry, your last request was blocked by the safety filter. Please rephrase your query.");
      } else if (finishReason) {
        appendMessage("bot", `The AI did not complete the response (Reason: ${finishReason}). Please try again.`);
      } else {
        appendMessage("bot", "The AI generated an empty or incomplete response.");
      }

    } catch (error) {
      console.error("Error fetching bot response:", error);
      appendMessage("bot", `Sorry, something went wrong: ${error.message}. Please try again.`);
    }
  }
});

// ==============================================
// BMI Calculator Functionality
// ==============================================

document.addEventListener('DOMContentLoaded', () => {
  const showBtn = document.getElementById('showBmiBtn');
  const calculator = document.getElementById('bmiCalculator');
  const calculateBtn = document.getElementById('calculateBtn');
  const weightInput = document.getElementById('weight');
  const heightInput = document.getElementById('height');
  const resultDiv = document.getElementById('result');

  // Toggle BMI calculator visibility
  showBtn.addEventListener('click', () => {
    calculator.classList.toggle('visible');
  });

  // Calculate BMI
  calculateBtn.addEventListener('click', () => {
    const weight = parseFloat(weightInput.value);
    const height = parseFloat(heightInput.value);

    if (isNaN(weight) || isNaN(height) || weight <= 0 || height <= 0) {
      resultDiv.textContent = 'Please enter valid weight and height.';
      resultDiv.style.color = 'red';
      return; 
    }

    const heightInMeters = height / 100;
    const bmi = weight / (heightInMeters * heightInMeters);

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

    resultDiv.textContent = `Your BMI is ${bmi.toFixed(2)} (${category})`;
  });
});

// ==============================================
// Initialize Application
// ==============================================

populateCommonSymptoms();
toggleLoading(false);