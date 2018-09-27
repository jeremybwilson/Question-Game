const questionField = document.getElementById("question");
const start = document.getElementById("start-game");


function getQuestion(){
    axios.get("https://opentdb.com/api.php?amount=1&type=boolean")
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
        // questionField.textContent = question;
        
        return conditions.question
    })
    .then((question)=>{
        console.log(question)
    })
    .catch((err)=>{
        console.log(err)
    })
}






start.onclick = function(){
    getQuestion();
}