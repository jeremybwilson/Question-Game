const questionField = document.getElementById("question"),
      start = document.getElementById("start-game"),
      answers = document.querySelector("#answers_button"),
      btnTrue = document.querySelector("#true"),
      btnFalse = document.querySelector("#false"),
      url = "https://opentdb.com/api.php?amount=1&type=boolean",
      btnAnswers = document.getElementsByClassName('btn_answer');


let questionRes = {};


// Get question from server
function getQuestion(){
    axios.get(url)
    .then((req)=>{
        return req.data
    })
    .then((data)=>{
        return data.results
    })
    .then((results)=>{
        return results[0]
    })
    .then((conditions)=>{
        // paste question to question field
        questionField.innerHTML = conditions.question;
        
        // show buttons with answer
        answers.classList.remove('hide');
        answers.classList.add('show');
        
        // add answers in questionRes variable 
        questionRes.correct = conditions.correct_answer;
        questionRes.incorrect = conditions.incorrect_answers[0];

        // console.log(conditions.correct_answer);
        // console.log(conditions.incorrect_answers[0]);


    })
    .catch((err)=>{
        questionField.innerHTML = "Something gone wrong, try again!";
    })
}





// use getQuestion wile press btn start
start.onclick = function(){
    getQuestion();
    start.textContent = "Next question";
    resetClasses();    
}

// create logic of game
// we need to take userAnswer, and check, if user answer === answer

btnTrue.onclick = () => {
    checkCorrect();
    btnTrue.classList.add('userChoice');
}

btnFalse.onclick = () => {
    checkCorrect();
    btnFalse.classList.add('userChoice');
}

// Logic functions

// check answer and get correct style classes to buttons
checkCorrect = () => {
    if(questionRes.correct === "True"){
        btnTrue.classList.add('correct');
        btnFalse.classList.add('incorrect');
    } else {
        btnTrue.classList.add('incorrect');
        btnFalse.classList.add('correct');
    }
}


// reset classes

resetClasses = () => {
    btnTrue.classList.remove('correct');
    btnTrue.classList.remove('incorrect');
    btnTrue.classList.remove('userChoice');

    btnFalse.classList.remove('correct');
    btnFalse.classList.remove('incorrect');
    btnFalse.classList.remove('userChoice');
}