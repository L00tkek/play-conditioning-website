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
const userAnswers = {};

// Function to display all questions
function displayQuestions() {
    let questionHTML = '';

    questions.forEach((question, index) => {
        questionHTML += `
            <h3>${question.question}</h3>
        `;

        if (question.subquestions) {
            question.subquestions.forEach((subquestion, subIndex) => {
                questionHTML += `
                    <h4>${subquestion.question}</h4>
                `;

                if (subquestion.subsubquestions) {
                    subquestion.subsubquestions.forEach((subsubquestion, subsubIndex) => {
                        questionHTML += `
                            <h5>${subsubquestion.question}</h5>
                            <div class="radio-group">
                                ${subsubquestion.options.map(option => `
                                    <div>
                                        <input type="radio" id="q${index}-sq${subIndex}-ssq${subsubIndex}-option${subsubquestion.options.indexOf(option)}" name="q${index}-sq${subIndex}-ssq${subsubIndex}" value="${option}" required>
                                        <label for="q${index}-sq${subIndex}-ssq${subsubIndex}-option${subsubquestion.options.indexOf(option)}">${option}</label>
                                    </div>
                                `).join('')}
                            </div>
                        `;
                    });
                } else {
                    questionHTML += `
                        <div class="radio-group">
                            ${subquestion.options.map(option => `
                                <div>
                                    <input type="radio" id="q${index}-sq${subIndex}-option${subquestion.options.indexOf(option)}" name="q${index}-sq${subIndex}" value="${option}" required>
                                    <label for="q${index}-sq${subIndex}-option${subquestion.options.indexOf(option)}">${option}</label>
                                </div>
                            `).join('')}
                        </div>
                    `;
                }
            });
        } else {
            questionHTML += `
                <div class="radio-group">
                    ${question.options.map(option => `
                        <div>
                            <input type="radio" id="q${index}-option${question.options.indexOf(option)}" name="q${index}" value="${option}" required>
                            <label for="q${index}-option${question.options.indexOf(option)}">${option}</label>
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

    questionDiv.innerHTML = "<h2>Thank you for participating!</h2>";
    document.getElementById("submit-btn").style.display = "none";
}

// Display the questions when the page loads
window.onload = displayQuestions();

// Add an event listener for form submission
const surveyForm = document.getElementById('post-survey');
surveyForm.addEventListener('submit', handleSubmit);