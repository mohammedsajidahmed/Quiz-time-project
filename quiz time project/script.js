const startQuizBtn = document.querySelector('.start-btn');
const container = document.querySelector('.container');
const quizContainer = document.querySelector('.quiz-container');
const nextPage = document.querySelector('.next-quiz-page');
const iconsContainer = document.createElement('div');
quizContainer.append(iconsContainer);
iconsContainer.setAttribute('class', 'icons-container');
const quizIcon = document.createElement('img');
quizIcon.src = 'quiz.svg';
quizIcon.setAttribute('class', 'quiz-icon');
const volumeIcon = document.createElement('img');
volumeIcon.src = '🦆 icon _Volume Up_.svg';
volumeIcon.setAttribute('class', 'volume-Icon');
iconsContainer.append(quizIcon);
iconsContainer.append(volumeIcon);
const result = document.querySelector('.show-result');
let score = 0;
const showHighestScore = document.querySelector('.show-highest-score');

const scoreValue = document.querySelector('.score-value');

const arrayOfObj = [
  {
    question: 'What is the goal of DOCTYPE',
    A: 'First line of code required in every HTML or XHTML document',
    B: 'To load HTML',
    C: 'To load CSS',
    D: 'To load JavaScript',
    answer: 'First line of code required in every HTML or XHTML document',
  },
  {
    question: 'What is the purpose of nav bar',
    A: 'To provide navigation links, either within the current document or to other documents',
    B: 'To provide anchor links',
    C: 'To provide header',
    D: 'To provide footer',
    answer: 'To provide navigation links, either within the current document or to other documents',
  },
  {
    question: 'What does HTML stands for?',
    A: 'hello',
    B: 'Hypertext Markup Language',
    C: 'hell makeup language',
    D: 'Hypotext meetup Language',
    answer: 'Hypertext Markup Language',
  },
  {
    question: 'What does CSS stands for?',
    A: 'Cascading Style Sheet',
    B: 'Corrosive Style Sheet',
    C: 'Cascading Sheet Style',
    D: 'Cesceding Style Seet',
    answer: 'Cascading Style Sheet',
  },
  {
    question: 'What is the use of float property in CSS?',
    A: 'it places an element on the left or right side of its container, allowing text and inline elements to wrap around it.',
    B: 'it places an element in HTML',
    C: 'it places an element in CSS',
    D: 'it places an element in Script',
    answer: 'it places an element on the left or right side of its container, allowing text and inline elements to wrap around it.',
  }
];


const div = document.createElement('div');
quizContainer.append(div);
div.setAttribute('class', 'test');
const test = document.querySelector('.test');
let submitted = false;
let currentQuestion = 0;

