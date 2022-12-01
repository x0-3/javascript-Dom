// function to shuffle the boxes 
// can be used by putting shuffleChildren and the section that we want it to affect

function shuffleChildren(parent){
    let children = parent.children
    let i = children.length, k , temp
            
    while (--i > 0){
        k= Math.floor(Math.random() * (i+1))
        temp = board.children[k]
        board.children[k] = board.children[i]
        board.appendChild(temp)
               
    }
}
        
//add a visual effect to the box that was clicked (error:red ; success: green ; notice: blue)
function showReaction(type, clickedBox){
    clickedBox.classList.add(type)
    if(type !== "success"){
        setTimeout(function(){
        clickedBox.classList.remove(type)
        }, 800)
    }
}

                                        /******************************timer***************************/

let time 
const timerElement = document.getElementById("timer") //find the element of timer in html

function increaseTemps() {
    let sec = 0;
    time = setInterval(()=>{
        
        let min = Math.floor(sec  / 60);
        let seconds = Math.floor(sec % 60);
        if (seconds<10){ //if the timer is under the double digits value
            timerElement.innerHTML = "0" + min + ":0" + seconds; //then add a 0 before min and seconds
        }else{ 
            timerElement.innerHTML = min + ":" + seconds; //remove the zeros if the timer is already double digits
        }
        sec++ //increment sec
    }, 1000) //delay of 1000ms

}
increaseTemps();

function stopTimer(){
    clearInterval(time)
    localStorage.setItem('timer', time);// store timer in local storage to be fixed
}
// end timer



                    /***********************uncomment when done*************************************/ 


var number = prompt('Please enter a number') //ask the player the number wanted and store the answer in 'number'



const box = document.createElement("div") //create a div stored in the variable box
box.classList.add("box") //modify the propriety listed in the CSS

const board = document.querySelector("#board") // variable board

let nb = 1 //box number



//loop that generate as much box as you want
for(let i = 1; i <= (number); i++){ //retrieve the value from the the variable 'number'
    const newbox = box.cloneNode()
    newbox.innerText = i
    board.appendChild(newbox)

    newbox.addEventListener("click" , function(){

                
        if(i == nb){ // if the box has the same number as the variable nb
            newbox.classList.add("box-valid") 
            shuffleChildren(board) //shuffle the boxes 

            if(nb == board.children.length){
                board.querySelectorAll(".box").forEach(function(box){  //all valid boxes green
                showReaction("box-success", box) //make the box green
                stopTimer() // stop the timer
                updateLeaderboardView();//show leaderboard
                
                })
            }
            nb++ //increase variable nb
        }
        
        else if(i > nb){
            shuffleChildren(board) //shuffle the boxes 
            showReaction("box-error", newbox) //make the box red
            nb = 1
            board.querySelectorAll(".box-valid").forEach(function(validBox){
                validBox.classList.remove("box-valid")
            })
        }     
                 
        else{
            showReaction("box-notice",newbox) //show box blue
        }     
    }) 
}
shuffleChildren(board) //shuffle the boxes 



                                    /**************************leaderboard************************************/
let arrayScore = [
    
    {name: "Player 1",  score: 0 },
    {name: "Player 2",  score: 0 },
    {name: "Player 3",  score: 0 },

];

function updateLeaderboardView() {

    let leaderboard = document.getElementById("leaderboard"); //get leaderboard from html
    leaderboard.innerHTML = "";
    

    arrayScore.sort(function(a, b){ return b.score - a.score  }); //show scores highest to lowest
    let elements = []; 
    // create elements for each player
    for(let i=0; i<arrayScore.length; i++) {
        let name = document.createElement("div");// create div name in html
        let score = document.createElement("div"); //create div score in html
        name.classList.add("name");// add "name" in a list 
        score.classList.add("score"); //add "score" in a list  
        name.innerText = arrayScore[i].name; //add text present in arrayScore in list name
        score.innerText = arrayScore[i].score; //add text present in arrayScore in list name

        let scoreBoard = document.createElement("div"); //create div scoreBoard in html
        scoreBoard.classList.add("row"); //add a list row in html
        scoreBoard.appendChild(name); //move name into scoreBoard
        scoreBoard.appendChild(score); //move score section in the scoreBoard
        leaderboard.appendChild(scoreBoard);

        elements.push(scoreBoard);
    }
}










