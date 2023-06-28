const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

const squareSize = 20;
const numRows = 25;
const numCols = 25;

const canvasWidth = squareSize * numCols;
const canvasHeight = squareSize * numRows;

canvas.width = canvasWidth;
canvas.height = canvasHeight;

const squares = [];

for (let row = 0; row < numRows; row++) {
    for (let col = 0; col < numCols; col++) {
    const x = (canvasWidth - (squareSize * numCols)) / 2 + col * squareSize;
    const y = (canvasHeight - (squareSize * numRows)) / 2 + row * squareSize;

    const red = Math.floor(Math.random() * 256);
    const green = Math.floor(Math.random() * 256);
    const blue = Math.floor(Math.random() * 256);
    const color = `rgb(${red}, ${green}, ${blue})`;

    const square = {
        x: x,
        y: y,
        size: squareSize,
        color: color
    };

    squares.push(square);
    }
}

squares.forEach(square => {
    ctx.fillStyle = square.color;
    ctx.fillRect(square.x, square.y, square.size, square.size);
});

const progressFill = document.getElementById("progressFill");
let progress = 0;
const intervalDuration = 100;
const totalDuration = 5000;
const numIntervals = totalDuration / intervalDuration;

function updateProgress() {
    progress += 100 / numIntervals;
    progressFill.style.width = progress + "%";

    if (progress < 100) {
    setTimeout(updateProgress, intervalDuration);
    }
}

setTimeout(updateProgress, intervalDuration);

const clickedSquares = [];

canvas.addEventListener('click', function(event) {
    const rect = canvas.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const clickY = event.clientY - rect.top;

    squares.forEach(square => {
    if (
        clickX >= square.x &&
        clickX < square.x + square.size &&
        clickY >= square.y &&
        clickY < square.y + square.size
    ) {
        const red = Math.floor(Math.random() * 256);
        const green = Math.floor(Math.random() * 256);
        const blue = Math.floor(Math.random() * 256);
        square.color = `rgb(${red}, ${green}, ${blue})`;

        ctx.fillStyle = square.color;
        ctx.fillRect(square.x, square.y, square.size, square.size);

        clickedSquares.push({ x: square.x, y: square.y });
    }

    document.getElementById("audio").play();

    });
});

function regenerateMatrix() {
    location.reload();
}

window.onbeforeunload = function() {
    localStorage.setItem("clickedSquares", JSON.stringify(clickedSquares));
};