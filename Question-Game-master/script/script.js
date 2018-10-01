const questionField = document.getElementById("question"),
      start = document.getElementById("start-game"),
      answers = document.querySelector("#answers_button"),
      btnTrue = document.querySelector("#true"),
      btnFalse = document.querySelector("#false"),
      url = "https://opentdb.com/api.php?amount=1&type=boolean",
      btnAnswers = document.getElementsByClassName('btn_answer'),
      isActive = true;


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
        start.textContent = "Next question";

        // console.log(conditions.correct_answer);
        // console.log(conditions.incorrect_answers[0]);


    })
    .catch((err)=>{
        questionField.innerHTML = "Server doesn't answer, try again!";
    })
}





// use getQuestion wile press btn start
start.onclick = function(){
    getQuestion();
    resetClasses();    
}

// create logic of game
// we need to take userAnswer, and check, if user answer === answer



btnTrue.onclick = () => {
    if(checkCorrect()){
        btnTrue.innerHTML = '<i class="far fa-smile"></i> True';
    } else {
        btnTrue.innerHTML = '<i class="far fa-angry"></i> True';
    }
    btnTrue.classList.add('userChoice');
    
    
    
}

btnFalse.onclick = () => {
    if(!checkCorrect()){
        btnFalse.innerHTML = '<i class="far fa-smile"></i> False';
    } else {
        btnFalse.innerHTML = '<i class="far fa-angry"></i> False';    
    }

    btnFalse.classList.add('userChoice');
    
}

// Logic functions

// check answer and get correct style classes to buttons
checkCorrect = () => {
    if(questionRes.correct === "True"){
        btnTrue.classList.add('correct');
        btnFalse.classList.add('incorrect');
        return true;
    } else {
        btnTrue.classList.add('incorrect');
        btnFalse.classList.add('correct');
        return false;
    }
}


// reset classes

resetClasses = () => {
    btnTrue.classList.remove('correct');
    btnTrue.classList.remove('incorrect');
    btnTrue.classList.remove('userChoice');
    btnTrue.textContent = "True";

    btnFalse.classList.remove('correct');
    btnFalse.classList.remove('incorrect');
    btnFalse.classList.remove('userChoice');
    btnFalse.innerHTML = "False";
}