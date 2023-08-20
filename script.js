const options = {
    bliss: "Extreme happiness",
    diligent: "Showing care in work",
    enhance: "Improve; make better",
    fragile: "Easily breakable",
    gratitude: "Thankfulness",
    harmony: "Peaceful agreement",
    illuminate: "Light up",
    jovial: "Joyful; cheerful",
    keen: "Eager; sharp",
    lustrous: "Shiny; radiant",
    meticulous: "Extremely careful",
    nebula: "Interstellar cloud",
    opulent: "Luxurious; wealthy",
    perplex: "Confuse; puzzle",
    quaint: "Charmingly old-fashioned",
    resonate: "Evoke a response",
    serene: "Calm; peaceful",
    truce: "Temporary peace",
    unison: "Agreement; harmony",
    vibrant: "Energetic; vivid",
    wistful: "Longing; yearning",
    xenial: "Hospitable; friendly",
    yearn: "Desire strongly",
    zenith: "Highest point",
    abode: "Home; residence",
    bask: "Enjoy warmth",
    cacophony: "Harsh noise",
    debonair: "Suave; charming",
    elation: "Exhilarating joy",
    felicity: "Great happiness",
    glisten: "Shine; sparkle",
    hibernate: "Spend winter asleep",
    imbue: "Inspire; permeate",
    jocund: "Cheerful; lighthearted",
    kindle: "Ignite; arouse",
    luminary: "Inspiring figure",
    mellifluous: "Sweet-sounding",
    nectar: "Sweet liquid",
    opalescent: "Shimmering with colors",
    placid: "Calm; peaceful",
    quixotic: "Impractical; idealistic",
    resplendent: "Dazzling; magnificent",
    sonorous: "Deep and rich in sound",
    transcend: "Surpass; go beyond",
    unfurl: "Unroll; unfold",
    vivacious: "Lively; animated",
    whimsical: "Playfully quaint",
    xenophile: "One who loves foreign cultures",
    yearning: "Longing; craving",
    zest: "Enthusiasm; energy"
};



const message = document.getElementById("message");
const hintRef = document.querySelector(".hint-ref");
const controls = document.querySelector(".controls-container");
const startBtn = document.getElementById("start");
const letterContainer = document.getElementById("letter-container");
const userInpSection = document.getElementById("user-input-section");
const resultText = document.getElementById("result");
const word = document.getElementById("word");
const words = Object.keys(options);
let randomWord = "",
    randomHint = "";
let winCount = 0,
    lossCount = 0;

//random value
const generateRandomValue = (array) => Math.floor(Math.random() * array.length);

//Block all the buttons
const blocker = () => {
    let lettersButtons = document.querySelectorAll(".letters");
    stopGame();
};

//Start Game
startBtn.addEventListener("click", () => {
    controls.classList.add("hide");
    init();
});

//Stop Game
const stopGame = () => {
    controls.classList.remove("hide");
};

//Generate Word 
const generateWord = () => {
    letterContainer.classList.remove("hide");
    userInpSection.innerText = "";
    randomWord = words[generateRandomValue(words)];
    randomHint = options[randomWord];
    hintRef.innerHTML = `<div id="wordHint">
  <span>Hint: </span>${randomHint}</div>`;
    let displayItem = "";
    randomWord.split("").forEach((value) => {
        displayItem += '<span class="inputSpace">_ </span>';
    });

    //element as span
    userInpSection.innerHTML = displayItem;
    userInpSection.innerHTML += `<div id='chanceCount'>Chances Left: ${lossCount}</div>`;
};

//Initial Function
const init = () => {
    winCount = 0;
    lossCount = 5;
    randomWord = "";
    word.innerText = "";
    randomHint = "";
    message.innerText = "";
    userInpSection.innerHTML = "";
    letterContainer.classList.add("hide");
    letterContainer.innerHTML = "";
    generateWord();

    //letter buttons
    for (let i = 65; i < 91; i++) {
        let button = document.createElement("button");
        button.classList.add("letters");

        //ASCII[A-Z]
        button.innerText = String.fromCharCode(i);

        //Character button onclick
        button.addEventListener("click", () => {
            message.innerText = `Correct Letter`;
            message.style.color = "#008000";
            let charArray = randomWord.toUpperCase().split("");
            let inputSpace = document.getElementsByClassName("inputSpace");

            //replace Dash with Letter
            if (charArray.includes(button.innerText)) {
                charArray.forEach((char, index) => {
                    if (char === button.innerText) {
                        button.classList.add("correct");
                        //Replace dash with letter
                        inputSpace[index].innerText = char;
                        winCount += 1;
                        //If winCount == word length
                        if (winCount == charArray.length) {
                            resultText.innerHTML = "You Won";
                            startBtn.innerText = "Restart";
                            blocker();
                        }
                    }
                });
            } else {
                //lose count
                button.classList.add("incorrect");
                lossCount -= 1;
                document.getElementById(
                    "chanceCount"
                ).innerText = `Chances Left: ${lossCount}`;
                message.innerText = `Incorrect Letter`;
                message.style.color = "#ff0000";
                if (lossCount == 0) {
                    word.innerHTML = `The word was: <span>${randomWord}</span>`;
                    resultText.innerHTML = "Game Over";
                    blocker();
                }
            }

            //Disable clicked buttons 
            button.disabled = true;
        });

        //Append generated buttons to the letters container
        letterContainer.appendChild(button);
    }
};

window.onload = () => {
    init();
};