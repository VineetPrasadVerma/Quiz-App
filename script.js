const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonElement = document.getElementById('answer-button')

let shuffledQuestion = []
let currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestions()
})

function startGame () {
  // console.log('test')

  startButton.classList.add('hide')
  shuffledQuestion = questions.sort(() => Math.random() - 0.5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestions()
}

function setNextQuestions () {
  resetState()
  showQuestion(shuffledQuestion[currentQuestionIndex])
}

function resetState () {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonElement.firstChild) {
    answerButtonElement.removeChild(answerButtonElement.firstChild)
  }
}
// dataset property provides read and write acces to custom data attributes
function showQuestion (question) {
  questionElement.innerText = question.question
  question.answers.forEach(ans => {
    const button = document.createElement('button')
    button.innerText = ans.text
    button.classList.add('btn')
    if (ans.correct) {
      button.dataset.correct = ans
    }
    button.addEventListener('click', selectAnswer)
    answerButtonElement.appendChild(button)
  })
}

function selectAnswer (e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  // if(correct){
  //     selectedButton.classList.add()
  // }
  setStatusClass(document.body, correct)
  Array.from(answerButtonElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (shuffledQuestion.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    startButton.innerText = 'Restart'
    startButton.classList.remove('hide')
  }
}

function setStatusClass (element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}

function clearStatusClass (element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}

const questions = [
  {
    question: 'Which of the following is not a reserved word in JavaScript?',
    answers: [
      { text: 'Interface', correct: false },
      { text: 'Program', correct: true },
      { text: 'Short', correct: false },
      { text: 'throws', correct: false }
    ]
  },
  {
    question: 'Predcit the output \n <script type="text/javascript"> \n a = 8 + "8"; \n document.write(a); </script> ',
    answers: [
      { text: '16', correct: false },
      { text: 'Compilation Error', correct: false },
      { text: '88', correct: true },
      { text: 'Runtime Error', correct: false }
    ]
  },
  {
    question: 'var x=5; \n var y=6; \n var res=eval("x*y"); \n document.write(res);',
    answers: [
      { text: '"30"', correct: false },
      { text: '30', correct: true },
      { text: '5*6', correct: false },
      { text: '"5*6"', correct: false }
    ]
  },
  {
    question: 'Which of the following function of Array object creates a new array with all of the \n elements of this array for which the provided filtering function returns true?',
    answers: [
      { text: 'concat', correct: false },
      { text: 'every', correct: false },
      { text: 'some', correct: false },
      { text: 'filter', correct: true }
    ]
  },
  {
    question: ' Which of the following is not a valid JavaScript variable name?',
    answers: [
      { text: '2names', correct: true },
      { text: '_first_and_last_names', correct: false },
      { text: 'FirstAndLast', correct: false },
      { text: 'None of the above', correct: false }
    ]
  }
]
