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
    question: "Are you legally able to provide consent for the purposes of participating in this study?",
    choices: ["Yes", "No"]
  },
  {
    question: "You must be 18 years or older (or an adult in your country of origin).",
    choices: [
      "I confirm that I am 18 years or older.",
      "I am not 18 years or older."
    ]
  },
  {
    question: "You must not have a cognitive impairment that requires you to have a legally authorized representative (LAR) provide consent for you.",
    choices: [
      "I confirm that I do not have a cognitive impairment.",
      "I have a cognitive impairment."
    ]
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

function displayQuestions() {
  questions.forEach((question, questionIndex) => {
    const questionContainer = document.createElement('div');
    questionContainer.classList.add('question-container');
    questionContainer.innerHTML = `
      <h2>${question.question}</h2>
      <div id="choices-${questionIndex}"></div>
    `;
    questionDiv.appendChild(questionContainer);

    const choicesDiv = document.getElementById(`choices-${questionIndex}`);

    if (question.subquestions) {
      question.subquestions.forEach((subquestion, subIndex) => {
        const subquestionContainer = document.createElement('div');
        subquestionContainer.classList.add('subquestion-container');
        subquestionContainer.innerHTML = `
          <h3>${subquestion.question}</h3>
          <div id="subquestion-choices-${questionIndex}-${subIndex}"></div>
        `;
        choicesDiv.appendChild(subquestionContainer);

        const subquestionChoicesDiv = document.getElementById(`subquestion-choices-${questionIndex}-${subIndex}`);
        subquestion.options.forEach(option => {
          const optionLabel = document.createElement('label');
          optionLabel.innerHTML = `
            <input type="radio" name="${subquestion.question}" value="${option}">
            ${option}
          `;
          subquestionChoicesDiv.appendChild(optionLabel);
          subquestionChoicesDiv.appendChild(document.createElement('br'));
        });
      });
    } else {
      question.choices.forEach(choice => {
        const optionLabel = document.createElement('label');
        optionLabel.innerHTML = `
          <input type="radio" name="${question.question}" value="${choice}">
          ${choice}
        `;
        choicesDiv.appendChild(optionLabel);
        choicesDiv.appendChild(document.createElement('br'));
      });
    }
  });
}

function collectAnswers(event) {
  event.preventDefault();
  const inputs = document.querySelectorAll('input[type="radio"]:checked');
  inputs.forEach(input => {
    userAnswers[input.name] = input.value;
  });

  const allQuestionsAnswered = questions.every(question => {
    if (question.subquestions) {
      return question.subquestions.every(subquestion => userAnswers[subquestion.question]);
    } else {
      return userAnswers[question.question];
    }
  });

  if (allQuestionsAnswered) {
    questionDiv.innerHTML = "<h2>Thank you for completing the questionnaire!</h2>";
  } else {
    alert("Please answer all the questions.");
  }
}

// Display all questions on page load
window.onload = displayQuestions;

// Add event listener for form submission
const form = document.getElementById('pre-survey');
form.addEventListener('submit', collectAnswers);