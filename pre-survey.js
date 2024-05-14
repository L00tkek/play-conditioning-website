const questions = [
    {
      question: "Do you have access to a stable internet connection?",
      choices: ["Yes", "No"]
    },
    {
      question: "Are you currently incarcerated?",
      choices: ["Yes", "No"]
    },
    {
      question: "Are you legally able to provide consent for the purposes of participating in this study? You must meet the following criteria:",
      subquestions: [
        {
          question: "You must be 18 years or older (or an adult in your country of origin)",
          options: [
            "I confirm that I am 18 years or older.",
            "I am not 18 years or older."
          ]
        },
        {
          question: "You must not have a cognitive impairment that requires you to have a legally authorized representative (LAR) provide consent for you",
          options: [
            "I confirm that I do not have a cognitive impairment.",
            "I have a cognitive impairment."
          ]
        }
      ],
    },
    {
      question: "Are you taking this on a personal computer?",
      choices: ["Yes", "No"]
    },
    {
      question: "Does your computer have 1 GB RAM?",
      choices: ["Yes", "No"]
    },
    {
      question: "Please look at the following demo:",
      choices: [
        "The demo is running smoothly",
        "The demo is laggy, choppy, or stuttering."
      ]
    },
    {
      question: "What is your prior experience with video games?",
      choices: [
        "None",
        "Beginner",
        "Intermediate",
        "Advanced",
        "Expert"
      ]
    },
    {
      question: "Rate how much you agree with the following statements:",
      subquestions: [
        {
          question: "I am experienced in playing video games",
          options: ["Strongly agree", "Agree", "Neither agree nor disagree", "Disagree", "Strongly disagree"]
        },
        {
          question: "I am experienced in playing action-based video games",
          options: ["Strongly agree", "Agree", "Neither agree nor disagree", "Disagree", "Strongly disagree"]
        },
        {
          question: "I am experienced in playing PC (personal computer) games",
          options: ["Strongly agree", "Agree", "Neither agree nor disagree", "Disagree", "Strongly disagree"]
        }
      ]
    }
];

const questionDiv = document.getElementById('question');
const userAnswers = {};

// Function to display all questions
function displayQuestions() {
  let questionHTML = '';

  questions.forEach((question, index) => {
      questionHTML += `
          <h3>${question.question}</h3>
      `;

      if (question.subquestions) {
          questionHTML += `
              <div class="radio-group">
                  ${question.subquestions.map((subquestion, subIndex) => `
                      <div>
                          <h4>${subquestion.question}</h4>
                          ${subquestion.options.map(option => `
                              <div>
                                  <input type="radio" id="q${index}-sq${subIndex}-option${subquestion.options.indexOf(option)}" name="q${index}-sq${subIndex}" value="${option}" required>
                                  <label for="q${index}-sq${subIndex}-option${subquestion.options.indexOf(option)}">${option}</label>
                              </div>
                          `).join('')}
                      </div>
                  `).join('')}
              </div>
          `;
      } else {
          questionHTML += `
              <div class="radio-group">
                  ${question.choices.map(choice => `
                      <div>
                          <input type="radio" id="q${index}-option${question.choices.indexOf(choice)}" name="q${index}" value="${choice}" required>
                          <label for="q${index}-option${question.choices.indexOf(choice)}">${choice}</label>
                      </div>
                  `).join('')}
              </div>
          `;
      }
  });

  questionDiv.innerHTML = questionHTML;
}

// Function to handle form submission
function handleSubmit(event) {
  event.preventDefault();

  const formData = new FormData(event.target);

  formData.forEach((value, key) => {
      userAnswers[key] = value;
  });

  window.location.href = './game.html';
}

// Display the questions when the page loads
window.onload = displayQuestions();

// Add an event listener for form submission
const surveyForm = document.getElementById('pre-survey');
surveyForm.addEventListener('submit', handleSubmit);