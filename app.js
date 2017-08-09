'use strict'

let scoreCount = 0;
let counter = 0;
let displayCounter = counter + 1;

const QUESTIONS = [
//1
{ 
  question: "What is the real name of the mysterious old man you talk to when Link wakes up?",
  answers: ["King Bob", "King Aurthor", "King Impa", "King Rhoam", ],
  correctAnswer: "King Rhoam",
},
//2
{ 
  question: "What color are the first rank Bokoblins you fight?",
  answers: ["Black", "Blue", "Red", "Yellow",],
  correctAnswer: "Red",
},
//3
{ 
  question: "When you discover a Korok, what do they hand you as a reward?",
  answers: ["Korok Plant", "Korok Seed", "Korok Candy", "Korok Money", ],
  correctAnswer: "Korok Seed",
},
//4
{ question: "Which 4 are the correct champion’s names?",
  answers: ["Daruk, Mipa, Ron, Urbosi" , "Mitaa, Darku, Ravali, Urbose" , "Revali, Urbosa, Mipha, Darke", "Mipha, Daruk, Revali, Urbosa", ],
  correctAnswer: "Mipha, Daruk, Revali, Urbosa",
},
//5
{ question: "What is the name of the group that is trying to kill Link?",
  answers: ["Yiga Gang", "Rito Clan", "Yiga Clan", "Rito Gang", ],
  correctAnswer: "Yiga Clan",
},

];


function startQuiz() {
  $('.start-button').on('click', function(event) {
    console.log('Hide start page and display questions');
    $('#quiz-questions').removeClass("hide-display");
    $('#start-page').addClass("hide-display");
   $('#quiz-nav').removeClass("hide-display");
  });
}


function generateQuestions(counter) {
  if (counter < 5) {
    let currentQuestion = QUESTIONS[counter];
    let quizHTML = `
      <form>
      <h1 class="question-one">${currentQuestion.question}</h1>
      <fieldset class="options">
        <input type="radio" name="question-option" id="question-option-one" class='grid' value="${currentQuestion.answers[0]}">
        <label for="question-option-one">${currentQuestion.answers[0]}</label>
        
        <input type="radio" name="question-option" id="question-option-two" class='grid' value="${currentQuestion.answers[1]}">
        <label for="question-option-two">${currentQuestion.answers[1]}</label>
        
        <input type="radio" name="question-option" id="question-option-three" class='grid' value="${currentQuestion.answers[2]}">
        <label for="question-option-three">${currentQuestion.answers[2]}</label>
        
        <input type="radio" name="question-option" id="question-option-four" class='grid' value="${currentQuestion.answers[3]}">
        <label for="question-option-four">${currentQuestion.answers[3]}</label>
      </fieldset>
      </form> 
      <p> ${counter + 1}/5</p>
      <p>Score: ${scoreCount}/5</p>`;
    $('#quiz-questions').html(quizHTML);
  };
}



function answerFeedback (counter) {
  if (counter < 5) {
    let correctAnswer = QUESTIONS[counter].correctAnswer;
    $('input[type=radio]').click(function(event) {
      $('.options').children('input').attr('disabled', true); 
      let userAnswer = $(this).val();
      if (userAnswer === correctAnswer) {
        scoreCount += 1;
        $('input[type=radio]:checked').next('label').addClass('correct-answer');
        $('#quiz-questions').append(`<p class='correct-answer'>...HHYAAAH!!!!...Princess Zelda is proud!! Keep going!!...</p>`);
      } else {
        $('#quiz-questions').append(`<p class='correct-answer'>HEY LISTEN!...you got it wrong... the correct answer is... ${correctAnswer}...</p>`)
        $('input[type=radio]:checked').next('label').addClass('wrong-answer');
      }
    });
  }
}


function preventClickNextButton () {
  $('.next-button').attr('disabled', true);
  $('.options').children('input').on('click', function () {
     if ($(this).prop("checked") === true) {
      $('.next-button').attr('disabled', false);

      }
    });
}


function nextQuestionButton () {
  preventClickNextButton();
  $('.next-button').click(function(event) {
    console.log('next button clicked');
    counter += 1;
    generateQuestions(counter);
    answerFeedback(counter);
    preventClickNextButton();
    console.log(counter);
  });
}


function finalFeedback() {
  $('.next-button').on('click', function() {
    if (counter === 5) {
      $('#quiz-questions').addClass('hide-display');
      $('#quiz-nav').addClass("hide-display");
      $('.feedback-page').removeClass('hide-display');
      $('.final-score').append(`HEY LISTEN!! You got a ${scoreCount}/5!`)
    }
  });
}


function ReEnter() {
  $('.reEnter-button').on('click', function() {
    document.location.reload();
  });
}


function renderQuiz() {
  startQuiz();
  generateQuestions(counter);
  answerFeedback(counter);
  nextQuestionButton();
  finalFeedback();
  ReEnter();
}

$(renderQuiz);