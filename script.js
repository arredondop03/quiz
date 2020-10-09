const startButton = document.getElementById('start-button');
const header = document.getElementById('question');
const possibleAnswers = document.getElementById('posible-answers');
const buttonOne = document.getElementById('button-one');
const buttonTwo = document.getElementById('button-two');
const buttonThree = document.getElementById('button-three');
const buttonFour = document.getElementById('button-four');
const container = document.getElementById('container')
let correctNumberOfAnswers = 0;
let currentQuestion = 0;
const answersSubmitted = [];

const startGame = () => {
    startButton.disabled = true;
    setTimeout(() => {
        startButton.remove();
        container.style.display = 'flex';
        setQuestion();
        setButtons();
        setButtonClick();
    }, 300)
};

startButton.addEventListener('click', startGame);

const setButtons = () => {
    [buttonOne.innerText, buttonTwo.innerText, buttonThree.innerText, buttonFour.innerText] = [...data[currentQuestion].possibleAnswers];
};

const setQuestion = () => {
    header.innerHTML = data[currentQuestion].question;
};

const setButtonClick = () => {
    possibleAnswers.addEventListener('click', (event) => {
        if (event.target.tagName === 'BUTTON') {
            trackAnswers(event)
            event.target.blur()
            event.target.disabled = true

            setTimeout(function () {
                event.target.disabled = false;

                if (data[currentQuestion]) {
                    setButtons();
                    setQuestion();
                } else {
                    finalScreen();
                };
            }, 300);
        };
    })
};

const trackAnswers = (event) => {
    if (event.target.textContent === data[currentQuestion].correctAnswer) {
        correctNumberOfAnswers++;
    }
    answersSubmitted.push(event.target.textContent);
    currentQuestion++;
};

const finalScreen = () => {
    header.innerHTML = correctNumberOfAnswers >= 4 ? 'Enhorabuena!' : 'Better luck next time';
    possibleAnswers.remove();
    appendElement('p', `Number of correct answers: ${correctNumberOfAnswers}`, container)
    result();
};

const result = () => {
    appendElement('div', '', container, 'result');
    const resultDiv = document.getElementById('result');

    data.forEach((question, index) => {
        const questionResult = document.createElement('div');
        questionResult.className = 'question-result';
        resultDiv.appendChild(questionResult)

        createResultRow('question', 'Question: ', question.question, questionResult, index)
        createResultRow('answer-submitted', 'Answer submitted: ', answersSubmitted[index], questionResult, index)
        createResultRow('correct-answer', 'Correct Answer: ', question.correctAnswer, questionResult, index)
    })
};

const appendElement = (element, text, parentElement, id) => {
    const elementToAppend = document.createElement(element);
    elementToAppend.innerText = text;
    if (id) {
        elementToAppend.id = id;
    }
    parentElement.appendChild(elementToAppend);
};

const createResultRow = (type, title, text, parentElement, index) => {
    appendElement('div', '', parentElement, `${type}-${index}`);
    const div1 = document.getElementById(`${type}-${index}`)
    div1.className = "result-row";
    appendElement('h2', title, div1);
    appendElement('p', text, div1);
};