const quoteTag = document.querySelector(".quote");
const mistake = document.getElementById("mistake");
const userInput = document.querySelector("#quote-input");
const startTest = document.querySelector("#start-test");
const endTest = document.querySelector("#end-test");
const reset = document.querySelector("#reset");
const result = document.querySelector(".result");
const condition=document.querySelector(".conditions");

var mistakeVal;

//Examinar can set the question from here
let quote1 = `Don't tell people how to do things, tell them what to do and
let them surprise you with their results.`;
let quote2 = `To handle yourself, use your head; to handle others, use your heart.`;
let quote3 = `Power isn't control at all - power is strength, and giving that strength
to others. A leader isn't someone who forces others to make him
stronger; a leader is someone willing to give his strength to others that
they may have the strength to stand on their own.`;
let quote4 = `A man can only lead when others accept him as their leader, and he
has only as much authority as his subjects give to him. All of the brilliant
ideas in the world cannot save your kingdom if no one will listen to them.`;
let quote5 = `Leaders aren't born, they are made. And they are made just like
anything else, through hard work. And that's the price we'll have
to pay to achieve that goal, or any goal.`;
let quote6 = `Life loses half its interest if there is no struggle-if there are no risks to be taken.`;
//let quote7=`I am rajib`;
//create an array of quotes
var quote = [quote1, quote2, quote3, quote4, quote5, quote6];
var ran = Math.floor(Math.random() * quote.length);
var val = quote[ran];

//add span tag before each char
let arr = val.split("").map((value) => {
    return "<span class='quote-char'>" + value + "</span>";
});

quoteTag.innerHTML = arr.join("");
var quoteLength=arr.length;



//Page load
window.onload = () => {
   //console.log(quoteLength);
   quoteTag.style.display="none";  //Quote is not displayed
   userInput.style.display="none";  //Text area input is not displayed
    endTest.style.display = "none";  //End-test button is not displayed
    reset.style.display = "none"; //Reset button is not displayed
    result.style.display="none";  //Result fields is not displayed
    userInput.disabled = true;
    
   

}

//Time function
const reduceTime = () => {
    time = 60;
    timer = setInterval(updateTimer, 1000);
}

function updateTimer() {
    if (time == 0) {
        displayResult();
    } else {
        document.getElementById("timer").innerHTML = --time + "s";
    }

}


//Start button function
startTest.onclick = () => {
    mistakeVal = 0;
    timer = "";
    mistake.innerText = mistakeVal;


    userInput.disabled = false;
    quoteTag.style.display="block";
   userInput.style.display="block";
    startTest.style.display = "none";
    condition.style.display="none";
    reset.style.display = "none";
    // result.style.display = "none";
    endTest.style.display = "block";

    reduceTime();


}

//Logic for comparing input words with given code
userInput.addEventListener("input", () => {
    let quoteChar = document.querySelectorAll(".quote-char");
    console.log(quoteChar);
    quoteChar = Array.from(quoteChar);


    //Array of user input characters
    let userInputChar = userInput.value.split("");

    //loop through each characters in quote and compare the input with quote char and produce the mistakescount
    quoteChar.forEach((char, index) => {

        if (char.innerText == userInputChar[index]) {
            char.classList.add("success");
            char.classList.remove("fail");
        } else if (userInputChar[index] == null) {
            char.classList.remove("fail");

        } else {
            if (!char.classList.contains("fail")) {
                mistakeVal++;
                char.classList.add("fail");
            }
          
           
        }

    });

    //checking all the char are entered correctly 
    let check = quoteChar.every((element) => {
        return element.classList.contains("success");
    });
    if (check) {
        mistakeVal = 0;
        mistake.innerText = mistakeVal;
        displayResult();
    }

});

//End test funcion when click on end-test button

endTest.onclick = () => {
   
    reset.style.display = "block";
   
    displayResult();

}

//Result-Calculation function
function displayResult() {
    userInput.style.display="none";
    quoteTag.style.display="none";
    if(userInput.value.length<quoteLength){   //If user is not able to complete then the remaining characters will be considered as a mistake.
        mistakeVal=mistakeVal+(quoteLength-userInput.value.length); 
    }

    mistake.innerText = mistakeVal;
    //userInput.disabled = true;
    clearInterval(timer); //It will stop the timer on it's current state
    endTest.style.display = "none";

    //Calculating the speed
    let timeTaken = 1;
    if (time != 0) {
        timeTaken = (60 - time) / 100;

    }
    const speed = document.getElementById("speed");
    speed.innerText = (userInput.value.length / 5 / timeTaken).toFixed(2) + "wpm";
    result.style.display = "block";

    //Calculating the accuracy
    const accuracy = document.getElementById("accuracy");
   // console.log(userInput.value.length);
    accuracy.innerText = (((userInput.value.length - mistakeVal) / quoteLength) * 100) + "%";

    reset.style.display = "block";


}

//To restart/reset the page
reset.onclick = () => {
    // location.reload();
    if (confirm("Are you sure, want to reset?")) {
        location.reload();
    }
}

