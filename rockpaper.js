//it stores as a string. So,convert it into object using parse
let score=JSON.parse(localStorage.getItem('score')) ||{
    wins:0,
    losses:0,
    ties:0,
};
/*if(!score) //set score to default value if null
{ 
score={
    wins:0,
    losses:0,
    ties:0,
};
} */

updateScoreElement();

let isAutoPlaying=false;
let intervalId;

function autoPlay(){
    if (!isAutoPlaying)
    {
        intervalId=setInterval(()=>{
            const playerMove=pickComputerMove();
            playGame(playerMove);
        },1000);
        isAutoPlaying=true;
    }
    else{
        clearInterval(intervalId);
        isAutoPlaying=false;
    }
}

       // Replacing this code with onclick attribute
document.querySelector('.js-rock-button').addEventListener('click', ()=>{
   playGame('Rock');
});
document.querySelector('.js-paper-button').addEventListener('click', ()=>{
    playGame('Paper');
 });
 document.querySelector('.js-scissors-button').addEventListener('click', ()=>{
    playGame('Scissors');
 });

 document.querySelector('.js-reset-score-button').addEventListener('click', ()=>{
        score.wins=0;
        score.losses=0;
        score.ties=0;
        localStorage.removeItem('score');
        updateScoreElement();
 });

 document.querySelector('.js-auto-play-button').addEventListener('click', ()=>{
    autoPlay();
 });

 //addEventListsener has an object 'event'.It provides it as a paramater to the function.So,everytime we type a key on keyboard,addEventListener will save th event object and run the function
document.body.addEventListener('keydown',(event)=>{
    if(event.key==='r'){
        playGame('Rock');
    }
    else if(event.key==='p'){
        playGame('Paper');
    }
    else if(event.key==='s'){
        playGame('Scissors');
    }

});
    

function playGame(playerMove)
{
const computerMove=pickComputerMove();
let result='';

if(playerMove==='Scissors')
{
if(computerMove==='Rock')
    {result='You lose.';}
else if(computerMove==='Paper')
    {result='You win.';}
else if(computerMove==='Scissors')
    {result='Its a Tie.';}
}
else if(playerMove==='Paper')
{

if(computerMove==='Paper')
{result='Its a Tie.';}
else if(computerMove==='Scissors')
{result='You lose.';}
else if(computerMove==='Rock')
{result='You win.';}
}
else if(playerMove==='Rock')
{
if(computerMove==='Rock')
{result='Its a Tie.';}
else if(computerMove==='Paper')
{result='You lose.';}
else if(computerMove==='Scissors')
{result='You win.';}
}

if(result==='You win.')
{
score.wins+=1;
}
else if(result==='You lose.')
{
score.losses+=1;
}
else if(result==='Its a Tie.')
{
score.ties+=1;
}

localStorage.setItem('score',JSON.stringify(score)); //To save scores permanently,i.e even after refereshing the page

updateScoreElement();

document.querySelector('.js-result').innerHTML=result;
document.querySelector('.js-moves').innerHTML = `You
<img src="/images/${playerMove}.png" class="move-icon">
<img src="/images/${computerMove}.png" class="move-icon">
Computer`;
}


function updateScoreElement() {
document.querySelector('.js-score')
.innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}

function pickComputerMove()
{
let computerMove='';
const randomNumber=Math.random();
    if(randomNumber>=0 && randomNumber<1/3)
    {
        computerMove='Rock';
    }
    else if(randomNumber>=1/3 && randomNumber<2/3)
    {
        computerMove='Paper';
    }
    else if (randomNumber>=2/3 && randomNumber<1)
    {
        computerMove='Scissors';
    }
        return computerMove;
}
