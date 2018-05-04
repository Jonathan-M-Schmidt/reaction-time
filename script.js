const startBtn = document.getElementById('start-btn');
const timeLeft = document.getElementById('time-to-start');
const points = document.getElementById('points-container');
const pointsText = document.getElementById('points');
const currentCircleCount = document.getElementById('circle-count');
const canvas = document.getElementById('shape-canvas');
const context2D = canvas.getContext('2d');

let countdown = 2100;
let lastCountdown = 0;
let currentShape = '';
let circleCount = 0;
let currentPoints = 0;
let disabled = true;
let currentGameResults = {
    games: []
};

startBtn.addEventListener('click', () => {
    startCountdown();
    startBtn.classList.toggle('hidden');
})

canvas.addEventListener('click', () => {
    calculatePoints();
    disabled = true;
})

const startCountdown = () => {
    setCurrentCircleCount();
    let interval = setInterval(timer, 100);

    function timer() {
        countdown = countdown - 100;
        if(countdown <= 0){
            clearInterval(interval);
            disabled = false;
            startGame();
            return;
        }
        timeLeft.innerHTML = countdown;
    }
}

const startGame = () => {
    timeLeft.innerHTML = 'Go!';
    points.classList.toggle('hidden');

    generateRandomShape();
    console.log('Start Game');
    setupCountdowns();
    let interval = setInterval(timer, 10);
    
    function timer() {
        if(circleCount < 10){
            countdown = countdown -0.01;
            if(countdown <= 0){
                generateRandomShape();
                setupCountdowns();
            }
        }
        else{
            clearInterval(interval);
            timeLeft.innerHTML = 'Game Over';
            currentGameResults.games.push(
                {
                    date: Date.now(), 
                    points: currentPoints
                }
            )
        }
    }
}

const setupCountdowns = () => {
    countdown = randomCountdownTimer();
    lastCountdown = countdown;
}

const randomCountdownTimer = () => {
    const random = 1 + Math.random();
    return random;
}

const calculatePoints = () => {
    if(disabled){
        return;
    }

    const clickPoints = lastCountdown - countdown;
    if(currentShape === "circle"){
        if(clickPoints < 0.25){
            currentPoints += 100;
        }
        else if(clickPoints < 0.35){
            currentPoints += 80;
        }
        else if(clickPoints < 0.45){
            currentPoints += 60;
        }
        else if(clickPoints < 0.55){
            currentPoints += 40;
        }
        else if(clickPoints < 0.65){
            currentPoints += 20;
        }
    }
    else {
        currentPoints -= 100;
    }
    pointsText.innerHTML = currentPoints;
}

const randomHexColor = () => "#" + Math.random().toString(16).slice(2, 8);

const generateRandomShape = () => {
    disabled = false;
    context2D.clearRect(0, 0, canvas.width, canvas.height);
    context2D.beginPath();
    chooseShape();
    context2D.fillStyle = randomHexColor();
    context2D.fill();
}

const chooseShape = () => {
    const randomNr = Math.random();
    if(randomNr < 0.33) {
        generateCircle();
    }
    else if (randomNr < 0.66) {
        generateRectangle();
    }
    else {
        generateTriangle();
    }
}

const generateCircle = () => {
    context2D.arc(150, 75, 50, 0, 2*Math.PI);
    currentShape = 'circle';
    circleCount++;
    setCurrentCircleCount();
}

const generateRectangle = () => {
    context2D.rect(100, 25, 100, 100);
    currentShape = 'rect';
}

const generateTriangle = () => {
    context2D.moveTo(225, 125);
    context2D.lineTo(150, 25);
    context2D.lineTo(75, 125);
    currentShape = 'tri';
}

const setCurrentCircleCount = () => {
    currentCircleCount.innerHTML = circleCount;
}
