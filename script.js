/***************************variables*******************************************************************/
let time 
const timerElement = document.getElementById("timer") //find the element of timer in html

const highScores = JSON.parse (localStorage.getItem("highScores")) || [];

const maxHighScores = 5;
console.log(highScores);//remove when done

/*******************************************************************************************/


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

let sec = 0; //change back to 0

function increaseTemps() {
    /******************change variable**************************************/
    
    time = setInterval(()=>{
        
        let min = Math.floor(sec  / 60);
        let seconds = Math.floor(sec % 60);
        if (seconds<10){ //if seconds is under the double digits value
            timerElement.innerHTML =  min + ":0" + seconds; //then add a 0 before seconds
        }else{ 
            timerElement.innerHTML = min + ":" + seconds; //remove the zeros if second is already double digits
        }
        sec++ //increment sec
    
    }, 1000) //delay of 1000ms

}

increaseTemps();

function stopTimer(){
    clearInterval(time);
}
// end timer

/********************localstorage save score********************************** */
function saveHighScore(){
    const score = {
        score: sec,
    };
    highScores.push(score);
    highScores.sort( (a,b)=> b.score -a.score)
    highScores.splice(5);

    localStorage.setItem("highScores", JSON.stringify(highScores));

    console.log(highScores);//remove when done
}
/**************************leaderboard************************************/







// function LeaderboardView(){

//     document.addEventListener('scoreboard', () => {
//         //


//         let elements = []
//         //select the container
//         let container = document.querySelector('#container')
//         // Add each row to the array
//         container.querySelectorAll('.row').forEach(el => elements.push(el))
//         // Clear the container
//         container.innerHTML = (time);
//         // Sort the array from highest to lowest
//         elements.sort((a, b) => b.querySelector('.score').textContent - a.querySelector('.score').textContent)
//         // Put the elements back into the container
//         elements.forEach(e => container.appendChild(e))

        
//     })
// }


/***********************uncomment when done*************************************/ 


//var number = prompt('Please enter a number') //ask the player the number wanted and store the answer in 'number'



const box = document.createElement("div") //create a div stored in the variable box
box.classList.add("box") //modify the propriety listed in the CSS

const board = document.querySelector("#board") // variable board

let nb = 1 //box number



//loop that generate as much box as you want
for(let i = 1; i <= 1 /*(number)*/; i++){ //retrieve the value from the the variable 'number'
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
                saveHighScore()// show saved score
                //LeaderboardView();//show leaderboard
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







