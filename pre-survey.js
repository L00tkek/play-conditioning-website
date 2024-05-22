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
let currentQuestionIndex = 0;
const userAnswers = {};

// Function to display current question
function displayQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    questionDiv.innerHTML = `
        <h2>${currentQuestion.question}</h2>
        <div id="choices"></div>
    `;
    const choicesDiv = document.getElementById('choices');

    // Check if the current question has subquestions
    if (currentQuestion.subquestions) {
        // Loop through each subquestion
        currentQuestion.subquestions.forEach(subquestion => {
            const subquestionDiv = document.createElement('div');
            subquestionDiv.innerHTML = `
                <h3>${subquestion.question}</h3>
                <div id="subquestion-choices-${subquestion.question.replace(/\s/g, '-')}"></div>
            `;
            choicesDiv.appendChild(subquestionDiv);

            const subquestionChoicesDiv = document.getElementById(`subquestion-choices-${subquestion.question.replace(/\s/g, '-')}`);
            subquestion.options.forEach(option => {
                const optionBtn = document.createElement('button');
                optionBtn.textContent = option;
                optionBtn.classList.add('btn');
                optionBtn.addEventListener('click', () => selectChoice(subquestion.question, option));
                subquestionChoicesDiv.appendChild(optionBtn);
            });
        });
    } else {
        // If there are no subquestions, handle the choices
        currentQuestion.choices.forEach(choice => {
            const choiceBtn = document.createElement('button');
            choiceBtn.textContent = choice;
            choiceBtn.classList.add('btn');
            choiceBtn.addEventListener('click', () => selectChoice(currentQuestion.question, choice));
            choicesDiv.appendChild(choiceBtn);
        });
    }
}

// Function to handle user choice selection
function selectChoice(question, choice) {
    // Save the user's answer
    userAnswers[question] = choice;

    // Check if all required questions have been answered
    const allQuestionsAnswered = questions.every(question => {
        if (question.subquestions) {
            return question.subquestions.every(subquestion => userAnswers[subquestion.question]);
        } else {
            return userAnswers[question.question];
        }
    });

    if (allQuestionsAnswered) {
        // Display a thank you message
        questionDiv.innerHTML = "<h2>Thank you for completing the questionnaire!</h2>";
    } else {
        // Increment to the next question
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            displayQuestion();
        }
    }
}

// Display the first question when the page loads
window.onload = displayQuestion();