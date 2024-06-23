document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');
    const box = 20;
    let snake = [
        {x: 9 * box, y: 10 * box},
        {x: 8 * box, y: 10 * box},
        {x: 7 * box, y: 10 * box}
    ];
    let food = {
        x: Math.floor(Math.random() * 20) * box,
        y: Math.floor(Math.random() * 20) * box
    };
    let score = 0;
    let time = 0;
    let timer;

    let d = "RIGHT";

    document.addEventListener("keydown", direction);

    function direction(event) {
        if (event.keyCode == 37 && d != "RIGHT") {
            d = "LEFT";
        } else if (event.keyCode == 38 && d != "DOWN") {
            d = "UP";
        } else if (event.keyCode == 39 && d != "LEFT") {
            d = "RIGHT";
        } else if (event.keyCode == 40 && d != "UP") {
            d = "DOWN";
        }
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "lightgreen";
        for (let i = 0; i < snake.length; i++) {
            ctx.fillRect(snake[i].x, snake[i].y, box, box);
        }

        ctx.fillStyle = "red";
        ctx.fillRect(food.x, food.y, box, box);

        let snakeX = snake[0].x;
        let snakeY = snake[0].y;

        if (d == "LEFT") snakeX -= box;
        if (d == "UP") snakeY -= box;
        if (d == "RIGHT") snakeX += box;
        if (d == "DOWN") snakeY += box;

        if (snakeX == food.x && snakeY == food.y) {
            score++;
            food = {
                x: Math.floor(Math.random() * 20) * box,
                y: Math.floor(Math.random() * 20) * box
            };
        } else {
            snake.pop();
        }

        let newHead = {
            x: snakeX,
            y: snakeY
        };

        if (snakeX < 0 || snakeX >= canvas.width || snakeY < 0 || snakeY >= canvas.height || collision(newHead, snake)) {
            clearInterval(game);
            clearInterval(timer);
            alert("Game Over! Your score: " + score + "\nTime: " + formatTime(time));
            return;
        }

        snake.unshift(newHead);

        ctx.fillStyle = "black";
        ctx.font = "30px Arial";
        ctx.fillText("Score: " + score, box, 1.6 * box);

        ctx.fillText("Time: " + formatTime(time), box, 3 * box);
        time++;
    }

    function collision(head, array) {
        for (let i = 0; i < array.length; i++) {
            if (head.x == array[i].x && head.y == array[i].y) {
                return true;
            }
        }
        return false;
    }

    function formatTime(seconds) {
        let minutes = Math.floor(seconds / 60);
        let secs = seconds % 60;
        return `${minutes}:${secs < 10 ? '0' + secs : secs}`;
    }

    let game = setInterval(draw, 100);
    timer = setInterval(() => {
        time++;
    }, 1000);
});
