const startButton = document.getElementById('start-button');
const header = document.getElementById('question');
const possibleAnswers = document.getElementById('posible-answers');
const buttonOne = document.getElementById('button-one');
const buttonTwo = document.getElementById('button-two');
const buttonThree = document.getElementById('button-three');
const buttonFour = document.getElementById('button-four');
let correctNumberOfAnswers = 0;
let currentQuestion = 0;


let setButtons = () => {
    [buttonOne.innerText, buttonTwo.innerText, buttonThree.innerText, buttonFour.innerText] = [...data[currentQuestion].possibleAnswers];
}

let setQuestion = () => {
    header.innerHTML = data[currentQuestion].question;
}

let finalScreen  = () => {
    header.innerHTML = 'Enhorabuena!';
    possibleAnswers.remove()
    let message = document.createElement("p");
    message.innerHTML = `Number of correct answers: ${correctNumberOfAnswers}`;
    header.insertAdjacentElement('afterend', message);
}

let addOnClickToButtons = () => {
    possibleAnswers.addEventListener('click', (event) => {
        if(event.srcElement.tagName === 'BUTTON') {
            if(event.target.textContent === data[currentQuestion].correctAnswer){
                correctNumberOfAnswers++;
            }
            currentQuestion++;
            if(data[currentQuestion]){
                setButtons();
                setQuestion();
            } else {
                finalScreen()
            }
        }
    })
};

let startGame = () => {
    startButton.remove();
    setQuestion();
    setButtons();
    addOnClickToButtons();
};



startButton.addEventListener('click', startGame);