function renderQuestion() {
  showHighestScore.innerHTML = `Highest Score: ${localStorage.getItem('score')}/5`;
  let myTimeOut;
  let time = 20;
  clearTimeout(myTimeOut);
  let clicked;
  const question = arrayOfObj[currentQuestion];

  let generatedHTML = `
  <div class="html-container">
  <div class="question-container">${question.question}</div>

  <div class="timer-container">
  <div class="timer"></div>
  </div>

  <div class="answer-box-container">
  <div class="answer-box">
  <input class="input-radio" type="radio" name="answer" id="radio-1" value="${question.A}"><label for="radio">${question.A}</label>
  </div>

  <div class="answer-box">
  <input  class="input-radio" type="radio" name="answer" id="radio-2"  value="${question.B}"><label for="radio">${question.B}</label>
  </div>

  <div class="answer-box">
  <input class="input-radio" type="radio" name="answer" id="radio-3" value="${question.C}"><label for="radio">${question.C}</label>
  </div>


  <div class="answer-box">
  <input class="input-radio"  type="radio" name="answer" id="radio-4" value="${question.D}"><label for="radio">${question.D}</label>
  </div>
  </div>

  <button class="submit-btn">Submit</button>
  <button class="next-page-btn">Next</button>


  <div class="message"></div>
  </div>
  `;
  div.innerHTML = generatedHTML;
  const nextPageBtn = document.querySelector('.next-page-btn');
  const message = document.querySelector('.message');
  const submitBtn = document.querySelector('.submit-btn');
  const radioButtons = document.getElementsByName('answer');
  const timer = document.querySelector('.timer');
  let radioButtonsValue;

  timer.style.display = 'flex';

  if (submitted || currentQuestion == '1' || currentQuestion == '2' || currentQuestion == '3' || currentQuestion == '4' || currentQuestion == '5') {
    time = 20;
    myTimeOut = setInterval(startTime, 1000);
  } 

 
  startQuizBtn.addEventListener('click', () => {
    score = 0;
    quizContainer.style.display = 'block';
    test.style.display = 'block';
    container.style.display = 'none';
    document.body.style.backgroundColor = '#CCE2C2';
    myTimeOut = setInterval(startTime, 1000);
  });

  submitBtn.addEventListener('click', () => {
    radioButtons.forEach((radio) => {
      if (radio.checked) {
        radioButtonsValue = radio.value;
      }
      if (radioButtonsValue === question.answer) {
        message.innerHTML = 'correct';
        message.style.color = 'green';
      }

      if (radioButtonsValue !== question.answer) {
        message.innerHTML = 'wrong';
        message.style.color = 'red';
      }
      if (radioButtonsValue === undefined) {
        message.innerHTML = 'Please select an option to proceed';
        return;
      }

      submitted = true;
      clicked = true;
      
      clearTimeout(myTimeOut);
      if(submitted){
        radioButtons.forEach((radio) => {
          radio.disabled = true;
        });
        submitBtn.style.cursor = 'not-allowed';
        submitBtn.disabled = true;
      }
    });

    if(submitted && radioButtonsValue === question.answer){
      score=score+1;
    }
  });

  nextPageBtn.addEventListener('click', () => {
    radioButtons.forEach((radio) => {
      if (radio.checked) {
        radioButtonsValue = radio.value;
        message.innerHTML = 'Please submit your answer before proceeding';
      }
    });


    if (time == -1 && currentQuestion < arrayOfObj.length - 1) {
      currentQuestion++;
      renderQuestion();
      
    }

    if(!radioButtonsValue && currentQuestion === arrayOfObj.length - 1 && time==-1){
      test.style.display = 'none';
      displayResult.style.display = 'block';
      scoreValue.innerHTML = `${score}/5`;
      localStorage.setItem('score', score);
      showResult();
    }

    if(!radioButtonsValue && currentQuestion === arrayOfObj.length - 1 && time==-1 && !submitted){
      displayResult.style.display = 'block';
      scoreValue.innerHTML = `${score}/5`;
      localStorage.setItem('score', score);
      showResult();
    }

    if (!radioButtonsValue) {
      message.innerHTML = 'Please select an answer to proceed';
      message.style.color = 'red';
      return;
    } else {
      message.innerHTML = 'kindly submit your answer before proceeding';
      message.style.color = 'red';
      if (currentQuestion === arrayOfObj.length - 1 && time==-1) {
        test.style.display = 'none';
        displayResult.style.display = 'block';
        scoreValue.innerHTML = `${score}/5`;
        localStorage.setItem('score', score);
        showResult();
      }
      if(currentQuestion === arrayOfObj.length-1 && submitted){
        test.style.display = 'none';
        displayResult.style.display = 'block';
        scoreValue.innerHTML = `${score}/5`;
        localStorage.setItem('score', score);
        showResult();
      }

      if(currentQuestion === arrayOfObj.length-1){
        time = 0;
        clearTimeout(myTimeOut);
        document.body.style.backgroundColor = '#CCE2C2';
      }
    }

    if (submitted && clicked) {
      if (currentQuestion < arrayOfObj.length - 1) {
        currentQuestion++;
        renderQuestion();
      } else {
        return;
      }
    }

  });



  function startTime() {
    if (time < 10) {
      timer.innerHTML = `00:0${time--}`;
    } else {
      timer.innerHTML = `00:${time--}`;
    }
    if (time < 15 && time > 5) {
      document.body.style.backgroundColor = 'rgb(228, 229, 199)';
      timer.classList.add('time-almost-up');
      timer.classList.remove('time-started');
      timer.classList.remove('time-up');
    }
    if (time >= 15) {
      document.body.style.backgroundColor = 'rgb(204,226,194)';
      timer.classList.add('timer-started');
      timer.classList.remove('time-almost-up');
      timer.classList.remove('time-up');
      
    }
    if (time < 5 && time > 1) {
      document.body.style.backgroundColor = 'rgb(219, 173, 173)';
      timer.classList.remove('timer-started');
      timer.classList.remove('time-almost-up');
      timer.classList.add('time-up');
    
    }
    if (time == '-1') {

      clearTimeout(myTimeOut);
      timer.innerHTML = `Time's up! 00:00`;
      timer.classList.add('time-up');
      timer.classList.remove('timer-started');
      timer.classList.remove('time-almost-up');
      // radioButtons.forEach((radio) => {
      //   radio.disabled = true;
      // });
      submitBtn.style.cursor = 'not-allowed';
      submitBtn.disabled = true;
    }
  }


  //retry/restart quiz
  const retryBtn = document.querySelector('.retry-button');
  retryBtn.addEventListener('click',()=>{
    container.style.display = 'block';
    displayResult.style.display = 'none';
    currentQuestion = 0;
    submitted = false;
    clearTimeout(myTimeOut);
    renderQuestion();
  })

  //show result
  function showResult() {
    const green = document.querySelector('.green');
        const greenPercentage = document.querySelector('.greeen-percentage');
        const redPercentage = document.querySelector('.red-percentage');
        const red = document.querySelector('.red');
        const quote = document.querySelector('.quote');
        if(score == '1'){
          green.style.width = '20%';
          green.style.backgroundColor = 'lime';
          red.style.backgroundColor = 'red';
          red.style.width = '80%';
          greenPercentage.innerHTML = '20%';
          redPercentage.innerHTML = '80%';
          quote.innerHTML = `"Keep learning, you have a lot to improve!"`;
        }
        if(score == '2'){
          green.style.width = '40%';
          green.style.backgroundColor = 'lime';
          red.style.backgroundColor = 'red';
          red.style.width = '60%';
          greenPercentage.innerHTML = '40%';
          redPercentage.innerHTML = '60%';
          quote.innerHTML = `"Work harder"`;
        }
        if(score == '3'){
          green.style.width = '60%';
          green.style.backgroundColor = 'lime';
          red.style.backgroundColor = 'red';
          red.style.width = '40%';
          greenPercentage.innerHTML = '60%';
          redPercentage.innerHTML = '40%';
          quote.innerHTML = `"Keep learning, you have a good score!"`;
        }
        if(score == '4'){
          green.style.width = '80%';
          green.style.backgroundColor = 'lime';
          red.style.backgroundColor = 'red';
          red.style.width = '20%';
          greenPercentage.innerHTML = '80%';
          redPercentage.innerHTML = '20%';
          quote.innerHTML = `"very good!"`;
        }

        if(score == '5'){
          green.style.width = '100%';
          green.style.backgroundColor = 'lime';
          red.style.width = '0%';
          greenPercentage.innerHTML = '100%';
          redPercentage.innerHTML = '0%';
          quote.innerHTML = `"Excellent!!"`;
        }
        if(score == '0'){
          red.style.width = '100%';
          green.style.width = '0%';
          red.style.backgroundColor = 'red';
          redPercentage.innerHTML = '100%';
          greenPercentage.innerHTML = '0%';
          quote.innerHTML = `"You need to work a lot"`;
        }
  }
}

renderQuestion();

const displayResult = document.querySelector('.display-result');
