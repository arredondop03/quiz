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


let setButtons = () => {
    [buttonOne.innerText, buttonTwo.innerText, buttonThree.innerText, buttonFour.innerText] = [...data[currentQuestion].possibleAnswers];
};

let setQuestion = () => {
    header.innerHTML = data[currentQuestion].question;
};

let finalScreen  = () => {
    header.innerHTML = 'Enhorabuena!';
    possibleAnswers.remove();
    let message = document.createElement("p");
    message.innerHTML = `Number of correct answers: ${correctNumberOfAnswers}`;
    container.appendChild(message);
    result( );
};

let result = () => {
    let resultDiv = document.createElement("div");

    container.appendChild(resultDiv);

    data.forEach( (question, index) => {
        console.log(index)
        let questionTitle = document.createElement("h2");
        questionTitle.innerText = 'Question: ';
        resultDiv.appendChild(questionTitle);

        let actualQuestion = document.createElement("p");
        actualQuestion.innerText = data[index].question;
        resultDiv.appendChild(actualQuestion);

        let answerSubmittedTitle = document.createElement("h2");
        answerSubmittedTitle.innerText = 'Answer submitted: ';
        resultDiv.appendChild(answerSubmittedTitle);

        let actualSnswerSubmitted = document.createElement("p");
        actualSnswerSubmitted.innerText = answersSubmitted[index];
        resultDiv.appendChild(actualSnswerSubmitted);

        let correctAnswerTitle = document.createElement("h2");
        correctAnswerTitle.innerText = 'Correct Answer: ';
        resultDiv.appendChild(correctAnswerTitle);

        let actualCorrectAnswer = document.createElement("p");
        actualCorrectAnswer.innerText = data[index].correctAnswer;
        resultDiv.appendChild(actualCorrectAnswer);
        
        let line = document.createElement('hr');
        resultDiv.appendChild(line)
    })
};


let addOnClickToButtons = () => {
    possibleAnswers.addEventListener('click', (event) => {
        if(event.srcElement.tagName === 'BUTTON') {
            if(event.target.textContent === data[currentQuestion].correctAnswer){
                correctNumberOfAnswers++;
            }
            answersSubmitted.push(event.target.textContent);
            currentQuestion++;
            if(data[currentQuestion]){
                setButtons();
                setQuestion();
            } else {
                finalScreen();
            };
        };
    })
};

let startGame = () => {
    startButton.remove();
    setQuestion();
    setButtons();
    addOnClickToButtons();
};



startButton.addEventListener('click', startGame);

