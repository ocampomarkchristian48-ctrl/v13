let questions=[
{question:"1. A bag has 5 red and 5 blue balls. What is the probability of picking a red ball?",answers:["1/2","1/5","2/5","3/5"],correct:0},
{question:"2. A coin is flipped once. What is the probability of getting tails?",answers:["1/2","1/3","1/4","1"],correct:0},
{question:"3. A die is rolled. What is the probability of getting a number greater than 4?",answers:["1/6","1/3","1/2","2/3"],correct:1},
{question:"4. A card is drawn from a 52-card deck. What is the probability of getting a king?",answers:["1/52","1/13","1/4","1/26"],correct:1},
{question:"5. A bag has 2 green, 3 blue, and 5 red balls. What is the probability of picking a green ball?",answers:["1/10","1/5","2/5","1/2"],correct:1},
{question:"6. All birds can fly. Tweety is a bird. What is logically true?",answers:["Tweety can swim","Tweety can fly","Tweety is a fish","Tweety is a reptile"],correct:1},
{question:"7. All dogs are animals. Max is a dog. What can we conclude?",answers:["Max is an animal","Max is a cat","Max is a bird","Max is a plant"],correct:0},
{question:"8. All teachers teach students. Anna is a teacher. What is true?",answers:["Anna teaches students","Anna is a student","Anna is a driver","Anna is a doctor"],correct:0},
{question:"9. If it rains, the ground becomes wet. It is raining. What is true?",answers:["Ground is dry","Ground is wet","No clouds","Sun is shining"],correct:1},
{question:"10. All programmers use computers. Leo is a programmer. What is true?",answers:["Leo uses computer","Leo is a pilot","Leo is a farmer","Leo is a driver"],correct:0}
];

let currentQuestion=0;
let score=0;

function startGame(){
currentQuestion=0;
score=0;

document.getElementById("score").innerText=0;

// show description
document.getElementById("startScreen").classList.add("hidden");
document.getElementById("descScreen").classList.remove("hidden");

// siguradong naka hide quiz
document.getElementById("quizScreen").classList.add("hidden");
}

function startLevel1(){

let name=document.getElementById("playerName").value.trim();
if(name===""){
alert("Enter your name first!");
return;
}

// show quiz
document.getElementById("descScreen").classList.add("hidden");
document.getElementById("quizScreen").classList.remove("hidden");

showQuestion();
}

function showQuestion(){

let q=questions[currentQuestion];
document.getElementById("question").innerText=q.question;

let answersDiv=document.getElementById("answers");
answersDiv.innerHTML="";

q.answers.forEach((answer,index)=>{
let btn=document.createElement("button");
btn.innerText=answer;
btn.classList.add("answerBtn");

btn.onclick=function(){
selectAnswer(btn,index);
};

answersDiv.appendChild(btn);
});

document.getElementById("progressText").innerText=
"Question "+(currentQuestion+1)+" / "+questions.length;

let progress=(currentQuestion/questions.length)*100;
document.getElementById("progressFill").style.width=progress+"%";
}

function selectAnswer(button,index){

let q=questions[currentQuestion];
let buttons=document.querySelectorAll(".answerBtn");

buttons.forEach(b=>b.disabled=true);

if(index===q.correct){
button.classList.add("correct");
score++;
document.getElementById("score").innerText=score;
}else{
button.classList.add("wrong");
buttons[q.correct].classList.add("correct");
}

document.getElementById("nextBtn").classList.remove("hidden");
}

function nextQuestion(){

currentQuestion++;
document.getElementById("nextBtn").classList.add("hidden");

if(currentQuestion<questions.length){
showQuestion();
}else{
showResult();
}
}

function showResult(){

document.getElementById("quizScreen").classList.add("hidden");
document.getElementById("resultScreen").classList.remove("hidden");

let percent=Math.round((score/questions.length)*100);

document.getElementById("resultScore").innerText="Your Score: "+percent+"%";

if(percent>=70){
document.getElementById("resultTitle").innerText="🎉 You're Passed!";
document.getElementById("continueBtn").classList.remove("hidden");
}else{
document.getElementById("resultTitle").innerText="❌ You Failed";
document.getElementById("retryBtn").classList.remove("hidden");
}

saveScore(percent);
loadScoreboard();
}

function saveScore(percent){

let name=document.getElementById("playerName").value;
let scores=JSON.parse(localStorage.getItem("scores"))||[];

scores.push({name:name,percent:percent});
localStorage.setItem("scores",JSON.stringify(scores));
}

function loadScoreboard(){

let board=document.getElementById("scoreboard");
board.innerHTML="";

let scores=JSON.parse(localStorage.getItem("scores"))||[];
scores.reverse();

scores.forEach(s=>{
let row=document.createElement("div");
row.className="scoreRow";
row.innerHTML="<span>"+s.name+"</span><span>"+s.percent+"%</span>";
board.appendChild(row);
});
}

function retryGame(){
location.reload();
}
