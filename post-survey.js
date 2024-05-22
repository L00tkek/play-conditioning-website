const questions = [
    {
        question: "For each game mechanic you were presented with, please rate how accurate you feel the following statements are:",
        subquestions: [
            {
                question: "[Mechanic 1 description based on which mechanic the participant was presented with]",
                subsubquestions: [
                    {
                        question: "I felt that [Mechanic 1] was an enjoyable mechanic.",
                        options: [
                            "Strongly agree", 
                            "Agree", 
                            "Neither agree nor disagree", 
                            "Disagree", 
                            "Strongly disagree"
                        ]
                    },
                    {
                        question: "I felt that [Mechanic 1] was a mechanic that was easy to understand.",
                        options: [
                            "Strongly agree", 
                            "Agree", 
                            "Neither agree nor disagree", 
                            "Disagree", 
                            "Strongly disagree"
                        ]
                    },
                    {
                        question: "I felt that [Mechanic 1] was a mechanic that was easy to use.",
                        options: [
                            "Strongly agree", 
                            "Agree", 
                            "Neither agree nor disagree", 
                            "Disagree", 
                            "Strongly disagree"
                        ]
                    },
                    {
                        question: "I felt that [Mechanic 1] was a mechanic that I had never seen in any other video game before.",
                        options: [
                            "Strongly agree", 
                            "Agree", 
                            "Neither agree nor disagree", 
                            "Disagree", 
                            "Strongly disagree", 
                            "N/A - I have never played a video game before"
                        ]
                    }
                ]
            },
            {
                question: "[Mechanic 2 description based on which mechanic the participant was presented with]",
                subsubquestions: [
                    {
                        question: "I felt that [Mechanic 2] was an enjoyable mechanic.",
                        options: ["Strongly agree", "Agree", "Neither agree nor disagree", "Disagree", "Strongly disagree"]
                    },
                    {
                        question: "I felt that [Mechanic 2] was a mechanic that was easy to understand.",
                        options: ["Strongly agree", "Agree", "Neither agree nor disagree", "Disagree", "Strongly disagree"]
                    },
                    {
                        question: "I felt that [Mechanic 2] was a mechanic that was easy to use.",
                        options: ["Strongly agree", "Agree", "Neither agree nor disagree", "Disagree", "Strongly disagree"]
                    },
                    {
                        question: "I felt that the [Mechanic 2] was a mechanic that I had never seen in any other video game before.",
                        options: ["Strongly agree", "Agree", "Neither agree nor disagree", "Disagree", "Strongly disagree", "N/A - I have never played a video game before"]
                    }
                ]
            }
        ]
    },
    {
        question: "Additionally, please answer these questions regarding how you felt about both mechanics in general:",
        subquestions: [
            {
                question: "Between both [Mechanic 1] and [Mechanic 2], which mechanic did you feel like you preferred using?",
                options: [
                    "I preferred using [Mechanic 1] much more than I preferred using [Mechanic 2].",
                    "I preferred using [Mechanic 1] slightly more than I preferred using [Mechanic 2].",
                    "I preferred using [Mechanic 1] about as much as I preferred using [Mechanic 2].",
                    "I preferred using [Mechanic 2] slightly more than I preferred using [Mechanic 1].",
                    "I preferred using [Mechanic 2] much more than I preferred using [Mechanic 1]."
                ]
            },
            {
                question: "Between [Mechanic 1] and [Mechanic 2], which mechanic did you feel like you used more often?",
                options: [
                    "I used [Mechanic 1] much more frequently than [Mechanic 2].",
                    "I used [Mechanic 1] slightly more frequently than [Mechanic 2].",
                    "I used [Mechanic 1] about as often as [Mechanic 2].",
                    "I used [Mechanic 2] slightly more frequently than [Mechanic 1].",
                    "I used [Mechanic 2] much more frequently than [Mechanic 1]."
                ]
            },
            {
                question: "How strongly do you agree with the following statement: I felt that it was easy to switch between [Mechanic 1] and [Mechanic 2].",
                options: [
                    "Strongly agree", 
                    "Agree", 
                    "Neither agree nor disagree", 
                    "Disagree", 
                    "Strongly disagree"
                ]
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

            // Check if the subquestion has sub-subquestions
            if (subquestion.subsubquestions) {
                subquestion.subsubquestions.forEach(subsubquestion => {
                    const subsubquestionDiv = document.createElement('div');
                    subsubquestionDiv.innerHTML = `
                        <h4>${subsubquestion.question}</h4>
                        <div id="subsubquestion-choices-${subsubquestion.question.replace(/\s/g, '-')}"></div>
                    `;
                    subquestionChoicesDiv.appendChild(subsubquestionDiv);

                    const subsubquestionChoicesDiv = document.getElementById(`subsubquestion-choices-${subsubquestion.question.replace(/\s/g, '-')}`);
                    subsubquestion.options.forEach(option => {
                        const optionBtn = document.createElement('button');
                        optionBtn.textContent = option;
                        optionBtn.classList.add('btn');
                        optionBtn.addEventListener('click', () => selectChoice(subsubquestion.question, option));
                        subsubquestionChoicesDiv.appendChild(optionBtn);
                    });
                });
            } else {
                // If the subquestion has no sub-subquestions, handle the options
                subquestion.options.forEach(option => {
                    const optionBtn = document.createElement('button');
                    optionBtn.textContent = option;
                    optionBtn.classList.add('btn');
                    optionBtn.addEventListener('click', () => selectChoice(subquestion.question, option));
                    subquestionChoicesDiv.appendChild(optionBtn);
                });
            }
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
            return question.subquestions.every(subquestion => {
                if (subquestion.subsubquestions) {
                    return subquestion.subsubquestions.every(subsubquestion => userAnswers[subsubquestion.question]);
                } else {
                    return userAnswers[subquestion.question];
                }
            });
        } else {
            return userAnswers[question.question];
        }
    });

    if (allQuestionsAnswered) {
        // Display a thank you message
        questionDiv.innerHTML = "<h2>Thank you for completing the questionnaire!</h2>";
        // Redirect to the next page here
    } else {
        // Check if all subsubquestions of the current subquestion have been answered
        const currentQuestion = questions[currentQuestionIndex];
        const currentSubquestion = currentQuestion.subquestions.find(subquestion => {
            if (subquestion.subsubquestions) {
                return subquestion.subsubquestions.some(subsubquestion => !userAnswers[subsubquestion.question]);
            }
            return false;
        });

        if (!currentSubquestion) {
            // All subsubquestions of the current subquestion have been answered, proceed to the next subquestion
            currentQuestionIndex++;
            displayQuestion();
        }
    }
}

// Display the first question when the page loads
window.onload = displayQuestion();