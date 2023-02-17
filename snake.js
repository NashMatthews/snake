// link to HTML elements and set canvas as 2D

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const h1 = document.getElementById("gameover");

// set the size of each box in canvas and the size of the grid

const box = 40;
canvas.height = 16 * box;
canvas.width = 16 * box;

// set an array for the snake

let snake = [];
snake[0] = {
    x: 2 * box,
    y: 7 * box,
}

// declare a variable for the direction of the snake

let direction;

// create a variable for the food element

let food = {
    x: 10 * box,
    y: 7 * box
}

// declare a variable for the score (0)

let score = 0;

// event listener for key presses with if/else statemtents stating what action to take for different keys

document.addEventListener('keydown', function(e) {
    let key = e.keyCode
    if(key === 37 && direction != 'right'){
        direction = 'left'
    } else if( key == 38 && direction != 'down'){
        direction = 'up'
    } else if(key == 39 && direction != 'left'){
        direction = 'right'
    } else if(key == 40 && direction != 'up'){
        direction = 'down'
    }
})

function collision(head,array){
    for(let i = 0; i < array.length; i++){
        if(head.x == array[i].x && head.y == array[i].y){
            return true
        }
    }
    return false
}

// function for the game

function game(){

// setInterval function. Game executes everything within the function at a set interval

    let draw = setInterval(function() {

// initialise the 'clearRect' function

        ctx.clearRect(0, 0, canvas.width, canvas.height)
        ctx.font = "20px Arial";
        ctx.fillText(`Score: ${score} Johnny Points!`, 10, 30);

// for loop
        
        for(let i = 0; i < snake.length ; i++){
            ctx.fillStyle = "yellow";
            ctx.fillRect(snake[i].x, snake[i].y, box, box);
        }

        ctx.fillStyle = "fuchsia"
        ctx.fillRect(food.x, food.y, box, box)

        let snakeX = snake[0].x;
        let snakeY = snake[0].y;

        if( direction == 'left') snakeX -= box;
        if( direction == 'up') snakeY -= box;
        if( direction == 'right') snakeX += box;
        if( direction == 'down') snakeY += box;

/* if snake eats the food then the food respawns at a random location on the grid and 1 point is added to the score
    add snake.pop to the else statement so that if the snake eats food then it will bypass this part and it will get longer
*/
        if(snakeX == food.x && snakeY ==food.y){
            food = {
                x: Math.floor(Math.random()*15+1) * box,
                y: Math.floor(Math.random()*15+1) * box
            }
            score += 1
        } else{
            snake.pop()
        }
        

        let newHead = {
            x: snakeX,
            y: snakeY
        }

// if/else to detect if the snake hits a wall.

        if(snakeX < 0 || snakeX > 15 * box || snakeY < 0 || snakeY > 15 * box || collision(newHead, snake)){
            clearInterval(draw);
            h1.textContent = `Game Over, you loser.`;
        }

        snake.unshift(newHead);
    }, 100)
}

game()