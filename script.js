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

let appendElement = (element, text, parentElement, id) => {
    let elementToAppend = document.createElement(element);
    elementToAppend.innerText = text;
    if(id){
        elementToAppend.id = id;
    }
    parentElement.appendChild(elementToAppend);
};

let result = () => {
    let resultDiv = document.createElement("div");
    resultDiv.className = 'result'
    container.appendChild(resultDiv);
    

    data.forEach( (question, index) => {
        let questionResult = document.createElement('div');
        questionResult.className = 'question-result';
        resultDiv.appendChild(questionResult)



        appendElement('div', '', questionResult, `div1-${index}`);
        let div1 = document.getElementById(`div1-${index}`)
        div1.className = "result-row";
        appendElement('h2', 'Question: ', div1);
        appendElement('p', data[index].question, div1);

        appendElement('div', '', questionResult, `div2-${index}`);
        let div2 = document.getElementById(`div2-${index}`)
        div2.className = "result-row";

        appendElement('h2', 'Answer submitted: ', div2);
        appendElement('p', answersSubmitted[index], div2);


        appendElement('div', '', questionResult, `div3-${index}`);
        let div3 = document.getElementById(`div3-${index}`)
        div3.className = "result-row";

        appendElement('h2', 'Correct Answer: ', div3);
        appendElement('p', data[index].correctAnswer, div3);
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
    header.removeAttribute('hidden');
    possibleAnswers.removeAttribute('hidden')
    setQuestion();
    setButtons();
    addOnClickToButtons();
};



startButton.addEventListener('click', startGame);

